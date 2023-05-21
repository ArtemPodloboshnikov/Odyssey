import { CALL_BTN_TEXT } from "@/constants/placeholders";
import Button from "../Button";
import { PHONE_LINK } from "@/constants/links";

const Taxi: React.FC = () => {
    return (
        <div className="col-start-2 col-end-6 flex flex-col gap-y-5 items-center">
            <h1 className="text-4xl font-semibold text-center">Действует программа лояльности для таксистов</h1>
            <Button text={CALL_BTN_TEXT} type="link" href={PHONE_LINK} />
        </div>
    )
}

export default Taxi;