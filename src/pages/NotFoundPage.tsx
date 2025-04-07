import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { COLORS } from "../constants";

export default function NotFoundPage() {
  return (
    <Container>
      <Content>
        <Title>404</Title>
        <Description>Page not found</Description>
        <Link to="/" replace>
          <Button>Back to Home</Button>
        </Link>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${COLORS.black};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 96px;
  font-weight: 700;
  color: ${COLORS.lightGray};
  margin: 0;
`;

const Description = styled.p`
  font-size: 24px;
  color: ${COLORS.white};
  margin: 0;
`;
