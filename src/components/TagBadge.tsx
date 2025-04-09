import styled from "styled-components";
import { COLORS } from "../constants";

type Props = {
  tag: string;
  isSelected?: boolean;
  size?: "small" | "medium";
};

export default function TagBadge({ tag, isSelected = false, size = "medium" }: Props) {
  return (
    <Container $isSelected={isSelected} $size={size}>
      {tag}
    </Container>
  );
}

const Container = styled.div<{ $isSelected: boolean; $size: "small" | "medium" }>`
  padding: ${({ $size }) => ($size === "small" ? "2px 4px" : "4px 8px")};
  border-radius: 4px;
  background-color: ${({ $isSelected }) => ($isSelected ? COLORS.primary : COLORS.gray)};
  color: ${COLORS.white};
  font-size: ${({ $size }) => ($size === "small" ? "12px" : "14px")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? COLORS.primary : COLORS.lightGray)};
  }
`;
