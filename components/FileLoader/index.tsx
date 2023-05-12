"use client"

import { FILE_INPUT_PLACEHOLDER } from '@/constants/placeholders';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { UseFormGetValues, UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';

interface FileLoaderProps {
    register: UseFormRegisterReturn<any>,
    setValue: UseFormSetValue<any>,
    // setGalary: Dispatch<SetStateAction<{[key: number]: File}>>,
    getValues: UseFormGetValues<any>,
    multiple?: boolean,
    accept?: string,
    placeholder?: string
}

const FileLoader:React.FC<FileLoaderProps> = ({register, setValue, getValues, placeholder=FILE_INPUT_PLACEHOLDER, multiple=false, accept="image/*"}) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    console.log(e.dataTransfer.files)
    const files = !multiple ? e.dataTransfer.files[0] : e.dataTransfer.files;
    setValue(register.name, !multiple ? {0: files} : files);
  };

  const handleFileInputChange = (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    setValue(register.name, {...files});
  };

//   const changeFiles = (e: ChangeEvent<HTMLInputElement>) => {
//     let files = !multiple ? e.target.files![0] : e.target.files!;
//     setValue(register.name, files);
//     setFile(files);
//   }
  const file: FileList|File = getValues(register.name);
  return (
    <label
      className={`w-full h-fit border-dashed border-2 border-gray-400 rounded-lg p-4 cursor-pointer ${dragging ? "bg-gray-100": null}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      htmlFor={register.name}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        {file && Object.values(file).length > 0 ? (
          <div className="text-white">
            {(()=>{
                let names = [];
                // console.log(file)
                const filesArray = Object.values(file);
                for (let i=0; i < filesArray.length; i++) {
                    names.push(filesArray[i].name);
                }
                return <p>{names.join(", ")}</p>
            })()
            }
          </div>
        ) : (
          <p>{placeholder}</p>
        )}
        <input id={register.name} type="file" multiple={multiple} accept={accept} {...register} onChange={handleFileInputChange} hidden />
      </div>
    </label>
  );
};

export default FileLoader;