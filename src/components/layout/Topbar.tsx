import { Search, Bell, Sun, Moon } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useTheme } from '../../context/ThemeContext';

export function Topbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-900/50 px-6 py-4 flex items-center justify-between">
            {/* Search */}
            <div className="hidden md:block w-64 lg:w-96">
                <Input
                    placeholder="Search resources..."
                    icon={Search}
                    className="bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 ml-auto">
                <Button variant="ghost" size="icon" className="relative text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <Bell className="size-5" />
                    <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950" />
                </Button>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
                </Button>

                <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />

                <button className="flex items-center gap-3 pl-2 group">
                    <Avatar src="https://ui-avatars.com/api/?name=Arun+Kumar&background=10b981&color=fff" />
                    <div className="hidden lg:flex flex-col items-start">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Arun Kumar</span>
                        <span className="text-xs text-zinc-500">Super Admin</span>
                    </div>
                </button>
            </div>
        </header>
    );
}
