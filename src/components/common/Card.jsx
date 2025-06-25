import React, { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.large};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, background 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-8px);
    background: ${({ theme }) => theme.colors.cardHover};
  }
`;

const Card = ({ children, className }) => {
  return <CardContainer className={className}>{children}</CardContainer>;
};

export default Card;