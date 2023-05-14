import { Suspense, lazy } from "react";
import Loading from "../loading";
import { GetTypeGalary } from "@/typings";
import { Metadata } from "next";
import { MENU_LINK } from "@/constants/links";
import { upperFirstChar } from "@/lib/upperFirstChar";

const title = upperFirstChar(MENU_LINK.text);
const description = "Побалуйте себя восхитительными блюдами и потрясающими видами в сопровождении компании наших прекрасных девушек. Проведите незабываемую ночь гламура и волнения в нашем первоклассном заведении.";

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: "ночной клуб, вечеринка, мероприятия, танцы, музыка, ночная жизнь, Россия, билеты, напитки, развлечения, Санкт-Петербург, стриптизёрши, стриптиз",
  openGraph: {
    title: title,
    description: description.split(".")[0],
    url: `https://odyssey-ten.vercel.app${MENU_LINK.href}`,
    images: [{
        url: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
    }],
  }
}

const UserGalaryLazy = lazy(()=>import("@/components/UserGalary"))

export default function Menu() {
    return (
        <Suspense fallback={<Loading/>}>
          <UserGalaryLazy getType={GetTypeGalary.MENU} />
        </Suspense>
    )
}