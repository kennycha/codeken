import styled from "styled-components";

export default function CssIcon() {
  return (
    <Container>
      <svg viewBox="0 0 15 15">
        <rect fill="#0EBEFF" width="15" height="15" rx="4"></rect>
        <path
          d="M8 8.366l1.845 1.065a.507.507 0 0 0 .686-.181.507.507 0 0 0-.186-.685L8.5 7.5l1.845-1.065a.507.507 0 0 0 .186-.685.507.507 0 0 0-.686-.181L8 6.634v-2.13A.507.507 0 0 0 7.5 4c-.268 0-.5.225-.5.503v2.131L5.155 5.569a.507.507 0 0 0-.686.181.507.507 0 0 0 .186.685L6.5 7.5 4.655 8.565a.507.507 0 0 0-.186.685c.134.232.445.32.686.181L7 8.366v2.13c0 .271.224.504.5.504.268 0 .5-.225.5-.503V8.366z"
          fill="#282828"
        ></path>
      </svg>
    </Container>
  );
}

const Container = styled.div`
  width: 16px;
  height: 16px;
`;
