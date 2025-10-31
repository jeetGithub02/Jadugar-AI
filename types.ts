
export enum Tool {
  BACKGROUND = 'BACKGROUND',
  UPSCALE = 'UPSCALE',
  OBJECT_MAGIC = 'OBJECT_MAGIC',
}

export interface ImageData {
  base64: string;
  mimeType: string;
}
