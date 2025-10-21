// (No store usage needed directly here after refactor)
import { useState, useEffect, useRef } from "react";
import NodeMenu from "./controlPanel/NodeMenu";
import AppMenu from "./controlPanel/AppMenu";
import Logo from "./common/Logo";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const ControlPanel = () => {
  return (
    <>
      <div className="px-6 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 relative shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="ghost"
              aria-label="Open menu"
              className="md:hidden p-2 h-8 w-8"
            >
              <Icons.menu className="h-5 w-5" />
            </Button>
            <Logo size="md" />
            <div className="h-6 w-px bg-slate-600"></div>
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


