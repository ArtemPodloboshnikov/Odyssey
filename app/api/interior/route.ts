import { sentImagesPath } from '@/lib/sentImagesPath';

export async function GET(request: Request) {
  return await sentImagesPath("interior");
}