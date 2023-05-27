"use client"

import FormJob from "@/components/FormJob";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "@/lib/getCookie";
import { AUTHORIZATION_COOKIE_NAME } from "@/constants/cookies";
import Authorization from "@/components/Authorization";
import Loading from "../loading";
import FormServices, { FormServicesProps } from "@/components/FormServices";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthorizationData, SectionGalaryTypes } from "@/typings";
import Input, { InputIcons } from "@/components/Input";
import { ERROR_LOGIN_MESSAGE, ERROR_PASSWORD_MESSAGE, LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER, UPDATE_BTN_TEXT } from "@/constants/placeholders";
import Button from "@/components/Button";
import { putAuthorization } from "@/lib/putAuthorization";
import DialogWindow from "@/components/DialogWindow";
import { getFilesPaths } from "@/lib/getFilesPaths";

export default function Admin() {
    const [auth, setAuth] = useState<boolean|undefined>(undefined);
    const dialogDefault = {open: false, status: 0}
    const [dialog, setDialog] = useState<{open: boolean, status: number}>(dialogDefault);
    const isFirstRender = useRef(true);
    const dataDefault: FormServicesProps = {menu: [], services: []};
    const [data, setData] = useState<FormServicesProps>(dataDefault);

    const {register, handleSubmit, formState: {errors}} = useForm<AuthorizationData>()

    const onSubmit: SubmitHandler<AuthorizationData> = async (data) => {
        const code = await putAuthorization(data);
        setDialog({open: true, status: code});
    }

    useEffect(()=> {
        const getData = async () => {
            const services = await getFilesPaths(SectionGalaryTypes.SERVICES);
            const menu = await getFilesPaths(SectionGalaryTypes.MENU);
            setData({
                services: services,
                menu: menu
            });
        }

        if (data.menu.length === 0 && auth)
            getData();

        if (isFirstRender.current) {
            isFirstRender.current = false;
            setAuth(getCookie(AUTHORIZATION_COOKIE_NAME) === "true")
            return;
        }
    })

    return (
        <>
        {(()=>{
            switch(auth) {
                case true: {
                    return (
                        <div className="col-start-1 col-end-7 grid grid-cols-6 h-[90vh] max-lg:mt-10 max-lg:overflow-y-auto scrollbar pr-10 h-screen">
                            <div className="col-start-1 col-end-5 grid grid-cols-4 h-[90vh] overflow-hidden max-lg:h-fit max-lg:overflow-visible max-lg:col-end-7">
                                <FormJob setDialog={setDialog} />
                            </div>
                            <div className="col-start-5 col-end-7 h-[90vh] overflow-y-auto scrollbar my-20 pr-5 flex flex-col gap-y-10 max-lg:col-start-1 max-lg:ml-10 max-lg:mr-6 max-lg:my-5 max-lg:overflow-visible">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                                    <Input register={register("login", {required: true})} errors={errors} textHelper={ERROR_LOGIN_MESSAGE} placeholder={LOGIN_PLACEHOLDER} icon={InputIcons.USER} />
                                    <Input register={register("password", {required: true})} errors={errors} textHelper={ERROR_PASSWORD_MESSAGE} placeholder={PASSWORD_PLACEHOLDER} type="password" />
                                    <Button text={UPDATE_BTN_TEXT} type="submit"/>
                                </form>
                                <FormServices menu={data.menu} services={data.services} setData={setData} setDialog={setDialog} />
                            </div>
                            <DialogWindow isOpen={dialog.open} onClose={()=>setDialog(dialogDefault)} status={dialog.status}/>
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