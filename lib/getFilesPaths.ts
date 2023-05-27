import { SectionGalaryTypes } from "@/typings";

export async function getFilesPaths(section: SectionGalaryTypes): Promise<string[]> {
    const domain = window.location.protocol + "//" + window.location.host;

    const response = await fetch(`${domain}/api/files?category=${section}`, {next: { revalidate: 60 }});
    return await response.json();
}