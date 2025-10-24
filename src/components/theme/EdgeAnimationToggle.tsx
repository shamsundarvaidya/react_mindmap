import { useEdgeAnimation } from "../../hooks/useEdgeAnimation";

export function EdgeAnimationToggle() {
  const { edgesAnimated, toggleEdgeAnimation } = useEdgeAnimation();

  return (
    <label className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 text-sm cursor-pointer select-none hover:bg-slate-700 rounded-md transition-colors">
      <input
        type="checkbox"
        className="accent-blue-500"
        checked={edgesAnimated}
        onChange={(e) => toggleEdgeAnimation(e.target.checked)}
      />
      Animate edges
    </label>
  );
}