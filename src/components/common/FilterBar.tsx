import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface FilterBarProps {
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onRefresh?: () => void;
    onFilter?: () => void;
    actions?: React.ReactNode;
}

export function FilterBar({
    searchPlaceholder = 'Search...',
    searchValue = '',
    onSearchChange,
    onRefresh,
    onFilter,
    actions
}: FilterBarProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <Input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex items-center gap-2">
                {onFilter && (
                    <Button variant="outline" size="sm" onClick={onFilter}>
                        <Filter className="size-4 mr-2" />
                        Filter
                    </Button>
                )}
                {onRefresh && (
                    <Button variant="outline" size="sm" onClick={onRefresh}>
                        <RefreshCw className="size-4 mr-2" />
                        Refresh
                    </Button>
                )}
                {actions}
            </div>
        </div>
    );
}
