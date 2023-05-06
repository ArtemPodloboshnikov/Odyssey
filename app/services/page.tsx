"use client"

import { getServices } from "@/lib/getServices";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ImageViewer from 'react-simple-image-viewer';

export default function Services() {
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
        const data = await getServices();
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