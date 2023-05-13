import { UseFormRegisterReturn } from "react-hook-form";

interface TextareaProps {
    placeholder: string,
    register: UseFormRegisterReturn<any>,
    defaultValue?: string
}

const Textarea: React.FC<TextareaProps> = ({placeholder, defaultValue, register}) => {
    return <textarea
            className="relative w-full h-32 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg outline-none dark:scrollbar"
            placeholder={placeholder}
            {...register}
            defaultValue={defaultValue}
            />
}

export default Textarea;