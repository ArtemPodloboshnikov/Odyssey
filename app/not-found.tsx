"use client"

import Button, { ButtonStyle } from "@/components/Button";
import { ROOT_LINK } from "@/constants/links";
import { ERROR_SUBTITLE_404, ERROR_TITLE_404 } from "@/constants/placeholders";

const notFound: React.FC = () => {
    return (
        <div className="relative w-full h-screen flex flex-col gap-y-5 items-center justify-center bg-[url('/images/notFound.avif')] bg-no-repeat bg-center bg-cover before:content-[''] before:w-screen before:h-screen before:absolute before:left-0 before:top-0 before:bg-black/50 before:z-30">
            <h1 className="relative text-4xl font-bold z-50 max-lg:text-6xl">{ERROR_TITLE_404}</h1>
            <h2 className="relative text-2xl font-semibold z-50 max-lg:text-5xl">{ERROR_SUBTITLE_404}</h2>
            <div className="relative z-50 max-lg:text-6xl">
                <Button
                type="link"
                href={ROOT_LINK.href}
                text={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 max-lg:w-20 max-lg:h-20">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                }
                style={ButtonStyle.CTA} />
                {/* <a type="link" href={ROOT_LINK.href} >{ROOT_LINK.text}</a> */}
            </div>
        </div>
    )
}

export default notFound;