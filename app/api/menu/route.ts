import path from 'path';
import { promises as fs } from 'fs';
import { sentImagesPath } from '@/lib/sentImagesPath';

export async function GET(request: Request) {
  return await sentImagesPath("menu");
}
