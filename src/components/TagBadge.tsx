import styled from "styled-components";

type Props = {
  tag: string;
};

export default function TagBadge({ tag }: Props) {
  return <Container>{tag}</Container>;
}

const Container = styled.div``;
