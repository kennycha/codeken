import styled from "styled-components";
import { TAGS } from "../constants";
import TagBadge from "./TagBadge";

type Props = {
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
};

export default function TagList({ selectedTag, onSelect }: Props) {
  const createTagClickHandler = (tag: string) => () => {
    if (selectedTag === tag) {
      onSelect(null);
    } else {
      onSelect(tag);
    }
  };

  return (
    <Container>
      {TAGS.map((tag) => (
        <TagBadgeWrapper key={tag} onClick={createTagClickHandler(tag)}>
          <TagBadge tag={tag} isSelected={selectedTag === tag} />
        </TagBadgeWrapper>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const TagBadgeWrapper = styled.div`
  cursor: pointer;
`;
