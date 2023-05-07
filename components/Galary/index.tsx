"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface GalaryProps {
    files: {[key: number]: File}|undefined
}

const Galary: React.FC<GalaryProps> = ({files}) => {
    const [images, setImages] = useState<string[]>([]);
    const isFirstRender = useRef(true);
    const ReaderFile = (file: File, callback: (data: string)=>void) => {
        let res;

        if (FileReader && files) {
            let fr = new FileReader();
            fr.onload = function () {
                // console.log(fr.result)
                // res = fr.result;
                callback(fr.result as string)
            }
            fr.readAsDataURL(file);
        }
        return res;
    }

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (images.length)
        setImages([])
    }, [files])

    return (
        <div className="w-full h-full flex flex-col overflow-y-auto my-20 gap-10">
            {files ? (()=>{
                const filesArray = Object.values(files);
                if (!images.length) {
                    for (let i=0; i < filesArray.length; i++) {
                        ReaderFile(files[i], (res: string)=>{
                            // srcs.push(res)
                            setImages((array) => [...array, res])
                        });
                    }
                }
                return images.map((src, index) => {
                    return (
                        // <Image key={index} src={src} alt="" width={400} height={400} />
                        <div key={index} style={{backgroundImage: `url(${src})`}} className="w-full h-3/5 rounded-lg bg-cover"/>
                    )
                })
            })()
            :null
            }
        </div>
    )
}

export default Galary;