import { cn } from '../../lib/utils';
import { type InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ElementType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, icon: Icon, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
                        <Icon className="size-4" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={cn(
                        "w-full bg-zinc-900/50 border border-zinc-800 rounded-lg py-2 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-all",
                        "focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        Icon ? "pl-10 pr-4" : "px-4",
                        className
                    )}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = 'Input';
