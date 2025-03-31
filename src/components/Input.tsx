import { InputHTMLAttributes } from "react";
import styled from "styled-components";

export default function Input({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <StyledInput {...props} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 4px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;
