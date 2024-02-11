"use client";
import { Button } from "@/components/ui/button";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import Webcam from "react-webcam";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
function page() {
  const webcamRef = useRef(null);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const {toast} = useToast()
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  async function capture() {
    //@ts-ignore
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    if (imageSrc != null) {
      const res = await axios.get("http://127.0.0.1:5000/detect_medicine");
      const data = await res.data;
      toast({
        title: "you can have the medicine!"
      })
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }
  }
  const medicines = [
    {
      med: "medicine 1",
      days: ["sunday", "monday"],
      codegen: "iwepfukbq",
    },
    {
      med: "medicine 1",
      days: ["sunday", "monday"],
      codegen: "iwepfukbq",
    },
    {
      med: "medicine 1",
      days: ["sunday", "monday"],
      codegen: "iwepfukbq",
    },
  ];
  useEffect(() => {
    setTimeout(() => {
      capture()
    }, 5000)
  }, [])
  if (loading) {
    return (
      <div className="flex justify-center w-screen h-screen items-center">
        <PacmanLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }
  return (
    <div>
      <div className="ml-3 mt-12 flex w-screen justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Verifying your Medicine.
        </h1>
      </div>
      <div className="justify-center flex mt-10">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={640}
          height={480}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}

export default page;
