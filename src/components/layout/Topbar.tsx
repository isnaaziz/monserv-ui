import { Search, Bell, Sun, User } from 'lucide-react';

export function Topbar() {
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-zinc-950/50 border-b border-zinc-900/50 px-6 py-4 flex items-center justify-between">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 rounded-full px-4 py-2 w-64 lg:w-96 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/50 transition-all duration-300">
                <Search className="size-4 text-zinc-500" />
                <input
                    type="text"
                    placeholder="Search resources..."
                    className="bg-transparent border-none outline-none text-zinc-300 placeholder:text-zinc-600 w-full text-sm"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 ml-auto">
                <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors relative">
                    <Bell className="size-5" />
                    <span className="absolute top-1.5 right-2 size-2 bg-red-500 rounded-full border-2 border-zinc-950" />
                </button>
                <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors">
                    <Sun className="size-5" />
                </button>
                <div className="h-6 w-px bg-zinc-800 mx-1" />
                <button className="flex items-center gap-3 pl-2">
                    <div className="size-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5">
                        <div className="size-full rounded-full bg-zinc-950 flex items-center justify-center">
                            <User className="size-4 text-emerald-500" />
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                        <span className="text-sm font-medium text-zinc-200">Admin User</span>
                        <span className="text-xs text-zinc-500">Super Admin</span>
                    </div>
                </button>
            </div>
        </header>
    );
}
