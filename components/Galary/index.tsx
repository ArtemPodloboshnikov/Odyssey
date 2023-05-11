"use client"

import { useEffect, useRef, useState } from "react";

interface GalaryProps {
    files: {[key: number]: File}|undefined,
    paths?: string[],
    slider?: boolean,
    deleteImage?: (path: string)=>void
}

const Galary: React.FC<GalaryProps> = ({files, paths, deleteImage, slider=false}) => {
    const [images, setImages] = useState<string[]>([]);
    const [current, setCurrent] = useState<number>(0)
    const isFirstRender = useRef(true);
    const ReaderFile = (file: File, callback: (data: string)=>void) => {
        let res;

        if (FileReader && files) {
            let fr = new FileReader();
            fr.onload = function () {
                callback(fr.result as string)
            }
            fr.readAsDataURL(file);
        }
        return res;
    }

    const rightArrow = () => {
        let countImages = images.length;
        if  (paths) countImages += paths.length
        if (countImages-1 > current)
        setCurrent((cur)=>cur+1);
    }

    const leftArrow = () => {
        if (current !== 0)
        setCurrent((cur)=>cur-1);
    }

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (images.length)
        setImages([])
    }, [files])

    const ImageDiv: React.FC<{src: string, cross?: boolean}> = ({src, cross=false}) => (
        <div style={{backgroundImage: `url(${src})`, height: "400px", width: "280px"}} className="w-full h-3/5 rounded-lg bg-cover">
           {cross ?
           <svg onClick={deleteImage ? async ()=>{ await deleteImage(src);setCurrent(0);} : undefined} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer float-right bg-[#ff073a] rounded-bl-lg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            :
            null}
        </div>
    )

    return (
        <div className="w-full grid grid-flow-col gap-10 items-center">
            {slider ?
            <svg onClick={leftArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            :
            null
            }
            {(()=>{
                let res: JSX.Element[] = [];
                if (files) {
                    const filesArray = Object.values(files);
                    if (!images.length) {
                        for (let i=0; i < filesArray.length; i++) {
                            ReaderFile(files[i], (res: string)=>{
                                setImages((array) => [...array, res])
                            });
                        }
                    }
                    res = res.concat(images.map((src, index) => {
                        return (
                            <ImageDiv key={index} src={src} />
                        )
                    }))

                }
                if (paths) {
                    res = res.concat(paths.map((path, index)=>(
                        <ImageDiv key={index} src={path} cross />
                    )))
                }

                return res[current];
            })()
            }
            {slider ?
            <svg onClick={rightArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            :
            null
            }
        </div>
    )
}

export default Galary;