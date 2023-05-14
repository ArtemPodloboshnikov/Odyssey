"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import Input, { InputIcons } from "../Input";
import { ERROR_LOGIN_MESSAGE, ERROR_PASSWORD_MESSAGE, LOGIN_BTN_TEXT, LOGIN_PLACEHOLDER, PASSWORD_PLACEHOLDER } from "@/constants/placeholders";
import Button, { ButtonStyle } from "../Button";
import { setCookie } from "@/lib/setCookie";
import { AUTHORIZATION_COOKIE_NAME } from "@/constants/cookies";
import { userAuthorization } from "@/lib/userAuthorization";
import { Dispatch, SetStateAction } from "react";
import { AuthorizationData } from "@/typings";

const Authorization: React.FC<{setAuth: Dispatch<SetStateAction<any>>}> = ({setAuth}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<AuthorizationData>();

    const onSubmit: SubmitHandler<AuthorizationData> = async (data) => {
        const isAuth = await userAuthorization(data);
        setCookie(AUTHORIZATION_COOKIE_NAME, JSON.stringify(isAuth))
        setAuth(isAuth);
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="col-start-3 col-end-5 flex flex-col gap-y-5 justify-center content-center max-md:col-start-2 max-md:col-end-6">
            <Input register={register("login", {required: true})} errors={errors} textHelper={ERROR_LOGIN_MESSAGE} placeholder={LOGIN_PLACEHOLDER} icon={InputIcons.USER} />
            <Input register={register("password", {required: true})} errors={errors} textHelper={ERROR_PASSWORD_MESSAGE} placeholder={PASSWORD_PLACEHOLDER} type="password" />
            <Button text={LOGIN_BTN_TEXT} type="submit" style={ButtonStyle.CTA}/>
        </form>
    )
}

export default Authorization;