import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Accessibility, Check } from "lucide-react";

export function AccessibilityMenu() {
  const {
    settings,
    toggleHighContrast,
    setColorBlindMode,
    setFontSize,
    toggleReducedMotion,
  } = useAccessibility();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Configurações de acessibilidade"
          title="Acessibilidade"
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>Acessibilidade</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleHighContrast}>
          <div className="flex items-center justify-between w-full">
            <span>Alto Contraste</span>
            {settings.highContrast && <Check className="h-4 w-4" />}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleReducedMotion}>
          <div className="flex items-center justify-between w-full">
            <span>Reduzir Movimento</span>
            {settings.reducedMotion && <Check className="h-4 w-4" />}
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Tamanho da Fonte
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup value={settings.fontSize} onValueChange={(value) => setFontSize(value as any)}>
          <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="large">Grande</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="x-large">Muito Grande</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Modo Daltonismo
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup value={settings.colorBlindMode} onValueChange={(value) => setColorBlindMode(value as any)}>
          <DropdownMenuRadioItem value="none">Nenhum</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="protanopia">Protanopia</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="deuteranopia">Deuteranopia</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="tritanopia">Tritanopia</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
