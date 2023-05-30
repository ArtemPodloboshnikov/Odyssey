import { changeJSON } from "@/lib/changeJSON";
import { getFormData } from "@/lib/getFormData";
import { uploadFiles } from "@/lib/uploadFiles";
import { CategoryImages, ChangeJsonMethods, SectionJsonTypes, StocksConfig } from "@/typings";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { DialogWindowType } from "../DialogWindow";
import { DELETE_BTN_TEXT, STOCKS_PLACEHOLDER, STOCKS_TITLE, STOCKS_TITLE_PLACEHOLDER, TIME_PLACEHOLDER, UPDATE_BTN_TEXT } from "@/constants/placeholders";
import Input, { InputIcons } from "../Input";
import Textarea from "../Textarea";
import Galary from "../Galary";
import FileLoader from "../FileLoader";
import Button, { ButtonStyle } from "../Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { deleteJSON } from "@/lib/deleteJSON";
import { getJSON } from "@/lib/getJSON";
import { deleteFile } from "@/lib/deleteFile";

type FormStocksProps = {
    setDialog: Dispatch<SetStateAction<{
        open: boolean;
        status: number;
        type: DialogWindowType
    }>>
}

const FormStocks: React.FC<FormStocksProps> = ({setDialog}) => {
    enum InputsName {
        IMAGE="imageStocks",
        DESCRIPTION="descriptionStocks",
        TIME="time",
        TITLE="title"
    }

    type StocksInputs = {
        [InputsName.IMAGE]: {[key: number]: File},
        [InputsName.DESCRIPTION]: string,
        [InputsName.TIME]: string,
        [InputsName.TITLE]: string
    }

    const {
        register: registerStocks,
        handleSubmit: handleSubmitStocks,
        setValue: setValueStocks,
        getValues: getValuesStocks,
        control: controlStocks,
        reset
    } = useForm<StocksInputs>();

    const [stocks, setStocks] = useState<StocksConfig>({});

    const stocksTitle = useWatch({name: InputsName.TITLE, control: controlStocks});

    const onSubmit: SubmitHandler<StocksInputs> = async (data) => {
        const files = Object.values(data[InputsName.IMAGE]);
        if (files.length) {
            const formData = getFormData(data[InputsName.IMAGE]);
            await uploadFiles(formData, CategoryImages.STOCKS);
        }

        const stock: StocksConfig = {
            [data.title]: {
                time: data.time||stocks[stocksTitle]?.time,
                description: data.descriptionStocks||stocks[stocksTitle]?.description,
                imagePath: files[0] ? `/images/stocks/${files[0].name}` : stocks[data.title]?.imagePath
            }
        }

        let res: number;
        if (stocks[data.title] !== undefined) {
            res = await changeJSON(SectionJsonTypes.STOCKS, stock, ChangeJsonMethods.PUT);
            setDialog({open: true, status: res, type: DialogWindowType.UPDATE})
        }
        else {
            res = await changeJSON(SectionJsonTypes.STOCKS, stock, ChangeJsonMethods.POST)
            setDialog({open: true, status: res, type: DialogWindowType.CREATE})
        }
        setStocks({});
        reset();
    }

    const onDelete: SubmitHandler<StocksInputs> = async (dataUpdate) =>{
        const res = await deleteJSON(SectionJsonTypes.STOCKS, dataUpdate.title);
        setStocks({})
        reset();
        setDialog({open: true, status: res, type: DialogWindowType.DELETE})
    }

    const deleteImage = async (path: string) => {
        await deleteFile(path);
        const bufData = {...stocks};
        bufData[stocksTitle].imagePath = "";
        setStocks(bufData);
    }

    const galaryStocks = useWatch({name: InputsName.IMAGE, control: controlStocks});

    useEffect(()=>{
        const getData = async () => {
            setStocks(await getJSON(SectionJsonTypes.STOCKS));
        }

        if (Object.keys(stocks).length === 0)
            getData();
    }, [stocks])
    return (
        <form onSubmit={handleSubmitStocks(onSubmit)} className="h-[600px] overflow-y-auto scrollbar pr-5 col-start-3 col-end-5 w-full flex flex-col gap-y-5 max-lg:col-start-1 max-lg:col-end-7 max-lg:h-fit max-lg:mt-5 max-lg:pr-0 max-lg:overflow-y-visible">
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
                <Galary paths={stocks[stocksTitle] && stocks[stocksTitle].imagePath ? [stocks[stocksTitle].imagePath] : undefined} files={galaryStocks} deleteImage={deleteImage} />
            </div>
            <FileLoader register={registerStocks(InputsName.IMAGE)} setValue={setValueStocks} getValues={getValuesStocks} />
            <Button click={handleSubmitStocks(onSubmit)} text={UPDATE_BTN_TEXT} type="submit" style={ButtonStyle.CTA} />
            <Button click={handleSubmitStocks(onDelete)} text={DELETE_BTN_TEXT} type="submit" style={ButtonStyle.SIMPLE} />
        </form>
    )
}

export default FormStocks;