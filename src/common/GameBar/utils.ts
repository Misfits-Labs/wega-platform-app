import { SupportedBlockExplorers } from '../../models/constants';
import { HexishString } from '../../models'

// TODO improve type cast
export function constructBlockExplorerHash(networkId: any, hash: HexishString) {
 return SupportedBlockExplorers.get(networkId)?.concat(hash) as string;
}