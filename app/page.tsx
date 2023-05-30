import Features from "@/components/Features";
import FormVacancy from "@/components/FormVacancy";
import SectionGalary from "@/components/SectionGalary";
import Stocks from "@/components/Stocks";
import Taxi from "@/components/Taxi";
import { GIRLS_LINK, INTERIOR_LINK, MENU_LINK, SERVICES_LINK, VACANCIES_LINK } from "@/constants/links";
import { SectionGalaryTypes } from "@/typings";

export default function Home() {
  return (
    <>
    <div className="col-start-1 col-end-7 h-screen overflow-hidden before:content-[''] before:z-20 before:bg-black before:left-0 before:top-0 before:absolute before:w-screen before:min-h-screen before:bg-opacity-70">
      <h1 className="absolute z-20 mt-[30%] ml-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl w-[900px] leading-relaxed neon_text max-lg:text-2xl max-lg:w-[390px] max-lg:mt-[90%] max-lg:text-center max-lg:px-5">Почувствовать себя в качестве героя собственного приключения в «Odyssey»</h1>
      <video autoPlay loop muted className="relative top-0 left-0 min-w-full min-h-full w-auto h-auto max-w-none max-lg:left-[-600px]">
            <source src={`/video/striptease_dance.mp4`} type="video/mp4"></source>
      </video>
    </div>
    <Stocks/>
    <SectionGalary
    id={INTERIOR_LINK.href}
    title={INTERIOR_LINK.text}
    text="В нашем стриптиз клубе мы старались сделать всё, чтобы клиент чувствовал себя как дома. Несмотря на то, что клуб является местом для развлечения, мы приложили много усилий для создания комфортного и приятного места. Помещение украшено легкими цветными декорациями, которые создают лёгкое и веселый настроение. Металлические стулья и столы расположены так, чтобы клиенты могли комфортно сидеть и наслаждаться представлением. Также в клубе есть большой бар, где можно найти широкий выбор напитков и еды. Интерьер клуба также оборудован современными системами звукового и светового оборудования, которые помогают создать идеальную атмосферу для представления."
    section={SectionGalaryTypes.INTERIOR}
    />
    <SectionGalary
    id={GIRLS_LINK.href}
    title={GIRLS_LINK.text}
    text="В «Odyssey» мы рады видеть абсолютно любых гостей. От брутальных байкеров и элегантных бизнесменов до женских компаний и девичников. Наши кошки найдут подход абсолютно ко всем, согласуют все нюансы вашего отдыха и покажут приятный сервис, который покорит даже самого привередливого гостя."
    section={SectionGalaryTypes.GIRLS}
    />
    <Features />
    <SectionGalary
    id={MENU_LINK.href}
    title={MENU_LINK.text}
    text="Каждый из нас знает, что качественный алкоголь и вкусные коктейли являются одним из главных пунктов во время отдыха. В барной карте «Odyssey» представлены самые популярные и востребованные марки любого алкоголя,который подойдет даже самым избирательным гостям. Наши прекрасные девушки покажут тебе самую необычную и интересную подачу напитков, а бармены приготовят любой коктейль по твоим желаниям и предпочтениям."
    section={SectionGalaryTypes.MENU}
    />
    <SectionGalary
    id={SERVICES_LINK.href}
    title={SERVICES_LINK.text}
    section={SectionGalaryTypes.SERVICES}
    />
    <FormVacancy id={VACANCIES_LINK.href} title={VACANCIES_LINK.text} />
    <Taxi />
    </>
  )
}
