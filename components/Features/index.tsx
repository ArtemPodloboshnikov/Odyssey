import { BLUR_DATA_URL } from "@/constants/placeholders";
import Image from "next/image";

const Features: React.FC = () => {
    type FeaturesType = {
        title: string,
        icon: string
    }
    const features: FeaturesType[] = [
        {
            title: "VIP комнаты",
            icon: "vip.svg"
        },
        {
            title: "Анонимность",
            icon: "carnival_mask.svg"
        },
        {
            title: "Будоражащая музыка",
            icon: "music.svg"
        },
        {
            title: "Эксклюзивные напитки",
            icon: "alcohol.svg"
        }
    ]

    return (
        <div className="col-start-2 col-end-6 flex flex-row gap-10 justify-center mt-20 max-lg:flex-col max-lg:items-center">
            {features.map(feature => {
                return (
                    <div key={feature.icon} className="relative w-48 rounded-lg bg-white flex flex-col items-center p-10">
                        <Image src={`/images/features/${feature.icon}`} alt="" width={100} height={100} placeholder="blur" loading="lazy" blurDataURL={BLUR_DATA_URL} />
                        <h2 className="text-red-500 text-xl font-semibold text-center">{feature.title}</h2>
                        <div className="neon_card neon_left rounded-lg"></div>
                        <div className="neon_card neon_top rounded-lg"></div>
                        <div className="neon_card neon_right rounded-lg"></div>
                        <div className="neon_card neon_bottom rounded-lg"></div>
                    </div>
                )
            })}
        </div>
    )
}

export default Features;