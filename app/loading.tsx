"use client"

import Image from "next/image"

export default function Loading() {
    return (
        <div className="w-screen min-h-screen bg-black top-0 left-0 z-[70] grid place-content-center">
            <div className="relative w-fit h-fit">
                <Image src="/images/logo.jpg" alt="logo" width={200} height={200} className="rounded-full" priority />
            </div>
        </div>
    )
}