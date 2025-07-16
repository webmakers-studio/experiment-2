import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { Bell, Plus, Search, Settings } from "lucide-react";

const AppHeader = () => {
  return (
    <div className="flex items-center justify-between h-12 border-b w-full px-2">
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
          Create Email
        </Button>
      </div>
    </div>
  );
};

export default AppHeader;
