"use client"

import { STOCKS_TITLE } from "@/constants/placeholders";
import { getJSON } from "@/lib/getJSON";
import { SectionJsonTypes, StocksConfig } from "@/typings";
import { useEffect, useState } from "react";
import Slider from "../Slider";

const Stocks: React.FC = () => {
    const [stocks, setStocks] = useState<StocksConfig>({});

    useEffect(()=>{
        const getData = async () => {
            setStocks(await getJSON(SectionJsonTypes.STOCKS));
        }

        if (!Object.keys(stocks).length)
            getData()
    })

    return (
        <div className="col-start-1 col-end-7 mt-20 flex flex-col gap-y-5">
            <h1 className="text-4xl font-extrabold pl-56 max-lg:pl-5">{STOCKS_TITLE.toUpperCase()}</h1>
            <Slider>
                {Object.keys(stocks).length ?
                Object.keys(stocks).map(stock => {
                    return (
                        <div
                        key={stock}
                        style={{backgroundImage: `url('${stocks[stock].imagePath}')`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
                        className="w-full h-[600px] flex flex-col gap-y-3 rounded-lg p-10 relative before:absolute before:w-full before:h-full before:content-[''] before:left-0 before:top-0 before:bg-black/50 before:rounded-lg"
                        >
                            <h1 className="text-center text-4xl font-extrabold relative">{stock}</h1>
                            <span className="text-center relative">{stocks[stock].time}</span>
                            <p className="relative">{stocks[stock].description}</p>
                        </div>
                    )
                }) : null}
            </Slider>
        </div>
    )
}

export default Stocks;