import MDexFactory from './abi/MDexFactory.json'
import MDexRouter from '../web3/abi/MDexRouter.json'
import Web3, {utils} from "web3";

export const ChainId = {
  ELA: 21
}

export const SCAN_ADDRESS = {
  [ChainId.ELA]: 'https://esc-testnet.elastos.io/',
}

export const ADDRESS_0 = '0x0000000000000000000000000000000000000000'

export const MDEX_POOL_ADDRESS = '0xFB03e11D93632D97a8981158A632Dd5986F5E909'
export const MDEX_ADDRESS = '0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c'

// 计算apr的合约
export function CALC_ADDRESS(chainId){
  switch (chainId) {
    case ChainId.ELA:
      return '0x2e482c5beaeD5aE5C30AeD9eF0ffc8541E82f322'
    default:
      return '0x2e482c5beaeD5aE5C30AeD9eF0ffc8541E82f322'
  }
}

export function WETH_ADDRESS(chainId) {
  switch (chainId) {
      case ChainId.ELA:
        return '0x517E9e5d46C1EA8aB6f78677d6114Ef47F71f6c4'
    default:
      return '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f'
  }
}



export function WAR_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.ELA:
      return '0xBe35266aA49cec3EC1Baa33123a1860bdE954c4b'
    default:
      return '0xBe35266aA49cec3EC1Baa33123a1860bdE954c4b'
  }
}

export function MDEX_FACTORY_ADDRESS(chainId) {
  switch (chainId) {
      case ChainId.ELA:
      return {
        address: '0x99bfd07851A5C11206E33348Bf48686529f3e363',
        abi: MDexFactory
      }
    default:
      return {
        address: '0x99bfd07851A5C11206E33348Bf48686529f3e363',
        abi: MDexFactory
      }
  }
}
export function MDEX_ROUTER_ADDRESS(chainId) {
  switch (chainId) {
      case ChainId.ELA:
      return {
        address: '0xe9e6fb390DbfAf9C559c9034F895F1610EEF5Bb2',
        abi: MDexRouter
      }
    default:
      return {
        address: '0xe9e6fb390DbfAf9C559c9034F895F1610EEF5Bb2',
        abi: MDexRouter
      }
  }
}




export function MINE_MOUNTAIN_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.ELA:
    return '0x48e848d1197Ed52203b094ebC02c280BEF8621B1'
    default:
      return '0xEEC6169616d6E50560E52460A2C74f74Cdf57b6F'
  }
}

export function USDT_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.MATIC:
    return '0x79a86E77E7827b0ce56cE880E64B420ebAc1419D'
    default:
      return '0x79a86E77E7827b0ce56cE880E64B420ebAc1419D'
  }
}

export function WHT_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.ELA:
    return '0x517E9e5d46C1EA8aB6f78677d6114Ef47F71f6c4'
    default:
      return '0x517E9e5d46C1EA8aB6f78677d6114Ef47F71f6c4'
  }
}

export function WMDEX_ADDRESS(chainId) {
  switch (chainId) {
    case ChainId.ELA:
    return '0x295A021f1885ecf3c46f8022844927E79f94de0B'
    default:
      return '0x295A021f1885ecf3c46f8022844927E79f94de0B'
  }
}

export function BUSD_ADDRESS(chainId) {
  switch (chainId) {
    default:
      return '0xe9e7cea3dedca5984780bafc599bd69add087d56'
  }
}

export function CHAIN_SWAP_ADDRESS (chainId) {
  return {
    
  }[chainId]
}
export const BURN_SWAP_ADDRESS = '0x6Bab2711Ca22fE7395811022F92bB037cd4af7bc'
export const BURN_SWAP_S_ADDRESS = '0x81d82a35253B982E755c4D7d6AADB6463305B188'

export function RPC_URLS (chainId) {
    return {
      [ChainId.ELA]: 'https://api-testnet.elastos.io/eth'
    }[chainId]
}

export const CHAIN_SWAP_NODE_REQ_URL = [
  'https://node1.chainswap.exchange/web/getSignDataSyn',
  'https://node2.chainswap.exchange/web/getSignDataSyn',
  'https://node3.chainswap.exchange/web/getSignDataSyn',
  'https://node4.chainswap.exchange/web/getSignDataSyn',
  'https://node5.chainswap.exchange/web/getSignDataSyn',
]

export function GAS_FEE(chainId) {
  if(window.onto) {
    return  {
      gas: utils.numberToHex(2000000)
    }
  }

  return {
    [ChainId.ELA]: {
      // maxFeePerGas:  Web3.utils.toWei('8', 'gwei'),
      // gasPrice: Web3.utils.toWei('5', 'gwei'),
      // maxPriorityFeePerGas: Web3.utils.toWei('5', 'gwei'),
      // type: '0x2',
    }
  }[chainId]
}
