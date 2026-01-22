'use client';

import { useState, useEffect } from 'react';
import { Palette, X, Copy, Check, RotateCcw, Sun, Moon, Shuffle } from 'lucide-react';

// Only render in development
const isDev = process.env.NODE_ENV === 'development';

// Light mode defaults - comprehensive
const LIGHT_THEME = {
  // Accent colors
  '--accent': '#83a0b9',
  '--accent-dark': '#5a7a94',
  '--accent-light': '#a8c0d4',
  // Page backgrounds
  '--page-bg': '#F5F5F5',
  '--light-bg': '#FAFAFA',
  '--light-bg-elevated': '#ffffff',
  '--light-bg-inset': '#F0F0F0',
  '--light-bg-hover': '#EBEBEB',
  // Text colors
  '--text-primary': '#1a1a1a',
  '--text-muted': '#52525b',
  '--text-subtle': '#71717a',
  // Hero section
  '--hero-bg': '#FAFAFA',
  '--hero-gutter': '#F5F5F5',
  '--hero-text': '#1a1a1a',
  '--hero-text-muted': '#52525b',
  '--hero-overline': '#5a7a94',
  '--hero-btn-primary-bg': '#83a0b9',
  '--hero-btn-primary-text': '#ffffff',
  '--hero-btn-secondary-text': '#1a1a1a',
  '--hero-marquee-bg': 'rgba(255, 255, 255, 0.5)',
  // Borders
  '--border': 'rgba(0, 0, 0, 0.08)',
  '--border-dark': 'rgba(255, 255, 255, 0.08)',
  // Material surfaces (for cards)
  '--material-bg': '#ffffff',
  '--material-shadow': 'rgba(0, 0, 0, 0.04)',
  // Nav specific
  '--nav-hero-gutter': '#F5F5F5',
  '--nav-hero-text': '#1a1a1a',
  '--nav-hero-text-muted': '#52525b',
};

// Dark mode defaults - comprehensive
const DARK_THEME = {
  // Accent colors
  '--accent': '#83a0b9',
  '--accent-dark': '#5a7a94',
  '--accent-light': '#a8c0d4',
  // Page backgrounds
  '--page-bg': '#0f0f12',
  '--light-bg': '#18181b',
  '--light-bg-elevated': '#27272a',
  '--light-bg-inset': '#09090b',
  '--light-bg-hover': '#3f3f46',
  // Text colors
  '--text-primary': '#fafafa',
  '--text-muted': '#a1a1aa',
  '--text-subtle': '#71717a',
  // Hero section
  '--hero-bg': '#0f0f12',
  '--hero-gutter': '#09090b',
  '--hero-text': '#fafafa',
  '--hero-text-muted': '#a1a1aa',
  '--hero-overline': '#a8c0d4',
  '--hero-btn-primary-bg': '#83a0b9',
  '--hero-btn-primary-text': '#0f0f12',
  '--hero-btn-secondary-text': '#fafafa',
  '--hero-marquee-bg': 'rgba(0, 0, 0, 0.3)',
  // Borders
  '--border': 'rgba(255, 255, 255, 0.1)',
  '--border-dark': 'rgba(255, 255, 255, 0.1)',
  // Material surfaces (for cards)
  '--material-bg': '#27272a',
  '--material-shadow': 'rgba(0, 0, 0, 0.3)',
  // Nav specific
  '--nav-hero-gutter': '#09090b',
  '--nav-hero-text': '#fafafa',
  '--nav-hero-text-muted': '#a1a1aa',
};

const DEFAULT_THEME = LIGHT_THEME;

// Grouped for better UX
const THEME_GROUPS = [
  {
    name: 'Accent',
    vars: [
      { key: '--accent', label: 'Primary' },
      { key: '--accent-dark', label: 'Dark' },
      { key: '--accent-light', label: 'Light' },
    ],
  },
  {
    name: 'Backgrounds',
    vars: [
      { key: '--page-bg', label: 'Page' },
      { key: '--light-bg', label: 'Light' },
      { key: '--light-bg-elevated', label: 'Elevated' },
      { key: '--light-bg-hover', label: 'Hover' },
    ],
  },
  {
    name: 'Text',
    vars: [
      { key: '--text-primary', label: 'Primary' },
      { key: '--text-muted', label: 'Muted' },
    ],
  },
  {
    name: 'Hero',
    vars: [
      { key: '--hero-bg', label: 'Background' },
      { key: '--hero-gutter', label: 'Gutter' },
    ],
  },
];

