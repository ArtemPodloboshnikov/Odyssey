import { VacanciesConfig } from "@/typings";

export async function getVacancies(): Promise<VacanciesConfig> {
    const response = await fetch("http://localhost:3000/api/vacancies", {next: { revalidate: 60 }});
    return await response.json();
}