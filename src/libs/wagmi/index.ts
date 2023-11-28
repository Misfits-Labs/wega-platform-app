import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { getNetwork, Chain, waitForTransaction, writeContract, readContract, prepareWriteContract } from '@wagmi/core';
import { localhost, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { HexishString } from '../../models';
import { tokenConfig, escrowConfig, gameControllerConfig, wegaRandomizerControllerConfig } from "../../utils";



const { chains, publicClient } = configureChains(
  [polygonMumbai, localhost],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_RPC_PROVIDER_ALCHEMY as string }), 
    publicProvider()
  ]
);
const projectId = import.meta.env.VITE_WALLET_CONNECT_ID as string;
const { wallets } = getDefaultWallets({
  appName: 'Wega - Play Together Own Together',
  projectId,
  chains
});

const connectors = connectorsForWallets([
  ...wallets,
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

export default wagmiConfig;
export { chains }

// rtk apis
export type ABIConfig = {
  readonly address: Record<number, string>,
  readonly abi: any[];
} 

export interface IBlockchainAPIBase {
  baseUrl: string;
  chain: (Chain & { unsupported?: boolean | undefined; }) | undefined;
}

export const ContractTypes = {
  'TOKEN': 'wegaErc20Dummy', 
  'ERC20ESCROW': 'wegaErc20Escrow',
  'GAMECONTROLLER': 'wegaGameController',
  'RADNOMIZER_CONTROLLER': 'wegaRandomizerController'
} as const;

export const ContractConfig = {
  [ContractTypes.ERC20ESCROW]: escrowConfig,
  [ContractTypes.TOKEN]: { 
    address: tokenConfig.address as typeof tokenConfig.address,
    abi: tokenConfig.abi as typeof tokenConfig.abi
  },
  [ContractTypes.GAMECONTROLLER]: gameControllerConfig,
  [ContractTypes.RADNOMIZER_CONTROLLER]: wegaRandomizerControllerConfig,
} as const; 

export type AllContractTypes = typeof ContractTypes[keyof typeof ContractTypes];

export class BlockchainAPIBase implements IBlockchainAPIBase {
  public baseUrl: string;
  public chain = (getNetwork()).chain;
  private config = ContractConfig;
  constructor(baseUrl: string | undefined = undefined) { this.baseUrl = baseUrl ?? 'blockchainApi/' }
  public functions = {};
  handleError(error: any, customMessage: string){
    if (error.message){
      if(error.message.split("\n\n") && error.message.split("\n\n").length > 0) {
        return error.message.split("\n\n")[0];
      }
      return error.message
    } else {
      return customMessage;
    }
  }
  async handleWriteRequest(config: any) {
    const { hash } = await writeContract(config);
    return hash as HexishString;
  }
  async read({ 
    contract, 
    functionName,
    args,
    contractAddress
  }: { contract: string, functionName: any, args: any, contractAddress?: HexishString  }) {
    const addressConfig = this.config[contract as AllContractTypes].address;
    return await this.handleRequest(async () => await readContract({
        address: !contractAddress ? this.config[contract as AllContractTypes].address[this.chain?.id as keyof typeof addressConfig] as HexishString : contractAddress,
        // @ts-ignore
        abi: this.config[contract].abi,
        functionName,
        args
      })
    );
  }

  async write({ 
    contract, 
    functionName,
    args,  
    contractAddress
  }: { 
    contract: string, functionName: any, args: any, contractAddress?: HexishString }) {
    const addressConfig = this.config[contract as AllContractTypes].address;
    const config = await prepareWriteContract({
      address: !contractAddress ? this.config[contract as AllContractTypes].address[this.chain?.id as keyof typeof addressConfig] as HexishString : contractAddress,
      // @ts-ignore
      abi: this.config[contract].abi,
      functionName,
      args
    })
    return await this.handleWriteRequest(config);
  }

  async waitForMined(hash: HexishString) {
    return await this.handleRequest(async () => await waitForTransaction({ hash }));
  } 

  async handleRequest(func: any) {
    try {
      return { data: await func() , error: undefined, meta: undefined }
    } catch (error) {
      return { data: undefined, error, meta: undefined }
    }
  } 
}