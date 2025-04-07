import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Split from "react-split";
import styled from "styled-components";
import Button from "../components/Button";
import CodeEditor from "../components/CodeEditor";
import CodePenIcon from "../components/Icons/CodePenIcon";
import LivePrewview from "../components/LivePreview";
import Skeleton from "../components/Skeleton";
import { COLORS } from "../constants";
import useEditKen from "../hooks/useEditKen";
import useGetKen from "../hooks/useGetKen";
import { useAuth } from "../store/AuthContext";

export default function CodeKenDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: ken, isLoading: isLoadingKen } = useGetKen(
    id ? parseInt(id) : undefined
  );
  const { editKen } = useEditKen();
  const { user } = useAuth();

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [title, setTitle] = useState("");

  const [tempHtml, setTempHtml] = useState("");
  const [tempCss, setTempCss] = useState("");
  const [tempJs, setTempJs] = useState("");

  const canApply = useMemo(() => {
    return tempHtml !== html || tempCss !== css || tempJs !== js;
  }, [html, css, js, tempHtml, tempCss, tempJs]);

  const canSave = useMemo(() => {
    if (!ken) return false;

    return canApply || ken.title !== title;
  }, [ken, canApply, title]);

  useEffect(() => {
    if (ken) {
      setHtml(ken.html);
      setCss(ken.css);
      setJs(ken.js);
      setTitle(ken.title);
    }
  }, [ken]);

  const handleTitleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    setTitle(e.currentTarget.textContent ?? "");
  };

  const handleApplyButtonClick = () => {
    setHtml(tempHtml);
    setCss(tempCss);
    setJs(tempJs);
  };

  const handleSaveButtonClick = async () => {
    if (!ken || !user) return;

    if (title.length === 0) {
      alert("Title is required");
      return;
    }

    await editKen({
      id: ken.id,
      title: title,
      html: tempHtml,
      css: tempCss,
      js: tempJs,
      user_id: user.id,
    });
  };

  useEffect(() => {
    if (!isLoadingKen && !ken) {
      navigate("/not-found");
    }
  }, [isLoadingKen, ken, navigate]);

  if (isLoadingKen) {
    return <Skeleton />;
  }

  return (
    <Container>
      <Header>
        <Link to={"/"}>
          <CodePenIcon />
        </Link>
        <Title
          contentEditable={user?.id === ken?.user_id}
          onBlur={handleTitleBlur}
          suppressContentEditableWarning
        >
          {title}
        </Title>
        <Buttons>
          <Button onClick={handleApplyButtonClick} disabled={!canApply}>
            Apply
          </Button>
          {user?.id === ken?.user_id && (
            <Button onClick={handleSaveButtonClick} disabled={!canSave}>
              Save
            </Button>
          )}
        </Buttons>
      </Header>
      <VerticalSplit
        sizes={[50, 50]}
        minSize={200}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
      >
        <HorizontalSplit
          sizes={[33.33, 33.33, 33.33]}
          minSize={200}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <CodeEditor language="html" value={tempHtml} onChange={setTempHtml} />
          <CodeEditor language="css" value={tempCss} onChange={setTempCss} />
          <CodeEditor language="js" value={tempJs} onChange={setTempJs} />
        </HorizontalSplit>
        <LivePrewview html={html} css={css} js={js} />
      </VerticalSplit>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #1e1e1e;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  column-gap: 8px;
  height: 48px;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const Title = styled.h1<{ contentEditable?: boolean }>`
  font-size: 24px;
  font-weight: 600;
  color: ${COLORS.white};
  outline: none;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  ${({ contentEditable }) =>
    contentEditable &&
    `
    &:hover {
      background-color: ${COLORS.gray};
    }

    &:focus {
      background-color: ${COLORS.gray};
    }
  `}
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 8px;
`;

const StyledSplit = styled(Split)`
  display: flex;

  & > .gutter {
    background-color: #2d2d2d;
  }

  & > div:not(.gutter) {
    border: #2d2d2d;
  }
`;

const VerticalSplit = styled(StyledSplit)`
  flex-direction: column;
  height: calc(100% - 48px);
  position: fixed;
  top: 48px;
  left: 0;
  right: 0;
`;

const HorizontalSplit = styled(StyledSplit)`
  flex-direction: row;
  width: 100%;
`;
