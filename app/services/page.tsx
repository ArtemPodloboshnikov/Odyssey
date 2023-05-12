import Loading from "../loading";
import { GetTypeGalary } from "@/typings";
import { Suspense, lazy } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Побалуйте себя вкусными блюдами и напитками из меню нашего ночного клуба. Мы предлагаем широкий выбор аппетитных блюд, которые удовлетворят ваши вкусовые пристрастия, а также обширный ассортимент напитков на выбор. Приходите за едой и оставайтесь на вечеринке с живой музыкой, VIP-секциями и великолепной атмосферой. Присоединяйтесь к нам и насладитесь незабываемой ночью!",
  keywords: "ночной клуб, меню, еда, напитки, живая музыка, VIP, атмосфера, стриптиз, Санкт-Петербург"
}

const UserGalaryLazy = lazy(()=>import("@/components/UserGalary"))

export default function Services() {
  return (
    <Suspense fallback={<Loading/>}>
      <UserGalaryLazy getType={GetTypeGalary.SERVICES} />
    </Suspense>
  )
}