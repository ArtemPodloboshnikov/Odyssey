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
        <div className="col-start-2 col-end-6 flex flex-row gap-10 justify-center mt-20">
            {features.map(feature => {
                return (
                    <div key={feature.icon} className="w-48 rounded-lg bg-white flex flex-col items-center p-10">
                        <Image src={`/images/features/${feature.icon}`} alt="" width={100} height={100} />
                        <h2 className="text-red-500 text-xl font-semibold text-center">{feature.title}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default Features;