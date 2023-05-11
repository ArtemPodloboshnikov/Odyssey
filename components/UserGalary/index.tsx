"use client"

import { useCallback, useEffect, useState } from "react";
import ImageViewer from 'react-simple-image-viewer';
import Image from "next/image";
import { getMenu } from "@/lib/getMenu";
import { getServices } from "@/lib/getServices";
import { GetTypeGalary } from "@/typings";

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

    return (
            <div className="col-start-2 col-end-6 my-6 grid grid-cols-2 items-center justify-items-center gap-10 overflow-y-auto scrollbar">
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
            <ImageViewer
            src={ images }
            currentIndex={ currentImage }
            disableScroll={ false }
            closeOnClickOutside={ true }
            onClose={ closeImageViewer }
            />
        )}
        </div>
    )
}