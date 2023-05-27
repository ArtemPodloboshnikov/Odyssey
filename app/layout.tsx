import { Metadata } from 'next';
import './globals.css'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Piazzolla } from 'next/font/google';

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    template: "Odyssey | %s",
    absolute: "Odyssey",
    default: "Odyssey"
  },
  description: "Добро пожаловать в лучший ночной клуб в России! Наш клуб предлагает все самое лучшее - от самых горячих девочек и зажигательной музыки до вкусных напитков и заряжающей энергией атмосферы. Присоединяйтесь к нам, чтобы провести незабываемый вечер со своими друзьями или с кем-то особенным. Покупайте билеты прямо сейчас и приготовьтесь наслаждаться  всю ночь напролет!",
  keywords: "ночной клуб, вечеринка, мероприятия, танцы, музыка, ночная жизнь, Россия, билеты, напитки, развлечения, Санкт-Петербург, стриптизёрши, стриптиз",
  openGraph: {
    title: "Odyssey",
    description: "Добро пожаловать в лучший ночной клуб в России! Наш клуб предлагает все самое лучшее - от самых горячих девочек и зажигательной музыки до вкусных напитков и заряжающей энергией атмосферы.",
    url: "https://odyssey-ten.vercel.app",
    siteName: "Odyssey",
    type: "website",
    locale: "ru-RU",
    images: [{
      url: "https://sun9-67.userapi.com/impg/teYxq7oS6JPLIVDgPuVAQm6RtVJh4NfI2tdiuw/SDJK0AbAfrM.jpg?size=828x563&quality=95&sign=a8dc33b692288e47f00e7aba77293294&type=album"
    }]
  }
}

const piazzolla = Piazzolla({
  subsets: ['cyrillic'],
  preload: true,
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={piazzolla.className}>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
        <link rel="icon" href="/images/logo.jpg"/>
      </head>
      <body className="scrollbar">
        <Header/>
        <main className="grid grid-cols-6 h-auto">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}
