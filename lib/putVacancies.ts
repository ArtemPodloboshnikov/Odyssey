import { VacanciesConfig } from "@/typings";

export async function putVacancies(vacancy: VacanciesConfig) {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/vacancies`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(vacancy)
    });
    return response.status;
}