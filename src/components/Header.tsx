"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const navItems = [
  { name: "Become a host", href: "/" },
  { name: "log in or signup", href: "/login", isPrimary: true },
];

const expandedStyle = {
  height: 80,
  width: "100%",
  y: 0,
  x: 0,
  borderRadius: 20,
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const collapsedStyle = {
  height: 48,
  width: "80%",
  y: 16,
  x: "10%",
  borderRadius: 16,
  boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
};

const Header = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsTop(window.scrollY < 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="w-full p-2 sticky top-0 bg-white flex border border-gray-100 justify-between items-center z-40"
      initial={expandedStyle}
      animate={isTop ? expandedStyle : collapsedStyle}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ overflow: "hidden" }}
    >
      <Logo />
      <nav className="flex space-x-4">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant={item.isPrimary ? "default" : "ghost"}
          >
            {item.name}
          </Button>
        ))}
      </nav>
    </motion.div>
  );
};

export default Header;
