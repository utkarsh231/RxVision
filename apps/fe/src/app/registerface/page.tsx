"use client";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/components/ui/use-toast";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useRouter } from "next/navigation";
import axios from "axios";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function page() {
  const webcamRef = useRef(null);
  const [currentImagesArray, setCurrentImagesArray] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(10);
  const [running, setRunning] = useState(true);
  let [loading, setLoading] = useState(true);
  const router = useRouter();
  let [color, setColor] = useState("#ffffff");
  async function trainModel() {
    //@ts-ignore
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log(imageSrc);
    if (imageSrc != null) {
      const res = await axios.post("http://127.0.0.1:5000/register_image", {
        imageSrc: imageSrc
      });
      const data = await res.data;
    }
    toast({
      title: "Model has been trained, thanks!",
    });
    setRunning(false)
    router.push("/");
  }
  const { toast } = useToast();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      trainModel();
    }, 5000)
  })
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
          Registering Face.
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
