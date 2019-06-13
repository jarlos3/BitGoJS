import { account, AccountCoin, erc20, terc20 } from './account';
import { CoinFeature, CoinKind, UnderlyingAsset } from './base';
import { CoinMap } from './map';
import { Networks } from './networks';
import { ofc, tofc } from './ofc';
import { utxo } from './utxo';

const ETH_FEATURES = [...AccountCoin.DEFAULT_FEATURES, CoinFeature.SUPPORTS_TOKENS];

export const coins = CoinMap.fromCoins([
  utxo('bch', 'Bitcoin Cash', Networks.main.bitcoinCash, UnderlyingAsset.BCH),
  utxo('tbch', 'Testnet Bitcoin Cash', Networks.test.bitcoinCash, UnderlyingAsset.BCH),
  utxo('bsv', 'Bitcoin SV', Networks.main.bitcoinSV, UnderlyingAsset.BSV),
  utxo('tbsv', 'Testnet Bitcoin SV', Networks.test.bitcoinSV, UnderlyingAsset.BSV),
  utxo('btc', 'Bitcoin', Networks.main.bitcoin, UnderlyingAsset.BTC),
  utxo('tbtc', 'Testnet Bitcoin', Networks.test.bitcoin, UnderlyingAsset.BTC),
  utxo('btg', 'Bitcoin Gold', Networks.main.bitcoinGold, UnderlyingAsset.BTG),
  utxo('ltc', 'Litecoin', Networks.main.litecoin, UnderlyingAsset.LTC),
  utxo('tltc', 'Testnet Litecoin', Networks.test.litecoin, UnderlyingAsset.LTC),
  utxo('dash', 'Dash', Networks.main.dash, UnderlyingAsset.DASH),
  utxo('tdash', 'Testnet Dash', Networks.test.dash, UnderlyingAsset.DASH),
  account('eth', 'Ethereum', Networks.main.ethereum, 18, UnderlyingAsset.ETH, ETH_FEATURES),
  account('teth', 'Testnet Ethereum', Networks.test.kovan, 18, UnderlyingAsset.ETH, ETH_FEATURES),
  account('xrp', 'Ripple', Networks.main.xrp, 6, UnderlyingAsset.XRP),
  account('txrp', 'Testnet Ripple', Networks.test.xrp, 6, UnderlyingAsset.XRP),
  account('xlm', 'Stellar', Networks.main.stellar, 7, UnderlyingAsset.XLM),
  account('txlm', 'Testnet Stellar', Networks.test.stellar, 7, UnderlyingAsset.XLM),
  account('susd', 'Silvergate USD', Networks.main.susd, 2, UnderlyingAsset.USD),
  account('tsusd', 'Testnet Silvergate USD', Networks.test.susd, 2, UnderlyingAsset.USD),
  utxo('zec', 'ZCash', Networks.main.zCash, UnderlyingAsset.ZEC),
  utxo('tzec', 'Testnet ZCash', Networks.test.zCash, UnderlyingAsset.ZEC),
  ofc('ofcusd', 'Offchain USD', 2, UnderlyingAsset.USD, CoinKind.FIAT),
  ofc('ofcbtc', 'Offchain Bitcoin', 8, UnderlyingAsset.BTC, CoinKind.CRYPTO),
  ofc('ofceth', 'Offchain Ether', 18, UnderlyingAsset.ETH, CoinKind.CRYPTO),
  ofc('ofcltc', 'Offchain Litecoin', 8, UnderlyingAsset.LTC, CoinKind.CRYPTO),
  tofc('ofctusd', 'Testnet Offchain USD', 2, UnderlyingAsset.USD, CoinKind.FIAT),
  tofc('ofctbtc', 'Testnet Offchain Bitcoin', 8, UnderlyingAsset.BTC, CoinKind.CRYPTO),
  tofc('ofcteth', 'Testnet Offchain Ether', 18, UnderlyingAsset.ETH, CoinKind.CRYPTO),
  tofc('ofctltc', 'Testnet Offchain Litecoin', 8, UnderlyingAsset.LTC, CoinKind.CRYPTO),
  erc20('abt', 'Arcblock', 18, '0xb98d4c97425d9908e66e53a6fdf673acca0be986', UnderlyingAsset.ABT),
  erc20('ae', 'Aeternity', 18, '0x5ca9a71b1d01849c0a95490cc00559717fcf0d1d', UnderlyingAsset.AE),
  erc20('aergo', 'Aergo', 18, '0xae31b85bfe62747d0836b82608b4830361a3d37a', UnderlyingAsset.AERGO),
  erc20('agi', 'SingularityNET', 8, '0x8eb24319393716668d768dcec29356ae9cffe285', UnderlyingAsset.AGI),
  erc20('aion', 'AION', 8, '0x4ceda7906a5ed2179785cd3a40a69ee8bc99c466', UnderlyingAsset.AION),
  erc20('amn', 'Amon', 18, '0x737f98ac8ca59f2c68ad658e3c3d8c8963e40a4c', UnderlyingAsset.AMN),
  erc20('amon', 'AmonD', 18, '0x00059ae69c1622a7542edc15e8d17b060fe307b6', UnderlyingAsset.AMON),
  erc20('ana', 'ANA', 18, '0xfafd51641ab09dff163cd04d2eb6b7865eb83f53', UnderlyingAsset.ANA),
  erc20('ant', 'Aragon', 18, '0x960b236a07cf122663c4303350609a66a7b288c0', UnderlyingAsset.ANT),
  erc20('aoa', 'Aurora', 18, '0x9ab165d795019b6d8b3e971dda91071421305e5a', UnderlyingAsset.AOA),
  erc20('appc', 'AppCoins', 18, '0x1a7a8bd9106f2b8d977e08582dc7d24c723ab0db', UnderlyingAsset.APPC),
  erc20('ast', 'AirSwap', 4, '0x27054b13b1b798b345b591a4d22e6562d47ea75a', UnderlyingAsset.AST),
  erc20('audx', 'eToro Australian Dollar', 18, '0xdf1e9e1a218cff9888faef311d6fbb472e4175ce', UnderlyingAsset.AUDX),
  erc20('auto', 'Cube', 18, '0x622dffcc4e83c64ba959530a5a5580687a57581b', UnderlyingAsset.AUTO),
  erc20('axpr', 'aXpire', 18, '0xc39e626a04c5971d770e319760d7926502975e47', UnderlyingAsset.AXPR),
  erc20('bat', 'Basic Attention Token', 18, '0x0d8775f648430679a709e98d2b0cb6250d2887ef', UnderlyingAsset.BAT),
  erc20('bax', 'BABB', 18, '0x9a0242b7a33dacbe40edb927834f96eb39f8fbcb', UnderlyingAsset.BAX),
  erc20('bbx', 'BBX', 18, '0x71529cea068e3785efd4f18aaf59a6cb82b7e5cb', UnderlyingAsset.BBX),
  erc20('bcap', 'BCAP', 0, '0x1f41e42d0a9e3c0dd3ba15b527342783b43200a9', UnderlyingAsset.BCAP),
  erc20('bcio', 'Blockchain.io', 18, '0xcdc412f306e0c51e3249b88c65423cd16b322673', UnderlyingAsset.BCIO),
  erc20('bid', 'Blockbid', 2, '0xdd5151da2ab25566e1d2a3c9a3e77396303f8a93', UnderlyingAsset.BID),
  erc20('bird', 'BirdCoin', 18, '0x026e62dded1a6ad07d93d39f96b9eabd59665e0d', UnderlyingAsset.BIRD),
  erc20('blz', 'Bluzelle', 18, '0x5732046a883704404f284ce41ffadd5b007fd668', UnderlyingAsset.BLZ),
  erc20('bnb', 'BNB', 18, '0xb8c77482e45f1f44de1745f52c74426c631bdd52', UnderlyingAsset.BNB),
  erc20('bnk', 'Bankera', 8, '0xc80c5e40220172b36adee2c951f26f2a577810c5', UnderlyingAsset.BNK),
  erc20('bnt', 'Bancor', 18, '0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c', UnderlyingAsset.BNT),
  erc20('bnty', 'Bounty0x', 18, '0xd2d6158683aee4cc838067727209a0aaf4359de3', UnderlyingAsset.BNTY),
  erc20('box', 'ContentBox', 18, '0x63f584fa56e60e4d0fe8802b27c7e6e3b33e007f', UnderlyingAsset.BOX),
  erc20('brd', 'Bread', 18, '0x558ec3152e2eb2174905cd19aea4e34a23de9ad6', UnderlyingAsset.BRD),
  erc20('bst', 'BitGo Shield Token', 0, '0x18ad17ff2dfcfd647db497b1e2cbd76de4da40fc', UnderlyingAsset.BST),
  erc20('btm', 'Bytom', 8, '0xcb97e65f07da24d46bcdd078ebebd7c6e6e3d750', UnderlyingAsset.BTM),
  erc20('btt', 'Blocktrade', 18, '0xfa456cf55250a839088b27ee32a424d7dacb54ff', UnderlyingAsset.BTT),
  erc20('btu', 'BTU Protocol', 18, '0xb683d83a532e2cb7dfa5275eed3698436371cc9f', UnderlyingAsset.BTU),
  erc20('buy', 'buying.com', 18, '0x0d7f0fa3a79bfedbab291da357958596c74e27d7', UnderlyingAsset.BUY),
  erc20('cadx', 'eToro Canadian Dollar', 18, '0x8ed876e408959643479534a21970ec023d0fb51e', UnderlyingAsset.CADX),
  erc20('cag', 'Change', 18, '0x7d4b8cce0591c9044a22ee543533b72e976e36c3', UnderlyingAsset.CAG),
  erc20('cbc', 'CashBet Coin', 8, '0x26db5439f651caf491a87d48799da81f191bdb6b', UnderlyingAsset.CBC),
  erc20('cdag', 'CannDollar', 18, '0xf43401ea8ac4b86155b929e1a5a5e46626c23842', UnderlyingAsset.CDAG),
  erc20('cdt', 'Blox', 18, '0x177d39ac676ed1c67a2b268ad7f1e58826e5b0af', UnderlyingAsset.CDT),
  erc20('cel', 'Celsius', 4, '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d', UnderlyingAsset.CEL),
  erc20('cennz', 'Centrality', 18, '0x1122b6a0e00dce0563082b6e2953f3a943855c1f', UnderlyingAsset.CENNZ),
  erc20('cgld', 'Coineru Gold', 8, '0x3f50e6cc943351f00971a9d01ac32739895df826', UnderlyingAsset.CGLD),
  erc20('chfx', 'eToro Swiss Frank', 18, '0xe435502c85a4e7e79cfab4167af566c27a7a0784', UnderlyingAsset.CHFX),
  erc20('chsb', 'SwissBorg', 8, '0xba9d4199fab4f26efe3551d490e3821486f135ba', UnderlyingAsset.CHSB),
  erc20('cln', 'Colu Local Network', 18, '0x4162178b78d6985480a308b2190ee5517460406d', UnderlyingAsset.CLN),
  erc20('cmt', 'CyberMiles', 18, '0xf85feea2fdd81d51177f6b8f35f0e6734ce45f5f', UnderlyingAsset.CMT),
  erc20('cnd', 'Cindicator', 18, '0xd4c435f5b09f855c3317c8524cb1f586e42795fa', UnderlyingAsset.CND),
  erc20('cnyx', 'eToro Chinese Yuan', 18, '0x319ad3ff82bedddb3bc85fd7943002d25cdb3cb9', UnderlyingAsset.CNYX),
  erc20('cpay', 'Cryptopay', 0, '0x0ebb614204e47c09b6c3feb9aaecad8ee060e23e', UnderlyingAsset.CPAY),
  erc20('cplt', 'Coineru Platinum', 8, '0xa3f7871a4b86bcc3b6e97c8fd0745e71c55e1f82', UnderlyingAsset.CPLT),
  erc20('cqx', 'Coinquista Coin', 18, '0x618c29dd2d16475b2ae6244f9e8aaead68f0ca44', UnderlyingAsset.CQX),
  erc20('crpt', 'Crypterium', 18, '0x80a7e048f37a50500351c204cb407766fa3bae7f', UnderlyingAsset.CRPT),
  erc20('cs', 'Credits', 6, '0x46b9ad944d1059450da1163511069c718f699d31', UnderlyingAsset.CS),
  erc20('cslv', 'Coineru Silver', 8, '0x6dc05497f0b087c7692816e6acaa8bdda73907fc', UnderlyingAsset.CSLV),
  erc20('cvc', 'Civic', 8, '0x41e5560054824ea6b0732e656e3ad64e20e94e45', UnderlyingAsset.CVC),
  erc20('dai', 'Dai', 18, '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359', UnderlyingAsset.DAI),
  erc20('data', 'Streamr DATAcoin', 18, '0x0cf0ee63788a0849fe5297f3407f701e122cc023', UnderlyingAsset.DATA),
  erc20('dcn', 'Dentacoin', 0, '0x08d32b0da63e2c3bcf8019c9c5d849d7a9d791e6', UnderlyingAsset.DCN),
  erc20('dent', 'Dent', 8, '0x3597bfd533a99c9aa083587b074434e61eb0a258', UnderlyingAsset.DENT),
  erc20('dew', 'Dew', 18, '0x20e94867794dba030ee287f1406e100d03c84cd3', UnderlyingAsset.DEW),
  erc20('dgd', 'Digix DAO', 9, '0xe0b7927c4af23765cb51314a0e0521a9645f0e2a', UnderlyingAsset.DGD),
  erc20('dgx', 'Digix', 9, '0x4f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf', UnderlyingAsset.DGX),
  erc20('drgn', 'Dragonchain', 18, '0x419c4db4b9e25d6db2ad9691ccb832c8d9fda05e', UnderlyingAsset.DRGN),
  erc20('drop', 'Dropil', 18, '0x4672bad527107471cb5067a887f4656d585a8a31', UnderlyingAsset.DROP),
  erc20('drv', 'Drive', 18, '0x0b9d89a71bdabd231d4d497b7b7b879740d739c4', UnderlyingAsset.DRV),
  erc20('dtr', 'Dynamic Trading Rights', 8, '0xd234bf2410a0009df9c3c63b610c09738f18ccd7', UnderlyingAsset.DTR),
  erc20('echt', 'eChat', 0, '0x1aadead0d2e0b6d888ae1d73b11db65a8447634a', UnderlyingAsset.ECHT),
  erc20('edr', 'Endor Protocol', 18, '0xc528c28fec0a90c083328bc45f587ee215760a0f', UnderlyingAsset.EDR),
  erc20('egl', 'eGold', 4, '0x8f00458479ea850f584ed82881421f9d9eac6cb1', UnderlyingAsset.EGL),
  erc20('elf', 'Aelf', 18, '0xbf2179859fc6d5bee9bf9158632dc51678a4100e', UnderlyingAsset.ELF),
  erc20('eng', 'Enigma', 8, '0xf0ee6b27b759c9893ce4f094b49ad28fd15a23e4', UnderlyingAsset.ENG),
  erc20('enj', 'Enjin Coin', 18, '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c', UnderlyingAsset.ENJ),
  erc20('erc', 'ERC Token', 0, '0x8e35d374594fa07d0de5c5e6563766cd24336251', UnderlyingAsset.ERC),
  erc20('ethos', 'Ethos', 8, '0x5af2be193a6abca9c8817001f45744777db30756', UnderlyingAsset.ETHOS),
  erc20('eto', 'Ethos Coin', 8, '0x5af2be193a6abca9c8817001f45744777db30756', UnderlyingAsset.ETO),
  erc20('eurs', 'Stasis EURS', 2, '0xdb25f211ab05b1c97d595516f45794528a807ad8', UnderlyingAsset.EURS),
  erc20('eurx', 'eToro Euro', 18, '0x05ac103f68e05da35e78f6165b9082432fe64b58', UnderlyingAsset.EURX),
  erc20('eux', 'EUR Stable Token', 18, '0x1b9064207e8046ec1d8e83de79380ed31283914f', UnderlyingAsset.EUX),
  erc20('fet', 'Fetch', 18, '0x1d287cc25dad7ccaf76a26bc660c5f7c8e2a05bd', UnderlyingAsset.FET),
  erc20('fmf', 'Formosa Financial', 18, '0xb4d0fdfc8497aef97d3c2892ae682ee06064a2bc', UnderlyingAsset.FMF),
  erc20('fsn', 'Fusion', 18, '0xd0352a019e9ab9d757776f532377aaebd36fd541', UnderlyingAsset.FSN),
  erc20('fun', 'FunFair', 8, '0x419d0d8bdd9af5e606ae2232ed285aff190e711b', UnderlyingAsset.FUN),
  erc20('fxrt', 'FXRT', 3, '0x506742a24c54b77c5af4065b2626ab96c641f90e', UnderlyingAsset.FXRT),
  erc20('gbpx', 'eToro Pound Sterling', 18, '0xf85ef57fcdb36d628d063fa663e61e44d35ae661', UnderlyingAsset.GBPX),
  erc20('gen', 'DAOstack', 18, '0x543ff227f64aa17ea132bf9886cab5db55dcaddf', UnderlyingAsset.GEN),
  erc20('gldx', 'eToro Gold', 18, '0x7d2bebd6e41b05384f0a8eb8ff228daac6f39c96', UnderlyingAsset.GLDX),
  erc20('gno', 'Gnosis', 18, '0x6810e776880c02933d47db1b9fc05908e5386b96', UnderlyingAsset.GNO),
  erc20('gnt', 'Golem', 18, '0xa74476443119a942de498590fe1f2454d7d4ac0d', UnderlyingAsset.GNT),
  erc20('gnx', 'Genaro Network', 9, '0x6ec8a24cabdc339a06a172f8223ea557055adaa5', UnderlyingAsset.GNX),
  erc20('got', 'GOExchange', 18, '0xf11f2550769dac4226731b7732dd4e17e72b1b01', UnderlyingAsset.GOT),
  erc20('gto', 'Gifto', 5, '0xc5bbae50781be1669306b9e001eff57a2957b09d', UnderlyingAsset.GTO),
  erc20('gusd', 'Gemini Dollar', 2, '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd', UnderlyingAsset.GUSD),
  erc20('gvt', 'Genesis Vision', 18, '0x103c3a209da59d3e7c4a89307e66521e081cfdf0', UnderlyingAsset.GVT),
  erc20('hedg', 'HedgeTrade', 18, '0xf1290473e210b2108a85237fbcd7b6eb42cc654f', UnderlyingAsset.HEDG),
  erc20('hlc', 'HalalChain', 9, '0x58c69ed6cd6887c0225d1fccecc055127843c69b', UnderlyingAsset.HLC),
  erc20('hold', 'Hold', 18, '0xd6e1401a079922469e9b965cb090ea6ff64c6839', UnderlyingAsset.HOLD),
  erc20('hot', 'Holo', 18, '0x6c6ee5e31d828de241282b9606c8e98ea48526e2', UnderlyingAsset.HOT),
  erc20('hpb', 'High Performance Blockchain', 18, '0x38c6a68304cdefb9bec48bbfaaba5c5b47818bb2', UnderlyingAsset.HPB),
  erc20('hqt', 'HyperQuant', 18, '0x3e1d5a855ad9d948373ae68e4fe1f094612b1322', UnderlyingAsset.HQT),
  erc20('hst', 'Decision Token', 18, '0x554c20b7c486beee439277b4540a434566dc4c02', UnderlyingAsset.HST),
  erc20('ht', 'Huobi Token', 18, '0x6f259637dcd74c767781e37bc6133cd6a68aa161', UnderlyingAsset.HT),
  erc20('hxro', 'Hxro', 18, '0x4bd70556ae3f8a6ec6c4080a0c327b24325438f3', UnderlyingAsset.HXRO),
  erc20('hyb', 'Hybrid Block', 18, '0x6059f55751603ead7dc6d280ad83a7b33d837c90', UnderlyingAsset.HYB),
  erc20('hydro', 'Hydro', 18, '0xebbdf302c940c6bfd49c6b165f457fdb324649bc', UnderlyingAsset.HYDRO),
  erc20('icn', 'Iconomi', 18, '0x888666ca69e0f178ded6d75b5726cee99a87d698', UnderlyingAsset.ICN),
  erc20('icx', 'Icon', 18, '0xb5a5f22694352c15b00323844ad545abb2b11028', UnderlyingAsset.ICX),
  erc20('incx', 'InternationalCryptoX', 18, '0xa984a92731c088f1ea4d53b71a2565a399f7d8d5', UnderlyingAsset.INCX),
  erc20('ind', 'Indorse', 18, '0xf8e386eda857484f5a12e4b5daa9984e06e73705', UnderlyingAsset.IND),
  erc20('iost', 'IOSToken', 18, '0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab', UnderlyingAsset.IOST),
  erc20('isr', 'Insureum', 18, '0xd4a293ae8bb9e0be12e99eb19d48239e8c83a136', UnderlyingAsset.ISR),
  erc20('jbc', 'Japan Brand Coin', 18, '0x3635e381c67252405c1c0e550973155832d5e490', UnderlyingAsset.JBC),
  erc20('jpyx', 'eToro Japanese Yen', 18, '0x743c79f88dcadc6e7cfd7fa2bd8e2bfc68dae053', UnderlyingAsset.JPYX),
  erc20('kcs', 'Kucoin Shares', 6, '0x039b5649a59967e3e936d7471f9c3700100ee1ab', UnderlyingAsset.KCS),
  erc20('key', 'SelfKey', 18, '0x4cc19356f2d37338b9802aa8e8fc58b0373296e7', UnderlyingAsset.KEY),
  erc20('kin', 'Kin', 18, '0x818fc6c2ec5986bc6e2cbf00939d90556ab12ce5', UnderlyingAsset.KIN),
  erc20('knc', 'Kyber Network', 18, '0xdd974d5c2e2928dea5f71b9825b8b646686bd200', UnderlyingAsset.KNC),
  erc20('kze', 'Almeela', 18, '0x8de67d55c58540807601dbf1259537bc2dffc84d', UnderlyingAsset.KZE),
  erc20('lba', 'Cred', 18, '0xfe5f141bf94fe84bc28ded0ab966c16b17490657', UnderlyingAsset.LBA),
  erc20('lgo', 'LGO Exchange', 8, '0x123ab195dd38b1b40510d467a6a359b201af056f', UnderlyingAsset.LGO),
  erc20('link', 'ChainLink', 18, '0x514910771af9ca656af840dff83e8264ecf986ca', UnderlyingAsset.LINK),
  erc20('lion', 'CoinLion', 18, '0x2167fb82309cf76513e83b25123f8b0559d6b48f', UnderlyingAsset.LION),
  erc20('lnc', 'Linker Coin', 18, '0x6beb418fc6e1958204ac8baddcf109b8e9694966', UnderlyingAsset.LNC),
  erc20('loom', 'Loom Network', 18, '0xa4e8c3ec456107ea67d3075bf9e3df3a75823db0', UnderlyingAsset.LOOM),
  erc20('lrc', 'loopring', 18, '0xef68e7c694f40c8202821edf525de3782458639f', UnderlyingAsset.LRC),
  erc20('man', 'Matrix AI Network', 18, '0xe25bcec5d3801ce3a794079bf94adf1b8ccd802d', UnderlyingAsset.MAN),
  erc20('mana', 'Decentraland', 18, '0x0f5d2fb29fb7d3cfee444a200298f468908cc942', UnderlyingAsset.MANA),
  erc20('mco', 'Monaco', 8, '0xb63b606ac810a52cca15e44bb630fd42d8d1d83d', UnderlyingAsset.MCO),
  erc20('mcx', 'MachiX Token', 18, '0xd15ecdcf5ea68e3995b2d0527a0ae0a3258302f8', UnderlyingAsset.MCX),
  erc20('mdx', 'Mandala', 18, '0x9d03393d297e42c135625d450c814892505f1a84', UnderlyingAsset.MDX),
  erc20('medx', 'Medibloc', 8, '0xfd1e80508f243e64ce234ea88a5fd2827c71d4b7', UnderlyingAsset.MEDX),
  erc20('met', 'Metronome', 18, '0xa3d58c4e56fedcae3a7c43a725aee9a71f0ece4e', UnderlyingAsset.MET),
  erc20('meta', 'Metadium', 18, '0xde2f7766c8bf14ca67193128535e5c7454f8387c', UnderlyingAsset.META),
  erc20('mfg', 'SyncFab', 18, '0x6710c63432a2de02954fc0f851db07146a6c0312', UnderlyingAsset.MFG),
  erc20('mft', 'Mainframe', 18, '0xdf2c7238198ad8b389666574f2d8bc411a4b7428', UnderlyingAsset.MFT),
  erc20('mith', 'Mithril', 18, '0x3893b9422cd5d70a81edeffe3d5a1c6a978310bb', UnderlyingAsset.MITH),
  erc20('mkr', 'Maker', 18, '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', UnderlyingAsset.MKR),
  erc20('mtcn', 'Multiven', 18, '0xf6117cc92d7247f605f11d4c942f0feda3399cb5', UnderlyingAsset.MTCN),
  erc20('mtl', 'Metal', 8, '0xf433089366899d83a9f26a773d59ec7ecf30355e', UnderlyingAsset.MTL),
  erc20('mvl', 'Mass Vehicle Ledger', 18, '0xa849eaae994fb86afa73382e9bd88c2b6b18dc71', UnderlyingAsset.MVL),
  erc20('nas', 'Nebulas', 18, '0x5d65d971895edc438f465c17db6992698a52318d', UnderlyingAsset.NAS),
  erc20('ncash', 'Nucleus Vision', 18, '0x809826cceab68c387726af962713b64cb5cb3cca', UnderlyingAsset.NCASH),
  erc20('neu', 'Neumark', 18, '0xa823e6722006afe99e91c30ff5295052fe6b8e32', UnderlyingAsset.NEU),
  erc20('nexo', 'Nexo', 18, '0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206', UnderlyingAsset.NEXO),
  erc20('nmr', 'Numeraire', 18, '0x1776e1f26f98b1a5df9cd347953a26dd3cb46671', UnderlyingAsset.NMR),
  erc20('npxs', 'Pundi X', 18, '0xa15c7ebe1f07caf6bff097d8a589fb8ac49ae5b3', UnderlyingAsset.NPXS),
  erc20('nuls', 'Nuls', 18, '0xb91318f35bdb262e9423bc7c7c2a3a93dd93c92c', UnderlyingAsset.NULS),
  erc20('nzdx', 'eToro New Zealand Dollar', 18, '0x6871799a4866bb9068b36b7a9bb93475ac77ac5d', UnderlyingAsset.NZDX),
  erc20('omg', 'OmiseGO Token', 18, '0xd26114cd6ee289accf82350c8d8487fedb8a0c07', UnderlyingAsset.OMG),
  erc20('onl', 'On.Live', 18, '0x6863be0e7cf7ce860a574760e9020d519a8bdc47', UnderlyingAsset.ONL),
  erc20('opt', 'OPTin Token', 18, '0xde8893346ce8052a02606b62d13b142648e062dd', UnderlyingAsset.OPT),
  erc20('ost', 'Ost', 18, '0x2c4e8f2d746113d0696ce89b35f0d8bf88e0aeca', UnderlyingAsset.OST),
  erc20('pax', 'Paxos', 18, '0x8e870d67f660d95d5be530380d0ec0bd388289e1', UnderlyingAsset.PAX),
  erc20('pay', 'TenX', 18, '0xb97048628db6b661d4c2aa833e95dbe1a905b280', UnderlyingAsset.PAY),
  erc20('payx', 'Paypex', 2, '0x62a56a4a2ef4d355d34d10fbf837e747504d38d4', UnderlyingAsset.PAYX),
  erc20('pdata', 'Opiria Token', 18, '0x0db03b6cde0b2d427c64a04feafd825938368f1f', UnderlyingAsset.PDATA),
  erc20('plc', 'PlusCoin', 18, '0xdf99c7f9e0eadd71057a801055da810985df38bd', UnderlyingAsset.PLC),
  erc20('plr', 'Pillar', 18, '0xe3818504c1b32bf1557b16c238b2e01fd3149c17', UnderlyingAsset.PLR),
  erc20('plx', 'PLN Stable Token', 18, '0x8d682bc7ad206e54055c609ea1d4717caab665d0', UnderlyingAsset.PLX),
  erc20('pma', 'PumaPay', 18, '0x846c66cf71c43f80403b51fe3906b3599d63336f', UnderlyingAsset.PMA),
  erc20('poe', 'Po.et', 8, '0x0e0989b1f9b8a38983c2ba8053269ca62ec9b195', UnderlyingAsset.POE),
  erc20('poly', 'Polymath', 18, '0x9992ec3cf6a55b00978cddf2b27bc6882d88d1ec', UnderlyingAsset.POLY),
  erc20('powr', 'Power Ledger', 6, '0x595832f8fc6bf59c85c527fec3740a1b7a361269', UnderlyingAsset.POWR),
  erc20('ppp', 'PayPie', 18, '0xc42209accc14029c1012fb5680d95fbd6036e2a0', UnderlyingAsset.PPP),
  erc20('ppt', 'Populous Platform', 8, '0xd4fa1460f537bb9085d22c7bccb5dd450ef28e3a', UnderlyingAsset.PPT),
  erc20('prl', 'Oyster', 18, '0x1844b21593262668b7248d0f57a220caaba46ab9', UnderlyingAsset.PRL),
  erc20('pro', 'Propy', 18, '0x9041fe5b3fdea0f5e4afdc17e75180738d877a01', UnderlyingAsset.PRO),
  erc20('qash', 'QASH', 6, '0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6', UnderlyingAsset.QASH),
  erc20('qrl', 'Qrl', 8, '0x697beac28b09e122c4332d163985e8a73121b97f', UnderlyingAsset.QRL),
  erc20('qsp', 'Quantstamp', 18, '0x99ea4db9ee77acd40b119bd1dc4e33e1c070b80d', UnderlyingAsset.QSP),
  erc20('quash', 'Qash', 6, '0x618e75ac90b12c6049ba3b27f5d5f8651b0037f6', UnderlyingAsset.QUASH),
  erc20('qvt', 'Qvolta', 18, '0x1183f92a5624d68e85ffb9170f16bf0443b4c242', UnderlyingAsset.QVT),
  erc20('r', 'Revain', 0, '0x48f775efbe4f5ece6e0df2f7b5932df56823b990', UnderlyingAsset.R),
  erc20('rby', 'Ruby X', 18, '0xf7705dee19a63e0bc1a240f723c5c0f570c78572', UnderlyingAsset.RBY),
  erc20('rdn', 'Raiden Network', 18, '0x255aa6df07540cb5d3d297f0d0d4d84cb52bc8e6', UnderlyingAsset.RDN),
  erc20('reb', 'Regblo', 18, '0x61383ac89988b498df5363050ff07fe5c52ecdda', UnderlyingAsset.REB),
  erc20('rebl', 'Rebellious', 18, '0x5f53f7a8075614b699baad0bc2c899f4bad8fbbf', UnderlyingAsset.REBL),
  erc20('rep', 'Augur', 18, '0x1985365e9f78359a9b6ad760e32412f4a445e862', UnderlyingAsset.REP),
  erc20('req', 'Request Network', 18, '0x8f8221afbb33998d8584a2b05749ba73c37a938a', UnderlyingAsset.REQ),
  erc20('rfr', 'Refereum', 4, '0xd0929d411954c47438dc1d871dd6081f5c5e149c', UnderlyingAsset.RFR),
  erc20('rhoc', 'RHOC', 8, '0x168296bb09e24a88805cb9c33356536b980d3fc5', UnderlyingAsset.RHOC),
  erc20('rlc', 'Iexec Rlc', 9, '0x607f4c5bb672230e8672085532f7e901544a7375', UnderlyingAsset.RLC),
  erc20('rubx', 'eToro Russian Ruble', 18, '0xd6d69a3d5e51dbc2636dc332338765fcca71d5d5', UnderlyingAsset.RUBX),
  erc20('ruff', 'Ruff', 18, '0xf278c1ca969095ffddded020290cf8b5c424ace2', UnderlyingAsset.RUFF),
  erc20('salt', 'Salt', 8, '0x4156d3342d5c385a87d264f90653733592000581', UnderlyingAsset.SALT),
  erc20('san', 'Santiment Network', 18, '0x7c5a0ce9267ed19b22f8cae653f198e3e8daf098', UnderlyingAsset.SAN),
  erc20('shk', 'iShook', 18, '0xebe4a49df7885d015329c919bf43e6460a858f1e', UnderlyingAsset.SHK),
  erc20('slot', 'AlphaSlot', 18, '0xaee7474c3713ece228aa5ec43c89c708f2ec7ed2', UnderlyingAsset.SLOT),
  erc20('slvx', 'eToro Silver', 18, '0x8e4d222dbd4f8f9e7c175e77d6e71715c3da78e0', UnderlyingAsset.SLVX),
  erc20('smt', 'SmartMesh', 18, '0x55f93985431fc9304077687a35a1ba103dc1e081', UnderlyingAsset.SMT),
  erc20('snov', 'Snovio', 18, '0xbdc5bac39dbe132b1e030e898ae3830017d7d969', UnderlyingAsset.SNOV),
  erc20('snt', 'Status Network Token', 18, '0x744d70fdbe2ba4cf95131626614a1763df805b9e', UnderlyingAsset.SNT),
  erc20('spo', 'Sparrow Options', 18, '0x89eafa06d99f0a4d816918245266800c9a0941e0', UnderlyingAsset.SPO),
  erc20('srn', 'Sirin Labs', 18, '0x68d57c9a1c35f63e2c83ee8e49a64e9d70528d25', UnderlyingAsset.SRN),
  erc20('srnt', 'Serenity', 18, '0xbc7942054f77b82e8a71ace170e4b00ebae67eb6', UnderlyingAsset.SRNT),
  erc20('storj', 'Storj', 8, '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac', UnderlyingAsset.STORJ),
  erc20('storm', 'Storm', 18, '0xd0a4b8946cb52f0661273bfbc6fd0e0c75fc6433', UnderlyingAsset.STORM),
  erc20('sub', 'Substratum', 2, '0x12480e24eb5bec1a9d4369cab6a80cad3c0a377a', UnderlyingAsset.SUB),
  erc20('taud', 'TrueAUD', 18, '0x00006100f7090010005f1bd7ae6122c3c2cf0090', UnderlyingAsset.TAUD),
  erc20('ten', 'Tokenomy', 18, '0xdd16ec0f66e54d453e6756713e533355989040e4', UnderlyingAsset.TEN),
  erc20('theta', 'Theta Token', 18, '0x3883f5e181fccaf8410fa61e12b59bad963fb645', UnderlyingAsset.THETA),
  erc20('tiox', 'Trade Token X', 18, '0xd947b0ceab2a8885866b9a04a06ae99de852a3d4', UnderlyingAsset.TIOX),
  erc20('tkx', 'Tokenize', 8, '0x667102bd3413bfeaa3dffb48fa8288819e480a88', UnderlyingAsset.TKX),
  erc20('tms', 'Time New Bank', 18, '0xf7920b0768ecb20a123fac32311d07d193381d6f', UnderlyingAsset.TMS),
  erc20('tnt', 'Tierion', 8, '0x08f5a9235b08173b7569f83645d2c7fb55e8ccd8', UnderlyingAsset.TNT),
  erc20('trst', 'WeTrust', 6, '0xcb94be6f13a1182e4a4b6140cb7bf2025d28e41b', UnderlyingAsset.TRST),
  erc20('trx', 'Tronix', 6, '0xf230b790e05390fc8295f4d3f60332c93bed42e2', UnderlyingAsset.TRX),
  erc20('tusd', 'TrueUSD', 18, '0x0000000000085d4780b73119b644ae5ecd22b376', UnderlyingAsset.TUSD),
  erc20('ukg', 'UnikoinGold', 18, '0x24692791bc444c5cd0b81e3cbcaba4b04acd1f3b', UnderlyingAsset.UKG),
  erc20('upbtc', 'Universal Bitcoin', 8, '0xc7461b398005e50bcc43c8e636378c6722e76c01', UnderlyingAsset.UPBTC),
  erc20('upp', 'Sentinel Protocol', 18, '0xc86d054809623432210c107af2e3f619dcfbf652', UnderlyingAsset.UPP),
  erc20('upt', 'Universal Protocol Token', 18, '0x6ca88cc8d9288f5cad825053b6a1b179b05c76fc', UnderlyingAsset.UPT),
  erc20('upusd', 'Universal US Dollar', 2, '0x86367c0e517622dacdab379f2de389c3c9524345', UnderlyingAsset.UPUSD),
  erc20('uqc', 'Uquid Coin', 18, '0xd01db73e047855efb414e6202098c4be4cd2423b', UnderlyingAsset.UQC),
  erc20('usdc', 'USD Coin', 6, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', UnderlyingAsset.USDC),
  erc20('usdt', 'Tether', 6, '0xdac17f958d2ee523a2206206994597c13d831ec7', UnderlyingAsset.USDT),
  erc20('usdx', 'eToro United States Dollar', 18, '0x4e3856c37b2fe7ff2fe34510cda82a1dffd63cd0', UnderlyingAsset.USDX),
  erc20('usx', 'USD Stable Token', 18, '0xe72f4c4ff9d294fc34829947e4371da306f90465', UnderlyingAsset.USX),
  erc20('vee', 'Blockv', 18, '0x340d2bde5eb28c1eed91b2f790723e3b160613b7', UnderlyingAsset.VEE),
  erc20('ven', 'VeChain Token', 18, '0xd850942ef8811f2a866692a623011bde52a462c1', UnderlyingAsset.VEN),
  erc20('veri', 'Veritaseum', 18, '0x8f3470a7388c05ee4e7af3d01d8c722b0ff52374', UnderlyingAsset.VERI),
  erc20('wax', 'Wax', 8, '0x39bb259f66e1c59d5abef88375979b4d20d98022', UnderlyingAsset.WAX),
  erc20('wbtc', 'Wrapped Bitcoin', 8, '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', UnderlyingAsset.WBTC),
  erc20('wht', 'Whatshalal', 18, '0xae8d4da01658dd0ac118dde60f5b78042d0da7f2', UnderlyingAsset.WHT),
  erc20('wpx', 'WalletPlusX', 18, '0x4bb0a085db8cedf43344bd2fbec83c2c79c4e76b', UnderlyingAsset.WPX),
  erc20('wtc', 'Walton Token', 18, '0xb7cb1c96db6b22b0d3d9536e0108d062bd488f74', UnderlyingAsset.WTC),
  erc20('xcd', 'CapdaxToken', 18, '0xca00bc15f67ebea4b20dfaaa847cace113cc5501', UnderlyingAsset.XCD),
  erc20('xin', 'Mixin', 18, '0xa974c709cfb4566686553a20790685a47aceaa33', UnderlyingAsset.XIN),
  erc20('xrl', 'Rialto', 9, '0xb24754be79281553dc1adc160ddf5cd9b74361a4', UnderlyingAsset.XRL),
  erc20('ysey', 'YSEY Utility Token', 3, '0x1358efe5d9bfc2005918c0b2f220a4345c9ee7a3', UnderlyingAsset.YSEY),
  erc20('zco', 'Zebi Coin', 8, '0x2008e3057bd734e10ad13c9eae45ff132abc1722', UnderlyingAsset.ZCO),
  erc20('zil', 'Zilliqa', 12, '0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27', UnderlyingAsset.ZIL),
  erc20('zix', 'Zeex Token', 18, '0xf3c092ca8cd6d3d4ca004dc1d0f1fe8ccab53599', UnderlyingAsset.ZIX),
  erc20('zoom', 'CoinZoom', 18, '0x69cf3091c91eb72db05e45c76e58225177dea742', UnderlyingAsset.ZOOM),
  erc20('zrx', '0x Token', 18, '0xe41d2489571d322189246dafa5ebde1f4699f498', UnderlyingAsset.ZRX),
  terc20('terc', 'ERC Test Token', 0, '0x945ac907cf021a6bcd07852bb3b8c087051706a9', UnderlyingAsset.ERC),
  terc20('test', 'Test Mintable ERC20 Token', 18, '0x1fb879581f31687b905653d4bbcbe3af507bed37', UnderlyingAsset.TEST),
  terc20('tbst', 'Test BitGo Shield Token', 0, '0xe5cdf77835ca2095881dd0803a77e844c87483cd', UnderlyingAsset.BST),
  terc20('schz', 'SchnauzerCoin', 18, '0x050e25a2630b2aee94546589fd39785254de112c', UnderlyingAsset.SCHZ),
  terc20('tcat', 'Test CAT-20 Token', 18, '0x63137319f3a14a985eb31547370e0e3bd39b03b8', UnderlyingAsset.TCAT),
  terc20('tfmf', 'Test Formosa Financial Token', 18, '0xd8463d2f8c5b3be9de95c63b73a0ae4c79423452', UnderlyingAsset.FMF),
]);
