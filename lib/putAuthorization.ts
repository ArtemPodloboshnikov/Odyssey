import { AuthorizationData } from "@/typings";

export async function putAuthorization(auth: AuthorizationData): Promise<number> {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/authorization`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(auth)
    });

    return response.status;
}