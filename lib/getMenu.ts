import { MenuConfig } from "@/typings";

export async function getMenu(): Promise<MenuConfig> {
    const response = await fetch("http://localhost:3000/api/menu", {next: { revalidate: 60 }});
    return await response.json();
}