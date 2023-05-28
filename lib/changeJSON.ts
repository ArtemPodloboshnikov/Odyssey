import { ChangeJsonMethods, SectionJsonTypes, StocksConfig, VacanciesConfig } from "@/typings";

export async function changeJSON(section: SectionJsonTypes, config: VacanciesConfig|StocksConfig, method: ChangeJsonMethods) {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/json?category=${section}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(config)
    });
    return response.status;
}