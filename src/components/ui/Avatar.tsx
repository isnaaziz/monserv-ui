import { cn } from '../../lib/utils';
import { User } from 'lucide-react';

interface AvatarProps {
    src?: string;
    alt?: string;
    className?: string;
    fallbackIcon?: React.ElementType;
}

export function Avatar({ src, alt, className, fallbackIcon: FallbackIcon = User }: AvatarProps) {
    return (
        <div className={cn(
            "size-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5",
            className
        )}>
            <div className="size-full rounded-full bg-zinc-950 flex items-center justify-center overflow-hidden">
                {src ? (
                    <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
                ) : (
                    <FallbackIcon className="size-4 text-emerald-500" />
                )}
            </div>
        </div>
    );
}
