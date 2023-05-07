import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: Request) {
  const jsonDirectory = path.join(process.cwd(), 'public');
  const fileContents = await fs.readFile(jsonDirectory + '/config/menu.json', 'utf8');
  return new Response(fileContents)
}
