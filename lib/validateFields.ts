export function validateName(value: string) {
    return value.split(" ").length === 3;
}

export function validatePhone(value: string) {
    return /((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/.test(value);
}

export function validateGreaterZero(value: string|number) {
    return Number(value)>0
}