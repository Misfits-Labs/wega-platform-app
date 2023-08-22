import tw, { styled } from 'twin.macro'; 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BaseButton = styled.button` 
  border-radius: 5px;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.32px; 
  padding: 12px 24px;
  box-sizing: border-box;
  max-height: fit-content;
  line-height: 12px;
  
 `

interface ButtonProps {
  disabled: boolean;
};

export const PrimaryButton = styled(BaseButton)<ButtonProps>(
  ({disabled}) => !disabled ? [
    tw`dark:text-pretu dark:bg-gradient-to-r from-oranjo-blanc to-oranjo hover:outline hover:outline-blanc`,
    `
    box-shadow: 0px 1px 5px 0px #090300;
    &:hover {
      outline-width: 1.5px;
    }
    `
  ] : [
    tw`dark:text-pretu dark:opacity-50`,
    `background: #9A9A9A;`
  ]

)

export const SecondaryButton = styled(BaseButton)<ButtonProps>(
  ({ disabled }) => !disabled ? [
    tw`dark:bg-pretu dark:border-oranjo border`,
    `
      box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.25);
      &:hover {
        background: #F26D2133;
      }
    `
  ] : [
    tw`dark:bg-pretu dark:border-shinishi border opacity-50`,
    `
      color: #F5F5F5;
      box-shadow: 5px 5px 15px 0px rgba(0, 0, 0, 0.25);
    `
  ]
)

export const TertairyButton = styled(BaseButton)<ButtonProps>(({ disabled })=> !disabled ? [
  tw`dark:border-blanc border-b-2 dark:hover:text-oranjo dark:hover:border-oranjo`,
  `
    border-radius: unset;
  `
] : [
  tw`dark:bg-pretu dark:border-shinishi border-b-2 opacity-50`, 
  `
    border-radius: unset;
    color: #F5F5F5;
  `
])




