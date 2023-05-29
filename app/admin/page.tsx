"use client"

import FormJob from "@/components/FormJob";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "@/lib/getCookie";
import { AUTHORIZATION_COOKIE_NAME } from "@/constants/cookies";
import Authorization from "@/components/Authorization";
import Loading from "../loading";
import FormServices from "@/components/FormServices";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthorizationData, SectionGalaryTypes, SectionJsonTypes, StocksConfig } from "@/typings";
import Input, { InputIcons } from "@/components/Input";
import { ERROR_LOGIN_MESSAGE, ERROR_PASSWORD_MESSAGE, LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER, UPDATE_BTN_TEXT } from "@/constants/placeholders";
import Button from "@/components/Button";
import { putAuthorization } from "@/lib/putAuthorization";
import DialogWindow, { DialogWindowType } from "@/components/DialogWindow";
import { getFilesPaths } from "@/lib/getFilesPaths";
import { getJSON } from "@/lib/getJSON";
import FormStocks from "@/components/FormStocks";

export default function Admin() {
    const [auth, setAuth] = useState<boolean|undefined>(undefined);
    const dialogDefault = {open: false, status: 0, type: DialogWindowType.CREATE}
    const [dialog, setDialog] = useState<{open: boolean, status: number, type: DialogWindowType}>(dialogDefault);
    const isFirstRender = useRef(true);

    const {register, handleSubmit, formState: {errors}} = useForm<AuthorizationData>()

    const onSubmit: SubmitHandler<AuthorizationData> = async (data) => {
        const code = await putAuthorization(data);
        setDialog(prevData => ({...prevData, open: true, status: code}));
    }

    useEffect(()=> {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            setAuth(getCookie(AUTHORIZATION_COOKIE_NAME) === "true")
            return;
        }
    }, [auth])

    return (
        <>
        {(()=>{
            switch(auth) {
                case true: {
                    return (
                        <div className="col-start-1 col-end-7 grid grid-cols-6 h-[90vh] pt-28 max-lg:pt-10 max-lg:overflow-y-auto scrollbar pr-10 h-screen">
                            <FormJob setDialog={setDialog} />
                            <FormStocks setDialog={setDialog} />
                            <div className="col-start-5 col-end-7 h-[80vh] overflow-y-auto scrollbar mb-20 px-5 flex flex-col gap-y-10 max-lg:col-start-2 max-lg:col-end-7 max-lg:px-0 max-lg:my-5 max-lg:overflow-visible">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                                    <h1 className="text-2xl font-extrabold text-center">ДАННЫЕ ДЛЯ ВХОДА</h1>
                                    <Input register={register("login", {required: true})} errors={errors} textHelper={ERROR_LOGIN_MESSAGE} placeholder={LOGIN_PLACEHOLDER} icon={InputIcons.USER} />
                                    <Input register={register("password", {required: true})} errors={errors} textHelper={ERROR_PASSWORD_MESSAGE} placeholder={PASSWORD_PLACEHOLDER} type="password" />
                                    <Button text={UPDATE_BTN_TEXT} type="submit"/>
                                </form>
                                <FormServices setDialog={setDialog} />
                            </div>
                            <DialogWindow isOpen={dialog.open} onClose={()=>setDialog(dialogDefault)} status={dialog.status} type={dialog.type}/>
                        </div>
                    )
                }
                case false: {
                    return <Authorization setAuth={setAuth}/>
                }
                default: {
                    return <Loading />
                }
            }
        })()
        }
        </>
    )
}