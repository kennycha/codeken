import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import GithubIcon from "../components/Icons/GithubIcon";
import PlusIcon from "../components/Icons/PlusIcon";
import KenCard from "../components/KenCard";
import Logo from "../components/Logo";
import Profile from "../components/Profile";
import {
  COLORS,
  DEFAULT_KEN_FORM,
  EMPTY_KEN_LIST,
  EXTERNAL_LINKS,
} from "../constants";
import useAddKen from "../hooks/useAddKen";
import useGetKens from "../hooks/useGetKens";
import { useAuth } from "../store/AuthContext";

export default function CodeKenListPage() {
  const navigate = useNavigate();

  // @TODO url params로 저장
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  // @TODO 태그 필터링

  const { user } = useAuth();
  // @TODO loading 처리
  const { data = EMPTY_KEN_LIST, isLoading: isLoadingKens } = useGetKens({
    page,
    size,
    tag,
  });
  const { addKen } = useAddKen();

  const kens = data.kens;
  const isEmpty = kens.length === 0;

  const handleAddButtonClick = async () => {
    if (!user) return;

    try {
      const newKen = await addKen({
        ...DEFAULT_KEN_FORM,
        user_id: user.id,
      });
      navigate(`/${newKen.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Header>
        <Logo />
        <Buttons>
          {user && (
            <AddButton onClick={handleAddButtonClick}>
              <PlusIcon /> Ken
            </AddButton>
          )}
          <Link to={EXTERNAL_LINKS.GITHUB_REPOSITORY} target="_blank">
            <GithubButton>
              <GithubIcon />
              Github
            </GithubButton>
          </Link>
        </Buttons>
      </Header>
      <Profile />
      <Content>
        <TagList></TagList>
        {isEmpty ? (
          <EmptyKenList>No Kens found matching your condition.</EmptyKenList>
        ) : (
          <KenList>
            {data.kens.map((ken) => (
              <Link to={`/${ken.id}`} key={ken.id}>
                <InteractionBlocker>
                  <KenCard ken={ken} />
                </InteractionBlocker>
              </Link>
            ))}
          </KenList>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 16px;
  background-color: ${COLORS.black};
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const GithubButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Content = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
`;

const TagList = styled.div``;

const KenList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3rem;

  @media (min-width: 738px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1140px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyKenList = styled.div``;

const InteractionBlocker = styled.div`
  pointer-events: none;
`;
