import styled from "styled-components";
import { COLORS } from "../constants";
import { Ken } from "../types";
import LivePrewview from "./LivePreview";
import TagBadge from "./TagBadge";

type Props = {
  ken: Ken;
};

export default function KenCard({ ken }: Props) {
  return (
    <Container>
      <Preview>
        <LivePrewview html={ken.html} css={ken.css} js={ken.js} />
      </Preview>
      <Content>
        <Title>{ken.title}</Title>
        <Tags>
          {ken.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} size="small" />
          ))}
        </Tags>
      </Content>
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
  background: linear-gradient(145deg, ${COLORS.gray}, ${COLORS.darkGray});
`;

const Preview = styled.div`
  flex: 1;
  background-color: ${COLORS.black};
  overflow: hidden;
`;

const Content = styled.div`
  padding: 16px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 100%);
`;

const Title = styled.div`
  color: ${COLORS.white};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
