"use client";
import { useEffect } from "react";
import Typed from "typed.js";
import ConcentricCircles from "./components/ui/ConcentricDottedCircles/ConcentricDottedCircles";

export default function Home() {
  useEffect(() => {
    const typed = new Typed(".typingText", {
      strings: [
        "Hello World! 🚀",
        "I am Isaiah<br> a Web Developer <br>Here's a little bit about me",
      ],
      typeSpeed: 40,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className=" flex flex-row text-left w-screen min-h-screen justify-center items-center bg-background">
      <div className="prose w-[50%] mx-5">
        <h1 className="typingText text-left"></h1>
      </div>
      <div className=""><ConcentricCircles radiusIncrement={35} width={900} height={900} color="#57a773ff"/></div>
    </div>
  );
}
