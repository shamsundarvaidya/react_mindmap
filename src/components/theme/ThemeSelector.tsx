import { useAppDispatch, useAppSelector } from "../../store";
import { setTheme } from "../../store/themeSlice";
import { THEME_OPTIONS } from "../../constants/themes";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

interface ThemeSelectorProps {
  onSelect: () => void;
}

export function ThemeSelector({ onSelect }: ThemeSelectorProps) {
  const dispatch = useAppDispatch();
  const selectedTheme = useAppSelector(
    (state) => state.theme.selectedTheme.name
  );

  const handleThemeSelect = (themeName: string) => {
    dispatch(setTheme(themeName));
    onSelect();
  };

  return (
    <ToggleGroup
      type="single"
      value={selectedTheme}
      onValueChange={(value) => value && handleThemeSelect(value)}
      className="grid w-full grid-cols-2 gap-2"
    >
      {THEME_OPTIONS.map(({ name, emoji, label }) => (
        <ToggleGroupItem
          key={name}
          value={name}
          aria-label={`${label} theme`}
          className="justify-start"
        >
          <span className="text-lg">{emoji}</span>
          <span className="text-sm">{label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
