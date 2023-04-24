interface TableProps {
    head: string[],
    body: string[][]
}

const Table: React.FC<TableProps> = ({head, body}) => {
    const timeCheck = (index: number, text: string) => {
        const textSeparate = text.split("\n").map(t => t.split(" "));
        return index === 2 && (textSeparate[0][1] !== undefined && textSeparate[0][2] === undefined)
    }

    const textSeparate = (text: string) => {
        const textSeparate = text.split("\n").map(t => t.split(" "));
        return (
            <>
            {textSeparate.map(textArray=>{
                return (
                    <>
                        {textArray[0] + " "}
                        <small>{textArray[1]}</small>
                        <br/>
                    </>
                )
            })}
            </>
        )
    }

    const oddLineStyle = "bg-white border-b dark:bg-gray-900 dark:border-gray-700";
    const evenLineStyle = "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700";

    const firstCellStyle = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
    const otherCellStyle = "px-6 py-4 text-gray-400";
    return (
        <table className="table-fixed h-full">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                <tr>
                    {head.map(info => <th key={info} scope="col" className="px-6 py-3">{info}</th>)}
                </tr>
            </thead>
            <tbody>
                {body.map((info, i) =>
                    <tr key={i} className={i % 2 === 0 ? evenLineStyle : oddLineStyle}>
                        {info.map((inf, k)=><td key={k+inf} className={`${(k !== 1 ? "text-center" : "")} ${(k === 0 ? firstCellStyle : otherCellStyle)}`}>{timeCheck(k, inf) ? textSeparate(inf) : inf}</td>)}
                    </tr>)}
            </tbody>
        </table>
    )
}

export default Table;