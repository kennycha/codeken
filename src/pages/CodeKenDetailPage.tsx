import { useState } from "react";
import { useParams } from "react-router-dom";
import Split from "react-split";
import styled from "styled-components";
import Button from "../components/Button";
import CodeEditor from "../components/CodeEditor";
import LivePrewview from "../components/LivePreview";
import useGetKen from "../hooks/useGetKen";

export default function CodeKenDetailPage() {
  const { id } = useParams();
  const { data: ken, isLoading: isLoadingKen } = useGetKen(
    id ? parseInt(id) : undefined
  );

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const [tempHtml, setTempHtml] = useState("");
  const [tempCss, setTempCss] = useState("");
  const [tempJs, setTempJs] = useState("");

  const handleApplyButtonClick = () => {
    setHtml(tempHtml);
    setCss(tempCss);
    setJs(tempJs);
  };

  const handleSaveButtonClick = () => {
    setHtml(tempHtml);
    setCss(tempCss);
    setJs(tempJs);
  };

  return (
    <Container>
      <Header>
        <Button onClick={handleApplyButtonClick}>Apply</Button>
        <Button onClick={handleSaveButtonClick}>Save</Button>
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  column-gap: 8px;
  height: 48px;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
