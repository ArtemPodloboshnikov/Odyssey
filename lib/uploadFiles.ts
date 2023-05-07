import { FormCategory } from "@/typings";

export async function uploadFiles(files: FormData, category: FormCategory) {
    console.log(files.getAll("files"))
    const response = await fetch(`http://localhost:3000/api/files?${category}`, {
        method: "POST",
        body: files
    });
    return await response.json();
}