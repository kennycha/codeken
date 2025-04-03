import styled from "styled-components";
import { TAGS } from "../constants";
import TagBadge from "./TagBadge";

type Props = {
  onSelect: (tag: string) => void;
};

export default function TagList({ onSelect }: Props) {
  const createClickHandler = (tag: string) => () => {
    onSelect(tag);
  };

  return (
    <Container>
      {TAGS.map((tag) => (
        <TagBadgeWrapper key={tag} onClick={createClickHandler(tag)}>
          <TagBadge tag={tag} />
        </TagBadgeWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagBadgeWrapper = styled.div`
  cursor: pointer;
`;
