import path from 'path';
import { promises as fs } from 'fs';

export async function sentImagesPath(category: string) {
  const folderPath =  `/images/${category}/`;
  const folder = path.join(process.cwd(), `public${folderPath}`);
  const filesName: string[] = [];
  try {
    const files = await fs.readdir(folder);
    for (const file of files)
        filesName.push(`${folderPath}${file}`)
  } catch (err) {
    console.error(err);
  }

  return new Response(JSON.stringify(filesName))
}