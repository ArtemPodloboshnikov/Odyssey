"use client"

import { FIRST_VISIT_COOKIE_NAME } from "@/constants/cookies";
import { TITLE_FIRST_VISIT } from "@/constants/placeholders";
import { getCookie } from "@/lib/getCookie";
import { setCookie } from "@/lib/setCookie";
import { ReactNode, useEffect, useState } from "react";
import Button from "../Button";
import DialogWindow from "../DialogWindow";

const FirstVisit: React.FC = () => {
    const defaultDialog = {open: false, title: "", content: <></>};
    const [dialog, setDialog] = useState<{open: boolean, title: string, content: ReactNode}>(defaultDialog);

    useEffect(()=>{
        if (!getCookie(FIRST_VISIT_COOKIE_NAME) && !dialog.open)
            setDialog({open: true, title: TITLE_FIRST_VISIT, content: <div className="w-full grid grid-cols-1 content-stretch"><Button text="Да" click={()=>{setCookie(FIRST_VISIT_COOKIE_NAME, true); setDialog(defaultDialog)}} /></div>})
    }, [dialog.open])

    return <DialogWindow isOpen={dialog.open} status={0} title={dialog.title} content={dialog.content} onClose={()=>{}} cross={false} />

}

export default FirstVisit;