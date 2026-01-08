import { Card, CardTitle } from '../ui/Card';
import { resourceTableData } from '../../data/mock';
import { cn } from '../../lib/utils';
import { MoreHorizontal } from 'lucide-react';

export function ResourceTable() {
    return (
        <Card className="col-span-1 lg:col-span-2 h-full">
            <div className="flex items-center justify-between mb-6">
                <CardTitle className="mb-0">Resource Utilization</CardTitle>
                <button className="text-zinc-400 hover:text-zinc-100">
                    <MoreHorizontal className="size-5" />
                </button>
            </div>
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
                                    <div className="flex justify-center">
                                        {item.status === 'Active' && <div className="text-emerald-500 bg-emerald-500/10 p-1 rounded-full"><div className="size-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">✓</div></div>}
                                        {item.status === 'Warning' && <div className="text-amber-500 bg-amber-500/10 p-1 rounded-full"><div className="size-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">!</div></div>}
                                        {item.status === 'Maintenance' && <div className="text-red-500 bg-red-500/10 p-1 rounded-full"><div className="size-4 rounded-full border-2 border-current flex items-center justify-center text-[10px]">⚠</div></div>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
