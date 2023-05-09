import path from 'path';
import { promises as fs } from 'fs';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false
    }
}

export async function POST(request: Request) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    console.log(category)
    const baseFolder = path.join(process.cwd(), `public/images/${category}`);
    const form = formidable({ multiples: true, uploadDir: baseFolder });
    form.parse(await request.json(), (err, fields, files) => {
        console.log('fields:', fields);
        console.log('files:', files);
    });

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
