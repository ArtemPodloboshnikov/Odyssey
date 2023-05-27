import { SectionJsonTypes, StocksConfig, VacanciesConfig } from "@/typings";

export async function getJSON(section: SectionJsonTypes.VACANCIES): Promise<VacanciesConfig>
export async function getJSON(section: SectionJsonTypes.STOCKS): Promise<StocksConfig>
export async function getJSON(section: SectionJsonTypes): Promise<StocksConfig|VacanciesConfig> {
    const domain = window.location.protocol + "//" + window.location.host;
    const response = await fetch(`${domain}/api/json?category=${section}`, {next: { revalidate: 60 }});
    switch(section) {
        case SectionJsonTypes.STOCKS: {
            return await response.json() as StocksConfig;
        }
        case SectionJsonTypes.VACANCIES: {
            return await response.json() as VacanciesConfig;
        }
    }
}