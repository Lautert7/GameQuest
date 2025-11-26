import React, { createContext, useContext, useState, useEffect } from "react";

type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia";
type FontSize = "normal" | "large" | "x-large";

interface AccessibilitySettings {
  highContrast: boolean;
  colorBlindMode: ColorBlindMode;
  fontSize: FontSize;
  reducedMotion: boolean;
  keyboardNavigation: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  toggleHighContrast: () => void;
  setColorBlindMode: (mode: ColorBlindMode) => void;
  setFontSize: (size: FontSize) => void;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

const STORAGE_KEY = "accessibility-settings";

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  colorBlindMode: "none",
  fontSize: "normal",
  reducedMotion: false,
  keyboardNavigation: true,
};

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...defaultSettings, ...JSON.parse(stored) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;

    // High contrast
    if (settings.highContrast) {
      root.classList.add("high-contrast");
    } else {
      root.classList.remove("high-contrast");
    }

    // Color blind modes
    root.classList.remove("protanopia", "deuteranopia", "tritanopia");
    if (settings.colorBlindMode !== "none") {
      root.classList.add(settings.colorBlindMode);
    }

    // Font size
    root.classList.remove("font-large", "font-x-large");
    if (settings.fontSize === "large") {
      root.classList.add("font-large");
    } else if (settings.fontSize === "x-large") {
      root.classList.add("font-x-large");
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggleHighContrast = () => {
    setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const setColorBlindMode = (mode: ColorBlindMode) => {
    setSettings((prev) => ({ ...prev, colorBlindMode: mode }));
  };

  const setFontSize = (size: FontSize) => {
    setSettings((prev) => ({ ...prev, fontSize: size }));
  };

  const toggleReducedMotion = () => {
    setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        toggleHighContrast,
        setColorBlindMode,
        setFontSize,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
