export function getFormData(data: {[key: number]: File}) {
    const files = Object.values(data);
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file, file.name)
    })

    return formData;
}