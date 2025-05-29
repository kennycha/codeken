import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Split from "react-split";
import styled from "styled-components";
import Button from "../components/Button";
import CodeEditor from "../components/CodeEditor";
import CodePenIcon from "../components/Icons/CodePenIcon";
import LivePrewview from "../components/LivePreview";
import Skeleton from "../components/Skeleton";
import TagBadge from "../components/TagBadge";
import { COLORS, TAGS } from "../constants";
import useEditKen from "../hooks/useEditKen";
import useGetKen from "../hooks/useGetKen";
import { useAuth } from "../store/AuthContext";
import { areStringArraysEqual } from "../utils";

type TabType = "html" | "css" | "js";

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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [tempHtml, setTempHtml] = useState("");
  const [tempCss, setTempCss] = useState("");
  const [tempJs, setTempJs] = useState("");

  const [activeTab, setActiveTab] = useState<TabType>("html");

  const appliedTags = useMemo(
    () => TAGS.filter((tag) => selectedTags.includes(tag)),
    [selectedTags]
  );

  const canApply = useMemo(() => {
    return tempHtml !== html || tempCss !== css || tempJs !== js;
  }, [html, css, js, tempHtml, tempCss, tempJs]);

  const canSave = useMemo(() => {
    if (!ken) return false;

    return (
      ken.html !== tempHtml ||
      ken.css !== tempCss ||
      ken.js !== tempJs ||
      ken.title !== title ||
      !areStringArraysEqual(selectedTags, ken.tags)
    );
  }, [ken, title, selectedTags, tempHtml, tempCss, tempJs]);

  useEffect(() => {
    if (ken) {
      setHtml(ken.html);
      setCss(ken.css);
      setJs(ken.js);
      setTitle(ken.title);
      setSelectedTags(ken.tags);
      setTempHtml(ken.html);
      setTempCss(ken.css);
      setTempJs(ken.js);
    }
  }, [ken]);

  const handleTitleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
    setTitle(e.currentTarget.textContent ?? "");
  };

  const createTagClickHandler = (tag: string) => () => {
    if (!user) return;

    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
      title,
      tags: selectedTags,
      html: tempHtml,
      css: tempCss,
      js: tempJs,
      user_id: user.id,
    });
  };

  const createaTabButtonClickHandler = (tab: TabType) => () => {
    setActiveTab(tab);
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
        <KenMeta>
          <Title
            contentEditable={user?.id === ken?.user_id}
            onBlur={handleTitleBlur}
            suppressContentEditableWarning
          >
            {title}
          </Title>
          {user ? (
            <Tags>
              {TAGS.map((tag) => (
                <TagBadgeWrapper key={tag} onClick={createTagClickHandler(tag)}>
                  <TagBadge
                    tag={tag}
                    size="small"
                    isSelected={selectedTags.includes(tag)}
                  />
                </TagBadgeWrapper>
              ))}
            </Tags>
          ) : (
            <Tags>
              {appliedTags.map((tag) => (
                <TagBadge key={tag} tag={tag} size="small" />
              ))}
            </Tags>
          )}
        </KenMeta>
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
        <ResponsiveWrapper>
          <DesktopWrapper>
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
              <CodeEditor
                language="html"
                value={tempHtml}
                onChange={setTempHtml}
              />
              <CodeEditor
                language="css"
                value={tempCss}
                onChange={setTempCss}
              />
              <CodeEditor language="js" value={tempJs} onChange={setTempJs} />
            </HorizontalSplit>
          </DesktopWrapper>
          <MobileWrapper>
            <TabHeader>
              <TabButton
                $isActive={activeTab === "html"}
                onClick={createaTabButtonClickHandler("html")}
              >
                HTML
              </TabButton>
              <TabButton
                $isActive={activeTab === "css"}
                onClick={createaTabButtonClickHandler("css")}
              >
                CSS
              </TabButton>
              <TabButton
                $isActive={activeTab === "js"}
                onClick={createaTabButtonClickHandler("js")}
              >
                JS
              </TabButton>
            </TabHeader>
            <CodeEditor
              language={activeTab}
              value={
                activeTab === "html"
                  ? tempHtml
                  : activeTab === "css"
                  ? tempCss
                  : tempJs
              }
              onChange={
                activeTab === "html"
                  ? setTempHtml
                  : activeTab === "css"
                  ? setTempCss
                  : setTempJs
              }
            />
          </MobileWrapper>
        </ResponsiveWrapper>

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
  height: 64px;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const KenMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
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

const Tags = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding-left: 8px;
`;

const TagBadgeWrapper = styled.div`
  cursor: pointer;
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
  height: calc(100vh - 64px);
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
`;

const HorizontalSplit = styled(StyledSplit)`
  flex-direction: row;
  width: 100%;
`;

const ResponsiveWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > div:first-child {
    display: block;
  }
  & > div:last-child {
    display: none;
  }

  @media (max-width: 767px) {
    & > div:first-child {
      display: none;
    }
    & > div:last-child {
      display: block;
    }
  }
`;

const TabHeader = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #1e1e1e;
  border-bottom: 1px solid #333;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 8px 16px;
  background: none;
  border: none;
  color: ${({ $isActive }) => ($isActive ? COLORS.white : COLORS.gray)};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${COLORS.white};
  }
`;

const DesktopWrapper = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  & > div {
    height: 100%;
  }
`;

const MobileWrapper = styled.div`
  display: none;
  width: 100%;
  height: 100%;

  & > div:not(.gutter) {
    border: #2d2d2d;
  }
`;
