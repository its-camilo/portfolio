import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

interface LanguageDropdownProps {
  isTransparent?: boolean;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageDropdown({ isTransparent = false }: LanguageDropdownProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 px-3 h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md hover:bg-background/80 transition-all duration-200"
          style={{ 
            boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.06) inset'
          }}
        >
          <Globe className="size-4" />
          <span className="text-sm font-medium uppercase">{language}</span>
          <ChevronDown className="size-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[150px] bg-background/95 backdrop-blur-sm border border-border/40"
        style={{ 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.06) inset'
        }}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              'cursor-pointer gap-2',
              language === lang.code && 'bg-accent font-medium'
            )}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
