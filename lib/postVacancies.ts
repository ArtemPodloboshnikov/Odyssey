import { VacanciesConfig } from "@/typings";

export async function postVacancies(vacancy: VacanciesConfig) {
    const response = await fetch("http://localhost:3000/api/vacancies", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(vacancy)
    });
    return await response.json();
}