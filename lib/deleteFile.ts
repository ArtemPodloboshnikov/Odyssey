export async function deleteFile(path: string) {
    const domain = window.location.protocol + "//" + window.location.host;

    const response = await fetch(`${domain}/api/files?path=${path}`, {
        method: "DELETE"
    });
    return response.status;
}