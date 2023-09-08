import React, { useState, createContext, useContext } from 'react'
import { ModalContainer  } from './types';
import { GameWinnerDeclarationModal  } from './GameWinnerDeclarationModal';
import { GameLoserDeclarationModal  } from './GameLoserDeclarationModal';

export const MODAL_TYPES = {
  WINNER_DECLARATION_WINNER_MODAL: 'WINNER_DECLARATION_WINNER_MODAL',
  WINNER_DECLARATION_LOSER_MODAL: 'WINNER_DECLARATION_LOSER_MODAL',
 }
 
const MODAL_COMPONENTS: any = {
  [MODAL_TYPES.WINNER_DECLARATION_WINNER_MODAL]: GameWinnerDeclarationModal,
  [MODAL_TYPES.WINNER_DECLARATION_LOSER_MODAL]: GameLoserDeclarationModal,
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
 children: React.ReactNode | React.ReactNode[]
}

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
    return <ModalComponent {...modalProps} />
  }
  console.log(store.modalType)
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
      {/* {
        typeof (responseModalStore.responseType) === 'number' && // FOUND THE GODDAMN BUG
        <ResponseModalContainer onClick={
          responseModalStore.persist ? 
          () => null : 
          hideResponseModal 
        }
        >
          {
            renderResponseModalComponent(rType as ResponseTypes)
          }
        </ResponseModalContainer>
      } */}
      {children}
    </GlobalModalContext.Provider>
    )
}




export default GlobalModal
