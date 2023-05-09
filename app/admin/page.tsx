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
    const [dialog, setDialog] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);
    const isFirstRender = useRef(true);
    const dataDefault: FormServicesProps = {menu: [], services: []};
    const [data, setData] = useState<FormServicesProps>(dataDefault);

    const {register, handleSubmit} = useForm<AuthorizationData>()

    const onSubmit: SubmitHandler<AuthorizationData> = async (data) => {
        const code = await putAuthorization(data);
        setStatus(code);
        setDialog(true);
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
                        <>
                        <div className="col-start-1 col-end-5 grid grid-cols-4 overflow-hidden">
                            <FormJob />
                        </div>
                        <div className="col-start-5 col-end-7 overflow-y-auto scrollbar my-20 pr-5 flex flex-col gap-y-10">
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                                <Input register={register("login")} placeholder={LOGIN_PLACEHOLDER} icon={InputIcons.USER} />
                                <Input register={register("password")} placeholder={PASSWORD_PLACEHOLDER} type="password" />
                                <Button text={UPDATE_BTN_TEXT} type="submit"/>
                            </form>
                            <FormServices menu={data.menu} services={data.services} setData={setData} />
                        </div>
                        <DialogWindow isOpen={dialog} onClose={()=>setDialog(false)} status={status}/>
                        </>
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