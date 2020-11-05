import React from 'react';
import { CardWrapper, CardTitle as StyledTilte, CardBody as StyledBody, CardFooter as StyledFooter } from './card.style';

interface CardProp {
  children: React.ReactNode |  React.ReactNode[];
  role?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}

const Card = (prop: CardProp) => {
  const { children, role, ariaLabelledby, ariaDescribedby } = prop;

  return <CardWrapper role={role} aria-labelledby={ariaLabelledby} aria-describedby={ariaDescribedby}>{children}</CardWrapper>
}

interface TitleProps {
  children?: React.ReactNode;
  id?: string;
}

const CardTitle = (props: TitleProps) => {
    const { children, id} = props;

    return <StyledTilte id={id}>{children}</StyledTilte>
}

interface FooterProps {
  children?: React.ReactNode;
  id?: string;
}

const CardFooter = (props: FooterProps) => {
  const { children, id} = props;

  return <StyledFooter id={id}>{children}</StyledFooter>
}

interface BodyProps {
  children?: React.ReactNode;
  id?: string;
}

const CardBody = (props: BodyProps) => {
  const { children, id} = props;

  return <StyledBody id={id}>{children}</StyledBody>
}

export {
  Card,
  CardTitle,
  CardBody,
  CardFooter
};
