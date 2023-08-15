import { 
 PrimaryButton, 
 SecondaryButton, 
 TertairyButton
} from "./types";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 buttonType: 'primary' | 'secondary' | 'tertairy', 
 content: string,
 disabled?: boolean; 
}

const Button = ({ 
 disabled, 
 buttonType, 
 content,
 ...rest
}: ButtonProps) => {
  switch(buttonType){
   case 'secondary':
    return <SecondaryButton disabled={disabled ?? false} {...rest}>{content}</SecondaryButton>
   case 'tertairy':
    return <TertairyButton disabled={disabled ?? false} {...rest}>{content}</TertairyButton>  
   default:
    return <PrimaryButton disabled={disabled ?? false} {...rest}>{content}</PrimaryButton> 
  }
}
export default Button;

