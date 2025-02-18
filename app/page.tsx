"use client";
import { useEffect } from "react";
import Typed from "typed.js";
import ConcentricCircles from "./components/ui/ConcentricDottedCircles/ConcentricDottedCircles";

export default function Home() {
  useEffect(() => {
    const typed = new Typed(".typingText", {
      strings: [
        "Hello World! 🚀",
        "I am Isaiah",
        "A Web Developer",
        "Here's a little bit about me",
      ],
      typeSpeed: 70,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className=" flex flex-row text-left w-screen h-screen justify-center items-center bg-background">
      <div className="prose w-[50%]">
        <h1 className="typingText text-left"></h1>
      </div>
      <div className="fixed"><ConcentricCircles color="#57a773ff"/></div>
    </div>
  );
}
