import { Children, PropsWithChildren, useState } from "react";

const Slider: React.FC<PropsWithChildren> = ({children}) => {
    const childrenArray = Children.toArray(children);
    const isMore = childrenArray.length > 3;
    const arrowClass = "w-12 h-12 self-center cursor-pointer";
    const [currentRange, setCurrentRange] = useState<{start: number, end: number}>({start: 0, end: 3})

    const leftArrow = () => {
        if (currentRange.start > 0)
          setCurrentRange(current=>({start: current.start-3, end: current.end-3}))
    }

    const rightArrow = () => {
        if (currentRange.end < childrenArray.length)
          setCurrentRange(current=>({start: current.start+3, end: current.end+3}))
    }
    return (
        <div className="grid grid-cols-[1fr_2fr_2fr_2fr_1fr] justify-items-center scrollbar mt-5 gap-5 max-lg:grid-cols-1">
            {isMore ?
                <svg onClick={leftArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${arrowClass} justify-self-end`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            :
                <div/>
            }
            {childrenArray.slice(currentRange.start, currentRange.end).map(child=>child)}
            {isMore ?
                <svg onClick={rightArrow} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${arrowClass} justify-self-start`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            :
                <div/>
            }
        </div>
    )
}

export default Slider;