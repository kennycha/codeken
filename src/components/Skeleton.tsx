import styled, { keyframes } from "styled-components";
import { COLORS } from "../constants";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export default function Skeleton() {
  return (
    <Container>
      <Title />
      <Preview />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  aspect-ratio: 380/300;
  overflow: hidden;
  background-color: ${COLORS.gray};
`;

const Shimmer = styled.div`
  background: linear-gradient(
    to right,
    ${COLORS.gray} 4%,
    ${COLORS.lightGray} 25%,
    ${COLORS.gray} 36%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 2s infinite linear;
`;

const Title = styled(Shimmer)`
  width: 100%;
  height: 18px;
  margin: 16px;
  border-radius: 4px;
`;

const Preview = styled(Shimmer)`
  flex: 1;
  margin: 0 16px 16px;
  border-radius: 4px;
`;
