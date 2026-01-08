import { useLocation } from 'react-router-dom';
import { SidebarItem } from '../navigation/SidebarItem';
import { mainMenuItems, footerMenuItems } from '../../config/menu.config';

export function Sidebar() {
    const location = useLocation();

    return (
        <aside className="fixed left-0 top-0 h-full w-16 md:w-20 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-900 shadow-2xl z-50 flex flex-col items-center py-6 gap-8 transition-colors duration-200">
            {/* Logo */}
            <div className="size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center p-2.5">
                <div className="size-full rounded-lg bg-emerald-500 shadow-inner shadow-emerald-400/50" />
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col items-center gap-3 w-full px-3">
                {mainMenuItems.map((item) => (
                    <SidebarItem 
                        key={item.id} 
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                        active={item.path === '/' 
                            ? location.pathname === '/' 
                            : location.pathname.startsWith(item.path)
                        }
                    />
                ))}
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto flex flex-col gap-3 px-3 w-full">
                {footerMenuItems.map((item) => (
                    <SidebarItem 
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        path={item.path}
                    />
                ))}
            </div>
        </aside>
    );
}
