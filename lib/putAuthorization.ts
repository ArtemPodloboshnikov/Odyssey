import { AuthorizationData } from "@/typings";

export async function putAuthorization(auth: AuthorizationData): Promise<number> {
    const response = await fetch("http://localhost:3000/api/authorization", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(auth)
    });

    return response.status;
}