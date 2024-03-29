import path from 'path';
import { promises as fs } from 'fs';

function getFolderPath(section: string) {
  const baseFolder = path.join(process.cwd(), 'public');
  const configPath = `/config/${section}.json`;
  return baseFolder + configPath;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") as string;
  const fullPath = getFolderPath(category);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  return new Response(fileContents)
}

export async function POST(request: Request) {
  const data = await request.json();
  const url = new URL(request.url);
  const category = url.searchParams.get("category") as string;
  const fullPath = getFolderPath(category);
  const fileContents = JSON.parse(await fs.readFile(fullPath, 'utf8'));
  const newContent = JSON.stringify({...fileContents, ...data});
  await fs.writeFile(fullPath, newContent)
  return new Response(JSON.stringify({status: 200}))
}

export async function PUT(request: Request) {
  const data = await request.json();
  const url = new URL(request.url);
  const category = url.searchParams.get("category") as string;
  const fullPath = getFolderPath(category);
  const fileContents = JSON.parse(await fs.readFile(fullPath, 'utf8'));
  fileContents[Object.keys(data)[0]] = Object.values(data)[0]
  const newContent = JSON.stringify({...fileContents});
  await fs.writeFile(fullPath, newContent)
  return new Response(JSON.stringify({status: 200}))
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("category") as string;
  const key = url.searchParams.get("key") as string;
  const fullPath = getFolderPath(category);
  const fileContents = JSON.parse(await fs.readFile(fullPath, 'utf8'));
  const baseFolder = path.join(process.cwd(), `public`);
  if (fileContents[key].imagePath) {
    try {
      fs.unlink(baseFolder + fileContents[key].imagePath)
    } catch (e) {
      console.error(e);
    }
  }
  const {[key]: removeProperty, ...newContent} = fileContents;
  await fs.writeFile(fullPath, JSON.stringify(newContent))
  return new Response(JSON.stringify({status: 200}))
}