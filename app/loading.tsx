"use client"
import { Loader } from "@react-three/drei";

export default function Loading() {
    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    const videos = ["ass.mp4", "body.mp4", "hips.mp4"]
    return (
        <div className="fixed w-screen h-screen top-0 left-0 z-[70]">
            <video autoPlay loop muted className="absolute top-0 left-0 min-w-full min-h-screen">
                <source src={`/video/${videos[getRandomInt(videos.length)]}`} type="video/mp4"></source>
            </video>
        </div>
    )
}