import styled from "styled-components";
import { COLORS } from "../constants";

type Props = {
  tag: string;
  isSelected?: boolean;
};

export default function TagBadge({ tag, isSelected = false }: Props) {
  return <Container $isSelected={isSelected}>{tag}</Container>;
}

const Container = styled.div<{ $isSelected: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? COLORS.primary : COLORS.gray};
  color: ${COLORS.white};
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? COLORS.primary : COLORS.lightGray};
  }
`;
