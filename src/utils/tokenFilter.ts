import { isSpamToken } from './format';
import type { BalanceResponse } from '../types/passport';

/**
 * Filtra tokens spam de uma resposta de balance
 */
export function filterSpamTokens(balance: BalanceResponse, showSpam: boolean = false): BalanceResponse {
  if (showSpam || !balance.tokens) {
    return balance;
  }

  return {
    ...balance,
    tokens: balance.tokens.filter(token => !isSpamToken({
      balance: token.balance,
      formatted: token.formatted,
      transfers: token.spam ? 0 : undefined,
    })),
  };
}

/**
 * Conta quantos tokens spam foram filtrados
 */
export function countSpamTokens(balance: BalanceResponse): number {
  if (!balance.tokens) return 0;
  
  return balance.tokens.filter(token => isSpamToken({
    balance: token.balance,
    formatted: token.formatted,
    transfers: token.spam ? 0 : undefined,
  })).length;
}

