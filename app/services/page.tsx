"use client"

import Table from "@/components/Table"
import { TABLE_DATA } from "@/constants/data"

export default function Services() {
    return (
        <div className="col-start-2 col-end-6 my-6 overflow-y-auto scrollbar">
            <Table head={TABLE_DATA.head} body={TABLE_DATA.body} />
        </div>
    )
}