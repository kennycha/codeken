import styled from "styled-components";
import { COLORS } from "../constants";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevButtonClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButtonClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Container>
      <Button onClick={handlePrevButtonClick} disabled={currentPage === 1}>
        이전
      </Button>
      {pages.map((page) => (
        <PageButton
          key={page}
          onClick={() => onPageChange(page)}
          $isActive={currentPage === page}
        >
          {page}
        </PageButton>
      ))}
      <Button
        onClick={handleNextButtonClick}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.gray};
  color: ${COLORS.white};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${COLORS.lightGray};
  }
`;

const PageButton = styled(Button)<{ $isActive: boolean }>`
  background-color: ${({ $isActive }) =>
    $isActive ? COLORS.primary : COLORS.gray};
  min-width: 40px;

  &:hover:not(:disabled) {
    background-color: ${({ $isActive }) =>
      $isActive ? COLORS.primary : COLORS.lightGray};
  }
`;
