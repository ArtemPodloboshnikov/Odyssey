"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import Input, { InputIcons } from "../Input";
import { LOGIN_BTN_TEXT, LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "@/constants/placeholders";
import Button, { ButtonStyle } from "../Button";
import { setCookie } from "@/lib/setCookie";
import { AUTHORIZATION_COOKIE_NAME } from "@/constants/cookies";
import { userAuthorization } from "@/lib/userAuthorization";
import { Dispatch, SetStateAction, useReducer } from "react";
import { AuthorizationData } from "@/typings";

const Authorization: React.FC<{setAuth: Dispatch<SetStateAction<any>>}> = ({setAuth}) => {
    const {register, handleSubmit} = useForm<AuthorizationData>();

    const onSubmit: SubmitHandler<AuthorizationData> = async (data) => {
        const isAuth = await userAuthorization(data);
        setCookie(AUTHORIZATION_COOKIE_NAME, JSON.stringify(isAuth))
        setAuth(isAuth);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="col-start-3 col-end-5 flex flex-col gap-y-5 justify-center content-center">
            <Input register={register("login")} placeholder={LOGIN_PLACEHOLDER} icon={InputIcons.USER} />
            <Input register={register("password")} placeholder={PASSWORD_PLACEHOLDER} type="password" />
            <Button text={LOGIN_BTN_TEXT} type="submit" style={ButtonStyle.CTA}/>
        </form>
    )
}

export default Authorization;