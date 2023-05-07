import path from 'path';
import { promises as fs } from 'fs';

const baseFolder = path.join(process.cwd(), 'public');
const configPath = '/config/vacancies.json';
const fullPath = baseFolder + configPath;
export async function GET(request: Request) {
  const fileContents = await fs.readFile(fullPath, 'utf8');
  return new Response(fileContents)
}

export async function POST(request: Request) {
  const data = await request.json();
  const fileContents = JSON.parse(await fs.readFile(fullPath, 'utf8'));
  const newContent = JSON.stringify({...fileContents, ...data});
  await fs.writeFile(fullPath, newContent)
  return new Response(JSON.stringify({status: 200}))
}