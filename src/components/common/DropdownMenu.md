# Generic DropdownMenu Component

A flexible, reusable dropdown menu component that can replace FileMenu, SettingsMenu, and ThemeMenu.

## Usage Examples

### Example 1: FileMenu (with Portal)
```tsx
import DropdownMenu from "../common/DropdownMenu";
import FileMenuItems from "./FileMenuItems";

const FileMenu = () => (
  <DropdownMenu>
    <DropdownMenu.Toggle className="px-3 py-1.5 rounded-md text-sm transition-colors hover:bg-slate-100 text-slate-700">
      File ▾
    </DropdownMenu.Toggle>
    <DropdownMenu.Content
      usePortal
      width={220}
      className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 text-sm font-medium text-slate-300"
    >
      <FileMenuItems />
    </DropdownMenu.Content>
  </DropdownMenu>
);
```

### Example 2: SettingsMenu (Relative Positioning)
```tsx
import DropdownMenu, { useDropdownMenuContext } from "../common/DropdownMenu";

const SettingsMenuContent = () => {
  const { closeMenu } = useDropdownMenuContext();
  
  return (
    <>
      <NoteIndicatorToggle />
      <div className="h-px my-1 bg-slate-200" />
      <LayoutHorizontalButton onClick={closeMenu} />
      <LayoutVerticalButton onClick={closeMenu} />
      <LayoutRadialButton onClick={closeMenu} />
    </>
  );
};

const SettingsMenu = () => (
  <div className="relative">
    <DropdownMenu>
      <DropdownMenu.Toggle className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm">
        Settings ▾
      </DropdownMenu.Toggle>
      <DropdownMenu.Content 
        className="absolute mt-1 left-0 w-64 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50"
      >
        <SettingsMenuContent />
      </DropdownMenu.Content>
    </DropdownMenu>
  </div>
);
```

### Example 3: ThemeMenu (Custom Styling)
```tsx
const ThemeMenu = () => (
  <div className="relative">
    <DropdownMenu>
      <DropdownMenu.Toggle className="px-3 py-1.5 rounded-md hover:bg-slate-100 text-slate-700 text-sm">
        Theme ▾
      </DropdownMenu.Toggle>
      <DropdownMenu.Content 
        position="bottom-left"
        className="absolute mt-1 left-0 w-56 bg-white border border-slate-200 rounded-md shadow-lg p-1 z-50"
      >
        <ThemeSwatches />
      </DropdownMenu.Content>
    </DropdownMenu>
  </div>
);
```

## Props

### DropdownMenu.Toggle
- `children`: ReactNode - Content to render
- `className?`: string - CSS classes
- `as?`: "button" | "div" - Element type (default: "button")

### DropdownMenu.Content
- `children`: ReactNode - Menu content
- `className?`: string - CSS classes
- `position?`: "bottom-left" | "bottom-right" | "top-left" | "top-right" - Positioning
- `usePortal?`: boolean - Render in portal (default: false)
- `width?`: string | number - Width constraint

## Benefits

✅ Consistent behavior across all menus
✅ Reduced code duplication
✅ Easy to customize per menu
✅ Type-safe with TypeScript
✅ Accessible (ARIA attributes, keyboard support)
✅ Flexible positioning (portal or relative)
