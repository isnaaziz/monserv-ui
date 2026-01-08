import { Card } from '../cards/Card';
import { resourceTableData } from '../../data/table';
import { cn } from '../../lib/utils';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export function ResourceTable() {
    return (
        <Card title="Resource Utilization" className="h-full" action={
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                <MoreHorizontal className="size-4" />
            </Button>
        }>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="bg-zinc-800/50 text-zinc-200 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-4 py-3 rounded-l-lg">Website Name</th>
                            <th className="px-4 py-3">Region</th>
                            <th className="px-4 py-3">Load time (secs)</th>
                            <th className="px-4 py-3">CPU %</th>
                            <th className="px-4 py-3">Memory</th>
                            <th className="px-4 py-3 rounded-r-lg">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {resourceTableData.map((item) => (
                            <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors group">
                                <td className="px-4 py-3 font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                                    {item.website}
                                </td>
                                <td className="px-4 py-3">{item.region}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <span className={cn(
                                        "size-2 rounded-full",
                                        parseFloat(item.loadTime) < 3 ? "bg-emerald-500" :
                                            parseFloat(item.loadTime) < 5 ? "bg-amber-500" : "bg-red-500"
                                    )} />
                                    {item.loadTime}
                                </td>
                                <td className="px-4 py-3 text-zinc-300">{item.cpu}</td>
                                <td className="px-4 py-3 text-zinc-300">{item.memory}</td>
                                <td className="px-4 py-3">
                                    <Badge variant={
                                        item.status === 'Active' ? 'success' :
                                            item.status === 'Warning' ? 'warning' : 'error'
                                    }>
                                        {item.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
