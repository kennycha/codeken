import { useEffect, useState } from "react";
import useGetKens from "../hooks/useGetKens";
import { EMPTY_KEN_LIST } from "../constants";
import styled from "styled-components";
import { useIsAdmin } from "../hooks/useIsAdmin";
import KenCard from "../components/KenCard";

export default function CodeKenListPage() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [tag, setTag] = useState<string | null>(null);

  const isAdmin = useIsAdmin();
  const { data = EMPTY_KEN_LIST, isLoading: isLoadingKens } = useGetKens({ page, size, tag });

  const isEmpty = data.kens.length === 0;

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  return (
    <Container>
      <Header>
        <Title></Title>
        <Buttons></Buttons>
      </Header>
      <Content>
        <LatestKen></LatestKen>
        <TagList></TagList>
        {isEmpty ? (
          <EmptyKenList>코드 켄이 없습니다.</EmptyKenList>
        ) : (
          <KenList>
            {data.kens.map((ken) => (
              <KenCard key={ken.id} ken={ken} />
            ))}
          </KenList>
        )}
      </Content>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.header``;

const Title = styled.h1``;

const Buttons = styled.div``;

const Content = styled.main``;

const LatestKen = styled.div``;

const TagList = styled.div``;

const KenList = styled.div``;

const EmptyKenList = styled.div``;
