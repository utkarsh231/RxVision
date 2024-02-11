"use client";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Menu, MenuItem } from "@/components/ui/navbar-menu";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { cn } from "@/app/utils/cn";
import { useRef, useState } from "react";
import "./page.css";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Tiles from "@/components/ui/tiles";
import { useRouter } from "next/navigation";
export default function TypewriterEffectDemo() {
  const targetRef = useRef(null);

  const words = [
    {
      text: "R",
      className:
        "sm:text-4xl md:text-5xl lg:text-7xl font-bold inter-var text-orange-500 dark:text-orange-500 text-center",
    },
    {
      text: "x",
      className:
        "sm:text-4xl md:text-5xl lg:text-7xl font-bold inter-var text-orange-500 dark:text-orange-500 text-center",
    },
    {
      text: "Vision, ",
      className:
        "sm:text-4xl md:text-5xl lg:text-7xl font-bold inter-var text-orange-500 dark:text-orange-500 text-center",
    },
    {
      text: "medicine",
      className:
        "sm:text-4xl md:text-5xl lg:text-7xl  text-white font-bold inter-var text-white dark:text-white text-center",
    },
    {
      text: "tracker.",
      className:
        "sm:text-4xl md:text-5xl lg:text-7xl font-bold inter-var text-orange-500 text-center",
    },
  ];
  const users = [
    {
      name: "Manu Arora",
      designation: "Founder, Algochurn",
      image: "https://picsum.photos/id/10/300/300",
      badge: "Mentor",
    },
  ];
  const projects = [
    {
      title: "Stripe",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
  ];
  const projects2 = [
    {
      title: "Netflix",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
  ];

  return (
    <div className="fadeInUp-animation bg-black">
      <div className="bg-black">
        <div className="flex items-center mt-14 bg-black">
          <Navbar currRef={targetRef} className="bg-black" />
        </div>
      </div>
      <ContainerScroll
        users={users}
        titleComponent={
          <div className="">
            <TypewriterEffect words={words} className="mb-8 -mt-28" />
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-wrap">
              reducing medicine overdose & underdose with{" "}
              <b>visual tracking.</b>
            </h3>
          </div>
        }
      />
    </div>
  );
}

function Navbar({ className }: { className?: string; currRef?: any }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  return (
    <div className="ml-5 mr-5 text-white">
      <div
        className={cn(
          "fixed top-10 inset-x-0 max-w-md mx-auto z-50",
          className
        )}
      >
        <Menu setActive={setActive}>
          <div className="flex gap-3">
            <Button
              className="bg-none text-xl"
              onClick={() => {
                router.push("/form");
              }}
            >
              <MenuItem
                setActive={setActive}
                active={active}
                item="register your face"
              ></MenuItem>
            </Button>
            <Button
              className="bg-none text-xl"
              onClick={() => {
                router.push("/facerecognize");
              }}
            >
              <MenuItem
                setActive={setActive}
                active={active}
                item="take a medicine"
              ></MenuItem>
            </Button>
          </div>
        </Menu>
      </div>
    </div>
  );
}
