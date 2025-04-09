import { useState, useRef, PropsWithChildren, MouseEventHandler } from "react";
import styled from "styled-components";

const TILT_FACTOR = 20;

type TiltStyle = {
  transform?: string;
  boxShadow?: string;
  transition?: string;
};

export default function WithTilt({ children }: PropsWithChildren) {
  const [tiltStyle, setTiltStyle] = useState<TiltStyle>({
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    transition: `transform 0.3s ease-out, box-shadow 0.3s ease-out`,
  });
  const [isHovering, setIsHovering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!wrapperRef.current || !isHovering) return;

    const wrapper = wrapperRef.current;
    const rect = wrapper.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    const tiltX = -((y / rect.height) * TILT_FACTOR);
    const tiltY = (x / rect.width) * TILT_FACTOR;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`,
      boxShadow: `0 30px 30px rgba(0, 0, 0, 0.2)`,
      transition: `transform 0.08s ease-out`,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`,
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
      transition: `transform 0.3s ease-out, box-shadow 0.3s ease-out`,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <Container
      ref={wrapperRef}
      style={{ ...tiltStyle }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  transform-style: preserve-3d;
`;
