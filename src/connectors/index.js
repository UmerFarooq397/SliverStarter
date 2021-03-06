import React, { useContext, useCallback, useEffect } from 'react'
import {InjectedConnector, NoEthereumProviderError, UserRejectedRequestError} from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import {ChainId, SCAN_ADDRESS} from '../web3/address'
import { message } from 'antd'
import { mainContext } from '../reducer'
import {UnsupportedChainIdError, useWeb3React} from "@web3-react/core";

export const POLLING_INTERVAL = 12000

export const injected = new InjectedConnector({
  supportedChainIds: [ChainId.HECO, ChainId.BSC, ChainId.MATIC, ChainId.LOCALHOST],
})


const bscWalletConnector = new WalletConnectConnector({
  rpc: { 56: 'https://bsc-dataseed.binance.org/' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const hecoWalletConnector = new WalletConnectConnector({
  rpc: { 128: 'https://http-mainnet-node.huobichain.com\n' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

const maticWalletConnector = new WalletConnectConnector({
  rpc: { 21: 'https://api-testnet.elastos.io/eth\n' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletConnector = {
  [ChainId.HECO]: hecoWalletConnector,
  [ChainId.BSC]: bscWalletConnector,
  [ChainId.MATIC]: maticWalletConnector,
}

const bscNetwork =  {
  chainId: '0x38',
  chainName: 'BSC',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
}

const hecoNetwork = {
  chainId: '0x80',
  chainName: 'HECO',
  nativeCurrency: {
    name: 'HT',
    symbol: 'HT',
    decimals: 18,
  },
  rpcUrls: [
    'https://http-mainnet-node.huobichain.com',
  ],
  blockExplorerUrls: [SCAN_ADDRESS[ChainId.HECO]],
}

const maticNetwork = {
  chainId: '0x89',
  chainName: 'Elastos',
  nativeCurrency: {
    name: 'Elastos',
    symbol: 'ELA',
    decimals: 18,
  },
  rpcUrls: ['https://api-testnet.elastos.io/eth'],
  blockExplorerUrls: [SCAN_ADDRESS[ChainId.MATIC]],
}

const networkConf = {
  [ChainId.HECO]: hecoNetwork,
  [ChainId.BSC]: bscNetwork,
  [ChainId.MATIC]: maticNetwork
}

export const changeNetwork = (chainId) => {
  return new Promise(reslove => {
    const { ethereum } = window
    if (ethereum && (ethereum.isMetaMask || ethereum.isCoin98) && networkConf[chainId]) {
      ethereum
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              ...networkConf[chainId],
            },
          ],
        })
        .then(() => {
          setTimeout(reslove, 500)
        })
    } else {
      reslove()
    }
  })
}

export function getScanLink(chainId, data, type) {
  const prefix = SCAN_ADDRESS[chainId]
  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}

export const useConnectWallet = () => {
  const {activate, deactivate, active} = useWeb3React()
  const { dispatch, state } = useContext(mainContext)
  const connectWallet = useCallback((connector, chainId, walletFlag = '') => {
    return changeNetwork(chainId).then(() => {
      return new Promise((reslove, reject) => {
        activate(connector, undefined, true)
          .then((e) => {
            if (
              walletFlag &&
              walletFlag === 'coin98' &&
              !(window.ethereum.isCoin98 || window.coin98)
            ) {
              message.error(
                state.locale === 'zh'
                  ? '?????????Coin98??????'
                  : 'Please Install Coin98 Wallet From Chrome WebStore'
              )
            }
            if (window.ethereum && window.ethereum.on) {
              // ??????????????????
              // const { ethereum } = window
              window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                  //??????????????????????????????,????????????
                  deactivate()
                }
                // ???????????????????????????
                // window.location.reload()
              })

              window.ethereum.on('disconnect', () => {
                // ????????????
                deactivate()
              })

              window.ethereum.on('close', () => {
                // ????????????
                deactivate()
              })

              window.ethereum.on('message', (e) => {
                console.log('message', e)
              })
            }
            reslove(e)
          })
          .catch((error) => {
            console.log(error)
            switch (true) {
              case error instanceof UnsupportedChainIdError:
                console.log('?????????')
                break
              case error instanceof NoEthereumProviderError:
                console.log('??????????????????')
                break
              case error instanceof UserRejectedRequestError:
                console.log('????????????????????????')
                break
              default:
                console.log(error)
            }
            reslove(error)
          })
      })
    })
  }, [])

  useEffect(() => {
    !active && connectWallet(injected)
    window.ethereum && window.ethereum.on('networkChanged', () => {
      // ??????????????????????????????
      !active && connectWallet(injected)
    })
    if (window.onto){
      window.onto.on('accountsChanged', () => {
        !active && connectWallet(injected)
      })
    }
  }, [])
  return connectWallet
}
