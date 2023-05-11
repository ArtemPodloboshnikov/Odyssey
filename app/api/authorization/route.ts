import path from 'path';
import { promises as fs } from 'fs';
import { AuthorizationData } from '@/typings';

const folder = path.join(process.cwd(), `public/config/`);
const fullPath = folder + 'authorization.json';
export async function POST(request: Request) {
    const data: AuthorizationData = await request.json();
    const rawdata = await fs.readFile(fullPath, "utf-8");
    const auth: AuthorizationData = JSON.parse(rawdata);
    const authorization = data.login === auth.login && data.password === auth.password
    return new Response(JSON.stringify({authorization}))
}

export async function PUT(request: Request) {
    const data: AuthorizationData = await request.json();
    try {
        await fs.writeFile(fullPath, JSON.stringify(data));
    } catch(e) {
        console.log(e)
    }
    return new Response(JSON.stringify({status: 200}))
}