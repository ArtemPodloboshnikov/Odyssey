import { Suspense } from "react"
import Loading from "../loading"
import FirstVisit from "@/components/FirstVisit"
import { Metadata } from "next"
import { upperFirstChar } from "@/lib/upperFirstChar"
import { CLUB_LINK } from "@/constants/links"

const title = upperFirstChar(CLUB_LINK.text);
const description = "Добро пожаловать в лучший ночной клуб в России! Наш клуб предлагает все самое лучшее - от самых горячих девочек и зажигательной музыки до вкусных напитков и заряжающей энергией атмосферы. Присоединяйтесь к нам, чтобы провести незабываемый вечер со своими друзьями или с кем-то особенным. Покупайте билеты прямо сейчас и приготовьтесь наслаждаться  всю ночь напролет!";
const descriptionArray = description.split(".");

export const metadata: Metadata = {
    title: title,
    description: description,
    keywords: "ночной клуб, вечеринка, мероприятия, танцы, музыка, ночная жизнь, Россия, билеты, напитки, развлечения, Санкт-Петербург, стриптизёрши, стриптиз, девушки",
    openGraph: {
        title: title,
        description: descriptionArray[0] + descriptionArray[1],
        url: `https://odyssey-ten.vercel.app${CLUB_LINK.href}`,
        images: [{
            url: "https://sun9-49.userapi.com/impg/4DF8ptGsL3oYmwefeG_EuO_lUmdUfi5-5pgT9g/XG3WFF8y3BI.jpg?size=964x726&quality=95&sign=b875187532284bf1c35abcf6125a477d&type=album"
        }]
    }
}

export default function Club() {
    return (
        <Suspense fallback={<Loading/>}>
            <FirstVisit />
        </Suspense>
    )
}