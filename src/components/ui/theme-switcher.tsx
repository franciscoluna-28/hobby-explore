"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, SunMoon } from "lucide-react";
import { Card } from "./card";
import { Skeleton } from "./skeleton";
import { Button } from "./button";

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

type Props = {
  shouldBeCard?: boolean;
};

const ThemeSwitch = ({ shouldBeCard = true }: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME);
  };

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    {shouldBeCard ? (
      <Skeleton className="flex items-center space-x-4 rounded-md p-4 min-h-[75px] min-w-[450px]" />
    ) : (
      <div>Loading...</div>
    )}
  }

  return (
    <div>
      {shouldBeCard ? (
        <Card className=" flex items-center space-x-4 rounded-md border p-4">
          <SunMoon />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Change Theme</p>
            <p className="text-sm text-muted-foreground">
              {`Change the theme of the application.`}
            </p>
          </div>
          <Switch onClick={toggleTheme} />
          <Label htmlFor="change-theme">{theme}</Label>
        </Card>
      ) : (
       <Button className="dark:border-[#454545] dark:hover:bg-[#171717] rounded-full" onClick={toggleTheme} size="icon" variant="outline">{theme === LIGHT_THEME ? <Sun height={20} width={20}/> : <Moon height={20} width={20}/>}</Button>
      )}
    </div>
  );
};

export default ThemeSwitch;
