import styled from "styled-components";

export default function CodePenIcon() {
  return (
    <Container>
      <svg
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        viewBox="20 0 26 26"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M22 9.3L33 2l11 7.3v7.4L33 24l-11-7.3z" />
        <path d="M22 9.3l11 7.4 11-7.4" />
        <path d="M44 16.7L33 9.3l-11 7.4" />
        <path d="M33 2v7.3m0 7.4V24" />
      </svg>
    </Container>
  );
}

const Container = styled.div`
  width: 24px;
  height: 24px;
`;
