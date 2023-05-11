import { AuthorizationData } from "@/typings";

export async function userAuthorization(auth: AuthorizationData): Promise<boolean> {
    const domain = window.location.protocol + "//" + window.location.host;

    const response = await fetch(`${domain}/api/authorization`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(auth)
    });
    const res: {authorization: boolean} = await response.json();
    return res.authorization;
}