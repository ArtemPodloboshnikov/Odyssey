import Loading from "../loading";
import { GetTypeGalary } from "@/typings";
import { Suspense, lazy } from "react";
import { Metadata } from "next";
import { upperFirstChar } from "@/lib/upperFirstChar";
import { SERVICES_LINK } from "@/constants/links";

const title = upperFirstChar(SERVICES_LINK.text);
const description = "Побалуйте себя вкусными блюдами и напитками из меню нашего ночного клуба. Мы предлагаем широкий выбор аппетитных блюд, которые удовлетворят ваши вкусовые пристрастия, а также обширный ассортимент напитков на выбор. Приходите за едой и оставайтесь на вечеринке с живой музыкой, VIP-секциями и великолепной атмосферой. Присоединяйтесь к нам и насладитесь незабываемой ночью!";
const descriptionArray = description.split(".");

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: "ночной клуб, меню, еда, напитки, живая музыка, VIP, атмосфера, стриптиз, Санкт-Петербург",
  openGraph: {
    title: title,
    description: descriptionArray[0] + descriptionArray[1],
    url: `https://odyssey-ten.vercel.app${SERVICES_LINK.href}`
  }
}

const UserGalaryLazy = lazy(()=>import("@/components/UserGalary"))

export default function Services() {
  return (
    <Suspense fallback={<Loading/>}>
      <UserGalaryLazy getType={GetTypeGalary.SERVICES} />
    </Suspense>
  )
}