import { Link } from "react-router-dom";
import styled from "styled-components";
import { BASE_PATH, COLORS, EXTERNAL_LINKS } from "../constants";

export default function Profile() {
  return (
    <Container>
      <Inner>
        <Name>Kenny Cha (차영부)</Name>
        <Link to={EXTERNAL_LINKS.GITHUB_PROFILE} target="_blank">
          <Nickname>@kennycha</Nickname>
        </Link>
        <ProfileImage src={`${BASE_PATH}/profile.jpeg`} />
        <Location>Seoul, Korea</Location>
        <Description>Here, I'm collecting twinkles ⭐️</Description>
      </Inner>
    </Container>
  );
}

const Container = styled.div``;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 8px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${COLORS.white};
`;

const Nickname = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.lightGray};
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 128px;
  height: 128px;
`;

const Location = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.lightGray};
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${COLORS.white};
`;
