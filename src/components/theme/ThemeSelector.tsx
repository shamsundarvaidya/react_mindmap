import { useColorScheme } from "../../hooks/useColorScheme";

interface ThemeSelectorProps {
  onSelect: () => void;
}

const THEME_OPTIONS = [
  { scheme: 'Pastel', emoji: '🎨', label: 'Pastel' },
  { scheme: 'Vibrant', emoji: '🔥', label: 'Vibrant' },
  { scheme: 'Blues', emoji: '💧', label: 'Blues' },
  { scheme: 'Sunset', emoji: '🌅', label: 'Sunset' },
];

export function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const { applyScheme } = useColorScheme();

  const handleSchemeSelect = (scheme: string) => {
    applyScheme(scheme);
    onSelect();
  };

  return (
    <>
      {THEME_OPTIONS.map(({ scheme, emoji, label }) => (
        <button
          key={scheme}
          className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white text-sm transition-colors duration-200"
          onClick={() => handleSchemeSelect(scheme)}
        >
          <span className="text-lg">{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </>
  );
}