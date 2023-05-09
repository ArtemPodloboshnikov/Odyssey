type DialogWindowProps = {
    isOpen: boolean,
    onClose: ()=>void,
    status: number,
    title?: string,
    content?: string
}

const DialogWindow: React.FC<DialogWindowProps> = ({isOpen, onClose, status, title, content}) => {
    const statusMessage: {[code: number]: {title: string, content: string}} = {
        200: {
            title: "Успешно",
            content: "Контент успешно обновлён"
        },
        0: {
            title: "",
            content: ""
        }
    }

    return (
        <>
        {isOpen ?
              <>
              {/* Overlay */}
              <div className="fixed inset-0 bg-gray-900 opacity-50 z-50" />

              {/* Dialog */}
              <div className="w-fit h-fit max-h-36 fixed bg-white px-4 py-2 rounded-lg shadow-xl z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-2/4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg text-stone-950 font-semibold">{title||statusMessage[status].title}</h2>
                  <div className="text-gray-700 cursor-pointer" onClick={onClose}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </div>
                </div>
                <div className="text-stone-950 mb-4 overflow-y-hidden scrollbar">{content||statusMessage[status].content}</div>
              </div>
              </>
        :
            null
        }
        </>
    );
};

export default DialogWindow;