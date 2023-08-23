import { HexIshString } from "./blockchain";
export interface Wallet {
 ensName: string;
 ensAvatar: string;
 balanceDecimals: number;
 balanceFormatted: string;
 balanceSymbol: string;
 displayBalance: string;
 displayName: string;
 isConnected: boolean;
 usdBalance: string;
 hasPendingTransactions: boolean;
 address: HexIshString;
}
