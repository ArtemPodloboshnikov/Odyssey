import { AuthorizationData } from "@/typings";

export async function userAuthorization(auth: AuthorizationData): Promise<boolean> {
    const response = await fetch("http://localhost:3000/api/authorization", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(auth)
    });
    const res: {authorization: boolean} = await response.json();
    return res.authorization;
}