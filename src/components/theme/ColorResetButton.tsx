import { useColorScheme } from "../../hooks/useColorScheme";

interface ColorResetButtonProps {
  onSelect: () => void;
}

export function ColorResetButton({ onSelect }: ColorResetButtonProps) {
  const { resetColors } = useColorScheme();

  const handleReset = () => {
    resetColors();
    onSelect();
  };

  return (
    <button
      className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-700 hover:text-white text-sm transition-colors duration-200"
      onClick={handleReset}
    >
      <span className="text-lg">↩️</span>
      <span>Reset colors</span>
    </button>
  );
}