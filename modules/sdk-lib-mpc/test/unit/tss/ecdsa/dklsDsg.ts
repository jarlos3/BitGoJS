import { DklsDkg, DklsDsg, DklsUtils } from '../../../../src/tss/ecdsa-dkls';
import * as fs from 'fs';
import { isRight } from 'fp-ts/Either';
import * as crypto from 'crypto';
import should from 'should';
import { Keyshare } from '@silencelaboratories/dkls-wasm-ll-node';
import { decode } from 'cbor-x';
import { verifyAndConvertDklsSignature } from '../../../../src/tss/ecdsa-dkls/util';
import * as mpcv2KeyCardData from './fixtures/mpcv2keycarddata';
import * as sjcl from 'sjcl';
import { ReducedKeyShare, ReducedKeyShareType, RetrofitData } from '../../../../src/tss/ecdsa-dkls/types';

describe('DKLS Dsg 2x3', function () {
  const vectors = [
    {
      party1: 0,
      party2: 1,
      msgToSign: 'ffff',
      derivationPath: 'm',
    },
    {
      party1: 0,
      party2: 2,
      msgToSign: 'ffff',
      derivationPath: 'm/0',
    },
    {
      party1: 1,
      party2: 2,
      msgToSign: 'ffff',
      derivationPath: 'm/0/0/0',
    },
    {
      party1: 1,
      party2: 2,
      msgToSign: 'ffff',
      derivationPath: 'm/0/9/10',
    },
  ];
  // To generate the fixtures, run DKG as in the dklsDkg.ts tests and save the resulting party.getKeyShare in a file by doing fs.writeSync(party.getKeyShare()).
  const shareFiles = [
    `${__dirname}/fixtures/userShare`,
    `${__dirname}/fixtures/backupShare`,
    `${__dirname}/fixtures/bitgoShare`,
  ];
  vectors.forEach(async function (vector) {
    it(`should create signatures for parties ${vector.party1} and ${vector.party2} with derivation`, async function () {
      const party1 = new DklsDsg.Dsg(
        fs.readFileSync(shareFiles[vector.party1]),
        vector.party1,
        vector.derivationPath,
        crypto.createHash('sha256').update(Buffer.from(vector.msgToSign, 'hex')).digest()
      );
      const party2 = new DklsDsg.Dsg(
        fs.readFileSync(shareFiles[vector.party2]),
        vector.party2,
        vector.derivationPath,
        crypto.createHash('sha256').update(Buffer.from(vector.msgToSign, 'hex')).digest()
      );
      // Round 1 ////
      const party1Round1Message = await party1.init();
      const party2Round1Message = await party2.init();
      const party2Round2Messages = party2.handleIncomingMessages({
        p2pMessages: [],
        broadcastMessages: [party1Round1Message],
      });
      // ////////////
      // Round 2
      const party1Round2Messages = party1.handleIncomingMessages({
        p2pMessages: [],
        broadcastMessages: [party2Round1Message],
      });
      const party1Round3Messages = party1.handleIncomingMessages({
        p2pMessages: party2Round2Messages.p2pMessages,
        broadcastMessages: [],
      });
      const party2Round3Messages = party2.handleIncomingMessages({
        p2pMessages: party1Round2Messages.p2pMessages,
        broadcastMessages: [],
      });
      const party2Round4Messages = party2.handleIncomingMessages({
        p2pMessages: party1Round3Messages.p2pMessages,
        broadcastMessages: [],
      });
      // ////////////
      // / Produce Signature
      const party1Round4Messages = party1.handleIncomingMessages({
        p2pMessages: party2Round3Messages.p2pMessages,
        broadcastMessages: [],
      });
      party1.handleIncomingMessages({
        p2pMessages: [],
        broadcastMessages: party2Round4Messages.broadcastMessages,
      });
      should.exist(party1.signature);
      should.exist(party1Round4Messages.broadcastMessages[0].signatureR);
      const combinedSigUsingUtil = DklsUtils.combinePartialSignatures(
        [party1Round4Messages.broadcastMessages[0].payload, party2Round4Messages.broadcastMessages[0].payload],
        Buffer.from(party1Round4Messages.broadcastMessages[0].signatureR!).toString('hex')
      );
      (
        (combinedSigUsingUtil.R.every((p) => party1.signature.R.includes(p)) &&
          party1.signature.R.every((p) => combinedSigUsingUtil.R.includes(p))) ||
        (party1.signature.S.every((p) => combinedSigUsingUtil.S.includes(p)) &&
          combinedSigUsingUtil.S.every((p) => party1.signature.S.includes(p)))
      ).should.equal(true);
      // ////////////
      party2.handleIncomingMessages({
        p2pMessages: [],
        broadcastMessages: party1Round4Messages.broadcastMessages,
      });
      party1.signature.should.deepEqual(party2.signature);
      const keyShare: Keyshare = Keyshare.fromBytes(fs.readFileSync(shareFiles[vector.party1]));
      const convertedSignature = verifyAndConvertDklsSignature(
        Buffer.from(vector.msgToSign, 'hex'),
        party1.signature,
        Buffer.from(keyShare.publicKey).toString('hex') +
          Buffer.from(decode(keyShare.toBytes()).root_chain_code).toString('hex'),
        vector.derivationPath
      );
      should.exist(convertedSignature);
      convertedSignature.split(':').length.should.equal(4);
    });
  });

  it(`should pass when doing key refresh on compressed key cards then signing`, async function () {
    // Fixtures generated through web-demo keycard generation example for DKLS.
    const userCompressedPrv = Buffer.from(sjcl.decrypt('t3stSicretly!', mpcv2KeyCardData.userEncryptedPrv), 'base64');
    const bakcupCompressedPrv = Buffer.from(
      sjcl.decrypt('t3stSicretly!', mpcv2KeyCardData.backupEncryptedPrv),
      'base64'
    );
    const decodedUserPrv = ReducedKeyShareType.decode(decode(userCompressedPrv));
    if (!isRight(decodedUserPrv)) {
      throw Error('Invalid user prv encoding');
    }
    const decodedBackupPrv = ReducedKeyShareType.decode(decode(bakcupCompressedPrv));
    if (!isRight(decodedBackupPrv)) {
      throw Error('Invalid backup prv encoding');
    }
    const userPrvJSON: ReducedKeyShare = decodedUserPrv.right;
    const backupPrvJSON: ReducedKeyShare = decodedBackupPrv.right;
    const userKeyRetrofit: RetrofitData = {
      xShare: {
        x: Buffer.from(userPrvJSON.prv).toString('hex'),
        y: Buffer.from(userPrvJSON.pub).toString('hex'),
        chaincode: Buffer.from(userPrvJSON.rootChainCode).toString('hex'),
      },
      bigSiList: [Buffer.from(userPrvJSON.bigSList[1]).toString('hex')],
      xiList: userPrvJSON.xList.slice(0, 2),
    };
    const backupKeyRetrofit: RetrofitData = {
      xShare: {
        x: Buffer.from(backupPrvJSON.prv).toString('hex'),
        y: Buffer.from(backupPrvJSON.pub).toString('hex'),
        chaincode: Buffer.from(backupPrvJSON.rootChainCode).toString('hex'),
      },
      bigSiList: [Buffer.from(backupPrvJSON.bigSList[0]).toString('hex')],
      xiList: backupPrvJSON.xList.slice(0, 2),
    };
    const user = new DklsDkg.Dkg(2, 2, 0, userKeyRetrofit);
    const backup = new DklsDkg.Dkg(2, 2, 1, backupKeyRetrofit);
    const userRound1Message = await user.initDkg();
    const backupRound1Message = await backup.initDkg();
    const userRound2Messages = user.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [backupRound1Message],
    });
    const backupRound2Messages = backup.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [userRound1Message],
    });
    const userRound3Messages = user.handleIncomingMessages({
      p2pMessages: backupRound2Messages.p2pMessages.filter((m) => m.to === 0),
      broadcastMessages: [],
    });
    const backupRound3Messages = backup.handleIncomingMessages({
      p2pMessages: userRound2Messages.p2pMessages.filter((m) => m.to === 1),
      broadcastMessages: [],
    });
    const userRound4Messages = user.handleIncomingMessages({
      p2pMessages: backupRound3Messages.p2pMessages.filter((m) => m.to === 0),
      broadcastMessages: [],
    });
    const backupRound4Messages = backup.handleIncomingMessages({
      p2pMessages: userRound3Messages.p2pMessages.filter((m) => m.to === 1),
      broadcastMessages: [],
    });
    user.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: backupRound4Messages.broadcastMessages,
    });
    backup.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: userRound4Messages.broadcastMessages,
    });
    const userKeyShare = user.getKeyShare();
    const backupKeyShare = backup.getKeyShare();
    const party1 = new DklsDsg.Dsg(
      userKeyShare,
      0,
      'm',
      crypto.createHash('sha256').update(Buffer.from('ffff', 'hex')).digest()
    );
    const party2 = new DklsDsg.Dsg(
      backupKeyShare,
      1,
      'm',
      crypto.createHash('sha256').update(Buffer.from('ffff', 'hex')).digest()
    );
    // Round 1 ////
    const party1Round1Message = await party1.init();
    const party2Round1Message = await party2.init();
    const party2Round2Messages = party2.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [party1Round1Message],
    });
    // ////////////
    // Round 2
    const party1Round2Messages = party1.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [party2Round1Message],
    });
    const party1Round3Messages = party1.handleIncomingMessages({
      p2pMessages: party2Round2Messages.p2pMessages,
      broadcastMessages: [],
    });
    const party2Round3Messages = party2.handleIncomingMessages({
      p2pMessages: party1Round2Messages.p2pMessages,
      broadcastMessages: [],
    });
    const party2Round4Messages = party2.handleIncomingMessages({
      p2pMessages: party1Round3Messages.p2pMessages,
      broadcastMessages: [],
    });
    // ////////////
    // / Produce Signature
    const party1Round4Messages = party1.handleIncomingMessages({
      p2pMessages: party2Round3Messages.p2pMessages,
      broadcastMessages: [],
    });
    party1.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: party2Round4Messages.broadcastMessages,
    });
    should.exist(party1.signature);
    should.exist(party1Round4Messages.broadcastMessages[0].signatureR);
    const combinedSigUsingUtil = DklsUtils.combinePartialSignatures(
      [party1Round4Messages.broadcastMessages[0].payload, party2Round4Messages.broadcastMessages[0].payload],
      Buffer.from(party1Round4Messages.broadcastMessages[0].signatureR!).toString('hex')
    );
    (
      (combinedSigUsingUtil.R.every((p) => party1.signature.R.includes(p)) &&
        party1.signature.R.every((p) => combinedSigUsingUtil.R.includes(p))) ||
      (party1.signature.S.every((p) => combinedSigUsingUtil.S.includes(p)) &&
        combinedSigUsingUtil.S.every((p) => party1.signature.S.includes(p)))
    ).should.equal(true);
    // ////////////
    party2.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: party1Round4Messages.broadcastMessages,
    });
    party1.signature.should.deepEqual(party2.signature);
    const convertedSignature = verifyAndConvertDklsSignature(
      Buffer.from('ffff', 'hex'),
      party1.signature,
      Buffer.from(userPrvJSON.pub).toString('hex') + Buffer.from(userPrvJSON.rootChainCode).toString('hex'),
      'm'
    );
    should.exist(convertedSignature);
  });

  it(`should fail when signing two different messages`, async function () {
    const party1 = new DklsDsg.Dsg(
      fs.readFileSync(`${__dirname}/fixtures/userShare`),
      0,
      'm',
      crypto.createHash('sha256').update(Buffer.from('ffff', 'hex')).digest()
    );
    const party2 = new DklsDsg.Dsg(
      fs.readFileSync(`${__dirname}/fixtures/bitgoShare`),
      2,
      'm',
      crypto.createHash('sha256').update(Buffer.from('fffa', 'hex')).digest()
    );
    // Round 1 ////
    const party1Round1Message = await party1.init();
    const party2Round1Message = await party2.init();
    const party2Round2Messages = party2.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [party1Round1Message],
    });
    // ////////////
    // Round 2
    const party1Round2Messages = party1.handleIncomingMessages({
      p2pMessages: [],
      broadcastMessages: [party2Round1Message],
    });
    const party1Round3Messages = party1.handleIncomingMessages({
      p2pMessages: party2Round2Messages.p2pMessages,
      broadcastMessages: [],
    });
    const party2Round3Messages = party2.handleIncomingMessages({
      p2pMessages: party1Round2Messages.p2pMessages,
      broadcastMessages: [],
    });
    const party2Round4Messages = party2.handleIncomingMessages({
      p2pMessages: party1Round3Messages.p2pMessages,
      broadcastMessages: [],
    });
    // ////////////
    // / Produce Signature
    party1.handleIncomingMessages({
      p2pMessages: party2Round3Messages.p2pMessages,
      broadcastMessages: [],
    });
    let err = '';
    try {
      party1.handleIncomingMessages({
        p2pMessages: [],
        broadcastMessages: party2Round4Messages.broadcastMessages,
      });
    } catch (e) {
      err = e;
    }
    err.should.equal('Error while creating messages from party 0, round 5: Error: combine error');
  });
});
