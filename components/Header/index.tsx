"use client"
import { INTERIOR_LINK, GIRLS_LINK, MENU_LINK, SERVICES_LINK, VACANCIES_LINK, PHONE_LINK } from '@/constants/links';
import Button from '../Button';
import { BOOK_BTN_TEXT } from '@/constants/placeholders';
import Image from 'next/image';
import { ReactNode, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
    const links = [INTERIOR_LINK, GIRLS_LINK, MENU_LINK, SERVICES_LINK, VACANCIES_LINK];
    const icons: {[key: number]: ReactNode} = {
        0: <svg viewBox="0 0 685 529" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hidden max-lg:block">
            <path className="fill-white" fill-rule="evenodd" clip-rule="evenodd" d="M77.776 77.776V202.219C34.844 202.219 0 237.063 0 279.995C0 318.369 13.8907 349 46.6667 356.188V404.443C46.6667 430.203 67.5733 451.109 93.3333 451.109H108.891V497.776C108.891 506.021 112.172 513.937 118.005 519.771C123.839 525.604 131.755 528.885 140 528.885H148.073C157.531 528.885 166.474 524.593 172.37 517.203L225.261 451.11H459.181L512.071 517.203C517.967 524.594 526.91 528.885 536.369 528.885H544.442C552.687 528.885 560.603 525.604 566.436 519.771C572.27 513.937 575.551 506.021 575.551 497.776V451.109H591.108C616.868 451.109 637.775 430.203 637.775 404.443V356.188C670.551 349.001 684.442 318.371 684.442 279.995C684.442 237.063 649.598 202.219 606.666 202.219V77.776C606.666 34.844 571.822 0 528.89 0H155.556C112.624 0 77.7803 34.844 77.7803 77.776H77.776ZM185.407 451.109H140V497.776H148.073L185.407 451.109ZM544.447 451.109H499.04L536.373 497.776H543.202C543.452 496.781 544.446 495.365 544.446 497.776L544.447 451.109ZM124.447 280.003V342.227C124.447 359.399 138.384 373.336 155.556 373.336H528.889C546.061 373.336 559.999 359.399 559.999 342.227V280.003C559.999 254.243 580.905 233.336 606.665 233.336C632.425 233.336 653.332 254.243 653.332 280.003C653.332 304.768 646.983 326.669 622.223 326.669C613.634 326.669 606.665 333.638 606.665 342.227V404.451C606.665 413.039 599.697 420.008 591.108 420.008H93.3347C84.7461 420.008 77.7773 413.039 77.7773 404.451V342.227C77.7773 333.638 70.8085 326.669 62.22 326.669C37.4547 326.669 31.1107 304.768 31.1107 280.003C31.1107 254.243 52.0173 233.336 77.7773 233.336C103.537 233.336 124.444 254.243 124.444 280.003H124.447ZM528.887 295.56H357.78V342.227H528.887V295.56ZM326.66 342.227V295.56H155.553V342.227H326.66ZM575.553 208.707V77.7747C575.553 52.0147 554.647 31.108 528.887 31.108H155.553C129.793 31.108 108.887 52.0147 108.887 77.7747V208.707C131.783 218.707 148.944 239.431 154.012 264.519C154.512 264.472 155.022 264.441 155.554 264.441H528.887C529.418 264.441 529.929 264.472 530.429 264.519C535.501 239.431 552.657 218.707 575.553 208.707Z" fill="black"/>
            </svg>,
        1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white hidden max-lg:block">
           <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
           </svg>,
        2: <svg viewBox="0 0 642 756" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 hidden max-lg:block">
            <path className="fill-white" d="M542.471 306.172C597.283 235.062 641.731 180.245 641.731 138.772C640.96 129.537 633.221 122.444 623.955 122.474H260.995C258.084 75.8956 230.547 34.4116 188.755 13.6463C146.958 -7.11906 97.2658 -4.01506 58.3805 21.7921C19.5005 47.6041 -2.65553 92.1935 0.25514 138.771C0.25514 173.74 14.1458 207.276 38.8751 232.005C63.5991 256.729 97.1352 270.625 132.104 270.625C146.73 270.448 161.23 267.948 175.068 263.214L207.662 306.178C274.328 390.621 357.288 495.805 357.288 581.738V719.511H274.324C269.361 719.1 264.444 720.787 260.783 724.168C257.122 727.548 255.049 732.308 255.064 737.293C255.439 742.136 257.632 746.662 261.205 749.959C264.778 753.256 269.465 755.084 274.325 755.069H477.285C487.102 755.069 495.061 747.11 495.061 737.293C495.061 732.574 493.191 728.053 489.852 724.72C486.519 721.386 481.998 719.511 477.285 719.511H392.842V581.738C392.842 495.812 475.801 390.631 542.469 306.178L542.471 306.172ZM132.098 235.062C107.415 235.463 83.5245 226.375 65.3525 209.666C47.1805 192.958 36.1178 169.912 34.4511 145.286C32.7845 120.656 40.6386 96.3276 56.3885 77.3223C72.1432 58.3169 94.5911 46.0876 119.102 43.1609C143.612 40.2339 168.315 46.8328 188.102 61.5876C207.888 76.3476 221.253 98.1396 225.43 122.468H127.654C123.081 122.051 118.544 123.582 115.159 126.686C111.774 129.785 109.857 134.176 109.878 138.765C109.878 160.989 121.732 187.655 142.471 218.765L152.841 233.577L132.098 235.062ZM167.655 190.62C159.89 180.073 153.426 168.636 148.395 156.541H601.728C597.281 168.614 591.301 180.062 583.952 190.62H167.655ZM375.055 497.286C346.91 424.693 289.128 350.62 235.788 283.953C220.976 264.693 204.679 245.432 191.346 226.177L558.746 226.172L515.782 283.948C462.448 350.62 403.194 424.694 375.048 497.281L375.055 497.286Z" fill="black"/>
            </svg>,
        3: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white hidden max-lg:block">
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
           </svg>,
        4: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white hidden max-lg:block">
           <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
           </svg>
    }
    const path = usePathname();

    const stickyHeader = useRef<HTMLElement>(null);

    const scrollEffect = (e: any, id: string) =>{
        e.preventDefault();
        const link = document.getElementById(id)
        if (link) {
            link.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
        }
    }

    useLayoutEffect(() => {
        const header = document.getElementsByTagName("header")[0];
        let fixedTop: number = stickyHeader !== null ? stickyHeader.current!.offsetTop : 0;
        const stickyClasses = ["bg-clip-padding", "backdrop-filter", "backdrop-blur-xl", "bg-opacity-50", "pb-[2%]", "shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"];
        const stickyHeaderEvent = () => {
            if (window !== undefined) {
                if (window.pageYOffset > fixedTop) {
                    header.classList.add(...stickyClasses);
                } else {
                    header.classList.remove(...stickyClasses);
                }
            }
        };
        if (window !== undefined)
        window.addEventListener("scroll", stickyHeaderEvent);
    }, []);

    return (
        <header ref={stickyHeader} className={`fixed pt-[2%] w-full flex flex-row items-center place-content-center gap-4 justify-around z-50 ${path === "/admin" ? "hidden" : null}`}>
            <div className="w-[200px] h-[50px] relative max-lg:w-[100px]">
                <Image src="/vercel.svg" fill alt="logo" />
            </div>
            <nav className="flex flex-row items-center gap-4">
                {links.map((link, index) => (<a onClick={(e)=>scrollEffect(e, link.href)} key={index} href={link.href}><span className="text-white max-md:hidden">{link.text.toUpperCase()}</span>{icons[index]}</a>))}
            </nav>
            <Button
            text={
                <>
                    <span className="max-lg:hidden">{BOOK_BTN_TEXT}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-white hidden max-lg:block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                </>
            }
            href={PHONE_LINK}
            type='link'
            />
        </header>
    )
}

export default Header;