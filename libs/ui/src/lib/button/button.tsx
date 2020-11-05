import React from 'react';
import { ButtonComponent, InverseButtonComponent, ButtonIconWrapper } from './button.style';

export interface ButtonProps {
  children: React.ReactNode;
  ariaLabel?: string;
  ariaDescribedby?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const {children, ariaLabel, ariaDescribedby, onClick } = props;
  return <ButtonComponent onClick={onClick} aria-label={ariaLabel} aria-describedby={ariaDescribedby}>{children}</ButtonComponent>
};

const InverseButton = (props: ButtonProps) => {
  const {children, ariaLabel} = props;
  return <InverseButtonComponent aria-label={ariaLabel}>{children}</InverseButtonComponent>
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
