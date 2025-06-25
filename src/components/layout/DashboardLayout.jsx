import React, { useState } from 'react';
import styled from 'styled-components';

const DashboardGrid = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1400px;
  margin: 40px auto;
`;

const DashboardLayout = ({ children }) => {
  return <DashboardGrid>{children}</DashboardGrid>;
};

export default DashboardLayout;