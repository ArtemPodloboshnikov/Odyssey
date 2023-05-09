export async function deleteFile(path: string) {
    const response = await fetch(`http://localhost:3000/api/files?path=${path}`, {
        method: "DELETE"
    });
    return response.status;
}