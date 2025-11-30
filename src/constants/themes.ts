// Color schemes for mind map themes
export type ColorScheme = {
  name: string;
  emoji: string;
  label: string;

  nodeColor: string;
  textColor: string;
  borderColor: string;
  canvasColor: string;
  
  selectedTextColor: string;
  selectedBorderColor: string;
  selectedNodeColor: string;
}

export const THEME_OPTIONS: ColorScheme[] = [
  { 
    name: 'Light', 
    emoji: '☀️', 
    label: 'Light', 
    nodeColor: '#FFFFFF',
    canvasColor: '#ffffffff',
    textColor: '#000000',
    borderColor: '#000000',
    selectedTextColor: '#000000ff',
    selectedBorderColor: '#5635ebff',
    selectedNodeColor: '#ffffffff',
  },
  { 
    name: 'Dark', 
    emoji: '🌙', 
    label: 'Dark', 
    nodeColor: '#000000',
    canvasColor: '#000000ff',
    textColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    selectedBorderColor: '#ffb86cff',
    selectedNodeColor: '#000000ff',
    selectedTextColor: '#ffffffff',
  },
];

// Helper function to get a theme by name
export function getThemeByName(themeName: string): ColorScheme  {
  let theme_found = THEME_OPTIONS.find(theme => theme.name === themeName)
  if(theme_found){
    return theme_found;
  }
  else {
    console.log("Theme  not found:", themeName)
    return THEME_OPTIONS[0];
  }
}

export function getDefaultTheme(): ColorScheme {
  return THEME_OPTIONS[0];
}
