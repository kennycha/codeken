import styled, { keyframes } from "styled-components";
import { COLORS } from "../constants";

export default function Loading() {
  return (
    <Container>
      <Spinner size={"32px"} color={"#3b82f6"} />
    </Container>
  );
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div<{ size: string; color: string }>`
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-top-color: ${COLORS.lightGray};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
