import { ReactNode } from "react";

export enum ButtonStyle {
    CTA,
    SIMPLE
}

interface ButtonProps {
    text: string|ReactNode,
    type?: "button" | "submit" | "reset" | "link"
    style?: ButtonStyle,
    color?: string,
    full?: boolean,
    href?: string,
    click?: (e:any)=>void
}

const Button: React.FC<ButtonProps> = ({text, click, href, full, color, style=ButtonStyle.SIMPLE, type="button"}) => {
    const dynamicStyle = color ? {background: color} : {};
    const fullStyle = full ? "w-full" : "";
    const ctaStyle = "relative flex content-center justify-center justify-items-center items-center rounded-xl bg-gradient-to-br from-[#ED5156] to-[#DA2263] shadow-[#DA2263]/50 shadow-lg px-5 py-3 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#ED5156]/50 hover:from-[#DA2263] hover:to-[#ED5156] transition-all duration-500 outline-none border-0 " + fullStyle;
    const simpleStyle = "relative flex content-center justify-center rounded-xl bg-[--red] px-5 py-3 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#c60c31]/50 hover:bg-[--black-red] transition-all duration-500 outline-none border-0 " + fullStyle;
    const classStyle = style === ButtonStyle.CTA ? ctaStyle : simpleStyle;
    return type !== "link" ?
    (
        <button
        type={type}
        className={classStyle}
        style={dynamicStyle}
        onClick={click}
        >
            {text}
        </button>
    )
    :
    (
        <a
        className={classStyle}
        href={href||""}
        style={dynamicStyle}
        >
            {text}
        </a>
    )
}

export default Button;