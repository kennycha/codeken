import styled from "styled-components";

export default function Logo() {
  return (
    <Container>
      <svg
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        viewBox="0 0 140 26"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M15 8a7 7 0 1 0 0 10" />
        <path d="M22 9.3L33 2l11 7.3v7.4L33 24l-11-7.3z" />
        <path d="M22 9.3l11 7.4 11-7.4" />
        <path d="M44 16.7L33 9.3l-11 7.4" />
        <path d="M33 2v7.3m0 7.4V24" />
        <path d="M52 6h5a7 7 0 0 1 0 14h-5z" />
        <path d="M80 6h-9v14h9m-9-7h6" />
        <path d="M88.6 6v14m0-7 9-7m-9 7 9 7" />
        <path d="M117 6h-9v14h9m-9-7h6" />
        <path d="M125.6 20V6l11 14V6" />
      </svg>
    </Container>
  );
}

const Container = styled.div`
  width: 240px;
`;
