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
          className="gap-1.5 px-3 h-9 rounded-full border-0"
          style={{ 
            color: 'rgba(255,255,255,0.95)',
            background: 'rgba(60,60,60,0.35)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 0.5px 0 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(0,0,0,0.15)',
            border: '0.5px solid rgba(255,255,255,0.18)'
          }}
        >
          <Globe className="size-4" />
          <span className="text-sm font-medium uppercase">{language}</span>
          <ChevronDown className="size-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="min-w-[150px] border-0"
        style={{ 
          color: 'rgba(255,255,255,0.95)',
          background: 'rgba(60,60,60,0.35)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: '0 0.5px 0 0 rgba(255,255,255,0.15) inset, 0 4px 16px rgba(0,0,0,0.15)',
          border: '0.5px solid rgba(255,255,255,0.18)'
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
