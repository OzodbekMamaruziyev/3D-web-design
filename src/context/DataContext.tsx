import React, { createContext, useContext, useState, ReactNode } from 'react';
import { initialData } from '../admin/data/initialData';
import toast from 'react-hot-toast';

// Type definition inferred from initialData
type DataState = typeof initialData;

interface DataContextType {
    data: DataState;
    updateHero: (newData: Partial<DataState['hero']>) => void;
    updatePricing: (newData: Partial<DataState['pricing']>) => void;
    updateContact: (newData: Partial<DataState['contact']>) => void;
    // Add other update methods as needed
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<DataState>(initialData);

    const updateHero = (newData: Partial<DataState['hero']>) => {
        setData((prev: DataState) => ({ ...prev, hero: { ...prev.hero, ...newData } }));
        toast.success("Bosh sahifa malumotlari yangilandi");
    };

    const updatePricing = (newData: Partial<DataState['pricing']>) => {
        setData((prev: DataState) => ({ ...prev, pricing: { ...prev.pricing, ...newData } }));
        toast.success("Narxlar yangilandi");
    };

    const updateContact = (newData: Partial<DataState['contact']>) => {
        setData((prev: DataState) => ({ ...prev, contact: { ...prev.contact, ...newData } }));
        toast.success("Aloqa malumotlari yangilandi");
    };

    return (
        <DataContext.Provider value={{ data, updateHero, updatePricing, updateContact }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
