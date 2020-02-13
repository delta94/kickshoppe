/**
 * StickyHeader
 */

import React from 'react';
import styled from 'styled-components';

const StickHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 2rem;
  background: black;
  color: #ffffff;
`;

interface IStickyHeader {}

export const StickyHeader: React.FC<IStickyHeader> = ({ children }) => {
  return <StickHeader>{children}</StickHeader>;
};

export default StickyHeader;
