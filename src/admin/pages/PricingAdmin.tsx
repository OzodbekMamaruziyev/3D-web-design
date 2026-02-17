import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Input, Button, PageHeader } from '../components/UI';
import { Trash2, Plus, Save, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const PricingAdmin = () => {
    const { data, updatePricing } = useData();
    const [priceData, setPriceData] = useState(data.pricing);

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...priceData.features];
        newFeatures[index] = value;
        setPriceData({ ...priceData, features: newFeatures });
    };

    const handleAddFeature = () => {
        setPriceData({ ...priceData, features: [...priceData.features, "Yangi imkoniyat"] });
    };

    const handleDeleteFeature = (index: number) => {
        const newFeatures = priceData.features.filter((_, i) => i !== index);
        setPriceData({ ...priceData, features: newFeatures });
    };

    const handleSave = () => {
        updatePricing(priceData);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PageHeader
                title="Narxlar"
                description="Narxlar va paketlar ma'lumotlarini o'zgartirish"
                action={
                    <Button onClick={handleSave} icon={Save}>Saqlash</Button>
                }
            />

            <div className="flex flex-col md:flex-row gap-8">
                {/* Price Display Preview */}
                <div className="w-full md:w-1/3">
                    <Card className="sticky top-8 border-primary/20 bg-gradient-to-br from-[#1a1a1a] to-primary/5">
                        <div className="text-center space-y-4 mb-8">
                            <h3 className="text-xl font-bold text-white">Standart Paket</h3>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-4xl font-extrabold text-primary">{priceData.price}</span>
                            </div>
                            <span className="text-dimWhite uppercase tracking-widest text-sm">{priceData.unit}</span>
                        </div>
                        <div className="space-y-4">
                            {priceData.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm text-dimWhite">
                                    <div className="min-w-[20px] text-primary"><Check size={16} /></div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Editors */}
                <div className="flex-1 space-y-6">
                    <Card className="space-y-6">
                        <h3 className="text-lg font-semibold text-white">Narx Sozlamalari</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Narx (raqam)"
                                value={priceData.price}
                                onChange={(e) => setPriceData({ ...priceData, price: e.target.value })}
                            />
                            <Input
                                label="Birlik (so'm / soat)"
                                value={priceData.unit}
                                onChange={(e) => setPriceData({ ...priceData, unit: e.target.value })}
                            />
                        </div>
                    </Card>

                    <Card className="space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-white">Xizmatga kiritilganlar</h3>
                            <Button variant="secondary" onClick={handleAddFeature} icon={Plus} className="!py-2 !px-4 text-sm">
                                Qo'shish
                            </Button>
                        </div>

                        {priceData.features.map((feature, idx) => (
                            <div key={idx} className="flex gap-2">
                                <Input
                                    className="flex-1"
                                    value={feature}
                                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                />
                                <button
                                    onClick={() => handleDeleteFeature(idx)}
                                    className="bg-white/5 hover:bg-red-500/20 text-dimWhite hover:text-red-500 p-3 rounded-xl transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

export default PricingAdmin;
