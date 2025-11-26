// Color schemes for mind map themes
export interface ColorScheme {
  name: string;
  emoji: string;
  label: string;
  colors: string[];
  background: string;
}

export const THEME_OPTIONS: ColorScheme[] = [
  { 
    name: 'Pastel', 
    emoji: '🎨', 
    label: 'Pastel', 
    colors: ['#FFEEAD', '#AEDFF7', '#C3F7C0', '#F7C2E7', '#FFF1C1'],
    background: '#F8FAFC' // Soft slate for gentle pastel colors
  },
  { 
    name: 'Vibrant', 
    emoji: '🔥', 
    label: 'Vibrant', 
    colors: ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#845EC2'],
    background: '#0F172A' // Deep slate to make vibrant colors pop
  },
  { 
    name: 'Blues', 
    emoji: '💧', 
    label: 'Blues', 
    colors: ['#DCEEFB', '#B6E0FE', '#84C5F4', '#62B0E8', '#3A8DDE'],
    background: '#0C4A6E' // Deep cyan for blue theme harmony
  },
  { 
    name: 'Sunset', 
    emoji: '🌅', 
    label: 'Sunset', 
    colors: ['#FFADAD', '#FFD6A5', '#FDFFB6', '#BDE0FE', '#A0C4FF'],
    background: '#1E293B' // Warm dark slate for sunset warmth
  },
  { 
    name: 'BlackWhite', 
    emoji: '⚫', 
    label: 'Black & White', 
    colors: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
    background: '#FFFFFF' // White background with white nodes and black text/borders
  },
];

// Helper function to get a theme by name
export function getThemeByName(themeName: string): ColorScheme | null {
  return THEME_OPTIONS.find(theme => theme.name === themeName) || null;
}

// Helper function to get the default color (first color of Pastel scheme)
export function getDefaultColor(): string {
  return THEME_OPTIONS[0].colors[0];
}