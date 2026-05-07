import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ChevronDown,
  Navigation,
  ExternalLink,
  Car
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

// --- Types ---

interface Service {
  name: string;
  time: string;
  price: string;
}

interface ServiceCategory {
  title: string;
  icon: React.ReactNode;
  services: Service[];
}

// --- Data ---

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    title: "Lavagem",
    icon: <Car size={20} />,
    services: [
      { name: "Lavagem de carro pequeno", time: "1h", price: "R$65,00" },
      { name: "Lavagem de caminhonete", time: "1h30", price: "R$150,00" },
      { name: "Lavagem de moto simples", time: "30min", price: "R$35,00" },
      { name: "Lavagem de motocicleta", time: "50min", price: "R$50,00" },
    ]
  },
  {
    title: "Estética & Detalhamento",
    icon: <Sparkles size={20} />,
    services: [
      { name: "Lavagem detalhada de motocicleta", time: "1h30", price: "R$150,00" },
      { name: "Clareamento de motor (Carro/Moto)", time: "1h", price: "R$80,00" },
    ]
  },
  {
    title: "Polimento & Proteção",
    icon: <Sparkles size={20} />,
    services: [
      { name: "Polimento de carro", time: "1h30", price: "R$250,00" },
      { name: "Polimento de motocicleta", time: "1h30", price: "R$150,00" },
    ]
  },
  {
    title: "Higienização",
    icon: <Clock size={20} />,
    services: [
      { name: "Higienização de carro", time: "5h", price: "R$500,00" },
    ]
  }
];

const WHATSAPP_LINK = "https://wa.me/5599991306420?text=Ol%C3%A1%2C%20gostaria%20de%20marcar%20um%20hor%C3%A1rio.";
const INSTAGRAM_LINK = "https://www.instagram.com/estetica_lava_vilarinss/"; 
const APP_INSTAGRAM_LINK = "https://www.instagram.com/estetica_lava_vilarinss/"; // Using web link as primary for stability
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=rua%20avenida%20amanh%C3%A3%20-%20canoeiro%20Graja%C3%BA%20Maranh%C3%A3o";

// --- Components ---

const SchedulingAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Start with first open for better UX

  const getWhatsAppLink = (serviceName: string) => {
    const message = `Olá, gostaria de agendar o serviço de ${serviceName}.`;
    return `https://wa.me/5599991306420?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-3 w-full">
      {SERVICE_CATEGORIES.map((category, idx) => (
        <div key={idx} className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden transition-all shadow-sm">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <div className="text-brand-accent">{category.icon}</div>
              <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs">{category.title}</span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} className="text-zinc-500" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 space-y-2 pt-2 border-t border-white/5">
                  {category.services.map((service, sIdx) => (
                    <a 
                      key={sIdx} 
                      href={getWhatsAppLink(service.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between items-center group p-3 -mx-2 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 transition-all active:scale-[0.98]"
                    >
                      <div>
                        <p className="font-medium text-zinc-100 group-hover:text-brand-neon transition-colors text-sm sm:text-base">{service.name}</p>
                        <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-zinc-500 mt-1">
                          <Clock size={10} />
                          <span>{service.time}</span>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="font-bold text-brand-neon text-sm sm:text-base">{service.price}</p>
                        <div className="text-[8px] uppercase tracking-tighter text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">Agendar Agora</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const InstagramPreview = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Instagram @estetica_vilarins</h3>
        <a href={APP_INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-[9px] text-brand-neon uppercase font-bold hover:underline">Ver Perfil</a>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-lg bg-zinc-800/50 border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Instagram size={16} className="text-white" />
            </div>
            {/* Minimal SVG placeholder to represent a post */}
            <svg className="w-full h-full text-zinc-700/30" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="currentColor" />
              <circle cx="50" cy="50" r="20" fill="currentColor" fillOpacity="0.5" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};


const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col pt-12 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 flex-1 flex flex-col">
        
        {/* Logo Section - Featured Top */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-12 sm:mb-20"
        >
          <div className="relative group">
            {/* Glowing Ring */}
            <div className="absolute -inset-4 bg-brand-accent/20 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            
            {/* Logo Container */}
            <div className="relative w-44 h-44 sm:w-64 sm:h-64 rounded-full bg-brand-dark p-2 border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.25)]">
              <img 
                src="/input_file_0.png" 
                alt="Logo Estética Vilarins" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            
            {/* Logo Frame Detail */}
            <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none"></div>
          </div>
          <div className="mt-8 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2 uppercase italic text-white flex flex-col sm:block">
              Estética <span>Vilarins</span>
            </h1>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-brand-neon font-black ml-1">Lava - Jato / Detalhamento</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-1">
          {/* Main Hero Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card-gradient p-8 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center flex-1 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-3xl rounded-full"></div>
              
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Atenção <br /> aos <span className="text-brand-accent">detalhes.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-12 max-w-xs">
                Cuidamos do seu veículo com atenção, qualidade e dedicação em cada detalhe. O melhor acabamento de Grajaú.
              </p>
              
              <div className="flex flex-col gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1fb355] text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group active:scale-[0.97]"
                >
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                  Marcar horário
                </a>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href={APP_INSTAGRAM_LINK} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="border border-white/10 hover:bg-white/5 py-4 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest active:scale-95"
                  >
                    <Instagram size={18} className="text-brand-neon" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href={MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-white/10 hover:bg-white/5 py-4 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest active:scale-95"
                  >
                    <Navigation size={18} className="text-brand-neon" />
                    <span>Como chegar</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Integrated Scheduling Area */}
          <div id="agendar" className="lg:col-span-5 flex flex-col pt-4 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-zinc-900/40 rounded-[2.5rem] border border-white/5 p-6 md:p-10 flex-1 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8 sm:mb-12">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                  Nossos Serviços
                </h2>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  Grajaú - MA
                </div>
              </div>

              <SchedulingAccordion />

              <InstagramPreview />

              <div className="mt-10 lg:mt-auto pt-8 border-t border-white/5">
                <div className="flex items-start gap-4">
                   <Clock size={20} className="text-brand-accent shrink-0 mt-1" />
                   <div>
                      <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider mb-1">Horário de Funcionamento</p>
                      <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                         Segunda à Sexta: 08h às 18h<br/>
                         Sábado: 08h às 12h
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Location & Contact */}
          <div id="contato" className="lg:col-span-3 flex flex-col gap-6 pt-4 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-zinc-900/20 p-8 rounded-[2.5rem] border border-white/10 flex-1 flex flex-col shadow-xl"
            >
              <h3 className="text-[10px] font-bold uppercase mb-10 tracking-[0.3em] text-zinc-500">Contato</h3>
              
              <div className="space-y-10 flex-1">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                    <MapPin className="w-5 h-5 text-brand-neon" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider mb-1">Localização</p>
                    <p className="text-sm text-zinc-200 font-medium leading-relaxed">
                      Avenida Amanhã - Canoeiro<br/>
                      Grajaú, Maranhão
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center shrink-0 border border-white/5 shadow-inner">
                    <Phone className="w-5 h-5 text-brand-neon" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider mb-1">Telefone</p>
                    <p className="text-sm text-zinc-200 font-medium underline decoration-brand-accent/50 underline-offset-4 pointer-events-none">
                      (99) 99130-6420
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <div className="w-full h-48 rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                  <iframe 
                    title="Google Maps Location"
                    src="https://maps.google.com/maps?q=rua%20avenida%20amanh%C3%A3%20-%20canoeiro%20Graja%C3%BA%20Maranh%C3%A3o&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl shadow-inner"></div>
                </div>

                <a 
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all text-[11px] flex items-center justify-center gap-2 uppercase tracking-widest border border-white/10 active:scale-95"
                >
                  Ver no Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>

            {/* Quote Card */}
            <div className="bg-brand-accent/10 p-6 rounded-[2rem] border border-brand-accent/20">
               <p className="text-[11px] text-brand-neon font-medium leading-relaxed italic text-center">
                  "O cuidado que o seu veículo merece, com a paixão que você tem por ele."
               </p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 pb-6">
      <div className="flex items-center gap-2 text-zinc-600">
         <Sparkles size={12} className="text-brand-accent" />
         <p className="text-[9px] uppercase tracking-[0.2em] font-medium">Estética Vilarins — Car Detailing Experts</p>
      </div>
      <p className="text-[9px] text-zinc-700 uppercase tracking-widest italic">Grajaú, Maranhão</p>
    </footer>
  );
}

// --- Main App ---

export default function App() {
  return (
    <div className="bg-brand-dark text-white font-sans flex flex-col min-h-screen overflow-x-hidden selection:bg-brand-accent selection:text-white">
      <Hero />
    </div>
  );
}
