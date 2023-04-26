import path from 'path';
import { promises as fs } from 'fs';

export async function GET(request: Request) {
  const jsonDirectory = path.join(process.cwd(), 'public');
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + '/config/menu.json', 'utf8');
  //Return the content of the data file in json format
  // response.status(200).json(fileContents);
  return new Response(fileContents)
}
