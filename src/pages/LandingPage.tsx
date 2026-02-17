import { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Check, Mail, Phone, MapPin, Video, Camera, Mic, Users, Play, Navigation, Image, Star, HelpCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import * as LucideIcons from 'lucide-react';

// --- Komponentlar ---
const Navbar = () => (
    <nav className="fixed top-0 w-full z-50 glassmorphism py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gradient tracking-tighter">MUROTOV STUDIO</h1>
        <ul className="hidden md:flex space-x-8">
            <li><a href="#home" className="hover:text-primary transition-colors">Bosh sahifa</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Xizmatlar</a></li>
            <li><a href="#highlights" className="hover:text-primary transition-colors">Galereya</a></li>
            <li><a href="#pricing" className="hover:text-primary transition-colors">Narxlar</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Aloqa</a></li>
        </ul>
        <div className="flex gap-4">
            <a href="https://t.me/Murotov_studio" target="_blank" rel="noreferrer" className="hidden sm:block bg-blue-gradient text-secondary font-semibold py-2 px-6 rounded-full hover:scale-105 transition-transform text-sm">
                Telegram
            </a>
        </div>
    </nav>
);

// ... (3D Components remain unchanged: StudioCamera, BackgroundScene, Hero3D, Viewfinder)
const StudioCamera = () => {
    return (
        <group rotation={[0.2, -0.6, 0]}>
            {/* Camera Body - Premium Metallic Black */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[3, 2, 1.4]} />
                <meshStandardMaterial color="#080808" roughness={0.15} metalness={0.9} />
            </mesh>

            {/* Left Grip */}
            <mesh position={[-1.2, 0, 0.2]}>
                <boxGeometry args={[0.6, 1.8, 1]} />
                <meshStandardMaterial color="#111" roughness={0.4} />
            </mesh>

            {/* Lens Barrel - Multi-stage */}
            <group position={[0.6, 0, 0.7]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.7, 0.75, 1.2, 32]} />
                    <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.8} />
                </mesh>
                {/* Lens Rings */}
                <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.72, 0.72, 0.1, 32]} />
                    <meshStandardMaterial color="#222" roughness={0.5} />
                </mesh>
                {/* Lens Glass - Deep Reflection */}
                <mesh position={[0, 0, 0.61]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
                    <meshStandardMaterial color="#001111" emissive="#00f6ff" emissiveIntensity={0.2} transparent opacity={0.4} />
                </mesh>
            </group>

            {/* Viewfinder Top */}
            <mesh position={[0, 1.1, 0]}>
                <boxGeometry args={[1.2, 0.4, 1]} />
                <meshStandardMaterial color="#080808" />
            </mesh>

            {/* Buttons and Dials */}
            <mesh position={[0.8, 1.05, -0.2]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
                <meshStandardMaterial color="#111" metalness={1} />
            </mesh>
            <mesh position={[0.8, 1.15, -0.2]}>
                <boxGeometry args={[0.1, 0.05, 0.1]} />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1} />
            </mesh>

            {/* BACK SCREEN (The "LCD" part) */}
            <group position={[0, 0, -0.71]} rotation={[0, Math.PI, 0]}>
                {/* Screen Frame */}
                <mesh>
                    <boxGeometry args={[2.5, 1.6, 0.05]} />
                    <meshStandardMaterial color="#050505" roughness={0.3} />
                </mesh>
                {/* The Actual Screen Content */}
                <mesh position={[0, 0, 0.03]}>
                    <planeGeometry args={[2.3, 1.4]} />
                    <meshStandardMaterial color="#001824" emissive="#00f6ff" emissiveIntensity={0.8} />

                    {/* LCD UI Elements */}
                    <group position={[0, 0, 0.01]}>
                        {/* Viewfinder simulation inside screen */}
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[2.3, 1.4]} />
                            <meshBasicMaterial color="#00f6ff" transparent opacity={0.1} side={THREE.DoubleSide} />
                        </mesh>

                        {/* REC Indicator */}
                        <mesh position={[-0.95, 0.55, 0]}>
                            <circleGeometry args={[0.04, 16]} />
                            <meshBasicMaterial color="#ff0000" />
                        </mesh>

                        {/* Meta Data */}
                        <mesh position={[0.7, -0.55, 0]}>
                            <planeGeometry args={[0.6, 0.15]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
                        </mesh>
                    </group>
                </mesh>
                {/* Screen Glow */}
                <pointLight position={[0, 0, 0.5]} intensity={0.5} distance={2} color="#00f6ff" />
            </group>
        </group>
    );
};

