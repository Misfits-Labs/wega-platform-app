import deployedAddresses from '../../deployed-addresses.json';
import pkg from 'lodash';
const { merge } = pkg;

type Deployed = {
 [x: string]: `0x${string}` | Record<number, `0x${string}`> | undefined  
}

type SupportedContracts = ("WegaERC20Escrow" | "WegaERC20Dummy")[] 

type Networks = (keyof typeof deployedAddresses.networks)[]; 


function parseAddresses(): Deployed { 
  const deployments = {
  }
  const networks: Networks = Object.keys(JSON.parse(JSON.stringify(deployedAddresses.networks))) as any;  
  
  networks.forEach((network) => {
    const contractNames: SupportedContracts = Object.keys(deployedAddresses.networks[network].contracts) as any; 
    
    contractNames.forEach((name) => {
      const obj = {
        [name]: { 
          [network]: deployedAddresses.networks[network].contracts[name].address
        }
      }
      merge(deployments, obj);
    }) 
  })
  return deployments;
}

const deployed = parseAddresses();
export {
  deployed,
}