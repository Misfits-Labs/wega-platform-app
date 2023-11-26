// import { useLocalStorage } from 'react-use'
import { convertBytesToNumber } from '../../utils'
type DrandMeta = { chainHash: string; round: number; signature: string; randomness: bigint;}
interface IDrandClient {
 getRandomNumber(): Promise<DrandMeta>;
 getLastRequestedDrandMeta(): string | null;
 // eslint-disable-next-line no-unused-vars
 setDrandMeta(drandMeta: DrandMeta): void;
}

class DrandClient implements IDrandClient {
 private metaStorageKey = 'drand_meta'
 private baseUrl = 'https://api.drand.sh';
 private fetchSettings = {
  headers: {
   'Access-Control-Allow-Origin': '*'
  },
  credentials: 'same-origin' as RequestCredentials,
  cache: 'no-cache' as RequestCache
 }
 getLastRequestedDrandMeta() {
  return JSON.parse(localStorage.getItem(this.metaStorageKey) as string) || null;
 };
 setDrandMeta(drandMeta: DrandMeta){
  localStorage.setItem(this.metaStorageKey, JSON.stringify(drandMeta));
 }
 async getRandomNumber(): Promise<DrandMeta> {
  const meta = this.getLastRequestedDrandMeta();
  if(meta){
   const newRound = meta.round++;
   const data = await this.fetchDrand(meta.chainHash, newRound);
   this.setDrandMeta(data)
   return data;
  } else {
   const data = await this.fetchDrand(meta.chainHash);
   this.setDrandMeta(data);
   return data;
  }
 }

 async fetchDrand(lastChainHash: string, lastRound?: number){
  let fulfilled = false;
  let result: DrandMeta = {
   round: 0,
   randomness: 0n,
   signature: "",
   chainHash: lastChainHash
  }
  while (!fulfilled) {
   const res = await fetch(this.parseFetchUrl(lastChainHash, lastRound), this.fetchSettings);
   const resBody = await res.text();
   const { randomness, round, signature } = JSON.parse(resBody);
   // set fulfilled to false;
   if(randomness || round || signature) {
    result = Object.assign(result, { 
     round,
     randomness: convertBytesToNumber(randomness),
     signature: signature,
     chainHash: lastChainHash,
    })
    fulfilled = true;
   }
  }
  return result;
 }
 parseFetchUrl(chainHash: string, round?: number): string {
  return this.baseUrl.concat(`${chainHash}/public/${round ? round : 'latest'}`);
 }
} 
export const drandClient = new DrandClient();