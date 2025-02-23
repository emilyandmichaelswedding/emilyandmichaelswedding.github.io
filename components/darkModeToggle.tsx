"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ToggleButton } from "@mui/material";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";

const DarkModeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme) {
      setChecked(resolvedTheme === "dark");
    }
  }, [resolvedTheme]);

  const handleChange = () => {
    setChecked(!checked);
    setTheme(!checked ? "dark" : "light");
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <Tooltip title={checked ? "Switch to Bride Mode" : "Switch to Groom Mode"} arrow>
      <ToggleButton
        style={{
          maxWidth: "35px",
          maxHeight: "35px",
          minWidth: "35px",
          minHeight: "35px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0, // Remove any extra padding
        }}
        value="check"
        selected={checked}
        onChange={handleChange}
      >
        <Image
          src={checked ? "/rose.svg" : "/tux.svg"}
          alt={checked ? "Light Mode" : "Dark Mode"}
          width={15}
          height={15}
          style={{
            width: "75%",
            height: "75%",
            filter: checked ? "invert(1)" : "none",
            paddingTop: "5px",
          }}
        />
      </ToggleButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
