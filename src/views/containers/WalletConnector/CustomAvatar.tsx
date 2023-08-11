import Blockies from 'react-blockies';

export interface CustomAvatarProps {
 address: any;
 ensImage: any;
 size: number;
}

const CustomAvatar = ({ address, ensImage, size }: CustomAvatarProps) => {
  return ensImage ? (
    <img src={ensImage} width={size} height={size} style={{ borderRadius: 55 }} alt="blockies" />
  ) : (
    <Blockies seed={String(address)} size={size} />
  );
};
export default CustomAvatar;
//@TODO MOVE OUT