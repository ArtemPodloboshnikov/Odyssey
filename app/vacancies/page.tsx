import { Metadata } from "next";
import { Suspense, lazy } from "react";
import Loading from "../loading";
import { upperFirstChar } from "@/lib/upperFirstChar";
import { VACANCIES_LINK } from "@/constants/links";

const title = upperFirstChar(VACANCIES_LINK.text);
const description = "Присоединяйтесь к нашей команде в ярком и захватывающем ночном клубе! Мы нанимаем дружелюбных и общительных людей, чтобы обеспечить исключительный сервис для наших клиентов. Как часть нашей команды, у вас будет возможность работать с разнообразной группой талантливых людей, доставляя нашим гостям волшебные моменты и исключительные впечатления. Кандидаты должны быть надежными, полными энтузиазма и получать удовольствие от работы в быстро меняющейся среде. Предпочтителен предыдущий опыт работы в индустрии гостеприимства или развлечений.";
const descriptionArray = description.split(".");

export const metadata: Metadata = {
    title: title,
    description: description,
    keywords: "ночной клуб, вакансия, индустрия развлечений, гостеприимство, обслуживание клиентов, быстро меняющаяся среда, командный игрок, коммуникабельная личность, надежные, талантливые люди, разнообразная культура, опыт работы в сфере гостеприимства, предыдущий опыт работы в индустрии развлечений, Санкт-Петербург, стриптиз",
    openGraph: {
        title: title,
        description: descriptionArray[0] + descriptionArray[1],
        url: `https://odyssey-ten.vercel.app${VACANCIES_LINK.href}`,
        images: [{
            url: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1429&q=80"
        }],
    }
}

const FormVacancyLazy = lazy(()=>import("@/components/FormVacancy"))

export default function Vacancies() {
    return (
        <Suspense fallback={<Loading/>}>
            <FormVacancyLazy />
        </Suspense>
    )
}