"use client"

import { deleteFile } from "@/lib/deleteFile";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Galary from "../Galary";
import FileLoader from "../FileLoader";
import Button from "../Button";
import { UPDATE_BTN_TEXT } from "@/constants/placeholders";
import { uploadFiles } from "@/lib/uploadFiles";
import { CategoryImages, SectionGalaryTypes } from "@/typings";
import { MENU_LINK, SERVICES_LINK } from "@/constants/links";
import { DialogWindowType } from "../DialogWindow";
import { getFormData } from "@/lib/getFormData";
import { getFilesPaths } from "@/lib/getFilesPaths";


type FormServicesProps = {
    setDialog: Dispatch<SetStateAction<{
        open: boolean;
        status: number;
        type: DialogWindowType
    }>>
}

const FormServices: React.FC<FormServicesProps> = ({setDialog}) => {
    enum InputsName {
        MENU="menu",
        SERVICES="services",
        STOCKS="stocks",
        DESCRIPTION="description",
        TIME="time",
        TITLE="title"
    }

    type ServicesInputs = {
        [InputsName.SERVICES]: {[key: number]: File}
    }

    type MenuInputs = {
        [InputsName.MENU]: {[key: number]: File}
    }

    type DataType = {
        services: string[],
        menu: string[],
    }

    const {
        register: registerServices,
        handleSubmit: handleSubmitServices,
        setValue: setValueServices,
        getValues: getValuesServices,
        control: controlServices
    } = useForm<ServicesInputs>();

    const dataDefault: DataType = {menu: [], services: []};
    const [data, setData] = useState<DataType>(dataDefault);

    const onSubmitServices: SubmitHandler<ServicesInputs> = async (data) => {
        const formData = getFormData(data[InputsName.SERVICES]);
        const res = await uploadFiles(formData, CategoryImages.SERVICIES);
        setDialog({open: true, status: res, type: DialogWindowType.UPDATE});
    }

    const {
        register: registerMenu,
        handleSubmit: handleSubmitMenu,
        setValue: setValueMenu,
        getValues: getValuesMenu,
        control: controlMenu
    } = useForm<MenuInputs>();

    const onSubmitMenu: SubmitHandler<MenuInputs> = async (data) => {
        const formData = getFormData(data[InputsName.MENU]);
        const res = await uploadFiles(formData, CategoryImages.MENU);
        setDialog({open: true, status: res, type: DialogWindowType.UPDATE});
    }



    const galaryServices = useWatch({name: InputsName.SERVICES, control: controlServices});
    const galaryMenu = useWatch({name: InputsName.MENU, control: controlMenu});

    const deleteImage = async (path: string) => {
        const res = await deleteFile(path);
        setData(dataDefault);
        setDialog({open: true, status: res, type: DialogWindowType.DELETE})
    }

    useEffect(()=>{
        const getData = async () => {
            const services = await getFilesPaths(SectionGalaryTypes.SERVICES);
            const menu = await getFilesPaths(SectionGalaryTypes.MENU);
            setData({
                services: services,
                menu: menu
            });
        }

        if (data.menu.length === 0)
            getData();
    })
    return (
        <>
        <form onSubmit={handleSubmitServices(onSubmitServices)} className="w-full h-fit flex flex-col gap-y-5">
            <h1 className="text-2xl font-extrabold text-center">{SERVICES_LINK.text.toUpperCase()}</h1>
            <div className="max-lg:relative">
                <Galary paths={data.services} files={galaryServices} deleteImage={deleteImage} slider />
            </div>
            <FileLoader register={registerServices(InputsName.SERVICES)} setValue={setValueServices} getValues={getValuesServices} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        <form onSubmit={handleSubmitMenu(onSubmitMenu)} className="mb-5 w-full h-fit flex flex-col gap-y-5">
            <h1 className="text-2xl font-extrabold text-center">{MENU_LINK.text.toUpperCase()}</h1>
            <div className="max-lg:relative">
                <Galary paths={data.menu} files={galaryMenu} deleteImage={deleteImage} slider />
            </div>
            <FileLoader register={registerMenu(InputsName.MENU)} setValue={setValueMenu} getValues={getValuesMenu} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        </>
    )
}

export default FormServices;