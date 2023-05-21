"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import { BOOK_BTN_TEXT, ERORR_PHONE_MESSAGE, ERROR_FIO_MESSAGE, PHONE_PLACEHOLDER, USER_NAME_PLACEHOLDER } from "@/constants/placeholders";
import { validateName, validatePhone } from "@/lib/validateFields";
import Button, { ButtonStyle } from "../Button";

type BookTableProps = {
    id: string,
    title: string,
}

const BookTable: React.FC<BookTableProps> = ({id, title}) => {
    enum InputsName {
        NAME="name",
        PHONE="phone"
    }
    type FormInputs = {
        [InputsName.NAME]: string,
        [InputsName.PHONE]: string
    }
    const {register, handleSubmit, formState: {errors}} = useForm<FormInputs>();
    const onSubmit: SubmitHandler<FormInputs> = data => console.log(data);
    return (
        <div className="col-start-3 col-end-5 mt-5 flex flex-col gap-y-7" id={id}>
            <h1 className="text-4xl font-semibold self-center">{title.toUpperCase()}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                <Input
                register={register(InputsName.NAME, {required: true, validate: (name)=>validateName(name)})}
                placeholder={USER_NAME_PLACEHOLDER}
                textHelper={ERROR_FIO_MESSAGE}
                errors={errors}
                />
                <Input
                register={register(InputsName.PHONE, {required: true, validate: (phone)=>validatePhone(phone)})}
                placeholder={PHONE_PLACEHOLDER}
                textHelper={ERORR_PHONE_MESSAGE}
                errors={errors}
                />
                <Button text={BOOK_BTN_TEXT} style={ButtonStyle.CTA} />
            </form>
        </div>
    )
}

export default BookTable;