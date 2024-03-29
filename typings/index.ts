export type ImageType = {
    imagePath: string,
    alt: string
};

export type MenuCardType = {
    title: string,
    additional: string,
    price: number
} & Pick<ImageType, "imagePath">;

export type MenuConfig = {
    [key: string]: MenuCardType[]
};

export type VacanciesConfig = {
    [profession: string]: {
        count: number,
        salary: number,
        description: string,
        imagePath: string
    }
};

export type StocksConfig = {
    [stock: string]: {
        time: string,
        description: string,
        imagePath: string
    }
};

export enum CategoryImages {
    SERVICIES="services",
    MENU="menu",
    VACANCIES="professions",
    STOCKS="stocks"
}

export type AuthorizationData = {
    login: string,
    password: string
}

export enum SectionGalaryTypes {
    MENU="menu",
    SERVICES="services",
    INTERIOR="interior",
    GIRLS="girls",
    STOCKS="stocks"
}

export enum SectionJsonTypes {
    VACANCIES="vacancies",
    STOCKS="stocks"
}

export enum ChangeJsonMethods {
    POST="POST",
    PUT="PUT"
}