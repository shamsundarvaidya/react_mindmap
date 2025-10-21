// (No store usage needed directly here after refactor)
import { useState, useEffect, useRef } from "react";
import NodeMenu from "./controlPanel/NodeMenu";
import AppMenu from "./controlPanel/AppMenu";
import Logo from "./common/Logo";
import { Button } from "../components/ui/button";
import { TextAlignJustify } from "lucide-react";

const ControlPanel = () => {
  return (
    <>
      <div className="px-6 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 relative shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              size="icon"
              aria-label="Open Menu"
              className="hover:bg-cyan-50 cursor-pointer border-green-600 text-cyan-600 md:hidden"
            >
              <TextAlignJustify className="w-4 h-4 stroke-current  " />
            </Button>
            <Logo size="md" />
            <div className="h-6 w-px bg-slate-600 hidden md:block"></div>
            <AppMenu />
          </div>

          {/* 
          <div className="flex items-center gap-3">
            <NodeMenu />     
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
