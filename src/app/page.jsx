"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap-trial";
import ScrollSmoother from "gsap-trial/ScrollSmoother";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import SplitText from "gsap-trial/SplitText";
import Image from "next/image";
import { useRef } from "react";
export default function Home() {
  const container = useRef(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
      let skewSetter = gsap.quickTo(["img", "h1"], "skewY"),
        clamp = gsap.utils.clamp(-20, 20);
      // let textSkewSetter = gsap.quickTo("h1", "skewY");
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-container",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        onUpdate: (self) => skewSetter(clamp(self.getVelocity() / 10)),
        onStop: () => skewSetter(0),
      });
      smoother.effects("img", {
        speed: () => gsap.utils.random(0.8, 0.6, 1),
      });
    },
    { scope: container }
  );
  return (
    <>
      <h1 className="text">SCROllY IMAGES</h1>
      <h1 className="text outline" aria-hidden>
        SCROllY IMAGES
      </h1>
      <h1 className="text filter" aria-hidden>
        SCROllY IMAGES
      </h1>
      <div id="smooth-wrapper" className="min-h-screen" ref={container}>
        <div id="smooth-content">
          <main className="container">
            <div className="img-container">
              {Array.from({ length: 6 }).map((_, i) => {
                return (
                  <Image
                    src={`/assets/img${i + 1}.jpg`}
                    alt="img"
                    width={200}
                    height={200}
                    key={i}
                    className={`img${i + 1}`}
                  />
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
