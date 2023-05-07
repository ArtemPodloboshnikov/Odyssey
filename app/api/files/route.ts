import path from 'path';
import { promises as fs } from 'fs';

export async function POST(request: Request) {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    console.log(category)
    const baseFolder = path.join(process.cwd(), `public/images/${category}`);
    // const form = formidable({ multiples: true, uploadDir: baseFolder });
    // form.parse(request, (err, fields, files) => {
    //     console.log('fields:', fields);
    //     console.log('files:', files);
    //   });
    // console.log(request.url)
//   const jsonDirectory = path.join(process.cwd(), 'public');
//   const fileContents = await fs.readFile(jsonDirectory + '/config/menu.json', 'utf8');
//   return new Response(fileContents)
}
