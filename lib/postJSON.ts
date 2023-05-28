import { SectionJsonTypes, StocksConfig, VacanciesConfig } from "@/typings";

export async function postJSON(section: SectionJsonTypes, config: VacanciesConfig|StocksConfig) {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/json?category=${section}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(config)
    });
    return response.status;
}