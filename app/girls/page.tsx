import { Suspense } from "react";
import Loading from "../loading";
import FirstVisit from "@/components/FirstVisit";
import { Metadata } from "next";
import { GIRLS_LINK } from "@/constants/links";
import { upperFirstChar } from "@/lib/upperFirstChar";

const title = upperFirstChar(GIRLS_LINK.text);

export const metadata: Metadata = {
    title: title,
    description: "Ищете незабываемые впечатления от ночной жизни? Присоединяйтесь к нашему клубу и станьте свидетелем потрясающих движений наших талантливых танцовщиц. Наши прекрасные девушки будут развлекать вас всю ночь напролет своими гипнотическими выступлениями. Не пропустите самое интересное – приходите к нам прямо сейчас!",
    keywords: "ночной клуб, вечеринка, мероприятия, танцы, музыка, ночная жизнь, Россия, билеты, напитки, развлечения, Санкт-Петербург, стриптизёрши, стриптиз, девушки",
    openGraph: {
        title: title,
        description: "Ищете незабываемые впечатления от ночной жизни? Присоединяйтесь к нашему клубу и станьте свидетелем потрясающих движений наших талантливых танцовщиц.",
        url: `https://odyssey-ten.vercel.app${GIRLS_LINK.href}`,
        images: [{
            url: "https://images.unsplash.com/photo-1621354694373-75c4020d0a75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        }],
    }
}

export default function Girls() {
    return (
        <Suspense fallback={<Loading/>}>
            <FirstVisit />
        </Suspense>
    )
}