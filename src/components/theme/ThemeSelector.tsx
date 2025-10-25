import { useColorScheme } from "../../hooks/useColorScheme";
import { THEME_OPTIONS } from "../../constants/themes";

interface ThemeSelectorProps {
  onSelect: () => void;
}

export function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const { applyScheme } = useColorScheme();

  const handleSchemeSelect = (scheme: string) => {
    applyScheme(scheme);
    onSelect();
  };

  return (
    <>
      {THEME_OPTIONS.map(({ name, emoji, label }) => (
        <button
          key={name}
          className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white text-sm transition-colors duration-200"
          onClick={() => handleSchemeSelect(name)}
        >
          <span className="text-lg">{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </>
  );
}