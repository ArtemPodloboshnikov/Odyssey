"use client"

import Button, { ButtonStyle } from "@/components/Button";
import FileLoader from "@/components/FileLoader";
import Galary from "@/components/Galary";
import Input, { InputIcons } from "@/components/Input";
import Textarea from "@/components/Textarea";
import { VACANCIES_LINK } from "@/constants/links";
import { COUNT_PLACEHOLDER, DELETE_BTN_TEXT, PROFESSION_PLACEHOLDER, SALARY_PLACEHOLDER, UPDATE_BTN_TEXT, VACANCY_PLACEHOLDER } from "@/constants/placeholders";
import { changeJSON } from "@/lib/changeJSON";
import { deleteJSON } from "@/lib/deleteJSON";
import { getJSON } from "@/lib/getJSON";
import { uploadFiles } from "@/lib/uploadFiles";
import { ChangeJsonMethods, CategoryImages, SectionJsonTypes, VacanciesConfig } from "@/typings";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { DialogWindowType } from "../DialogWindow";
import { getFormData } from "@/lib/getFormData";
import { deleteFile } from "@/lib/deleteFile";

type FormJobProps = {
    setDialog: Dispatch<SetStateAction<{
        open: boolean;
        status: number;
        type: DialogWindowType
    }>>
}

const FormJob: React.FC<FormJobProps> = ({setDialog}) => {
    enum InputsName {
        PROFESSION="profession",
        SALARY="salary",
        COUNT="count",
        DESCRIPTION="descriptionJob",
        IMAGE="imageJob",
        CATEGORY="category"
    }

    type FormInputs = {
        [InputsName.PROFESSION]: string,
        [InputsName.SALARY]: number,
        [InputsName.COUNT]: number,
        [InputsName.DESCRIPTION]: string,
        [InputsName.IMAGE]: {[key: number]: File}
    }

    const {register, handleSubmit, setValue, getValues, control, reset} = useForm<FormInputs>();
    const profession = useWatch({name: InputsName.PROFESSION, control});
    const galary = useWatch({name: InputsName.IMAGE, control});
    const [data, setData] = useState<VacanciesConfig>({});
    const onSubmit: SubmitHandler<FormInputs> = async (dataUpdate) => {
        const files = Object.values(dataUpdate.imageJob);
            const vacancy: VacanciesConfig = {
                [dataUpdate.profession]: {
                    count: dataUpdate.count||data[profession]?.count,
                    description: dataUpdate.descriptionJob||data[profession]?.description,
                    salary: dataUpdate.salary||data[profession]?.salary,
                    imagePath: files[0] ? `/images/professions/${files[0].name}` : data[profession]?.imagePath
                }
            }
            if (files.length) {
                const formData = getFormData(dataUpdate.imageJob);
                await uploadFiles(formData, CategoryImages.VACANCIES);
            }
            let res: number;
            if (data[dataUpdate.profession] !== undefined) {
                res = await changeJSON(SectionJsonTypes.VACANCIES, vacancy, ChangeJsonMethods.PUT);
                setDialog({open: true, status: res, type: DialogWindowType.UPDATE})
            }
            else {
                res = await changeJSON(SectionJsonTypes.VACANCIES, vacancy, ChangeJsonMethods.POST);
                setDialog({open: true, status: res, type: DialogWindowType.CREATE});
            }
            setData({});
            reset();
    };

    const deleteImage = async (path: string) => {
        await deleteFile(path);
        const bufData = {...data};
        bufData[profession].imagePath = "";
        setData(bufData);
    }

    const onDelete: SubmitHandler<FormInputs> = async (dataUpdate) =>{
        const res = await deleteJSON(SectionJsonTypes.VACANCIES, dataUpdate.profession);
        setData({})
        reset();
        setDialog({open: true, status: res, type: DialogWindowType.DELETE})
    }

    useEffect(()=>{
        const getData = async () => {
            setData(await getJSON(SectionJsonTypes.VACANCIES));
        }

        if (Object.keys(data).length === 0)
            getData();
    }, [data])
    return (
        <>
            <form className="h-[600px] overflow-y-auto scrollbar col-start-1 col-end-3 mx-10 pr-5 flex flex-col gap-y-5 max-lg:col-end-7 max-lg:h-fit max-lg:mt-5 max-lg:mx-0 max-lg:pr-0 max-lg:overflow-y-visible">
                <h1 className="text-2xl font-extrabold text-center">{VACANCIES_LINK.text.toUpperCase()}</h1>
                <Input
                register={register(InputsName.PROFESSION, {required: true})}
                placeholder={PROFESSION_PLACEHOLDER}
                icon={InputIcons.BRIEFCASE}
                type="select"
                options={Object.keys(data)}
                setValue={setValue}
                />
                <Input
                register={register(InputsName.SALARY, {valueAsNumber: true})}
                placeholder={SALARY_PLACEHOLDER}
                icon={InputIcons.MONEY}
                type="number"
                defaultValue={data[profession]?.salary}
                min={1}
                />
                <Input
                register={register(InputsName.COUNT, {valueAsNumber: true})}
                placeholder={COUNT_PLACEHOLDER}
                icon={InputIcons.USERS}
                type="number"
                defaultValue={data[profession]?.count}
                />
                <Textarea
                register={register(InputsName.DESCRIPTION)}
                placeholder={VACANCY_PLACEHOLDER}
                defaultValue={data[profession]?.description}
                />
                <Galary paths={data[profession] && data[profession].imagePath ? [data[profession].imagePath] : undefined} files={galary} deleteImage={deleteImage} />
                <FileLoader register={register(InputsName.IMAGE)} setValue={setValue} getValues={getValues} />
                <Button click={handleSubmit(onSubmit)} text={UPDATE_BTN_TEXT} style={ButtonStyle.CTA} type="submit" />
                <Button click={handleSubmit(onDelete)} text={DELETE_BTN_TEXT} style={ButtonStyle.SIMPLE} type="submit" />
            </form>
        </>
    )
}

export default FormJob;