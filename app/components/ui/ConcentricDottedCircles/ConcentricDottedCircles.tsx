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
      setAngleOffset((prev) => prev + rotationSpeed * direction);
      frameId = requestAnimationFrame(update);
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [rotationSpeed, direction]);

  const dots = Array.from({ length: dotsPerCircle }, (_, j) => {
    const angle = (j / dotsPerCircle) * 2 * Math.PI + angleOffset;
    let x = parseFloat((centerX + radius * Math.cos(angle)).toFixed(4));
    let y = parseFloat((centerY + radius * Math.sin(angle)).toFixed(4));

    const dx = x - mouseXRef.current+centerX-100;
    const dy = y - mouseYRef.current+80;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repulsion = Math.exp(-dist / repulsionScale);

    x += dx * repulsion;
    y += dy * repulsion;

    // Ensure x and y are valid numbers
    if (isNaN(x)) x = 2000;
    if (isNaN(y)) y = 2000;

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
  dotsPerCircle?: number;
}> = ({ radiusIncrement = 60, dotSize = 18, width = 1000, height = 1000, speedScale = 0.06, color = "black", repulsionScale = 120, dotsPerCircle = 10 }) => {
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
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const rings = [];
  for (let i = 0; i < (width/radiusIncrement)/2; i++) {
    rings.push(
      <Ring
        key={i}
        radius={i * radiusIncrement}
        dotsPerCircle={dotsPerCircle+i*3}
        dotSize={dotSize}
        centerX={centerX}
        centerY={centerY}
        rotationSpeed={speedScale/(10*i)}
        direction={i % 2 === 0 ? 1 : -1}
        color={color}
        mouseXRef={mouseXRef}
        mouseYRef={mouseYRef}
        repulsionScale={repulsionScale}
      />
    );
  }

  return <svg width={width} height={height} style={{ display: "block" }}>{rings}</svg>;
};

export default ConcentricCircles;