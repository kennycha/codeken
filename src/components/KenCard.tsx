import styled from "styled-components";
import { COLORS } from "../constants";
import { Ken } from "../types";
import LivePrewview from "./LivePreview";

type Props = {
  ken: Ken;
};

export default function KenCard({ ken }: Props) {
  return (
    <Container>
      <LivePrewview html={ken.html} css={ken.css} js={ken.js} />
      <Title>{ken.title}</Title>
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

const Title = styled.div`
  width: 100%;
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: 600;
  padding: 16px;
`;
