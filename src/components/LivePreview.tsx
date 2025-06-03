import { useEffect, useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

type Props = {
  html: string;
  css: string;
  js: string;
};

export default function LivePrewview({ html, css, js }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              (function() {
                ${js}
              })();
            </script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [html, css, js]);

  return (
    <Container>
      <Iframe ref={iframeRef} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${COLORS.white};
`;
