"use client";
import { toast } from "@/components/ui/use-toast";
import React, { useEffect, useRef, useState, CSSProperties } from "react";
import Webcam from "react-webcam";
import PacmanLoader from "react-spinners/PacmanLoader";
import axios from "axios";
import { useRouter } from "next/navigation";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function page() {
  const webcamRef = useRef(null);
  const [seconds, setSeconds] = useState(15);
  const [running, setRunning] = useState(true);
  let [loading, setLoading] = useState(true);
  const router = useRouter()
  let [color, setColor] = useState("#ffffff");
  async function checkTrainingModel() {
    //@ts-ignore
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    if (imageSrc != null) {
      const res = await axios.post("http://127.0.0.1:5000/verify", {
        imageSrc: imageSrc
      });
      const data = await res.data;
      router.push("/medicineverify")
    }
  }
  useEffect(() => {
    setTimeout(() => {
      checkTrainingModel()
    }, 5000)
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
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
          Searching Face ID
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
