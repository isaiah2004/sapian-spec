import React, { useEffect, useState, useRef } from "react";

const Dot: React.FC<{ size: number; x: number; y: number; color: string }> = ({ size, x, y, color }) => (
  <circle cx={x} cy={y} r={size / 2} fill={color} />
);

const Ring: React.FC<{
  radius: number;
  dotsPerCircle: number;
  dotSize: number;
  centerX: number;
  centerY: number;
  rotationSpeed: number;
  direction: number;
  color: string;
  mouseXRef: React.MutableRefObject<number>;
  mouseYRef: React.MutableRefObject<number>;
  repulsionScale: number;
}> = ({ radius, dotsPerCircle, dotSize, centerX, centerY, rotationSpeed, direction, color, mouseXRef, mouseYRef, repulsionScale }) => {
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    let frameId: number;
    const update = () => {
      setAngleOffset((prev) => prev + direction * rotationSpeed);
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [rotationSpeed, direction]);

  const dots = Array.from({ length: dotsPerCircle }, (_, j) => {
    const angle = (j / dotsPerCircle) * 2 * Math.PI + angleOffset;
    let x = parseFloat((centerX + radius * Math.cos(angle)).toFixed(4));
    let y = parseFloat((centerY + radius * Math.sin(angle)).toFixed(4));

    const dx = x - mouseXRef.current;
    const dy = y - mouseYRef.current;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repulsion = Math.exp(-dist / repulsionScale);

    x += dx * repulsion;
    y += dy * repulsion;

    return <Dot key={`${radius}-${j}`} size={dotSize} x={x} y={y} color={color} />;
  });

  return <>{dots}</>;
};

const ConcentricCircles: React.FC<{
  radiusIncrement?: number;
  dotSize?: number;
  width?: number;
  height?: number;
  speedScale?: number;
  color?: string;
  repulsionScale?: number;
}> = ({ radiusIncrement = 60, dotSize = 18, width = 1000, height = 1000, speedScale = 0.06, color = "black", repulsionScale = 50 }) => {
  const centerX = width / 2;
  const centerY = height / 2;

  const mouseXRef = useRef(centerX);
  const mouseYRef = useRef(centerY);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseXRef.current = event.clientX;
      mouseYRef.current = event.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const rings = [];
  let i = 1;
  while (true) {
    const radius = i * radiusIncrement;
    const circumference = 2 * Math.PI * radius;
    const dotsPerCircle = Math.max(1, Math.floor(circumference / (dotSize * 2)));

    if (radius + dotSize > Math.min(width, height) / 2) break;

    const baseSpeed = 0.005;
    const rotationSpeed = (Math.random() * baseSpeed + 0.02) / (radius * speedScale);
    const direction = Math.random() > 0.5 ? 1 : -1;

    rings.push(
      <Ring
        key={i}
        radius={radius}
        dotsPerCircle={dotsPerCircle}
        dotSize={dotSize}
        centerX={centerX}
        centerY={centerY}
        rotationSpeed={rotationSpeed}
        direction={direction}
        color={color}
        mouseXRef={mouseXRef}
        mouseYRef={mouseYRef}
        repulsionScale={repulsionScale}
      />
    );
    i++;
  }

  return <svg width={width} height={height} style={{ display: "block" }}>{rings}</svg>;
};

export default ConcentricCircles;
