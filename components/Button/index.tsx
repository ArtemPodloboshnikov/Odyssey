export enum ButtonStyle {
    CTA,
    SIMPLE
}

interface ButtonProps {
    text: string,
    type?: "button" | "submit" | "reset"
    style?: ButtonStyle
}

const Button: React.FC<ButtonProps> = ({text, style=ButtonStyle.SIMPLE, type="button"}) => {
    const ctaStyle = "rounded-xl bg-gradient-to-br from-[#FF5555] to-[#6025F5] px-5 py-3 text-base font-medium text-white hover:shadow-lg hover:shadow-pink-500/50 shadow-[#6025F5]/50 hover:from-[#6025F5] hover:to-[#FF5555] transition-all duration-500 shadow-lg outline-none border-0";
    const simpleStyle = "rounded-xl bg-gradient-to-br from-[#2B1867] to-[#2B1867] px-5 py-3 text-base font-medium text-white hover:shadow-lg hover:shadow-[#6025F5]/50 hover:from-[#281661] hover:to-[#281661] transition-all duration-500 outline-none border-0";
    return (
        <button type={type} className={style === ButtonStyle.CTA ? ctaStyle : simpleStyle}>
            {text}
        </button>
    )
}

export default Button;