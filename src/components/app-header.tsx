import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Bell, Plus, Search, Settings } from "lucide-react";

const AppHeader = () => {
  return (
    <div className="flex items-center sticky top-0 justify-between z-10 bg-white h-12 border-b w-full px-2">
      <div className="flex items-center gap-1">
        <SidebarTrigger />
        <h2 className="text-sm">Cleanbox.</h2>
      </div>

      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Search />
        </Button>
        <Button size="icon" variant="ghost">
          <Settings />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button>
          <Plus />
          Create New
        </Button>
      </div>
    </div>
  );
};

export default AppHeader;
