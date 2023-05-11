import { VacanciesConfig } from "@/typings";

export async function getVacancies(): Promise<VacanciesConfig> {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/vacancies`, {next: { revalidate: 60 }});
    return await response.json();
}