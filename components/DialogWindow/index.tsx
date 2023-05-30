import { ReactNode } from "react";
export enum DialogWindowType {
    CREATE="create",
    UPDATE="update",
    DELETE="delete"
}

type DialogWindowProps = {
    isOpen: boolean,
    onClose: ()=>void,
    status: number,
    type?: DialogWindowType
    title?: string,
    content?: string|ReactNode,
    cross?: boolean
}

const DialogWindow: React.FC<DialogWindowProps> = ({isOpen, onClose, status, type=DialogWindowType.CREATE, title, content, cross=true}) => {
    const iconClass = "w-12 h-12 fill-white self-center";
    const standardResponse = {
        500: {
            title: "Не удалось выполнить!",
            content: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
                        <path className="stroke-[--red]" strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                     </svg>
        },
        0: {
            title: "",
            content: ""
        },
    }
    const statusMessage: {[type: string]: {[code: number]: {title: string, content: string|ReactNode}}} = {
        [DialogWindowType.CREATE] : {
            200: {
                title: "Создано",
                content: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
                            <path className="stroke-green-500" strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                         </svg>
            },
            ...standardResponse
        },
        [DialogWindowType.UPDATE]: {
            200: {
                title: "Обновлено",
                content: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
                            <path className="stroke-[--yellow]" strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                         </svg>

            },
            ...standardResponse
        },
        [DialogWindowType.DELETE]: {
            200: {
                title: "Удалено",
                content: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClass}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                         </svg>
            },
            ...standardResponse
        }
    }

    return (
        <>
        {isOpen ?
              <>
              <div className="fixed inset-0 bg-gray-900 opacity-100 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 z-[1001]" />
              <div className="w-fit h-fit flex flex-col gap-y-3 max-h-36 fixed bg-white px-4 py-2 rounded-lg shadow-xl z-[1002] top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4">
                <div className="flex flex-row gap-x-5 justify-between items-center">
                  <h2 className="text-2xl text-stone-950 font-semibold">{title||statusMessage[type][status].title}</h2>
                  {cross ?
                  <div className="text-gray-700 cursor-pointer" onClick={onClose}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </div>
                    :
                    null
                  }
                </div>
                <div className="flex flex-col text-stone-950 overflow-y-hidden scrollbar text-xl">{content||statusMessage[type][status].content}</div>
              </div>
              </>
        :
            null
        }
        </>
    );
};

export default DialogWindow;