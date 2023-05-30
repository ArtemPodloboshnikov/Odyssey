import { CategoryImages } from "@/typings";

export async function uploadFiles(files: FormData, category: CategoryImages) {
    const domain = window.location.protocol + "//" + window.location.host;

    const response = await fetch(`${domain}/api/files?category=${category}`, {
        method: "POST",
        body: files
    });
    return response.status;
}