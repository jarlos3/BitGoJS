/**
 * @prettier
 * @hidden
 */

/**
 */
import * as Bluebird from 'bluebird';
import { BitGo } from '../../bitgo';

import { NodeCallback } from '../types';
import { TradingAccount } from './tradingAccount';
import { TradingPartner, TradingPartnerType } from './tradingPartner';

const co = Bluebird.coroutine;

// Side of the requester (if they should be considered the primary or the secondary)
// Only important for agency partnerships
// the primaryAccount is the agent, settling trades for the secondary account id
export enum TradingReferralRequesterSide {
  PRIMARY = 'primary', // if partnership is of type agency, primary is the agent
  SECONDARY = 'secondary',
}

export interface TradingPartnerAddByCodeParameters {
  referralCode: string;
  type: TradingPartnerType;
  requesterSide: TradingReferralRequesterSide;
}

export interface TradingPartnerReferralParameters {
  institutionName: string;
  contactName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  type: TradingPartnerType;
  requesterSide: TradingReferralRequesterSide;
  memo: string;
}

export class TradingPartners {
  private bitgo: BitGo;

  private enterpriseId: string;
  private account: TradingAccount;

  constructor(bitgo: BitGo, enterpriseId: string, account: TradingAccount) {
    this.bitgo = bitgo;
    this.enterpriseId = enterpriseId;
    this.account = account;
  }

  /**
   * List all trading partners of your trading account. Your trading partners are the accounts you are allowed to settle with.
   * @param callback
   */
  list(callback?: NodeCallback<TradingPartner[]>): Bluebird<TradingPartner[]> {
    const self = this;
    return co<TradingPartner[]>(function* list() {
      const url = self.bitgo.microservicesUrl(
        `/api/trade/v1/enterprise/${self.enterpriseId}/account/${self.account.id}/tradingpartners`
      );
      const response = yield self.bitgo.get(url).result();

      return response.tradingPartners.map(
        partner => new TradingPartner(partner, self.bitgo, self.enterpriseId, self.account)
      );
    })
      .call(this)
      .asCallback(callback);
  }

  /**
   * Refer a new trading partner to join the BitGo network and become your partner.
   * @param params
   * @param params.institutionName name of the institution to invite
   * @param params.contactName full name of a member of the institution to contact
   * @param params.contactEmail email address of the contact
   * @param params.contactPhoneNumber phone number of the contact
   * @param params.memo memo to send to the trading partner when sending the invite
   * @param callback
   */
  refer(params: TradingPartnerReferralParameters, callback?: NodeCallback<{}>): Bluebird<{}> {
    const self = this;
    return co<{}>(function* refer() {
      const url = self.bitgo.microservicesUrl(
        `/api/trade/v1/enterprise/${self.enterpriseId}/account/${self.account.id}/tradingpartners/referrals`
      );
      yield self.bitgo
        .post(url)
        .send(params)
        .result();

      return {}; // TODO: return result of referral
    })
      .call(this)
      .asCallback(callback);
  }

  /**
   * Add trading partner given the unique referralCode provided by trading partner.
   * @param params
   * @param params.referralCode unique referral code provided by counterparty
   * @param params.type type of trading partnership
   * @param params.requesterSide side of the requester (primary or secondary) important for agency relationships
   * @param callback
   */
  addByCode(params: TradingPartnerAddByCodeParameters, callback?: NodeCallback<{}>): Bluebird<TradingPartner> {
    const self = this;
    return co<TradingPartner>(function* refer() {
      const url = self.bitgo.microservicesUrl(
        `/api/trade/v1/enterprise/${self.enterpriseId}/account/${self.account.id}/tradingpartners`
      );
      const response = yield self.bitgo
        .post(url)
        .send(params)
        .result();

      return response;
    })
      .call(this)
      .asCallback(callback);
  }
}
