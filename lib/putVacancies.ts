import { VacanciesConfig } from "@/typings";

export async function putVacancies(vacancy: VacanciesConfig) {
    const response = await fetch("http://localhost:3000/api/vacancies", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(vacancy)
    });
    return response.status;
}