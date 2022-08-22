export default {
  invoice: {
    paymentHash: 'aff5c0a908b0bbb169679626b43602c09e389b242c5035c44b3b9f613a9cab1b',
    walletId: '62acd3e4d1d77600074c70829a0940d8',
    value: 123,
    expiresAt: '2022-08-09T16:58:41.472Z',
    status: 'open',
    memo: 'test payment',
    invoice: 'lntb1230n1p309pp3pp54l6up2ggkzamz6t8jcntgdszcz0r3xey93grt3zt8w0kzw5u4vdsdq5w3jhxapqwpshjmt9de6qcqzpgxqrrsssp56rek9prhjj64f6xvkzjffajmaf0dw472knfykafftklv8ljhjs9q9qyyssq2uznk85spdqfmgpsckx9hunxlgsvrzhwknq7ucpcnuan2fhr3fj567psz75vksynk3q03kt7hutm37tce8258hjqndljr0evuf04eyspz5kw0z',
  },
  payment: {
    transfer: {
      entries: [
        {
          address: '62acd3e4d1d77600074c7082-lightning',
          wallet: '62acd3e4d1d77600074c70829a0940d8',
          value: -323,
          valueString: '-323',
        },
        {
          address: '020ec0c6a0c4fe5d8a79928ead294c36234a76f6e0dca896c35413612a3fd8dbf8',
          value: 323,
          valueString: '323',
          isChange: false,
          isPayGo: false,
        },
      ],
      id: '62f2cbf078f23000071fed3378093a31',
      coin: 'tbtc',
      wallet: '62acd3e4d1d77600074c70829a0940d8',
      walletType: 'hot',
      txid: 'e93d895a78995240965a74d46225133775814b07e5203c1c440d5a6a0273d714',
      height: 999999999,
      heightId: '999999999-62f2cbf078f23000071fed3378093a31',
      date: '2022-08-09T21:04:48.419Z',
      type: 'send',
      value: -323,
      valueString: '-323',
      baseValue: -298,
      baseValueString: '-298',
      feeString: '25',
      payGoFee: 0,
      payGoFeeString: '0',
      usd: -0.0748571557,
      usdRate: 23175.59,
      state: 'signed',
      instant: false,
      isReward: false,
      isFee: false,
      tags: ['62acd3e4d1d77600074c70829a0940d8'],
      history: [
        {
          date: '2022-08-09T21:04:48.430Z',
          user: '62acd10acd441e0007d3e1107aa9aab9',
          action: 'commented',
          comment: 'test payment',
        },
        { date: '2022-08-09T21:04:48.418Z', action: 'signed' },
        {
          date: '2022-08-09T21:04:48.323Z',
          user: '62acd10acd441e0007d3e1107aa9aab9',
          action: 'created',
        },
      ],
      signedDate: '2022-08-09T21:04:48.418Z',
      comment: 'test payment',
      coinSpecific: {
        lightning: true,
        paymentHash: 'e93d895a78995240965a74d46225133775814b07e5203c1c440d5a6a0273d714',
      },
      commentedTime: '2022-08-09T21:04:48.430Z',
      signedTime: '2022-08-09T21:04:48.418Z',
      createdTime: '2022-08-09T21:04:48.323Z',
    },
    status: 'signed',
    paymentHash: 'e93d895a78995240965a74d46225133775814b07e5203c1c440d5a6a0273d714',
  },
};