const BackgroundScene = () => {
    return (
        <group position={[0, 0, -15]}>
            {/* This is what's being "filmed" */}
            <mesh position={[-4, 2, 0]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#00f6ff" emissive="#00f6ff" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[4, -1, 2]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#5ce1e6" />
            </mesh>
            <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#00040f" roughness={1} />
            </mesh>
        </group>
    )
}

const Hero3D = () => (
    <div className="h-[400px] md:h-[600px] w-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={2.5} color="#00f6ff" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#ffffff" />

                <StudioCamera />
                <BackgroundScene />
            </Suspense>
        </Canvas>
    </div>
);

const Viewfinder = () => (
    <div className="fixed inset-0 pointer-events-none z-[100] border-[20px] md:border-[40px] border-secondary opacity-20 md:opacity-10">
        {/* Corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-primary"></div>

        {/* REC Indicator */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-white font-mono text-xs tracking-widest uppercase">REC 00:0{Math.floor(Math.random() * 9)}:45</span>
        </div>

        {/* Center Cross */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-white/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-[1px] bg-white/20"></div>

        {/* Battery/ISO info */}
        <div className="absolute bottom-10 right-10 flex flex-col items-end font-mono text-[10px] text-white/40 gap-1">
            <span>ISO 400</span>
            <span>F 2.8</span>
            <span>1/125</span>
            <div className="w-8 h-4 border border-white/40 p-[1px] flex items-center">
                <div className="w-3/4 h-full bg-white/40"></div>
            </div>
        </div>
    </div>
);

const Hero = () => {
    const { data } = useData();
    const { hero } = data;

    return (
        <section id="home" className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center">
            <div className="flex-1 space-y-8">
                <div className="flex items-center gap-3">
                    <span className="bg-white/10 px-4 py-1 rounded-full text-xs font-medium uppercase tracking-widest text-primary border border-primary/20">Photography Studio</span>
                </div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9]"
                >
                    {hero.title} <br />
                    <span className="text-3xl md:text-5xl font-light opacity-80 mt-4 block text-gradient">{hero.subtitle}</span>
                </motion.h2>
                <p className="text-dimWhite text-lg max-w-lg leading-relaxed">
                    {hero.description}
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-gradient text-secondary font-bold py-4 px-10 rounded-2xl text-lg hover:shadow-[0_0_30px_rgba(0,246,255,0.4)] transition-all flex items-center gap-2">
                        <Play size={20} fill="currentColor" /> Xizmatlarni ko'rish
                    </button>
                    <button className="glassmorphism text-white font-bold py-4 px-10 rounded-2xl text-lg hover:bg-white/10 transition-all">
                        Bog'lanish
                    </button>
                </div>
                <div className="flex gap-10 pt-4 border-t border-white/5 w-fit">
                    <div>
                        <span className="text-2xl font-bold block text-white text-center">{hero.stats.posts}</span>
                        <span className="text-xs text-dimWhite uppercase tracking-widest text-center">Posts</span>
                    </div>
                    <div>
                        <span className="text-2xl font-bold block text-white text-center">{hero.stats.followers}</span>
                        <span className="text-xs text-dimWhite uppercase tracking-widest text-center">Followers</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
                <Hero3D />
            </div>
        </section>
    );
};

const HighlightCard = ({ iconName, title }: { iconName: string, title: string }) => {
    // Dynamic Icon
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.Star;

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 5 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex flex-col items-center gap-3 cursor-pointer group"
        >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/20 p-1 bg-secondary group-hover:border-primary transition-all duration-300 relative overflow-hidden group-active:shadow-[0_0_20px_rgba(0,246,255,0.5)]">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                <div className="w-full h-full rounded-full glassmorphism flex items-center justify-center text-primary group-hover:text-white transition-colors relative z-10">
                    <Icon size={32} />
                </div>
            </div>
            <span className="text-sm font-medium tracking-wide text-dimWhite group-hover:text-primary uppercase transition-colors">{title}</span>
        </motion.button>
    );
};

const Highlights = () => {
    const { data } = useData();

    return (
        <section id="highlights" className="py-20 px-6 max-w-5xl mx-auto flex justify-center gap-8 md:gap-16 flex-wrap">
            {data.highlights.map(item => (
                <HighlightCard key={item.id} iconName={item.icon} title={item.title} />
            ))}
        </section>
    );
};

const ServiceCard = ({ iconName, title, desc }: { iconName: string, title: string, desc: string }) => {
    const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="glassmorphism p-8 rounded-3xl space-y-4 hover:border-primary/50 transition-colors group"
        >
            <div className="bg-blue-gradient w-14 h-14 rounded-2xl flex items-center justify-center text-secondary shadow-lg shadow-primary/20">
                <Icon size={28} />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-dimWhite leading-relaxed">{desc}</p>
        </motion.div>
    );
};

