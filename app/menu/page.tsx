import { Suspense } from "react";
import Loading from "./loading";
import DrinkCard from "@/components/MenuCard";
import { getMenu } from "@/lib/getMenu";

export default async function Menu() {
    const menu = await getMenu();
    return (
        <Suspense fallback={<Loading/>}>
            <div className="col-start-1 col-end-7 flex flex-col p-10 h-full overflow-y-auto scrollbar">
                {Object.keys(menu)?.map(title => {
                    return (
                        <details key={title}>
                            <summary className="font-bold">{title}</summary>
                            <div className="overflow-y-auto scrollbar p-10 grid grid-cols-5 gap-5 h-fit">
                                {menu[title]?.map(thing => {
                                        return <DrinkCard
                                                key={thing.title}
                                                title={thing.title}
                                                additional={thing.additional}
                                                imagePath={thing.imagePath}
                                                price={thing.price}
                                                />
                                    })
                                }
                            </div>
                        </details>
                    )
                })
                }
        </div>
        </Suspense>
    )
}