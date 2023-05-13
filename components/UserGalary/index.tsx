"use client"

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getMenu } from "@/lib/getMenu";
import { getServices } from "@/lib/getServices";
import { GetTypeGalary } from "@/typings";
import FirstVisit from "../FirstVisit";

export default function UserGalary({getType}:{getType: GetTypeGalary}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(()=> {
    const getData = async () => {
        const get = getType === GetTypeGalary.MENU ? getMenu() : getServices();
        const data = await get;
        setImages(data);
    }
    if (!images.length)
        getData()
  })

  const leftArrow = () => {
    if (currentImage > 0)
      setCurrentImage(current=>current-1)
  }

  const rightArrow = () => {
    if (currentImage < images.length-1)
      setCurrentImage(current=>current+1)
  }

    return (
        <div className="col-start-2 col-end-6 my-6 grid grid-cols-2 auto-rows-max items-center justify-items-center gap-10 overflow-y-auto scrollbar max-md:grid-cols-1 max-md:col-end-7">
        {images.map((src, index) => (
            <Image
            className="cursor-pointer rounded-lg"
            src={src}
            onClick={() => openImageViewer(index)}
            width={450}
            height={400}
            key={index}
            alt=""
            />
        ))}

        {isViewerOpen && (
          <>
            <div className="fixed grid grid-cols-[10%_80%_10%] left-0 top-0 w-screen h-screen z-50 before:inset-0 before:bg-gray-900 before:opacity-100 before:bg-clip-padding before:backdrop-filter before:backdrop-blur-xl before:bg-opacity-50 before:w-screen before:h-screen before:content-[''] before:flex before:fixed before:left-0 before:top-0">
              <div style={{backgroundImage: `url(${images[currentImage]})`, backgroundRepeat: "no-repeat", backgroundSize: "contain"}} className="absolute left-[50%] -translate-x-[18%] top-0 max-md:left-0 max-md:translate-x-0 w-screen h-screen" />
              <div className="relative place-self-center max-md:self-end mb-5 left-2 z-10 cursor-pointer" onClick={leftArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </div>
              <div className="relative grid grid-flow-row justify-items-end max-md:justify-items-center max-md:items-end h-full">
                <div onClick={closeImageViewer} className="m-5 z-10 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="relative self-center max-md:place-self-end mb-5 right-2 z-10 cursor-pointer" onClick={rightArrow}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </>
        )}
        <FirstVisit />
        </div>
    )
}