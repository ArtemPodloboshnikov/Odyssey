import { VacanciesConfig } from "@/typings";

export async function postVacancies(vacancy: VacanciesConfig) {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/vacancies`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(vacancy)
    });
    return response.status;
}