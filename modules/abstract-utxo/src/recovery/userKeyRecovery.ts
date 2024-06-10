import { AbstractUtxoCoin } from '../abstractUtxoCoin';
import { BitGoBase } from '@bitgo/sdk-core';
import * as _ from 'lodash';
import { getRecoveryFeePerBytes } from './backupKeyRecovery';

interface BitGoV1Unspent {
  value: bigint;
  tx_hash: Buffer;
  tx_output_n: number;
}

export interface V1RecoverParams {
  walletId: string;
  walletPassphrase: string;
  unspents: BitGoV1Unspent[];
  recoveryDestination: string;
}

export async function v1UserKeyRecovery(coin: AbstractUtxoCoin, bitgo: BitGoBase, params: V1RecoverParams) {
  if (
    _.isUndefined(params.recoveryDestination) ||
    !coin.isValidAddress(params.recoveryDestination, { anyFormat: true })
  ) {
    throw new Error('invalid recoveryDestination');
  }

  const recoveryFeePerByte = await getRecoveryFeePerBytes(coin, { defaultValue: 100 });

  const v1wallet = await bitgo.wallets().get({ id: params.walletId, gpk: true });
  return await v1wallet.recover({
    ...params,
    feeRate: recoveryFeePerByte,
  });
}
