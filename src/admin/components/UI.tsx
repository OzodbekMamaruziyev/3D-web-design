import type { InputHTMLAttributes, ButtonHTMLAttributes, ReactNode, ComponentType } from 'react';
import clsx from 'clsx';
import { Loader2, type LucideIcon } from 'lucide-react';

// --- Card Component ---
export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={clsx("bg-[#1a1a1a] border border-white/10 rounded-2xl p-6", className)}>
        {children}
    </div>
);

// --- Input Component ---
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-medium text-dimWhite">{label}</label>}
        <input
            className={clsx(
                "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20",
                className
            )}
            {...props}
        />
    </div>
);

// --- TextArea Component ---
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export const TextArea = ({ label, className, ...props }: TextAreaProps) => (
    <div className="space-y-2">
        {label && <label className="text-sm font-medium text-dimWhite">{label}</label>}
        <textarea
            className={clsx(
                "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-white/20 min-h-[100px]",
                className
            )}
            {...props}
        />
    </div>
);

// --- Button Component ---
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    isLoading?: boolean;
    icon?: ComponentType<{ size?: number; className?: string }> | LucideIcon;
}

export const Button = ({ variant = 'primary', isLoading, icon: Icon, className, children, ...props }: ButtonProps) => {
    const variants = {
        primary: "bg-blue-gradient text-black font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40",
        secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/5",
        danger: "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20",
        ghost: "bg-transparent text-dimWhite hover:text-white hover:bg-white/5"
    };

    return (
        <button
            className={clsx(
                "px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : Icon && <Icon size={20} />}
            {children}
        </button>
    );
};

// --- PageHeader Component ---
export const PageHeader = ({ title, description, action }: { title: string; description?: string; action?: ReactNode }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
            {description && <p className="text-dimWhite mt-1">{description}</p>}
        </div>
        {action}
    </div>
);
