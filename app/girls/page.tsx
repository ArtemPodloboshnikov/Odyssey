import { Suspense } from "react";
import Loading from "../loading";

export default function Girls() {
    return (
        <Suspense fallback={<Loading/>}>
        </Suspense>
    )
}