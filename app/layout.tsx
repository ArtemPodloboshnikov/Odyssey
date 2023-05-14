import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
import './globals.css'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="grid grid-cols-6 h-screen">
          {children}
        </main>
        <Sidebar/>
      </body>
    </html>
  )
}
