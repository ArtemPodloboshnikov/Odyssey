"use client"
import { INTERIOR_LINK, GIRLS_LINK, MENU_LINK, SERVICES_LINK, VACANCIES_LINK, PHONE_LINK } from '@/constants/links';
import Button from '../Button';
import { BOOK_BTN_TEXT } from '@/constants/placeholders';
import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

const Header: React.FC = () => {
    const links = [INTERIOR_LINK, GIRLS_LINK, MENU_LINK, SERVICES_LINK, VACANCIES_LINK];
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
        const stickyClasses = ["bg-clip-padding", "backdrop-filter", "backdrop-blur-xl", "bg-opacity-50", "pb-[2%]"];
        const stickyHeaderEvent = () => {
            if (window.pageYOffset > fixedTop) {
                header.classList.add(...stickyClasses);
            } else {
                header.classList.remove(...stickyClasses);
            }
        };
        window.addEventListener("scroll", stickyHeaderEvent);
    }, []);

    return (
        <header ref={stickyHeader} className="fixed pt-[2%] w-full flex flex-row items-center place-content-center gap-4 justify-around z-50">
            <Image src="/vercel.svg" width={200} height={50} alt="logo" />
            <nav className="flex flex-row items-center gap-4">
                {links.map(link => (<a onClick={(e)=>scrollEffect(e, link.href)} className="text-white max-md:text-xs" key={link.text} href={link.href}>{link.text.toUpperCase()}</a>))}
            </nav>
            <Button text={BOOK_BTN_TEXT} href={PHONE_LINK} type='link' />
        </header>
    )
}

export default Header;