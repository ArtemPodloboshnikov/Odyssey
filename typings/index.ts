export type ImageType = {
    imagePath: string,
    alt: string
};

export type MenuCardType = {
    title: string,
    additional: string,
    price: number
} & Pick<ImageType, "imagePath">;