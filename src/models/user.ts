import { Wallet } from './wallet'

export interface User {
 uuid?: string;
 loading: boolean;
 wallet: Wallet | undefined;
 // created games 
} 