// Generate random HSL color
const randomHSL = (s: number, l: number) => {
  const h = Math.floor(Math.random() * 360);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

// Convert HSL to Hex
const hslToHex = (h: number, s: number, l: number): string => {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

// Generate random theme with full variables
const generateRandomTheme = (isDark: boolean): Record<string, string> => {
  const baseHue = Math.floor(Math.random() * 360);
  const accent = hslToHex(baseHue, 45 + Math.random() * 20, isDark ? 55 : 45);
  const accentDark = hslToHex(baseHue, 40 + Math.random() * 15, isDark ? 45 : 35);
  const accentLight = hslToHex(baseHue, 35 + Math.random() * 15, isDark ? 65 : 60);
  
  const baseTheme = isDark ? { ...DARK_THEME } : { ...LIGHT_THEME };
  
  if (isDark) {
    const bgLightness = 5 + Math.random() * 8;
    return {
      ...baseTheme,
      '--accent': accent,
      '--accent-dark': accentDark,
      '--accent-light': accentLight,
      '--page-bg': hslToHex(baseHue, 5, bgLightness),
      '--light-bg': hslToHex(baseHue, 5, bgLightness + 5),
      '--light-bg-elevated': hslToHex(baseHue, 5, bgLightness + 10),
      '--light-bg-inset': hslToHex(baseHue, 5, bgLightness - 2),
      '--light-bg-hover': hslToHex(baseHue, 5, bgLightness + 15),
      '--hero-bg': hslToHex(baseHue, 5, bgLightness),
      '--hero-gutter': hslToHex(baseHue, 5, bgLightness - 3),
      '--hero-overline': accentLight,
      '--hero-btn-primary-bg': accent,
      '--nav-hero-gutter': hslToHex(baseHue, 5, bgLightness - 3),
      '--material-bg': hslToHex(baseHue, 5, bgLightness + 10),
    };
  } else {
    const bgLightness = 94 + Math.random() * 4;
    return {
      ...baseTheme,
      '--accent': accent,
      '--accent-dark': accentDark,
      '--accent-light': accentLight,
      '--page-bg': hslToHex(baseHue, 3, bgLightness),
      '--light-bg': hslToHex(baseHue, 3, bgLightness + 2),
      '--light-bg-inset': hslToHex(baseHue, 3, bgLightness - 3),
      '--light-bg-hover': hslToHex(baseHue, 3, bgLightness - 5),
      '--hero-bg': hslToHex(baseHue, 3, bgLightness + 2),
      '--hero-gutter': hslToHex(baseHue, 3, bgLightness),
      '--hero-overline': accentDark,
      '--hero-btn-primary-bg': accent,
      '--nav-hero-gutter': hslToHex(baseHue, 3, bgLightness),
    };
  }
};

// Fun theme generators
const THEME_GENERATORS = [
  { name: '🌊 Ocean', gen: (dark: boolean) => generateThemedPalette(200, 220, dark) },
  { name: '🌲 Forest', gen: (dark: boolean) => generateThemedPalette(140, 160, dark) },
  { name: '🌅 Sunset', gen: (dark: boolean) => generateThemedPalette(15, 35, dark) },
  { name: '🍇 Grape', gen: (dark: boolean) => generateThemedPalette(270, 290, dark) },
  { name: '🌸 Sakura', gen: (dark: boolean) => generateThemedPalette(330, 350, dark) },
  { name: '🥝 Kiwi', gen: (dark: boolean) => generateThemedPalette(80, 100, dark) },
  { name: '☕ Mocha', gen: (dark: boolean) => generateThemedPalette(25, 35, dark, 25) },
  { name: '🦩 Miami', gen: (dark: boolean) => generateThemedPalette(315, 335, dark, 55) },
];

// Generate themed palette from hue range with full variables
const generateThemedPalette = (hueMin: number, hueMax: number, isDark: boolean, satBoost = 0): Record<string, string> => {
  const baseHue = hueMin + Math.random() * (hueMax - hueMin);
  const sat = 40 + satBoost;
  const accent = hslToHex(baseHue, sat + 10, isDark ? 55 : 45);
  const accentDark = hslToHex(baseHue, sat, isDark ? 45 : 35);
  const accentLight = hslToHex(baseHue, sat - 5, isDark ? 65 : 60);
  
  const baseTheme = isDark ? { ...DARK_THEME } : { ...LIGHT_THEME };
  
  if (isDark) {
    return {
      ...baseTheme,
      '--accent': accent,
      '--accent-dark': accentDark,
      '--accent-light': accentLight,
      '--page-bg': hslToHex(baseHue, 8, 7),
      '--light-bg': hslToHex(baseHue, 8, 11),
      '--light-bg-elevated': hslToHex(baseHue, 8, 15),
      '--light-bg-inset': hslToHex(baseHue, 8, 5),
      '--light-bg-hover': hslToHex(baseHue, 8, 20),
      '--hero-bg': hslToHex(baseHue, 8, 7),
      '--hero-gutter': hslToHex(baseHue, 8, 5),
      '--hero-overline': accentLight,
      '--hero-btn-primary-bg': accent,
      '--nav-hero-gutter': hslToHex(baseHue, 8, 5),
      '--material-bg': hslToHex(baseHue, 8, 15),
    };
  } else {
    return {
      ...baseTheme,
      '--accent': accent,
      '--accent-dark': accentDark,
      '--accent-light': accentLight,
      '--page-bg': hslToHex(baseHue, 5, 96),
      '--light-bg': hslToHex(baseHue, 5, 98),
      '--light-bg-inset': hslToHex(baseHue, 5, 94),
      '--light-bg-hover': hslToHex(baseHue, 5, 92),
      '--hero-bg': hslToHex(baseHue, 5, 98),
      '--hero-gutter': hslToHex(baseHue, 5, 96),
      '--hero-overline': accentDark,
      '--hero-btn-primary-bg': accent,
      '--nav-hero-gutter': hslToHex(baseHue, 5, 96),
    };
  }
};

// Preset themes
const PRESETS = [
  {
    name: 'Sage',
    values: {
      '--accent': '#7C9082',
      '--accent-dark': '#5D6E62',
      '--accent-light': '#9BAA9F',
    },
  },
  {
    name: 'Steel',
    values: {
      '--accent': '#83a0b9',
      '--accent-dark': '#5a7a94',
      '--accent-light': '#a8c0d4',
    },
  },
  {
    name: 'Coral',
    values: {
      '--accent': '#c4796e',
      '--accent-dark': '#a35d53',
      '--accent-light': '#d9a099',
    },
  },
  {
    name: 'Purple',
    values: {
      '--accent': '#8b7cb5',
      '--accent-dark': '#6b5c95',
      '--accent-light': '#ab9cd5',
    },
  },
  {
    name: 'Electric',
    values: {
      '--accent': '#0D99FF',
      '--accent-dark': '#0077cc',
      '--accent-light': '#4db8ff',
    },
  },
  {
    name: 'Gold',
    values: {
      '--accent': '#b8943f',
      '--accent-dark': '#8a6f2f',
      '--accent-light': '#d4b85f',
    },
  },
];

export default function DevThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<Record<string, string>>(DEFAULT_THEME);
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    if (!isDev) return;
    const saved = localStorage.getItem('dev-theme');
    const savedMode = localStorage.getItem('dev-theme-mode');
    if (savedMode === 'dark') setIsDark(true);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTheme(parsed);
        applyTheme(parsed);
      } catch (e) {
        console.error('Failed to parse saved theme');
      }
    }
  }, []);

  const applyTheme = (newTheme: Record<string, string>) => {
    Object.entries(newTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  };

  const handleColorChange = (key: string, value: string) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('dev-theme', JSON.stringify(newTheme));
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    const baseTheme = isDark ? DARK_THEME : LIGHT_THEME;
    const newTheme = { ...baseTheme, ...preset.values };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('dev-theme', JSON.stringify(newTheme));
  };

  const setLightMode = () => {
    if (!isDark) return;
    setIsDark(false);
    localStorage.setItem('dev-theme-mode', 'light');
    const currentAccent = {
      '--accent': theme['--accent'],
      '--accent-dark': theme['--accent-dark'],
      '--accent-light': theme['--accent-light'],
    };
    const newTheme = { ...LIGHT_THEME, ...currentAccent };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('dev-theme', JSON.stringify(newTheme));
  };

  const setDarkMode = () => {
    if (isDark) return;
    setIsDark(true);
    localStorage.setItem('dev-theme-mode', 'dark');
    const currentAccent = {
      '--accent': theme['--accent'],
      '--accent-dark': theme['--accent-dark'],
      '--accent-light': theme['--accent-light'],
    };
    const newTheme = { ...DARK_THEME, ...currentAccent };
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('dev-theme', JSON.stringify(newTheme));
  };

  const toggleDarkMode = () => {
    if (isDark) {
      setLightMode();
    } else {
      setDarkMode();
    }
  };

  const generateRandom = () => {
    const newTheme = generateRandomTheme(isDark);
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('dev-theme', JSON.stringify(newTheme));
  };

  const applyGenerator = (gen: (dark: boolean) => Record<string, string>) => {
    const newTheme = gen(isDark);
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('dev-theme', JSON.stringify(newTheme));
  };

  const resetTheme = () => {
    const baseTheme = isDark ? DARK_THEME : LIGHT_THEME;
    setTheme(baseTheme);
    applyTheme(baseTheme);
    localStorage.removeItem('dev-theme');
  };

  const copyCSS = () => {
    const css = Object.entries(theme)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n');
    navigator.clipboard.writeText(`:root {\n${css}\n}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isDev) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9999] w-12 h-12 bg-black text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
        title="Theme Picker (Dev Only)"
      >
        <Palette size={20} />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-[9999] w-80 max-h-[80vh] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Theme Picker
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={toggleDarkMode}
                className={`p-1.5 rounded transition-colors ${isDark ? 'bg-gray-800 text-yellow-400' : 'hover:bg-gray-200 text-gray-500'}`}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Moon size={14} /> : <Sun size={14} />}
              </button>
              <button
                onClick={generateRandom}
                className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                title="Random Theme"
              >
                <Shuffle size={14} />
              </button>
              <button
                onClick={copyCSS}
                className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                title="Copy CSS"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
              <button
                onClick={resetTheme}
                className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                title="Reset to defaults"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-4 space-y-4">
            {/* Mode toggle - simple buttons */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={setLightMode}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-bold transition-all ${!isDark ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Sun size={12} /> Light
              </button>
              <button
                onClick={setDarkMode}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-bold transition-all ${isDark ? 'bg-gray-800 shadow text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Moon size={12} /> Dark
              </button>
            </div>

            {/* Fun Generators */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                🎲 Generate Theme
              </p>
              <div className="grid grid-cols-4 gap-1.5">
                {THEME_GENERATORS.map((gen) => (
                  <button
                    key={gen.name}
                    onClick={() => applyGenerator(gen.gen)}
                    className="px-2 py-1.5 text-[10px] bg-gray-100 hover:bg-gray-200 rounded transition-colors text-center"
                    title={gen.name}
                  >
                    {gen.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Presets */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Accent Presets
              </p>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="flex items-center gap-1.5 px-2 py-1 text-[10px] bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: preset.values['--accent'] }}
                    />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color groups */}
            {THEME_GROUPS.map((group) => (
              <div key={group.name}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  {group.name}
                </p>
                <div className="space-y-1.5">
                  {group.vars.map((v) => (
                    <div key={v.key} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={theme[v.key]?.startsWith('#') ? theme[v.key] : '#000000'}
                        onChange={(e) => handleColorChange(v.key, e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer border border-gray-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-medium text-gray-700 truncate">{v.label}</p>
                      </div>
                      <input
                        type="text"
                        value={theme[v.key] || ''}
                        onChange={(e) => handleColorChange(v.key, e.target.value)}
                        className="w-[72px] px-1.5 py-0.5 text-[9px] font-mono border border-gray-200 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
            <p className="text-[9px] text-gray-400 text-center">
              Dev only • {isDark ? '🌙 Dark' : '☀️ Light'} mode • Saved to localStorage
            </p>
          </div>
        </div>
      )}
    </>
  );
}
