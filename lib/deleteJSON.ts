import { SectionJsonTypes } from "@/typings";

export async function deleteJSON(section: SectionJsonTypes, key: string) {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/json?category=${section}&key=${key}`, {
        method: "DELETE"
    });
    return response.status;
}