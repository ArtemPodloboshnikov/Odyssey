import { MenuCardType } from "@/typings";

const MenuCard: React.FC<MenuCardType> = ({imagePath, title, additional, price}) => {
    return (
        <div
        style={{backgroundImage: `url(${imagePath})`}}
        className="w-48 h-60 rounded-[12px] bg-center bg-no-repeat bg-cover cursor-pointer"
        >
            <div
            style={{backgroundColor: "rgba(0, 0, 0,.6)", backgroundBlendMode: "multiply"}}
            className="w-full h-full rounded-[12px] flex flex-col place-items-center place-content-center hover:hidden"
            >
                <h1 className="w-40 text-2xl font-semibold text-center">{title}</h1>
                <h5 className="w-36 text-center">{additional}</h5>
                <span>{price}₽</span>
            </div>
        </div>
    )
}

export default MenuCard;