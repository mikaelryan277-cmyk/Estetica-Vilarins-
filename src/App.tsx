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
const INSTAGRAM_LINK = "https://www.instagram.com/estetica_lava_jato_vilarinss?igsh=aWNjNnNicml3cXp1"; 
const APP_INSTAGRAM_LINK = "https://www.instagram.com/estetica_lava_jato_vilarinss?igsh=aWNjNnNicml3cXp1"; // Using web link as primary for stability
const MAPS_LINK = "https://maps.app.goo.gl/FPXgGU2oJGzS9a2w5";

// --- Components ---

const SchedulingAccordion = ({ selected, onToggle }: { selected: Service[], onToggle: (s: Service) => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isSelected = (name: string) => !!selected.find(s => s.name === name);

  return (
    <div className="space-y-3 w-full">
      {SERVICE_CATEGORIES.map((category, idx) => (
        <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-colors shadow-sm">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-3">
              <div className="text-brand-accent">{category.icon}</div>
              <span className="font-bold uppercase tracking-widest text-[10px] sm:text-xs">{category.title}</span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} className="text-zinc-500" />
            </motion.div>
          </button>
          
          <AnimatePresence initial={false}>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="px-6 pb-6 space-y-2 pt-2 border-t border-white/5 bg-black/10">
                  {category.services.map((service, sIdx) => {
                    const active = isSelected(service.name);
                    return (
                      <button 
                        key={sIdx} 
                        onClick={() => onToggle(service)}
                        className={`w-full flex justify-between items-center text-left group p-4 rounded-xl border transition-all duration-300 active:scale-[0.98] ${active ? 'bg-brand-accent/10 border-brand-accent/30 shadow-md ring-1 ring-brand-accent/10' : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/5'}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-300 ${active ? 'bg-brand-accent border-brand-accent text-white' : 'border-white/15 bg-white/5 group-hover:border-white/30'}`}>
                            {active ? <Sparkles size={12} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />}
                          </div>
                          <div>
                            <p className={`font-semibold transition-colors text-sm sm:text-base ${active ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{service.name}</p>
                            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-zinc-500 mt-1.5">
                              <Clock size={10} className="text-brand-neon/70" />
                              <span className="tracking-widest">{service.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className={`font-black text-sm sm:text-base transition-colors ${active ? 'text-white' : 'text-brand-neon'}`}>{service.price}</p>
                        </div>
                      </button>
                    );
                  })}
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
  const feedImages = [
    "https://i.imgur.com/pR2sYb0.jpeg",
    "https://i.imgur.com/p5EFXTu.jpeg",
    "https://i.imgur.com/uWpVZQm.jpeg",
    "https://i.imgur.com/SY1wXs1.jpeg",
    "https://i.imgur.com/CT2Xcpp.jpeg",
    "https://i.imgur.com/NNngoXK.jpeg"
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[1.5px]">
            <div className="w-full h-full rounded-full bg-brand-dark p-0.5">
               <img src="https://i.imgur.com/NNngoXK.jpeg" className="w-full h-full rounded-full object-cover" alt="Avatar" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-white leading-none">estetica_lava_jato_vilarinss</span>
            <span className="text-[8px] text-zinc-500 uppercase tracking-tighter">Grajaú, Maranhão</span>
          </div>
        </div>
        <a 
          href={APP_INSTAGRAM_LINK} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[9px] bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-white uppercase font-black tracking-widest border border-white/10 transition-colors"
        >
          Seguir
        </a>
      </div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {feedImages.map((src, i) => (
          <div 
            key={i} 
            className="aspect-square rounded-xl bg-zinc-800/30 border border-white/5 overflow-hidden relative group cursor-pointer"
          >
            <img 
              src={src} 
              alt={`Feed ${i}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 backdrop-blur-[1px]">
              <Instagram size={18} className="text-white shadow-sm" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40"></div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Hero = ({ selectedServices, onToggle }: { selectedServices: Service[], onToggle: (s: Service) => void }) => {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col pt-12 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 flex-1 flex flex-col">
        
        {/* Logo Section - Featured Top */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12 sm:mb-20"
        >
          <div className="relative group">
            {/* Logo Container */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-zinc-950 p-[2px] border border-white/20 overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out">
              <div className="absolute inset-0 rounded-full border-[6px] border-black/40 z-10 pointer-events-none"></div>
              <img 
                src="https://i.imgur.com/NNngoXK.jpeg" 
                alt="Logo Estética Vilarins" 
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover rounded-full filter brightness-110 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-20"></div>
            </div>
          </div>
          <div className="mt-8 text-center px-4">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2 uppercase italic text-white leading-tight">
              Estética <span className="text-brand-accent">Vilarins</span>
            </h1>
            <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.6em] text-brand-neon font-black ml-2 bg-white/5 py-1 px-4 rounded-full border border-white/5">Lava - Jato / Detalhamento</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-1">
          {/* Main Hero Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-gradient p-8 md:p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center flex-1 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 blur-3xl rounded-full"></div>
              
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Atenção <br /> aos <span className="text-brand-accent">detalhes.</span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-12 max-w-xs">
                Cuidamos do seu veículo com atenção milimétrica e paixão real. A melhor experiência em Grajaú.
              </p>
              
              <div className="flex flex-col gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1fb355] text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 group active:scale-[0.97]"
                >
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                  WhatsApp Direto
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

          <div id="agendar" className="lg:col-span-5 flex flex-col pt-4 lg:pt-0">
            <div className="bg-zinc-900/40 rounded-[2.5rem] border border-white/5 p-6 md:p-10 flex-1 flex flex-col shadow-xl">
              <div className="flex items-center justify-between mb-8 sm:mb-12">
                <h2 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                  Escolha os Serviços
                </h2>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  Selecione Múltiplos
                </div>
              </div>

              <SchedulingAccordion selected={selectedServices} onToggle={onToggle} />

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
            </div>
          </div>

          <div id="contato" className="lg:col-span-3 flex flex-col gap-6 pt-4 lg:pt-0">
            <div className="bg-zinc-900/20 p-8 rounded-[2.5rem] border border-white/10 flex-1 flex flex-col shadow-lg">
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
                <div className="w-full h-40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                  <iframe 
                    title="Google Maps Location"
                    src="https://maps.google.com/maps?q=Grajaú%20Maranhão%20Canoeiro&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl shadow-inner"></div>
                </div>
                <p className="text-[10px] text-zinc-500 font-medium text-center mt-2 italic px-4">
                  Estamos localizados ao lado deste ponto.
                </p>

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
            </div>

            {/* Quote Card Removed */}
          </div>
        </div>

        <Footer />
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 pb-6 text-zinc-600">
      <p className="text-[9px] uppercase tracking-widest italic">Grajaú, Maranhão</p>
    </footer>
  );
}

// --- Main App ---

const SelectionBar = ({ selected, onClear }: { selected: Service[], onClear: () => void }) => {
  if (selected.length === 0) return null;

  const totalPrice = selected.reduce((acc, s) => {
    const val = parseFloat(s.price.replace('R$', '').replace('.', '').replace(',', '.'));
    return acc + val;
  }, 0);

  const getWhatsAppLink = () => {
    const serviceList = selected.map(s => `• ${s.name}`).join('%0A');
    const message = `Olá, gostaria de agendar os seguintes serviços:%0A%0A${serviceList}%0A%0ATotal aproximado: R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    return `https://wa.me/5599991306420?text=${message}`;
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-6 left-4 right-4 z-[100] md:max-w-xl md:mx-auto"
    >
      <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-accent/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center text-brand-neon shrink-0">
             <div className="relative">
               <Car size={24} />
               <motion.span 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="absolute -top-2 -right-2 w-5 h-5 bg-brand-neon text-brand-dark text-[10px] font-black rounded-full flex items-center justify-center border-2 border-zinc-950"
               >
                 {selected.length}
               </motion.span>
             </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em] leading-none mb-1.5">
              Resumo do Agendamento
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white tracking-tight">R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase hidden sm:block">Aproximado</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 relative z-10">
          <button 
            onClick={onClear}
            className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            title="Limpar seleção"
          >
            <Clock size={20} className="rotate-45" />
          </button>
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1fb355] text-white font-black px-6 sm:px-8 py-3 rounded-2xl transition-all shadow-[0_10px_20px_rgba(37,211,102,0.2)] flex items-center justify-center gap-2 active:scale-95 text-xs sm:text-sm uppercase tracking-widest"
          >
            <MessageCircle size={20} fill="currentColor" />
            <span>Agendar</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleService = (service: Service) => {
    if (selectedServices.find(s => s.name === service.name)) {
      setSelectedServices(selectedServices.filter(s => s.name !== service.name));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="bg-brand-dark text-white font-sans flex flex-col min-h-screen overflow-x-hidden selection:bg-brand-accent selection:text-white">
      <Hero selectedServices={selectedServices} onToggle={toggleService} />
      <AnimatePresence>
        <SelectionBar selected={selectedServices} onClear={() => setSelectedServices([])} />
      </AnimatePresence>
    </div>
  );
}
