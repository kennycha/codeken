import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import GithubIcon from "../components/Icons/GithubIcon";
import PlusIcon from "../components/Icons/PlusIcon";
import KenCard from "../components/KenCard";
import Logo from "../components/Logo";
import Pagination from "../components/Pagination";
import Profile from "../components/Profile";
import Skeleton from "../components/Skeleton";
import { COLORS, DEFAULT_KEN_FORM, EMPTY_KEN_LIST, EXTERNAL_LINKS, TAGS } from "../constants";
import useAddKen from "../hooks/useAddKen";
import useGetKens from "../hooks/useGetKens";
import { useAuth } from "../store/AuthContext";
import WithTilt from "../components/WithTilt";
import TagBadge from "../components/TagBadge";
import { NumberParam, useQueryParam } from "use-query-params";

const PAGE_SIZE = 6;

export default function CodeKenListPage() {
  const navigate = useNavigate();

  const [page, setPage] = useQueryParam("page", NumberParam);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { user } = useAuth();

  const memoizedPage = useMemo(() => page ?? 1, [page]);

  const { data = EMPTY_KEN_LIST, isLoading: isLoadingKens } = useGetKens({
    page: memoizedPage,
    size: PAGE_SIZE,
    tag: selectedTag,
  });
  const { addKen } = useAddKen();

  const kens = data.kens;
  const isEmpty = kens.length === 0;
  const totalPages = isLoadingKens ? 1 : Math.ceil(data.total / PAGE_SIZE);

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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const createTagClickHandler = (tag: string) => () => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setPage(1);
  };

  return (
    <Container>
      <Header>
        <Logo />
        <Buttons>
          {user && (
            <AddButton onClick={handleAddButtonClick}>
              <PlusIcon /> <span>Ken</span>
            </AddButton>
          )}
          <Link to={EXTERNAL_LINKS.GITHUB_REPOSITORY} target="_blank">
            <GithubButton>
              <GithubIcon />
              <span>Github</span>
            </GithubButton>
          </Link>
        </Buttons>
      </Header>
      <Profile />
      <Content>
        <Tags>
          {TAGS.map((tag) => (
            <TagBadgeWrapper key={tag} onClick={createTagClickHandler(tag)}>
              <TagBadge tag={tag} isSelected={selectedTag === tag} />
            </TagBadgeWrapper>
          ))}
        </Tags>
        {isLoadingKens ? (
          <KenList>
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </KenList>
        ) : isEmpty ? (
          <EmptyKenList>No Kens found matching your condition.</EmptyKenList>
        ) : (
          <>
            <KenList>
              {data.kens.map((ken) => (
                <Link to={`/${ken.id}`} key={ken.id}>
                  <WithTilt>
                    <InteractionBlocker>
                      <KenCard ken={ken} />
                    </InteractionBlocker>
                  </WithTilt>
                </Link>
              ))}
            </KenList>
            <Pagination currentPage={memoizedPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding-bottom: 32px;
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

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

const GithubButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    span {
      display: none;
    }
  }
`;

const Content = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
`;

const TagBadgeWrapper = styled.div`
  cursor: pointer;
`;

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

const EmptyKenList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px;
  background-color: ${COLORS.gray};
  border-radius: 8px;
  color: ${COLORS.white};
  font-size: 18px;
  text-align: center;
  min-height: 200px;

  &::before {
    content: "😢";
    font-size: 48px;
  }
`;

const InteractionBlocker = styled.div`
  pointer-events: none;
`;
