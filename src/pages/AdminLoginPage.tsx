import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { singIn } from "../services/auth";
import { useAuth } from "../store/AuthContext";

export default function AdminLoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = async () => {
    try {
      await singIn(email, password);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return (
    <Container>
      <Inner>
        <HelpText>관리자 로그인</HelpText>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLoginButtonClick}>Login</Button>
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Inner = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const HelpText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`;
