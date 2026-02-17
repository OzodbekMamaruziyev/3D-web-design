import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, Input, Button, PageHeader } from '../components/UI';
import { Save, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactAdmin = () => {
    const { data, updateContact } = useData();
    const [formData, setFormData] = useState(data.contact);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        updateContact(formData);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PageHeader
                title="Aloqa Ma'lumotlari"
                description="Saytning kontakt qismini tahrirlash"
                action={
                    <Button onClick={handleSave} icon={Save}>Saqlash</Button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <Mail size={24} />
                    </div>
                    <Input
                        label="Email Manzil"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Card>

                <Card className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <Phone size={24} />
                    </div>
                    <Input
                        label="Telefon Raqam"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </Card>

                <Card className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <MapPin size={24} />
                    </div>
                    <Input
                        label="Manzil (Joylashuv)"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </Card>
            </div>

            <div className="mt-8">
                <Card className="min-h-[200px] flex items-center justify-center border-dashed">
                    <p className="text-dimWhite">Xabarlar tarixi (Tez orada)</p>
                </Card>
            </div>
        </motion.div>
    );
};

export default ContactAdmin;
