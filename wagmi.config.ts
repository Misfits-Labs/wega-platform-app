import { defineConfig } from '@wagmi/cli';
import { hardhat } from '@wagmi/cli/plugins'
import { deployed } from './src/utils';


export default defineConfig({
  out: 'src/utils/abis.ts',
  contracts: [],
  plugins: [
    hardhat({
      project: '../wega-contracts',
      deployments: { ...deployed }
    }),
  ]
})
