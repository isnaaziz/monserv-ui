import { Settings, User, Bell, Shield, Palette } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { SectionCard } from '../components/common/SectionCard';
import { Button } from '../components/ui/Button';

// Settings sections
const settingsSections = [
    {
        id: 'profile',
        title: 'Profile Settings',
        description: 'Manage your account information and preferences',
        icon: User,
        items: [
            { label: 'Display Name', value: 'Arun Kumar' },
            { label: 'Email', value: 'arun.kumar@company.com' },
            { label: 'Role', value: 'Super Admin' },
            { label: 'Timezone', value: 'Asia/Jakarta (UTC+7)' },
        ]
    },
    {
        id: 'notifications',
        title: 'Notification Preferences',
        description: 'Configure how you receive alerts and updates',
        icon: Bell,
        items: [
            { label: 'Email Notifications', value: 'Enabled' },
            { label: 'Push Notifications', value: 'Enabled' },
            { label: 'Critical Alerts', value: 'Immediate' },
            { label: 'Weekly Digest', value: 'Enabled' },
        ]
    },
    {
        id: 'security',
        title: 'Security Settings',
        description: 'Manage your security and authentication options',
        icon: Shield,
        items: [
            { label: 'Two-Factor Auth', value: 'Enabled' },
            { label: 'Session Timeout', value: '30 minutes' },
            { label: 'API Access', value: 'Enabled' },
            { label: 'Last Password Change', value: '30 days ago' },
        ]
    },
    {
        id: 'appearance',
        title: 'Appearance',
        description: 'Customize the look and feel of your dashboard',
        icon: Palette,
        items: [
            { label: 'Theme', value: 'Dark' },
            { label: 'Sidebar', value: 'Collapsed' },
            { label: 'Density', value: 'Comfortable' },
            { label: 'Language', value: 'English' },
        ]
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <PageHeader 
                title="Settings" 
                description="Manage your account and application preferences"
                icon={Settings}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {settingsSections.map((section) => (
                    <SectionCard 
                        key={section.id} 
                        title={section.title} 
                        description={section.description}
                        action={
                            <Button variant="ghost" size="sm">
                                Edit
                            </Button>
                        }
                    >
                        <div className="space-y-4">
                            {section.items.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0"
                                >
                                    <span className="text-sm text-zinc-400">{item.label}</span>
                                    <span className="text-sm font-medium text-zinc-200">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                ))}
            </div>

            {/* Danger Zone */}
            <SectionCard 
                title="Danger Zone" 
                description="Irreversible and destructive actions"
                className="border-red-900/50"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-zinc-200">Delete Account</p>
                        <p className="text-xs text-zinc-500 mt-1">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-500 border-red-500/50 hover:bg-red-500/10">
                        Delete Account
                    </Button>
                </div>
            </SectionCard>
        </div>
    );
}
