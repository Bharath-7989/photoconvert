import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    prompt: 'Generate a professional corporate headshot of a person against a solid, textured grey backdrop. The lighting should be soft and even, highlighting facial features clearly. The person should be wearing professional business attire, like a dark suit jacket and a light-colored dress shirt or blouse. The expression should be confident and friendly.',
    previewUrl: 'https://picsum.photos/seed/corporate/300/300',
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    prompt: 'Generate a professional headshot of a person in a modern tech office environment. The background should be slightly blurred (bokeh effect) showing a clean, bright office with elements like glass walls, plants, and subtle computer screens. The person should wear smart-casual attire, like a button-down shirt or a stylish blazer. The mood should be innovative and approachable.',
    previewUrl: 'https://picsum.photos/seed/tech/300/300',
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural',
    prompt: 'Generate a professional headshot of a person outdoors with natural lighting. The background should be a pleasant, out-of-focus natural setting, like a park with green foliage. The lighting should be bright and warm, as if taken during the "golden hour." The person should be dressed in relaxed but professional clothing. The expression should be warm and genuine.',
    previewUrl: 'https://picsum.photos/seed/outdoor/300/300',
  },
  {
    id: 'black-and-white',
    name: 'Classic B&W',
    prompt: 'Generate a dramatic and classic black and white professional headshot. The lighting should be high-contrast (chiaroscuro), creating depth and character. The background should be dark and simple. The focus should be entirely on the person\'s expression, which should be thoughtful and strong. The attire should be simple and dark.',
    previewUrl: 'https://picsum.photos/seed/bw/300/300',
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    prompt: 'Generate a vibrant and creative professional headshot of a person against a solid, bold colored backdrop (e.g., teal, mustard yellow). The lighting should be bright and crisp. The person should wear stylish, creative attire that reflects their personality. The expression should be energetic and engaging.',
    previewUrl: 'https://picsum.photos/seed/creative/300/300',
  },
  {
    id: 'minimalist-white',
    name: 'Minimalist White',
    prompt: 'Generate a clean and modern professional headshot of a person against a pure white background. The lighting should be very bright and shadowless, creating a high-key effect. The attire should be simple and elegant. The overall feel should be minimalist, fresh, and sophisticated.',
    previewUrl: 'https://picsum.photos/seed/minimalist/300/300',
  },
  {
    id: 'engraved-ink',
    name: 'Engraved Ink',
    prompt: 'Generate a striking, high-contrast, black and white headshot in an engraved or woodcut illustration style. The image should be composed of fine, detailed black lines on a light, off-white background, creating a sense of texture and depth. The lighting should be dramatic, casting strong shadows to emphasize facial features. The overall mood should be artistic, intense, and sophisticated, resembling a classic ink portrait.',
    previewUrl: 'https://picsum.photos/seed/engraved/300/300',
  },
  {
    id: 'academic-professor',
    name: 'Academic Professor',
    prompt: 'Generate a scholarly and professional headshot of a person in a classic, warm-lit library or study. The background should feature out-of-focus bookshelves, creating a sophisticated and intellectual ambiance. The person should be wearing academic or business-casual attire, like a tweed jacket or a smart sweater. The expression should be thoughtful and approachable.',
    previewUrl: 'https://picsum.photos/seed/academic/300/300',
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    prompt: 'Generate a headshot with a vintage film aesthetic. The image should have warm, slightly desaturated tones, soft focus, and a subtle film grain. The lighting should be natural and gentle, reminiscent of classic 1970s portrait photography. The attire and background should be simple to keep the focus on the person\'s timeless and nostalgic expression.',
    previewUrl: 'https://picsum.photos/seed/vintage/300/300',
  },
  {
    id: 'futuristic-neon',
    name: 'Futuristic Neon',
    prompt: 'Generate a futuristic, high-fashion headshot bathed in neon light. The background should be dark, with vibrant streaks of electric blue, pink, and purple light creating a cyberpunk feel. The person should have a modern, edgy look, with attire that is sleek and stylish. The expression should be confident and intense, fitting the dynamic, high-tech mood.',
    previewUrl: 'https://picsum.photos/seed/futuristic/300/300',
  },
  {
    id: 'watercolor-portrait',
    name: 'Watercolor Art',
    prompt: 'Generate an artistic headshot in a soft, expressive watercolor painting style. The colors should be vibrant yet translucent, with visible brushstrokes and paper texture. The focus should be on the person\'s face, with the background being an abstract wash of complementary colors. The mood should be gentle, creative, and unique.',
    previewUrl: 'https://picsum.photos/seed/watercolor/300/300',
  },
  {
    id: 'low-poly',
    name: 'Low Poly',
    prompt: 'Generate a stylized headshot in a low-poly geometric art style. The person\'s face and features should be constructed from a mesh of colorful triangles and polygons. The lighting should create distinct facets of light and shadow, giving the portrait a modern, digital, and abstract feel.',
    previewUrl: 'https://picsum.photos/seed/lowpoly/300/300',
  },
  {
    id: 'gothic-noir',
    name: 'Gothic Noir',
    prompt: 'Generate a dramatic, atmospheric headshot in a gothic noir style. The image should be in high-contrast black and white, with deep shadows and selective highlights (chiaroscuro). The background should be dark and mysterious, perhaps suggesting a Victorian or moody urban setting. The expression should be intense and enigmatic.',
    previewUrl: 'https://picsum.photos/seed/gothic/300/300',
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    prompt: 'Generate a vibrant headshot in the style of 1960s Pop Art, reminiscent of Andy Warhol. The image should use bold, saturated, and unexpected colors for the skin and hair, with a distinct screen-printed look and halftone dots. The background should be a flat, bright, contrasting color. The expression should be bold and graphic.',
    previewUrl: 'https://picsum.photos/seed/popart/300/300',
  },
  {
    id: 'hollywood-glamour',
    name: 'Hollywood Glamour',
    prompt: 'Generate a glamorous black and white headshot in the style of Golden Age Hollywood cinema (1940s). The lighting should be soft and dramatic, with a subtle glow effect. The person should have a classic, elegant hairstyle and attire. The expression should be sophisticated and captivating, with a hint of mystery.',
    previewUrl: 'https://picsum.photos/seed/hollywood/300/300',
  },
  {
    id: 'cyberpunk-hacker',
    name: 'Cyberpunk Hacker',
    prompt: 'Generate a headshot in a cyberpunk aesthetic. The person should be illuminated by holographic data displays and neon city lights in shades of magenta, cyan, and electric blue. The background should be a dark, futuristic cityscape at night. The attire should be tech-infused, and the expression should be focused and cool, as if they are interfacing with a high-tech system.',
    previewUrl: 'https://picsum.photos/seed/cyberpunk/300/300',
  },
];
