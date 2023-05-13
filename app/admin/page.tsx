"use client"

import FormJob from "@/components/FormJob";
import { useEffect, useRef, useState } from "react";
import { getServices } from "@/lib/getServices";
import { getMenu } from "@/lib/getMenu";
import { getCookie } from "@/lib/getCookie";
import { AUTHORIZATION_COOKIE_NAME } from "@/constants/cookies";
import Authorization from "@/components/Authorization";
import Loading from "../loading";
import FormServices, { FormServicesProps } from "@/components/FormServices";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthorizationData } from "@/typings";
import Input, { InputIcons } from "@/components/Input";
import { LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER, UPDATE_BTN_TEXT } from "@/constants/placeholders";
import Button from "@/components/Button";
import { putAuthorization } from "@/lib/putAuthorization";
import DialogWindow from "@/components/DialogWindow";

export default function Admin() {
    const [auth, setAuth] = useState<boolean|undefined>(undefined);
    const dialogDefault = {open: false, status: 0}
    const [dialog, setDialog] = useState<{open: boolean, status: number}>(dialogDefault);
    const isFirstRender = useRef(true);
    const dataDefault: FormServicesProps = {menu: [], services: []};
    const [data, setData] = useState<FormServicesProps>(dataDefault);

    const {register, handleSubmit} = useForm<AuthorizationData>()

    const onSubmit: SubmitHandler<AuthorizationData> = async (data) => {
        const code = await putAuthorization(data);
        setDialog({open: true, status: code});
    }

    useEffect(()=> {
        const getData = async () => {
            const services = await getServices();
            const menu = await getMenu();
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
                        <div className="col-start-1 col-end-7 grid grid-cols-6 h-[90vh] max-md:mt-10 max-md:overflow-y-auto scrollbar">
                            <div className="col-start-1 col-end-5 grid grid-cols-4 h-[90vh] overflow-hidden max-md:h-fit max-md:overflow-visible max-md:col-end-7">
                                <FormJob setDialog={setDialog} />
                            </div>
                            <div className="col-start-5 col-end-7 h-[90vh] overflow-y-auto scrollbar my-20 pr-5 flex flex-col gap-y-10 max-md:col-start-1 max-md:ml-10 max-md:mr-6 max-md:my-5 max-md:overflow-visible">
                                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                                    <Input register={register("login")} placeholder={LOGIN_PLACEHOLDER} icon={InputIcons.USER} />
                                    <Input register={register("password")} placeholder={PASSWORD_PLACEHOLDER} type="password" />
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