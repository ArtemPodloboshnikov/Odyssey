import { ImageType } from "@/typings";

type VacancyCardType = {
    title: string,
    description: string,
    salary: number,
    count: number,
    click: ()=>void
} & Pick<ImageType, "imagePath">;

const VacancyCard: React.FC<VacancyCardType> = ({imagePath, title, description, salary, count, click}) => {
    return (
        <div
        style={{backgroundImage: `url(${imagePath})`}}
        className="group h-5/6 rounded-[12px] bg-center bg-no-repeat bg-cover cursor-pointer"
        onClick={click}
        >
            <div
            style={{backgroundColor: "rgba(0, 0, 0,.6)"}}
            className="w-full h-full rounded-[12px] flex flex-col place-items-center place-content-center invisible group-hover:visible p-10"
            >
                <h1 className="w-40 text-2xl font-semibold text-center">{title}</h1>
                <div className="grid grid-flow-col justify-between w-full">
                    <span>Рабочих мест: {count}</span>
                    <span>з/п: {salary}</span>
                </div>
                <p className="overflow-y-auto scrollbar text-justify">{description}</p>
            </div>
        </div>
    )
}

export default VacancyCard;