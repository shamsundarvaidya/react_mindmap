export function NavigationMenu() {
  return (
    <>
      <button className="w-full text-left px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 border border-transparent hover:border-slate-600 touch-manipulation">
        <span className="text-base">Dashboard</span>
      </button>
      
      <button className="w-full text-left px-4 py-3 rounded-lg text-slate-200 hover:bg-slate-700 hover:text-white transition-colors duration-200 border border-transparent hover:border-slate-600 touch-manipulation">
        <span className="text-base">Profile</span>
      </button>
    </>
  );
}