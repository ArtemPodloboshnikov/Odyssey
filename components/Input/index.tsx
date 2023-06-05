    "use client"
    import React, { ChangeEvent, ReactNode, useState } from "react";
    import { FieldErrors, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
    import { ErrorMessage } from '@hookform/error-message';

    export enum InputIcons {
        USER="user",
        MONEY="money",
        USERS="users",
        BRIEFCASE="briefcase",
        EYE="eye",
        CLOCK="clock"
    }

    interface InputProps {
        textHelper?: string,
        placeholder: string,
        type?: string,
        icon?: string,
        min?: number,
        max?: number,
        options?: string[],
        register: UseFormRegisterReturn<any>,
        setValue?: UseFormSetValue<any>,
        defaultValue?: string|number,
        errors?: FieldErrors<any>
    }

    const typeIcons: {[key: string]: ReactNode} = {
        "tel": <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
        "email": <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" /></svg>,
        "url": <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
        [InputIcons.USER]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        [InputIcons.MONEY]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
        [InputIcons.USERS]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
        [InputIcons.BRIEFCASE]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
        "password": <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>,
        [InputIcons.EYE]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        [InputIcons.CLOCK]: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    }

    const Input: React.FC<InputProps> = ({placeholder, textHelper, icon, register, setValue, defaultValue, errors, min, max, options=[], type="text"}) => {
        const [showOptions, setShowOptions] = useState<boolean>(false);
        const [passwordIcon, setPasswordIcon] = useState<ReactNode>(typeIcons["password"]);
        const isSelect = type === "select";
        const isPassword = type === "password";
        const focusShow = (isFocus: boolean, timeDelay: number) => {
            setTimeout(()=>{
                if (isFocus)
                    setShowOptions(true);
                else
                    setShowOptions(false);
            }, timeDelay)
        };
        const changeText = (e: ChangeEvent<HTMLInputElement>) => {
            if (setValue !== undefined)
                setValue(register.name, e.target.value);
            if (showOptions) setShowOptions(false);
        }
        const showPassword = (show: boolean) => {
            if (show)
                setPasswordIcon(typeIcons[InputIcons.EYE])
            else
                setPasswordIcon(typeIcons["password"])
        }
        return (
            <div className="relative text-gray-700 h-fit">
                <input
                className="w-full h-10 pl-3 pr-8 text-base text-black font-medium placeholder:placeholder-gray-600 border rounded-lg outline-none"
                type={isSelect ? "text" : (isPassword && passwordIcon === typeIcons[InputIcons.EYE] ? "text" : type)}
                placeholder={placeholder}
                min={min||0}
                max={max}
                {...register}
                onBlur={isSelect ? ()=>focusShow(false, 500) : undefined}
                onFocus={isSelect ? ()=>focusShow(true, 100) : undefined}
                onChange={isSelect ? changeText : register.onChange}
                defaultValue={defaultValue}
                />
                {
                    isSelect && setValue !== undefined && showOptions ?
                    <>
                    <div className="hidden max-lg:block max-lg:left-0 max-lg:top-0 max-lg:bg-black max-lg:bg-opacity-50 max-lg:fixed max-lg:w-screen max-lg:h-screen max-lg:z-40" />
                    <div className="w-full min-h-fit max-h-96 overflow-y-auto scrollbar flex flex-col rounded-b-lg absolute bg-white z-50 max-lg:p-3 max-lg:fixed max-lg:w-9/12 max-lg:h-40 max-lg:top-[50%] max-lg:left-[50%] max-lg:translate-x-[-50%] max-lg:translate-y-[-50%] max-lg:rounded-lg max-lg:text-center max-lg:text-2xl">
                        {options.map(option => {
                            const changeOption = () => {
                                setValue(register.name, option);
                                setShowOptions(false);
                            }
                            return (
                                <div key={option} onClick={changeOption} className="w-full cursor-pointer pl-5">
                                    {option}
                                </div>
                            )
                        })}
                    </div>
                    </>
                    : null
                }
                <div
                onClick={isPassword ? ()=>showPassword(passwordIcon === typeIcons["password"]) : undefined}
                className={`absolute inset-y-0 right-0 flex items-center px-2 ${isPassword ? "cursor-pointer" : "pointer-events-none"}`}
                >
                    {isPassword ? passwordIcon : typeIcons[icon||type]}
                </div>

                {errors ?
                <ErrorMessage
                errors={errors}
                name={register.name}
                render={()=>{
                    return (
                        <div
                        className="absolute w-full text-sm text-red-600 "
                        data-te-input-helper-ref>
                            {textHelper}
                        </div>
                    )
                }}
                />
                :
                null
                }
            </div>
        )
    }

    export default React.memo(Input);