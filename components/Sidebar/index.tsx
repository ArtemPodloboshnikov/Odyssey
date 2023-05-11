"use client"
import { CLUB_LINK, GIRLS_LINK, MENU_LINK, SERVICES_LINK, VACANCIES_LINK } from '@/constants/links';
import Link from 'next/link'

const Header: React.FC = () => {
    const links = [CLUB_LINK, GIRLS_LINK, MENU_LINK, SERVICES_LINK, VACANCIES_LINK];
    return (
        <nav className="flex flex-col items-center place-content-center gap-y-4">
            {links.map(link => (<Link key={link.text} href={link.href}>{link.text.toUpperCase()}</Link>))}
        </nav>
    )
}

export default Header;