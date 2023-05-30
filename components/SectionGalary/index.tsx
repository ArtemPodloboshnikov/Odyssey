import { SectionGalaryTypes } from "@/typings";
import UserGalary from "../UserGalary";

type SectionGalaryProps = {
    id: string,
    title: string,
    text?: string,
    section: SectionGalaryTypes
}

const SectionGalary: React.FC<SectionGalaryProps> = ({id, title, text, section}) => {
    return (
        <>
        <div className="col-start-1 col-end-7 relative -mt-[40px]" id={id}></div>
        <div className="col-start-2 col-end-6 mt-20 flex flex-col gap-y-5">
            <h1 className="text-4xl font-extrabold">{title.toUpperCase()}</h1>
            {text ?
                <div className="copy-box">
                <div className="inner">
                  <div className="line right">
                    <div className="scanner"></div>
                  </div>
                  <p className="text-lg max-lg:text-base">{text}</p>
                </div>
              </div>
            :
            null
            }
            <UserGalary section={section} />
        </div>
        </>
    )
}

export default SectionGalary;