"use client"

import { deleteFile } from "@/lib/deleteFile";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Galary from "../Galary";
import FileLoader from "../FileLoader";
import Button from "../Button";
import { ERROR_TIME_MESSAGE, STOCKS_PLACEHOLDER, STOCKS_TITLE, STOCKS_TITLE_PLACEHOLDER, TIME_PLACEHOLDER, UPDATE_BTN_TEXT } from "@/constants/placeholders";
import { uploadFiles } from "@/lib/uploadFiles";
import { ChangeJsonMethods, FormCategory, SectionJsonTypes, StocksConfig } from "@/typings";
import { MENU_LINK, SERVICES_LINK } from "@/constants/links";
import { changeJSON } from "@/lib/changeJSON";
import Input, { InputIcons } from "../Input";
import Textarea from "../Textarea";

export type FormServicesProps = {
    services: string[],
    menu: string[],
    stocks: StocksConfig
}

type FormServicesAdditionalProps = {
    setDialog: Dispatch<SetStateAction<{
        open: boolean;
        status: number;
    }>>,
    setData: Dispatch<SetStateAction<any>>
}

const FormServices: React.FC<FormServicesProps&FormServicesAdditionalProps> = ({menu, services, stocks, setData, setDialog}) => {
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

    type StocksInputs = {
        [InputsName.STOCKS]: {[key: number]: File},
        [InputsName.DESCRIPTION]: string,
        [InputsName.TIME]: string,
        [InputsName.TITLE]: string
    }

    const {
        register: registerServices,
        handleSubmit: handleSubmitServices,
        setValue: setValueServices,
        getValues: getValuesServices,
        control: controlServices
    } = useForm<ServicesInputs>();

    const getFormData = (data: {[key: number]: File}) => {
        const files = Object.values(data);
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file, file.name)
        })

        return formData;
    }

    const onSubmitServices: SubmitHandler<ServicesInputs> = async (data) => {
        const formData = getFormData(data[InputsName.SERVICES]);
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
        const formData = getFormData(data[InputsName.MENU]);
        const res = await uploadFiles(formData, FormCategory.MENU);
        setDialog({open: true, status: res});
    }

    const {
        register: registerStocks,
        handleSubmit: handleSubmitStocks,
        setValue: setValueStocks,
        getValues: getValuesStocks,
        control: controlStocks,
        formState: {errors: errorsStocks}
    } = useForm<StocksInputs>();

    const stocksTitle = useWatch({name: InputsName.TITLE, control: controlStocks});

    const onSubmitStocks: SubmitHandler<StocksInputs> = async (data) => {
        const files = Object.values(data[InputsName.STOCKS]);
        if (files.length) {
            const formData = getFormData(data[InputsName.STOCKS]);
            await uploadFiles(formData, FormCategory.STOCKS);
        }

            const stock: StocksConfig = {
                [data.title]: {
                    time: data.time||stocks[stocksTitle].time,
                    description: data.description||stocks[stocksTitle].description,
                    imagePath: files[0] ? `/images/stocks/${files[0].name}` : stocks[data.title]?.imagePath
                }
            }

            let res: number;
            if (stocks[data.title] !== undefined)
                res = await changeJSON(SectionJsonTypes.STOCKS, stock, ChangeJsonMethods.PUT);
            else
                res = await changeJSON(SectionJsonTypes.STOCKS, stock, ChangeJsonMethods.POST)
            setDialog({open: true, status: res})
    }

    const galaryServices = useWatch({name: InputsName.SERVICES, control: controlServices});
    const galaryMenu = useWatch({name: InputsName.MENU, control: controlMenu});
    const galaryStocks = useWatch({name: InputsName.STOCKS, control: controlStocks});

    const deleteImage = async (path: string) => {
        await deleteFile(path);
        setData({menu: [], services: []});
    }

    return (
        <>
        <form onSubmit={handleSubmitServices(onSubmitServices)} className="w-full h-fit flex flex-col gap-y-5">
            <h1 className="text-2xl font-extrabold text-center">{SERVICES_LINK.text.toUpperCase()}</h1>
            <div className="max-lg:relative">
                <Galary paths={services} files={galaryServices} deleteImage={deleteImage} slider />
            </div>
            <FileLoader register={registerServices(InputsName.SERVICES)} setValue={setValueServices} getValues={getValuesServices} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        <form onSubmit={handleSubmitMenu(onSubmitMenu)} className="mb-5 w-full h-fit flex flex-col gap-y-5">
            <h1 className="text-2xl font-extrabold text-center">{MENU_LINK.text.toUpperCase()}</h1>
            <div className="max-lg:relative">
                <Galary paths={menu} files={galaryMenu} deleteImage={deleteImage} slider />
            </div>
            <FileLoader register={registerMenu(InputsName.MENU)} setValue={setValueMenu} getValues={getValuesMenu} multiple />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        <form onSubmit={handleSubmitStocks(onSubmitStocks)} className="mb-5 w-full h-fit flex flex-col gap-y-5">
            <h1 className="text-2xl font-extrabold text-center">{STOCKS_TITLE.toUpperCase()}</h1>
            <Input
            register={registerStocks(InputsName.TITLE, {required: true})}
            placeholder={STOCKS_TITLE_PLACEHOLDER}
            type="select"
            options={Object.keys(stocks)}
            setValue={setValueStocks}
            />
            <Input
            register={registerStocks(InputsName.TIME)}
            placeholder={TIME_PLACEHOLDER}
            defaultValue={stocks[stocksTitle]?.time}
            icon={InputIcons.CLOCK}
            />
            <Textarea
            register={registerStocks(InputsName.DESCRIPTION)}
            placeholder={STOCKS_PLACEHOLDER}
            defaultValue={stocks[stocksTitle]?.description}
            />
            <div className="max-lg:relative">
                <Galary paths={stocks[stocksTitle] ? [stocks[stocksTitle].imagePath] : undefined} files={galaryStocks} deleteImage={deleteImage} />
            </div>
            <FileLoader register={registerStocks(InputsName.STOCKS)} setValue={setValueStocks} getValues={getValuesStocks} />
            <Button text={UPDATE_BTN_TEXT} type="submit" />
        </form>
        </>
    )
}

export default FormServices;