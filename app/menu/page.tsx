"use client"

import { Suspense } from "react";
import Loading from "./loading";

export default function Menu() {
    return (
        <Suspense fallback={<Loading/>}>
            <h1>Menu</h1>
        </Suspense>
    )
}