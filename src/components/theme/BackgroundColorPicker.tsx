import { useCanvasBackground } from "../../hooks/useCanvasBackground";

interface BackgroundColorPickerProps {
  onSelect: () => void;
}

const LIGHT_SWATCHES = [
  { c: '#ffffff', label: 'White' },
  { c: '#F8FAFC', label: 'Slate-50' },
  { c: '#F1F5F9', label: 'Slate-100' },
  { c: '#FFF7ED', label: 'Orange-50' },
  { c: '#ECFEFF', label: 'Cyan-50' },
  { c: '#FDF2F8', label: 'Pink-50' },
  { c: '#F0FDF4', label: 'Green-50' },
  { c: '#EFF6FF', label: 'Blue-50' },
  { c: '#FEF9C3', label: 'Yellow-100' },
  { c: '#E2E8F0', label: 'Slate-300' },
];

const DARK_SWATCHES = [
  { c: '#0B1220', label: 'Night' },
  { c: '#0F172A', label: 'Slate-900' },
  { c: '#111827', label: 'Gray-900' },
  { c: '#1F2937', label: 'Gray-800' },
  { c: '#1E293B', label: 'Slate-800' },
  { c: '#0C4A6E', label: 'Cyan-900' },
  { c: '#3730A3', label: 'Indigo-800' },
  { c: '#7C2D12', label: 'Orange-900' },
  { c: '#134E4A', label: 'Teal-900' },
  { c: '#4A044E', label: 'Fuchsia-950' },
];

export function BackgroundColorPicker({ onSelect }: BackgroundColorPickerProps) {
  const { setBackground } = useCanvasBackground();

  const handleColorSelect = (color: string) => {
    setBackground(color);
    onSelect();
  };

  return (
    <>
      <div className="border-t border-slate-700 my-2" />
      <div className="px-3 py-1 text-xs uppercase tracking-wide text-slate-500 font-medium">
        Background
      </div>
      <div className="px-3 pb-2 space-y-2">
        <div className="grid grid-cols-5 gap-2">
          {LIGHT_SWATCHES.map(opt => (
            <button
              key={opt.c}
              title={opt.label}
              className="h-6 w-6 rounded border border-slate-300 shadow-sm hover:scale-110 transition-transform duration-150"
              style={{ backgroundColor: opt.c }}
              onClick={() => handleColorSelect(opt.c)}
            />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {DARK_SWATCHES.map(opt => (
            <button
              key={opt.c}
              title={opt.label}
              className="h-6 w-6 rounded border border-slate-700 shadow-sm hover:scale-110 transition-transform duration-150"
              style={{ backgroundColor: opt.c }}
              onClick={() => handleColorSelect(opt.c)}
            />
          ))}
        </div>
      </div>
    </>
  );
}