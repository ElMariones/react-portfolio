import React from 'react';
import styled from 'styled-components';
import { MdLocationOn } from 'react-icons/md'; // Import location icon

const LocationWrapper = styled.div`
  position: fixed; /* Fixes the position relative to the viewport */
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  z-index: 1000; /* Ensures it stays on top of other content */
`;

const Location = () => {
  return (
    <LocationWrapper>
      <MdLocationOn />
      <span>Madrid, Spain 🇪🇸</span>
    </LocationWrapper>
  );
};

export default Location;