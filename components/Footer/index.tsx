"use client"

import { PHONE_LINK } from "@/constants/links";
import FirstVisit from "../FirstVisit";
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const path = usePathname();
    return (
        <footer className={`flex flex-col items-center mt-10 py-5 gap-y-5 ${path === "/admin" ? "hidden" : null}`}>
            <div className="grid grid-cols-3 justify-items-center gap-x-20 max-lg:text-xs max-lg:gap-x-5">
                <span className="text-center">г.Санкт-Петербург,<br/>Большая Конюшенная ул., 5</span>
                <span className="text-center">© 2023 | Odyssey<br/>Все права защищены</span>
                <div className="flex flex-col text-center">
                    <span>Ежедневно с с 19:00 до 07:00</span>
                    <a href={PHONE_LINK}>+7(995)232-28-11</a>
                </div>
            </div>
            <FirstVisit />
        </footer>
    );
}

export default Footer;