"use client"

import { deleteFile } from "@/lib/deleteFile";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Galary from "../Galary";
import FileLoader from "../FileLoader";
import Button from "../Button";
import { UPDATE_BTN_TEXT } from "@/constants/placeholders";

export type FormServicesProps = {
    services: string[],
    menu: string[]
}

const FormServices: React.FC<FormServicesProps&{setData: Dispatch<SetStateAction<any>>}> = ({menu, services, setData}) => {
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

    const onSubmitServices: SubmitHandler<ServicesInputs> = async (data) => {
        console.log(data);
    }

    const {
        register: registerMenu,
        handleSubmit: handleSubmitMenu,
        setValue: setValueMenu,
        getValues: getValuesMenu,
        control: controlMenu
    } = useForm<MenuInputs>();

    const onSubmitMenu: SubmitHandler<MenuInputs> = async (data) => {
        console.log(data);
    }

    const galaryServices = useWatch({name: InputsName.SERVICES, control: controlServices});
    const galaryMenu = useWatch({name: InputsName.MENU, control: controlMenu});

    const deleteImage = async (path: string) => {
        await deleteFile(path);
        setData({menu: [], services: []});
    }

    return (
        <>
        <form onSubmit={handleSubmitServices(onSubmitServices)} style={{height: "600px"}} className="w-full flex flex-col gap-y-5">
            <Galary paths={services} files={galaryServices} deleteImage={deleteImage} slider />
            <FileLoader register={registerServices(InputsName.SERVICES)} setValue={setValueServices} getValues={getValuesServices} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        <form onSubmit={handleSubmitMenu(onSubmitMenu)} style={{height: "600px"}} className="w-full flex flex-col gap-y-5">
            <Galary paths={menu} files={galaryMenu} deleteImage={deleteImage} slider />
            <FileLoader register={registerMenu(InputsName.MENU)} setValue={setValueMenu} getValues={getValuesMenu} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        </>
    )
}

export default FormServices;