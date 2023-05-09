import { Suspense } from "react";
import Loading from "../loading";
import UserGalary from "@/components/UserGalary";
import { GetTypeGalary } from "@/typings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Меню",
  description: "Добро пожаловать в лучший ночной клуб в России! Наш клуб предлагает все самое лучшее - от самых горячих девочек и зажигательной музыки до вкусных напитков и заряжающей энергией атмосферы. Присоединяйтесь к нам, чтобы провести незабываемый вечер со своими друзьями или с кем-то особенным. Покупайте билеты прямо сейчас и приготовьтесь наслаждаться  всю ночь напролет!",
  keywords: "ночной клуб, вечеринка, мероприятия, танцы, музыка, ночная жизнь, Россия, билеты, напитки, развлечения, Санкт-Петербург, стриптизёрши, стриптиз"
}

export default function Menu() {
    return (
        <Suspense fallback={<Loading/>}>
           <UserGalary getType={GetTypeGalary.MENU} />
        </Suspense>
    )
}