import {useEffect, useState} from 'react'
import { useGlobalModalContext, MODAL_TYPES } from '../common/modals'
export function useWarnAppInBeta() {
 // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
 // const [lastVisitedTimestamp, _] = useState<string>(window.localStorage.getItem('lastVisited') ?? '');
 // const timeBeforeShowModal = 24 * 60 * 60 * 1000;
 const [triggered, setTriggered] = useState<boolean>(false);
 const { showModal, hideModal } = useGlobalModalContext();
 useEffect(() => {
  // if(lastVisitedTimestamp.length === 0) {
  //  // show modal
  //  const newLastVisitedDateTime = String(new Date().getTime()); 
  //  window.localStorage.setItem('lastVisited', newLastVisitedDateTime);
  //  showModal(MODAL_TYPES.WARN_IN_BETA_MODAL, { persist: false })
  // } else if (new Date().getTime() - Number(lastVisitedTimestamp) >= timeBeforeShowModal) {
  //  // show modal 
  //  window.localStorage.setItem('lastVisited', String(new Date().getTime()));
  // } 
  // console.log('showingModal', new Date().getTime() - Number(lastVisitedTimestamp) >= timeBeforeShowModal)
  if(!triggered) {
   showModal(MODAL_TYPES.WARN_IN_BETA_MODAL, { hide: hideModal })
   setTriggered(true);
  }
 }, []);
}
