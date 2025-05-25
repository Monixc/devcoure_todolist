import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/tokens/colors";

interface EmptyMessageProps {
  children: React.ReactNode;
}

export const EmptyMessage = ({ children }: EmptyMessageProps) => (
  <Wrap>{children}</Wrap>
);

const Wrap = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${colors.gray[100]};
  color: ${colors.gray[400]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
`; 