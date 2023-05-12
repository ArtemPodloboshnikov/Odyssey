import { Suspense } from "react"
import Loading from "../loading"

export default function Club() {
    return (
        <Suspense fallback={<Loading/>}>
        </Suspense>
    )
}