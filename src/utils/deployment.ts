import deployedAddresses from '../../deployed-addresses.json';
import _ from 'lodash';


type Deployed = {
 [x: string]: `0x${string}` | Record<number, `0x${string}`> | undefined  
}
type Networks = (keyof typeof deployedAddresses.networks)[]; 
function parseAddresses(): Deployed { 
  const deployments = {
  }
  const networks: Networks = Object.keys(JSON.parse(JSON.stringify(deployedAddresses.networks))) as any;  
  
  networks.forEach((network) => {
    const contracts = deployedAddresses.networks[network].contracts;
    type SupportedContracts = (keyof typeof contracts)[];
    const contractNames: SupportedContracts = Object.keys(deployedAddresses.networks[network].contracts) as any; 
    contractNames.forEach((name) => {
      const obj = {
        [name]: { 
          [network]: deployedAddresses.networks[network].contracts[name].address
        }
      }
      _.merge(deployments, obj);
    }) 
  })
  return deployments;
}

const deployed = parseAddresses();
export {
  deployed,
}