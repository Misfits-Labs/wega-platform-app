import React, { useState, createContext, useContext } from 'react'
import { ModalContainer  } from './types';
import CoinflipWinnerModal  from './CoinflipWinnerModal';
import CoinflipLoserModal  from './CoinflipLoserModal';
import DiceLoserModal  from './DiceLoserModal';
import DiceWinnerModal  from './DiceWinnerModal';
import WebAppInBetaModal  from './WebAppInBetaModal';
import { ClaimModal } from './ClaimModal';
import BounceFromTop from './BounceFromTop';

export const MODAL_TYPES = {
  COINFLIP_WINNER_MODAL: 'COINFLIP_WINNER_MODAL',
  COINFLIP_LOSER_MODAL: 'COINFLIP_LOSER_MODAL',
  DICE_WINNER_MODAL: 'DICE_WINNER_MODAL',
  DICE_LOSER_MODAL: 'DICE_LOSER_MODAL',
  CLAIM_MODAL: 'CLAIM_MODAL',
  WARN_IN_BETA_MODAL: 'WARN_IN_BETA_MODAL',
 }
 
const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.COINFLIP_WINNER_MODAL]: CoinflipWinnerModal,
  [MODAL_TYPES.COINFLIP_LOSER_MODAL]: CoinflipLoserModal,
  [MODAL_TYPES.DICE_WINNER_MODAL]: DiceWinnerModal,  
  [MODAL_TYPES.DICE_LOSER_MODAL]: DiceLoserModal,
  [MODAL_TYPES.CLAIM_MODAL]: ClaimModal,
  [MODAL_TYPES.WARN_IN_BETA_MODAL]: WebAppInBetaModal,
}
 
type ContextType = {
 // eslint-disable-next-line no-unused-vars
 showModal: (modalType: string, modalProps?: any, persist?: boolean) => void;
 hideModal: () => void;
 // eslint-disable-next-line no-unused-vars
 showResponseModal: (responseType: any, modalProps?: any, persist?: boolean) => void;
 hideResponseModal: () => void;
 store: { modalType: string | undefined; modalProps: any, persist?: boolean | undefined };
 responseModalStore: { responseType: any | undefined; modalProps: any, persist?: boolean | undefined };
}

const initalState: ContextType = {
  showModal: () => {},
  hideModal: () => {},
  store: { modalType: undefined, modalProps: undefined, persist: false },
  responseModalStore: { responseType: undefined, modalProps: undefined, persist: false },
  showResponseModal: () => {},
  hideResponseModal: () => {}
}

const GlobalModalContext = createContext(initalState)
export const useGlobalModalContext = () => useContext(GlobalModalContext)

type GlobalModalProps = {
 children?: React.ReactNode | React.ReactNode[]
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const GlobalModal: React.FC<GlobalModalProps> = ({ children }) => {
  const [store, setStore] = useState<ContextType['store']>({
    modalType: undefined,
    modalProps: undefined,
    persist: false,
  })

  const [responseModalStore, setResponseModalStore] = useState<ContextType['responseModalStore']>({
    responseType: undefined,
    modalProps: undefined,
    persist: false,
  })
 
  const { modalType, modalProps } = store!
  // const { modalProps: rModalProps, responseType: rType} = responseModalStore!

  const showModal = (
    modalType: string, 
    modalProps: any,
    persist?: boolean,
    ) => {
    setStore({
      ...store,
      modalType,
      modalProps,
      persist,
    })
  }

  const showResponseModal = (
    responseType: any,
    modalProps: any,
    persist?: boolean,
  ) => {
    setResponseModalStore((s) => ({
      ...s,
      responseType,
      modalProps,
      persist,
    }))
  }

  const hideModal = () => {
    setStore({
      ...store,
      modalType: undefined,
      modalProps: undefined,
      persist: undefined,
    })
  }

  const hideResponseModal = () => {
    setResponseModalStore({
      ...responseModalStore,
      responseType: undefined,
      modalProps: undefined,
      persist: undefined,
    })
  }

  // const renderResponseModalComponent = () => {
  //   return <></> 
  // }
  
  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType!]
    if (!modalType || !ModalComponent) {
      return null
    }
    return <BounceFromTop><ModalComponent {...modalProps} /></BounceFromTop>
  }
  return (
    <GlobalModalContext.Provider value={{ 
        store, 
        responseModalStore,
        showModal, 
        hideModal,
        showResponseModal,
        hideResponseModal, 
      }}>
      {
        store.modalType && 
        <ModalContainer 
          onClick={ 
            store.persist ? 
            () => null : 
            hideModal  
          }
        >
          {
            renderComponent()
          }
        </ModalContainer>
      }
      {children}
    </GlobalModalContext.Provider>
    )
}
export default GlobalModal
