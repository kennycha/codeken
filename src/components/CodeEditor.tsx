import { Editor } from "@monaco-editor/react";
import styled from "styled-components";
import CssIcon from "./Icons/CssIcon";
import HtmlIcon from "./Icons/HtmlIcon";
import JsIcon from "./Icons/JsIcon";
import Loading from "./Loading";

const EDITOR_OPTIONS = {
  fontSize: 14,
  tabSize: 2,
  minimap: { enabled: false },
  automaticLayout: true,
};

type Props = {
  language: "html" | "css" | "js";
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ language, value, onChange }: Props) {
  const Icon = language === "html" ? HtmlIcon : language === "css" ? CssIcon : JsIcon;

  const handleEditorChange = (value: string | undefined) => {
    onChange(value ?? "");
  };

  return (
    <Container>
      <Title>
        <Icon />
        {language.toUpperCase()}
      </Title>
      <Editor
        language={language === "js" ? "javascript" : language}
        value={value}
        onChange={handleEditorChange}
        height="100%"
        theme="vs-dark"
        options={EDITOR_OPTIONS}
        loading={<Loading />}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #1e1e1e;
  color: #ffffff;
  padding: 6px 8px;
  font-size: 16px;
  font-weight: 600;
`;
