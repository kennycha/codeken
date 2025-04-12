import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { signOut, singIn } from "../services/auth";
import { useAuth } from "../store/AuthContext";

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = async () => {
    try {
      await singIn(email, password);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogoutButtonClick = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleHomeButtonClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <Container>
      {user ? (
        <Logout>
          <HelpText>로그아웃</HelpText>
          <Button onClick={handleLogoutButtonClick}>Logout</Button>
          <Button onClick={handleHomeButtonClick}>Home</Button>
        </Logout>
      ) : (
        <Login>
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
          <Button onClick={handleHomeButtonClick}>Home</Button>
        </Login>
      )}
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

const Login = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Logout = styled.div`
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
