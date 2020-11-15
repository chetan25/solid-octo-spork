import React from 'react';
import { ButtonComponent, InverseButtonComponent, ButtonIconWrapper } from './button.style';

export interface ButtonProps {
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedby?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const {children, ariaLabel, ariaDescribedby, onClick, disabled } = props;
  return <ButtonComponent disabled={ disabled } onClick={onClick} aria-label={ariaLabel} aria-describedby={ariaDescribedby}>{children}</ButtonComponent>
};

const InverseButton = (props: ButtonProps) => {
  const {children, ariaLabel, onClick} = props;
  return <InverseButtonComponent aria-label={ariaLabel} onClick={onClick}>{children}</InverseButtonComponent>
};

const IconButton = (props: ButtonProps) => {
  const {children, ariaLabel, ariaDescribedby, onClick } = props;

  return <ButtonIconWrapper onClick={onClick} aria-label={ariaLabel} aria-describedby={ariaDescribedby}>{children}</ButtonIconWrapper>
}

export {
  Button,
  InverseButton,
  IconButton
};
