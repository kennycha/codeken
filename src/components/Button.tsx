import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

export default function Button({
  children,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  background-color: #444857;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #575c6c;
  }
`;
