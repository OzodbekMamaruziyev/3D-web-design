import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Input, TextArea, Button, PageHeader } from '../components/UI';
import { Save } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroAdmin = () => {
    const { data, updateHero } = useData();
    const [formData, setFormData] = useState(data.hero);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStatChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            stats: { ...prev.stats, [name]: parseInt(value) || 0 }
        }));
    };

    const handleSave = () => {
        updateHero(formData);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PageHeader
                title="Bosh Sahifa"
                description="Hero qismini tahrirlash"
                action={
                    <Button onClick={handleSave} icon={Save}>Saqlash</Button>
                }
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="space-y-6">
                    <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-4">Asosiy matnlar</h3>
                    <Input
                        label="Sarlavha (Title)"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <Input
                        label="Quyi Sarlavha (Subtitle)"
                        name="subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
                    <TextArea
                        label="Tavsif (Description)"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                    />
                </Card>

                <Card className="space-y-6">
                    <h3 className="text-xl font-semibold text-white border-b border-white/10 pb-4">Statistika</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Posts"
                            type="number"
                            value={formData.stats.posts}
                            onChange={(e) => handleStatChange('posts', e.target.value)}
                        />
                        <Input
                            label="Followers"
                            type="number"
                            value={formData.stats.followers}
                            onChange={(e) => handleStatChange('followers', e.target.value)}
                        />
                    </div>
                </Card>
            </div>
        </motion.div>
    );
};

export default HeroAdmin;
