import Blockies from 'react-blockies';

export interface CustomAvatarProps {
 address: any;
 ensImage?: any;
 size: number;
}

const WalletAvatar = ({ address, ensImage, size }: CustomAvatarProps) => {
  
  return ensImage ? (
    <img src={ensImage} width={size} height={size} style={{ borderRadius: 100 }} alt="avatar" />
  ) : (
    <Blockies seed={String(address)} size={size} />
  );
};
export default WalletAvatar;
