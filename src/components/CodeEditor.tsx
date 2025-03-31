import MonacoEditor from "react-monaco-editor";
import styled from "styled-components";
import CssIcon from "./Icons/CssIcon";
import HtmlIcon from "./Icons/HtmlIcon";
import JsIcon from "./Icons/JsIcon";

const EDITOR_OPTIONS = {
  fontSize: 14,
  minimap: { enabled: false },
  automaticLayout: true,
};

type Props = {
  language: "html" | "css" | "js";
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ language, value, onChange }: Props) {
  const Icon =
    language === "html" ? HtmlIcon : language === "css" ? CssIcon : JsIcon;

  return (
    <Container>
      <Title>
        <Icon />
        {language.toUpperCase()}
      </Title>
      <MonacoEditor
        language={language}
        value={value}
        onChange={onChange}
        height="100%"
        theme="vs-dark"
        options={EDITOR_OPTIONS}
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
