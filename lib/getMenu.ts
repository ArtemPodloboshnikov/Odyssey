import { MenuConfig } from "@/typings";

export async function getMenu(): Promise<string[]> {
    const domain = window.location.protocol + "//" + window.location.host;

    const response = await fetch(`${domain}/api/menu`, {next: { revalidate: 60 }});
    return await response.json();
}