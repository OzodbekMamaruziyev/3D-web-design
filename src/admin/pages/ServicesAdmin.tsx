import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Input, TextArea, Button, PageHeader } from '../components/UI';
import { Trash2, Plus, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const ServicesAdmin = () => {
    const { data } = useData();
    const [items, setItems] = useState(data.services);

    const handleDelete = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleAdd = () => {
        const newId = Math.max(...items.map(i => i.id)) + 1;
        setItems([...items, { id: newId, title: "Yangi Xizmat", desc: "Xizmat haqida qisqacha", icon: "Video" }]);
    };

    const handleChange = (id: number, field: string, value: string) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const handleSave = () => {
        // updateServices(items);
        console.log("Saving services", items);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PageHeader
                title="Xizmatlar"
                description="Bizning xizmatlar bo'limini tahrirlash"
                action={
                    <Button onClick={handleSave} icon={Save}>Saqlash</Button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => {
                    const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.HelpCircle;

                    return (
                        <Card key={item.id} className="relative group hover:border-primary/30 transition-colors">
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 p-2 rounded-lg"
                            >
                                <Trash2 size={18} />
                            </button>

                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-gradient flex items-center justify-center text-black shadow-lg">
                                    <IconComponent size={24} />
                                </div>
                                <div className="flex-1">
                                    <Input
                                        className="font-bold text-lg mb-2"
                                        value={item.title}
                                        onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                                        placeholder="Xizmat nomi"
                                    />
                                    <Input
                                        className="text-sm font-mono text-dimWhite"
                                        value={item.icon}
                                        onChange={(e) => handleChange(item.id, 'icon', e.target.value)}
                                        placeholder="Icon nomi"
                                    />
                                </div>
                            </div>

                            <TextArea
                                value={item.desc}
                                onChange={(e) => handleChange(item.id, 'desc', e.target.value)}
                                rows={3}
                                placeholder="Xizmat haqida batafsil..."
                            />
                        </Card>
                    );
                })}

                <button
                    onClick={handleAdd}
                    className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-white/10 rounded-2xl p-6 min-h-[250px] hover:border-primary/50 hover:bg-white/5 transition-all group"
                >
                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-dimWhite group-hover:text-primary transition-colors">
                        <Plus size={28} />
                    </div>
                    <span className="font-medium text-dimWhite group-hover:text-white">Yangi xizmat qo'shish</span>
                </button>
            </div>
        </motion.div>
    );
};

export default ServicesAdmin;
