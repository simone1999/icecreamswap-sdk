import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.ROPSTEN]: new Token(
    ChainId.ROPSTEN,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.RINKEBY]: new Token(
    ChainId.RINKEBY,
    '0xc778417E063141139Fce010982780140Aa0cD5Ab',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.GÖRLI]: new Token(
    ChainId.GÖRLI,
    '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.KOVAN]: new Token(
    ChainId.KOVAN,
    '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
    18,
    'WETH',
    'Wrapped Ether'
  ),
  [ChainId.BITGERT]: new Token(
    ChainId.BITGERT,
    '0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710',
    18,
    'WBRISE',
    'Wrapped Brise'
  ),
  [ChainId.DOGE]: new Token(
    ChainId.DOGE,
    '0xb7ddc6414bf4f5515b52d8bdd69973ae205ff101',
    18,
    'WDOGE',
    'Wrapped Doge'
  ),
  [ChainId.DOKEN]: new Token(
      ChainId.DOKEN,
      '0x27b45bCC26e01Ed50B4080A405D1c492FEe89d63',
      18,
      'WDKN',
      'Wrapped DoKEN'
  ),
  [ChainId.FUSE]: new Token(
      ChainId.FUSE,
      '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
      18,
      'WFUSE',
      'Wrapped Fuse'
  )
}
