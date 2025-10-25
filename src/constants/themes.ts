// Color schemes for mind map themes
export interface ColorScheme {
  name: string;
  emoji: string;
  label: string;
  colors: string[];
}

export const COLOR_SCHEMES: Record<string, string[]> = {
  Pastel: ['#FFEEAD', '#AEDFF7', '#C3F7C0', '#F7C2E7', '#FFF1C1'],
  Vibrant: ['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#845EC2'],
  Blues: ['#DCEEFB', '#B6E0FE', '#84C5F4', '#62B0E8', '#3A8DDE'],
  Sunset: ['#FFADAD', '#FFD6A5', '#FDFFB6', '#BDE0FE', '#A0C4FF'],
};

export const THEME_OPTIONS: ColorScheme[] = [
  { name: 'Pastel', emoji: '🎨', label: 'Pastel', colors: COLOR_SCHEMES.Pastel },
  { name: 'Vibrant', emoji: '🔥', label: 'Vibrant', colors: COLOR_SCHEMES.Vibrant },
  { name: 'Blues', emoji: '💧', label: 'Blues', colors: COLOR_SCHEMES.Blues },
  { name: 'Sunset', emoji: '🌅', label: 'Sunset', colors: COLOR_SCHEMES.Sunset },
];

// Helper function to get a color scheme by name
export function getColorScheme(schemeName: string): string[] | null {
  return COLOR_SCHEMES[schemeName] || null;
}

// Helper function to get the default color (first color of Pastel scheme)
export function getDefaultColor(): string {
  return COLOR_SCHEMES.Pastel[0];
}