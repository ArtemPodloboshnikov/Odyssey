export enum ButtonStyle {
    CTA,
    SIMPLE
}

interface ButtonProps {
    text: string,
    type?: "button" | "submit" | "reset" | "link"
    style?: ButtonStyle,
    href?: string,
    click?: (e:any)=>void
}

const Button: React.FC<ButtonProps> = ({text, click, href, style=ButtonStyle.SIMPLE, type="button"}) => {
    const ctaStyle = "relative rounded-xl bg-gradient-to-br from-[#ED5156] to-[#DA2263] px-5 py-3 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#ED5156]/50 shadow-[#DA2263]/50 hover:from-[#DA2263] hover:to-[#ED5156] transition-all duration-500 shadow-lg outline-none border-0";
    const simpleStyle = "relative rounded-xl bg-gradient-to-br from-[#ff073a] to-[#ff073a] px-5 py-3 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#c60c31]/50 hover:from-[#c60c31] hover:to-[#c60c31] transition-all duration-500 outline-none border-0";
    const classStyle = style === ButtonStyle.CTA ? ctaStyle : simpleStyle;
    return type !== "link" ?
    (
        <button
        type={type}
        className={classStyle}
        onClick={click}
        >
            {text}
        </button>
    )
    :
    (
        <a
        className={classStyle}
        href={href}
        >
            {text}
        </a>
    )
}

export default Button;