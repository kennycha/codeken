import styled from "styled-components";

export default function PlusIcon() {
  return (
    <Container>
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="8"
          y1="3"
          x2="8"
          y2="13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="3"
          y1="8"
          x2="13"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Container>
  );
}

const Container = styled.div`
  width: 16px;
  height: 16px;
`;
