"use client"

import { deleteFile } from "@/lib/deleteFile";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Galary from "../Galary";
import FileLoader from "../FileLoader";
import Button from "../Button";
import { UPDATE_BTN_TEXT } from "@/constants/placeholders";
import { uploadFiles } from "@/lib/uploadFiles";
import { FormCategory } from "@/typings";

export type FormServicesProps = {
    services: string[],
    menu: string[]
}

type FormServicesAdditionalProps = {
    setDialog: Dispatch<SetStateAction<{
        open: boolean;
        status: number;
    }>>,
    setData: Dispatch<SetStateAction<any>>
}

const FormServices: React.FC<FormServicesProps&FormServicesAdditionalProps> = ({menu, services, setData, setDialog}) => {
    enum InputsName {
        MENU="menu",
        SERVICES="services"
    }

    type ServicesInputs = {
        [InputsName.SERVICES]: {[key: number]: File}
    }

    type MenuInputs = {
        [InputsName.MENU]: {[key: number]: File}
    }

    const {
        register: registerServices,
        handleSubmit: handleSubmitServices,
        setValue: setValueServices,
        getValues: getValuesServices,
        control: controlServices
    } = useForm<ServicesInputs>();

    const getFormData = (data: {[nameInput: string]: {[key: number]: File}}, name: InputsName) => {
        const files = Object.values(data[name]);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file, file.name)
        })

        return formData;
    }

    const onSubmitServices: SubmitHandler<ServicesInputs> = async (data) => {
        const formData = getFormData(data, InputsName.SERVICES);
        const res = await uploadFiles(formData, FormCategory.SERVICIES);
        setDialog({open: true, status: res});
    }

    const {
        register: registerMenu,
        handleSubmit: handleSubmitMenu,
        setValue: setValueMenu,
        getValues: getValuesMenu,
        control: controlMenu
    } = useForm<MenuInputs>();

    const onSubmitMenu: SubmitHandler<MenuInputs> = async (data) => {
        const formData = getFormData(data, InputsName.MENU);
        const res = await uploadFiles(formData, FormCategory.MENU);
        setDialog({open: true, status: res});
    }

    const galaryServices = useWatch({name: InputsName.SERVICES, control: controlServices});
    const galaryMenu = useWatch({name: InputsName.MENU, control: controlMenu});

    const deleteImage = async (path: string) => {
        await deleteFile(path);
        setData({menu: [], services: []});
    }

    return (
        <>
        <form onSubmit={handleSubmitServices(onSubmitServices)} className="w-full h-fit flex flex-col gap-y-5">
            <div className="max-md:relative max-md:-left-10">
                <Galary paths={services} files={galaryServices} deleteImage={deleteImage} slider />
            </div>
            <FileLoader register={registerServices(InputsName.SERVICES)} setValue={setValueServices} getValues={getValuesServices} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        <form onSubmit={handleSubmitMenu(onSubmitMenu)} className="mb-5 w-full h-fit flex flex-col gap-y-5">
            <div className="max-md:relative max-md:-left-10">
                <Galary paths={menu} files={galaryMenu} deleteImage={deleteImage} slider />
            </div>
            <FileLoader register={registerMenu(InputsName.MENU)} setValue={setValueMenu} getValues={getValuesMenu} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        </>
    )
}

export default FormServices;