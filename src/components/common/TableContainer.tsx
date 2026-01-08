import { cn } from '../../lib/utils';
import type { ReactNode } from 'react';

interface Column<T> {
    key: keyof T | string;
    header: string;
    className?: string;
    render?: (item: T, index: number) => ReactNode;
}

interface TableContainerProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    className?: string;
    emptyMessage?: string;
}

export function TableContainer<T>({ 
    columns, 
    data, 
    keyExtractor,
    className,
    emptyMessage = 'No data available'
}: TableContainerProps<T>) {
    if (data.length === 0) {
        return (
            <div className="text-center py-12 text-zinc-500">
                {emptyMessage}
            </div>
        );
    }

    return (
        <div className={cn("overflow-x-auto", className)}>
            <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-800/50 text-zinc-200 uppercase text-xs font-semibold">
                    <tr>
                        {columns.map((col, index) => (
                            <th 
                                key={String(col.key)} 
                                className={cn(
                                    "px-4 py-3",
                                    index === 0 && "rounded-l-lg",
                                    index === columns.length - 1 && "rounded-r-lg",
                                    col.className
                                )}
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                    {data.map((item, rowIndex) => (
                        <tr 
                            key={keyExtractor(item)} 
                            className="hover:bg-zinc-800/30 transition-colors"
                        >
                            {columns.map((col) => (
                                <td key={String(col.key)} className={cn("px-4 py-3", col.className)}>
                                    {col.render 
                                        ? col.render(item, rowIndex)
                                        : String(item[col.key as keyof T] ?? '')
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
