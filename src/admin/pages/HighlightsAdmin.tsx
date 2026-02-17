import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Input, Button, PageHeader } from '../components/UI';
import { Trash2, Plus, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const HighlightsAdmin = () => {
    const { data } = useData();
    // In a real app, we would have an updateHighlights function in context
    const [items, setItems] = useState(data.highlights);

    const handleDelete = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleAdd = () => {
        const newId = Math.max(...items.map(i => i.id)) + 1;
        setItems([...items, { id: newId, title: "Yangi", icon: "Star" }]);
    };

    const handleChange = (id: number, field: string, value: string) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSave = () => {
        // updateHighlights(items);
        console.log("Saving highlights", items);
        // Toast triggered in real implementation
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PageHeader
                title="Galereya / Highlights"
                description="Asosiy sahifadagi 3 ta informatsion kartochkalar"
                action={
                    <Button onClick={handleSave} icon={Save}>Saqlash</Button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                    // Safe icon lookup
                    const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.Star;

                    return (
                        <Card key={item.id} className="relative group">
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 p-2 rounded-lg"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex flex-col items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <IconComponent size={32} />
                                </div>
                                <span className="text-xs text-dimWhite">Icon: {item.icon}</span>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="Sarlavha"
                                    value={item.title}
                                    onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                                />
                                <Input
                                    label="Icon nomi (Lucide React)"
                                    value={item.icon}
                                    onChange={(e) => handleChange(item.id, 'icon', e.target.value)}
                                />
                            </div>
                        </Card>
                    );
                })}

                <button
                    onClick={handleAdd}
                    className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 rounded-2xl p-6 min-h-[280px] hover:border-primary/50 hover:bg-white/5 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-dimWhite group-hover:text-primary transition-colors">
                        <Plus size={32} />
                    </div>
                    <span className="font-medium text-dimWhite group-hover:text-white">Yangi qo'shish</span>
                </button>
            </div>
        </motion.div>
    );
};

export default HighlightsAdmin;
