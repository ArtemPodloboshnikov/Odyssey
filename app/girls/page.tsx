import { Suspense } from "react";
import Loading from "../loading";
import FirstVisit from "@/components/FirstVisit";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Богини",
    description: "Ищете незабываемые впечатления от ночной жизни? Присоединяйтесь к нашему клубу и станьте свидетелем потрясающих движений наших талантливых танцовщиц. Наши прекрасные девушки будут развлекать вас всю ночь напролет своими гипнотическими выступлениями. Не пропустите самое интересное – приходите к нам прямо сейчас!",
    keywords: "ночной клуб, вечеринка, мероприятия, танцы, музыка, ночная жизнь, Россия, билеты, напитки, развлечения, Санкт-Петербург, стриптизёрши, стриптиз, девушки"
}

export default function Girls() {
    return (
        <Suspense fallback={<Loading/>}>
            <FirstVisit />
        </Suspense>
    )
}