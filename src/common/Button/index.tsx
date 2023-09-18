import { 
 PrimaryButton, 
 SecondaryButton, 
 TertairyButton
} from "./types";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 buttonType: 'primary' | 'secondary' | 'tertairy',
 children?: React.ReactNode 
 content?: string,
 disabled?: boolean; 
}

const Button = ({ 
 disabled, 
 buttonType, 
 content,
 children,
 ...rest
}: ButtonProps) => {
  switch(buttonType){
   case 'secondary':
    return children ? <SecondaryButton disabled={disabled ?? false} {...rest}>{children}</SecondaryButton> : <SecondaryButton disabled={disabled ?? false} {...rest}>{content}</SecondaryButton>
   case 'tertairy':
    return children ? <TertairyButton disabled={disabled ?? false} {...rest}>{children}</TertairyButton> : <TertairyButton disabled={disabled ?? false} {...rest}>{content}</TertairyButton>  
   default:
    return children ? <PrimaryButton disabled={disabled ?? false} {...rest}>{children}</PrimaryButton>  : <PrimaryButton disabled={disabled ?? false} {...rest}>{content}</PrimaryButton> 
  }
}
export default Button;