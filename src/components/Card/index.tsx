import React from 'react';
import { CardWrapper, CardHeaderStyled, CardBody } from './styles';

interface CardProps {
    header?: string | React.ReactNode;
    children: React.ReactNode;
    className?: string; 
}

const Card: React.FC<CardProps> = ({ header, children, className }) => {
    return (
        <CardWrapper className={className}>
            {header && <CardHeaderStyled>{header}</CardHeaderStyled>}
            <CardBody>{children}</CardBody>
        </CardWrapper>
    );
};

export default Card;