const Services = () => {
    const { data } = useData();

    return (
        <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Bizning Xizmatlar</h2>
                <p className="text-dimWhite max-w-2xl mx-auto italic">Professional kamera va mahorat bilan har bir lahzani san'at darajasiga ko'taramiz.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.services.map(service => (
                    <ServiceCard
                        key={service.id}
                        iconName={service.icon}
                        title={service.title}
                        desc={service.desc}
                    />
                ))}
            </div>
        </section>
    );
};

const Pricing = () => {
    const { data } = useData();
    const { pricing } = data;

    return (
        <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="glassmorphism p-12 rounded-[40px] relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border-primary/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10"></div>
                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Oddiy va <span className="text-gradient">Shaffof</span> Narxlar</h2>
                    <p className="text-dimWhite text-lg max-w-md">Professional xizmatlar, eng qulay shartlar bilan. Biz sifat va natijaga kafolat beramiz.</p>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-fit">
                        <span className="text-dimWhite text-sm uppercase tracking-widest mb-2 block">Xizmat narxi</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-extrabold text-primary">{pricing.price}</span>
                            <span className="text-xl font-medium text-white">{pricing.unit}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full space-y-4">
                    {pricing.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <div className="bg-primary/20 p-2 rounded-full text-primary">
                                <Check size={18} />
                            </div>
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const { data } = useData();
    const { contact } = data;

    return (
        <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
            <div className="bg-black-gradient p-10 md:p-16 rounded-[40px] flex flex-col md:flex-row gap-16 border border-white/5 box-shadow">
                <div className="flex-1 space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold">Biz bilan bog'laning</h2>
                        <p className="text-dimWhite">Loyihangiz yoki fotosessiyangiz uchun joy band qiling.</p>
                    </div>
                    <div className="space-y-6">
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-6 group">
                            <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                <Mail className="text-primary" />
                            </div>
                            <div>
                                <span className="text-xs text-dimWhite uppercase tracking-widest block">Email</span>
                                <span className="text-lg font-medium tracking-wide">{contact.email}</span>
                            </div>
                        </a>
                        <a href={`tel:${contact.phone}`} className="flex items-center gap-6 group">
                            <div className="bg-white/5 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                <Phone className="text-primary" />
                            </div>
                            <div>
                                <span className="text-xs text-dimWhite uppercase tracking-widest block">Telefon</span>
                                <span className="text-lg font-medium tracking-wide">{contact.phone}</span>
                            </div>
                        </a>
                        <div className="flex items-center gap-6">
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <MapPin className="text-primary" />
                            </div>
                            <div>
                                <span className="text-xs text-dimWhite uppercase tracking-widest block">Joylashuv</span>
                                <span className="text-lg font-medium tracking-wide">{contact.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <form className="flex-1 space-y-6">
                    <input type="text" placeholder="Ismingiz" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-primary outline-none transition-colors" />
                    <input type="email" placeholder="Emailingiz" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-primary outline-none transition-colors" />
                    <textarea placeholder="Xabaringiz (Xizmat turi va vaqti)" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-primary outline-none transition-colors"></textarea>
                    <button className="w-full bg-blue-gradient text-secondary font-bold py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all text-lg shadow-xl shadow-primary/20">
                        Xabar yuborish
                    </button>
                </form>
            </div>
        </section>
    );
};

const LandingPage = () => {
    // No explicit prop passing needed as children use useData
    return (
        <div className="min-h-screen selection:bg-primary selection:text-secondary relative overflow-hidden">
            <div className="vignette"></div>
            <Viewfinder />
            <Navbar />
            <Hero />
            <Highlights />
            <Services />
            <Pricing />
            <Contact />

            <footer className="py-16 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-dimWhite relative z-10">
                <h2 className="text-2xl font-bold text-gradient">MUROTOV STUDIO</h2>
                <p className="text-sm">© 2026 Murotov Studio. Barcha huquqlar himoyalangan.</p>
                <div className="flex gap-6">
                    <a href="https://t.me/Murotov_studio" className="hover:text-primary transition-colors">Telegram</a>
                    <a href="https://instagram.com/murotov_studio" className="hover:text-primary transition-colors">Instagram</a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
