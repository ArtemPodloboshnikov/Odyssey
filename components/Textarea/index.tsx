import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps {
    placeholder: string,
    register: UseFormRegisterReturn<any>
}

const Textarea: React.FC<TextareaProps> = ({placeholder, register}) => {
    return <textarea className="w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg outline-none dark:scrollbar" placeholder={placeholder} {...register} />
}

export default Textarea;