import path from 'path';
import { promises as fs } from 'fs';

export const config = {
    api: {
        bodyParser: false
    }
}

export async function POST(request: Request) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const baseFolder = path.join(process.cwd(), `public/images/${category}`);
    const formData = await request.formData();
    formData.forEach(async value => {
        const file = value as File;
        const buffer = Buffer.from(Buffer.from(await file.arrayBuffer()).toString("base64"), "base64")
        console.log(baseFolder)
        fs.writeFile(`${baseFolder}/${file.name}`, buffer)
    })

    return new Response(JSON.stringify({status: 200}))
}

export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const baseFolder = path.join(process.cwd(), `public`);
    const filePath = baseFolder + url.searchParams.get("path");
    try {
        fs.unlink(filePath)
    } catch(e) {
        console.log(e)
    }
    return new Response(JSON.stringify({status: 200}))
}
