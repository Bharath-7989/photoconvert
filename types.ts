export interface HeadshotStyle {
  id: string;
  name: string;
  prompt: string;
  previewUrl: string;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'model';
  text: string;
}

export interface ImageFile {
  base64: string;
  url: string;
  mimeType: string;
}
