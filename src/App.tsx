import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  ExternalLink, 
  Video, 
  Cpu,
  Monitor,
  Layout,
  Shapes,
  Gamepad2,
  Camera,
  Film,
  Instagram,
  Twitter,
  Send,
  X,
  Menu,
  Linkedin,
  Github,
  ChevronUp,
  ArrowDown
} from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { cn } from './lib/utils';
import { fetchAgencyData } from './lib/api';
import TiltCard from './components/TiltCard';

// Types
interface AgencyData {
  agency_name: string;
  founders: string[];
  footer_copyright: string;
  contact: {
    email: string;
    instagram: string;
    twitter: string;
    discord: string;
  };
  navigation: string[];
  home: {
    hero_badge: string;
    hero_title: string;
    hero_description: string;
    about_us?: {
      title: string;
      description: string;
      founders: string[];
    };
  };
  our_work: {
    page_title: string;
    page_subtitle: string;
    categories: Array<{
      id: string;
      title: string;
      description: string;
      sub_categories: {
        gaming: any[];
        other: any[];
      }
    }>;
  };
  ads_samples: {
    page_title: string;
    page_subtitle: string;
    loading_text: string;
    promotional_videos: any[];
  };
  placeholders: {
    website_samples_title: string;
    application_samples_title: string;
    placeholder_message: string;
  }
}

export default function App() {
  const [data, setData] = useState<AgencyData | null>(null);
  const [activeRoute, setActiveRoute] = useState('Home');
  const [activeSubView, setActiveSubView] = useState<{ categoryId: string, subId: string, title: string } | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadData() {
      const result = await fetchAgencyData();
      if (result) {
        setData(result);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleNavigate = (route: string) => {
    setActiveRoute(route);
    setActiveSubView(null);
    setIsMobileMenuOpen(false);
    // Smooth scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-primary font-black text-2xl uppercase tracking-tighter"
        >
          FrameX Studios
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-obsidian">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-gold z-[100] origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-primary/5 blur-[160px]" />
        <div className="absolute bottom-0 right-[10%] w-[40vw] h-[40vw] rounded-full bg-secondary/5 blur-[140px]" />
      </div>

      {/* Navigation */}
      <header className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl glass rounded-2xl md:rounded-full px-4 md:px-8 py-3 z-50 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <Film className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <div className="flex flex-col">
            <span className="font-black text-sm md:text-lg tracking-tighter uppercase whitespace-nowrap leading-none">{data.agency_name}</span>
            <span className="text-[8px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest mt-0.5">
              {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST
            </span>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 justify-center">
          {data.navigation.map((item) => (
            <button
              key={item}
              onClick={() => handleNavigate(item)}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap shrink-0",
                activeRoute === item ? "text-primary" : "text-white/50 hover:text-white"
              )}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button 
            onClick={() => setIsContactOpen(true)}
            className="bg-gradient-to-r from-primary to-secondary text-black text-[10px] md:text-xs font-black uppercase px-4 md:px-6 py-2 rounded-full hover:shadow-[0_0_20px_rgba(151,169,255,0.3)] transition-all flex-shrink-0"
          >
            Contact
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 glass rounded-full text-white"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] glass rounded-3xl z-[60] flex flex-col p-6 gap-4 md:hidden"
          >
            {data.navigation.map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item)}
                className={cn(
                  "text-sm font-black uppercase tracking-[0.2em] py-3 border-b border-white/5 last:border-0 transition-colors",
                  activeRoute === item ? "text-primary" : "text-white/50"
                )}
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Removed old mobile bottom nav */}

      {/* Main Content */}
      <main className="relative z-10 pt-24 md:pt-32">
        <AnimatePresence mode="wait">
          {activeSubView ? (
            <SubCategoryView 
              key="subview"
              view={activeSubView} 
              data={data}
              onBack={() => setActiveSubView(null)} 
              onPlay={(vid) => setActiveVideo(vid)}
              onViewImage={(img) => setActiveImage(img)}
            />
          ) : (
            <>
              {activeRoute === 'Home' && (
                <Home 
                  data={data.home} 
                  fullData={data}
                  onOpenContact={() => setIsContactOpen(true)}
                  onViewWork={() => handleNavigate('Our Work')}
                  onNavigate={handleNavigate}
                />
              )}
              {activeRoute === 'Our Work' && (
                <OurWork 
                  data={data.our_work} 
                  onSelectSub={(pkg) => setActiveSubView(pkg)} 
                  onPlay={(vid) => setActiveVideo(vid)}
                  onViewImage={(img) => setActiveImage(img)}
                />
              )}
              {(activeRoute === 'Ads Samples' || activeRoute === 'Website Samples' || activeRoute === 'Application Samples') && (
                <Placeholder 
                  title={activeRoute} 
                  message={data.placeholders.placeholder_message} 
                  onBack={() => handleNavigate('Home')}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      <Footer data={data} onNavigate={handleNavigate} />

      {/* Modals */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(151,169,255,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-6 right-6 w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
              >
                <div className="w-6 h-0.5 bg-white rotate-45 absolute" />
                <div className="w-6 h-0.5 bg-white -rotate-45 absolute" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {isContactOpen && (
          <ContactModal 
            data={data.contact} 
            onClose={() => setIsContactOpen(false)} 
          />
        )}

        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl md:max-w-5xl flex items-center justify-center p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={activeImage} 
                className="max-w-full h-auto max-h-[80vh] rounded-2xl md:rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.8)] object-contain border border-white/10"
                alt="Full size preview"
              />
              <button 
                onClick={() => setActiveImage(null)}
                className="absolute top-8 right-8 md:top-12 md:right-12 w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-all text-white z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Home({ 
  data, 
  fullData,
  onOpenContact, 
  onViewWork,
  onNavigate
}: { 
  data: AgencyData['home'], 
  fullData: AgencyData,
  onOpenContact: () => void, 
  onViewWork: () => void,
  onNavigate: (route: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full text-center"
    >
      <div className="relative min-h-[75vh] flex flex-col items-center justify-center pt-24 pb-12">
        {/* Spline 3D Hero Element - Seamless coverage including navigation */}
        <div className="absolute -top-32 left-0 right-0 h-[105vh] pointer-events-none z-0 opacity-60 overflow-hidden">
          <div className="relative w-full h-full">
             <iframe 
              src='https://my.spline.design/squarechipsfallinginplace-2ye2zgRa4IOP0frqghOWF4FV/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="absolute inset-0 w-full h-full scale-[1.5] md:scale-[1.8] origin-top-left mix-blend-screen"
            />
            {/* Ambient mask to fade edges and integrate with the main layout */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-obsidian via-obsidian/80 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-obsidian via-obsidian/40 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-obsidian via-obsidian/40 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 inline-block px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 backdrop-blur-sm text-gold text-xs font-black uppercase tracking-[0.2em]"
          >
            {data.hero_badge}
          </motion.div>
          <h1 className="text-[clamp(4.5rem,12vw,11rem)] font-black leading-[0.9] tracking-tighter mb-8 italic">
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -10, 0],
                filter: ["drop-shadow(0 0 0px rgba(151,169,255,0))", "drop-shadow(0 0 20px rgba(151,169,255,0.2))", "drop-shadow(0 0 0px rgba(151,169,255,0))"]
              }}
              transition={{ 
                opacity: { duration: 1 },
                x: { duration: 1, ease: "easeOut" },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                filter: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-gradient block"
            >
              FrameX
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, 8, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                opacity: { duration: 1, delay: 0.2 },
                x: { duration: 1, delay: 0.2, ease: "easeOut" },
                y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-white block mt-[-0.1em]"
            >
              Studios
            </motion.span>
          </h1>
          <p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {data.hero_description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <button 
              onClick={onOpenContact}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-black text-sm sm:text-xl font-black uppercase px-8 py-4 sm:px-14 sm:py-6 rounded-full hover:shadow-[0_0_50px_rgba(151,169,255,0.5)] transition-all transform hover:-translate-y-1"
            >
              Start a Project
            </button>
            <button 
              onClick={onViewWork}
              className="w-full sm:w-auto glass text-white text-sm sm:text-xl font-black uppercase px-8 py-4 sm:px-14 sm:py-6 rounded-full flex items-center justify-center gap-3 hover:bg-white/10 transition-all transform hover:-translate-y-1"
            >
              Explore Work
            </button>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-4 opacity-30 mt-16"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1 h-2 bg-white rounded-full" 
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Scroll</span>
          </motion.div>
        </div>
      </div>

      {/* New About Us Section - Founders */}
      <div className="relative h-[250vh] -mt-32">
         {/* Spline Background for this section */}
         <div className="sticky top-0 h-screen w-full z-0 overflow-hidden pointer-events-none">
            <iframe 
              src='https://my.spline.design/retrofuturismbganimation-ieezsHRuI8G3ogXIvErNHXlS/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60 scale-[1.5] md:scale-[1.3] origin-center"
            />
            {/* Smooth transition masks */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
            <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none" />
         </div>

         {/* Scrollable Content - Names appearing on scroll */}
         <div className="relative z-10 -mt-[100vh]">
            <section className="h-screen flex flex-col items-center justify-center px-6">
                <motion.div 
                   initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
                   whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                   viewport={{ amount: 0.5 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="text-center max-w-4xl"
                >
                   <span className="text-gold text-xs font-black uppercase tracking-[0.6em] mb-4 block opacity-60">Architect of Vision</span>
                   <h2 className="text-[clamp(5rem,18vw,14rem)] font-black italic tracking-tighter text-white leading-none">
                     Nehith
                   </h2>
                   <p className="mt-8 text-white/50 text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto italic">
                     "Pioneering the intersection of technology and art to redefine digital storytelling."
                   </p>
                   <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-12" />
                </motion.div>
            </section>
            
            <section className="h-[150vh] flex flex-col items-center justify-center px-6">
                <motion.div 
                   initial={{ opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" }}
                   whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                   viewport={{ amount: 0.5 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   className="text-center max-w-4xl"
                >
                   <span className="text-primary text-xs font-black uppercase tracking-[0.6em] mb-4 block opacity-60">Master of Cinema</span>
                   <h2 className="text-[clamp(5rem,18vw,14rem)] font-black italic tracking-tighter text-white leading-none">
                     Shubh
                   </h2>
                   <p className="mt-8 text-white/50 text-xl md:text-2xl font-light tracking-wide max-w-2xl mx-auto italic">
                     "Driven by cinematic excellence and meticulous attention to visual detail."
                   </p>
                   <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-12" />
                </motion.div>
            </section>
         </div>
      </div>

      {/* Our Process Section */}
      <section className="relative py-24 md:py-40 bg-obsidian overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 md:mb-32 text-center"
          >
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">How we work</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">
              Our <span className="text-gradient">Process.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { id: '01', title: 'Strategy', desc: 'Defining the core message and target audience for maximum impact.', icon: Layout },
              { id: '02', title: 'Creative', desc: 'Crafting unique visual concepts that align with your brand identity.', icon: Shapes },
              { id: '03', title: 'Production', desc: 'High-end execution using industry-standard tools and techniques.', icon: Video },
              { id: '04', title: 'Refinement', desc: 'Meticulous attention to detail through iterative feedback loops.', icon: Cpu },
            ].map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-[2.5rem] relative group border border-white/5"
              >
                <div className="absolute top-8 right-8 text-4xl font-black text-white/5 group-hover:text-primary/20 transition-colors italic">
                  {step.id}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">{step.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight Section */}
      <section className="py-24 bg-obsidian/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
             <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Expertise</span>
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic mb-6">
               Tailored <span className="text-primary italic">Solutions</span> for Your Vision.
             </h2>
             <p className="text-white/40 font-light leading-relaxed mb-8">
               We don't just edit; we engineer experiences. Our suite of services covers everything from cinematic gaming montages to high-conversion ad creatives.
             </p>
             <button 
              onClick={onOpenContact}
              className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest hover:text-white transition-colors group"
             >
               View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </motion.div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               { title: 'Dynamic VFX', desc: 'State-of-the-art visual effects to make your content pop.' },
               { title: 'Audio Mastering', desc: 'Immersive soundscapes designed for emotional resonance.' },
               { title: 'Brand Direction', desc: 'Strategic advisory on visual brand positioning.' },
               { title: 'Ad Optimization', desc: 'High-performance video ads that drive conversions.' }
             ].map((svc, i) => (
               <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="p-8 glass rounded-3xl group hover:border-primary/30 transition-all"
                >
                 <h4 className="text-lg font-black uppercase italic mb-2 tracking-tighter">{svc.title}</h4>
                 <p className="text-white/30 text-xs font-light">{svc.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Interactive Wheel Section */}
      <section className="relative h-[80vh] md:h-[120vh] flex flex-col items-center justify-center overflow-hidden bg-obsidian">
        {/* macOS Style Background Fill */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] w-full overflow-hidden opacity-30 pointer-events-none">
           <div className="absolute top-1/2 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/40 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
           <div className="absolute top-1/3 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-secondary/30 rounded-full blur-[80px] md:blur-[120px] animation-delay-2000" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian z-10 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-0 w-full h-full cursor-pointer flex items-center justify-center"
          onClick={onViewWork}
        >
          {/* Custom Spline Element - Hidden Watermark by Scaling and Clipping */}
          <div className="w-[140%] h-[140%] md:w-full md:h-full flex items-center justify-center scale-[1.5] md:scale-[1.3] pointer-events-none overflow-hidden">
            {/* @ts-ignore */}
            <hana-viewer 
              url="https://prod.spline.design/1GSwxRikdWpRW0IR-ExE/scene.hanacode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          {/* Floating Cinematic Messages - Simplified for Mobile */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-[25%] left-[10%] md:left-[15%] glass p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/10"
            >
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-primary">Cinematic</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute top-[35%] right-[5%] md:right-[10%] glass p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/10"
            >
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-gold text-gradient">Visionary</span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[25%] left-[15%] md:left-[20%] glass p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/10"
            >
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/60">Storytelling</span>
            </motion.div>
          </div>

          <div className="absolute inset-x-0 bottom-10 md:bottom-20 flex flex-col items-center gap-2 md:gap-4 z-20">
            <span className="text-[10px] md:text-sm font-black uppercase tracking-[0.5em] md:tracking-[1em] text-white/50 italic animate-pulse">Expand Portfolio</span>
            <div className="w-px h-8 md:h-16 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

function OurWork({ data, onSelectSub, onPlay, onViewImage }: { data: AgencyData['our_work'], onSelectSub: (pkg: { categoryId: string, subId: string, title: string }) => void, onPlay: (id: string) => void, onViewImage: (url: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-6"
    >
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Explore our recent<br />
          <span className="text-gradient">creative outputs.</span>
        </h2>
        <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
          {data.page_subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {data.categories.map((category, catIdx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: catIdx * 0.2 }}
            className={category.id === 'video-editing' ? "lg:col-span-2" : "lg:col-span-1"}
          >
            <TiltCard 
              className={cn(
                "glass rounded-[2rem] p-8 min-h-[500px] flex flex-col justify-between overflow-hidden relative group h-full w-full border border-white/5 hover:border-primary/50 transition-all duration-500 hover:bg-white/[0.03]",
              )}
            >
            <div 
              className="relative z-10 cursor-pointer group/title inline-block mb-4"
              onClick={() => onSelectSub({ categoryId: category.id, subId: 'all', title: category.title })}
            >
              <span className={cn(
                "text-xs font-black uppercase tracking-[0.2em] inline-block transition-colors",
                category.id === 'video-editing' ? "text-gold group-hover/title:text-white" : "text-secondary group-hover/title:text-white"
              )}>
                {category.id === 'video-editing' ? 'Premium Video Editing' : 'Thumbnail Design'}
              </span>
              <div className="h-px w-0 group-hover/title:w-full bg-white transition-all duration-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 relative z-10">
              {Object.entries(category.sub_categories).map(([key, items]) => (
                items.length > 0 ? (
                  <div key={key} className="group/cat">
                    <header 
                      onClick={() => onSelectSub({ categoryId: category.id, subId: key, title: `${category.title} - ${key}` })}
                      className="flex items-center justify-between w-full mb-4 text-primary hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                         {key === 'gaming' ? <Gamepad2 className="w-3 h-3" /> : <Shapes className="w-3 h-3" />}
                         {key}
                      </div>
                      <ArrowRight className="w-3 h-3 translate-x-[-10px] opacity-0 group-hover/cat:translate-x-0 group-hover/cat:opacity-100 transition-all" />
                    </header>
                    <div className="space-y-4">
                      {items.slice(0, 2).map((item: any, idx: number) => (
                        <div 
                          key={idx} 
                          className="group/item cursor-pointer"
                          onClick={() => {
                            if (item.youtube_id) onPlay(item.youtube_id);
                            else if (item.image_url) onViewImage(item.image_url);
                            else onSelectSub({ categoryId: category.id, subId: key, title: `${category.title} - ${key}` });
                          }}
                        >
                    <div className="aspect-video bg-obsidian rounded-lg overflow-hidden relative border border-white/5 group-hover/item:border-primary transition-all duration-500">
                      <img 
                        src={item.image_url || (item.youtube_id ? `https://img.youtube.com/vi/${item.youtube_id}/maxresdefault.jpg` : `https://picsum.photos/seed/${idx + key + category.id}/800/450`)} 
                        className="w-full h-full object-cover opacity-100 group-hover/item:scale-105 transition-all duration-700 ease-out" 
                        onError={(e) => {
                          if (item.youtube_id) {
                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.youtube_id}/sddefault.jpg`;
                          }
                        }}
                      />
                      {item.youtube_id && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[1px]">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 scale-90 group-hover/item:scale-100 transition-all">
                            <Play className="w-5 h-5 fill-primary text-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div key={key} className="opacity-20 pointer-events-none">
                    <header className="flex items-center gap-2 mb-4 uppercase text-[10px] font-black tracking-widest">
                       {key === 'gaming' ? <Gamepad2 className="w-3 h-3" /> : <Shapes className="w-3 h-3" />}
                       {key}
                    </header>
                  </div>
                )
              ))}
            </div>

            {/* Accent glows */}
            <div className={cn(
              "absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-[100px] opacity-20",
              category.id === 'video-editing' ? "bg-primary" : "bg-secondary"
            )} />
          </TiltCard>
        </motion.div>
      ))}
    </div>
    </motion.div>
  );
}

function AdsSamples({ data, onPlay }: { data: AgencyData['ads_samples'], onPlay: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-6"
    >
      <div className="text-center mb-24">
        <h2 className="text-6xl font-black tracking-tighter mb-6">{data.page_title}</h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
          {data.page_subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.promotional_videos.length > 0 ? (
          data.promotional_videos.map((ad, idx) => (
            <TiltCard key={idx} className="glass rounded-[2rem] overflow-hidden group border border-white/5 hover:border-primary/60 transition-all duration-500 hover:bg-white/[0.02]">
              <div 
                className="aspect-video bg-obsidian relative overflow-hidden cursor-pointer"
                onClick={() => onPlay(ad.youtube_id)}
              >
                 <img 
                  src={`https://img.youtube.com/vi/${ad.youtube_id}/maxresdefault.jpg`} 
                  className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${ad.youtube_id}/sddefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-white text-white" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center glass rounded-[2rem]">
            <p className="text-white/30 font-black uppercase tracking-widest">No commercial ads available yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ContactModal({ data, onClose }: { data: AgencyData['contact'], onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg glass rounded-[3rem] p-12 overflow-hidden shadow-[0_0_60px_rgba(151,169,255,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32" />
        
        <div className="relative z-10">
          <header className="mb-12">
            <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Get in touch</span>
            <h2 className="text-5xl font-black tracking-tighter mb-4 italic">Let's <span className="text-primary italic">Connect</span></h2>
            <p className="text-white/40 font-light">Have a vision? We'll help you execute it with cinematic precision.</p>
          </header>

          <div className="space-y-6">
            <a 
              href={`mailto:${data.email}`}
              className="flex items-center gap-6 p-6 glass hover:bg-white/5 transition-all group rounded-2xl border border-white/5"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1">Email us</span>
                <span className="text-lg font-bold text-white">{data.email}</span>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-4">
              <a 
                href={data.instagram}
                target="_blank"
                rel="no-referrer"
                className="flex items-center gap-4 p-5 glass hover:bg-[#E1306C]/10 transition-all group rounded-2xl border border-white/5"
              >
                <Instagram className="w-5 h-5 text-white/40 group-hover:text-[#E1306C] transition-colors" />
                <span className="text-xs font-black uppercase tracking-widest">Instagram</span>
              </a>
              <a 
                href={data.twitter}
                target="_blank"
                rel="no-referrer"
                className="flex items-center gap-4 p-5 glass hover:bg-white/10 transition-all group rounded-2xl border border-white/5"
              >
                <XIcon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                <span className="text-xs font-black uppercase tracking-widest">X</span>
              </a>
            </div>

            <a 
              href={`mailto:${data.email}`}
              className="block w-full"
            >
              <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gold transition-colors flex items-center justify-center gap-2 group">
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Send Message
              </button>
            </a>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-white/20 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SubCategoryView({ view, data, onBack, onPlay, onViewImage }: { view: { categoryId: string, subId: string, title: string }, data: AgencyData, onBack: () => void, onPlay: (id: string) => void, onViewImage: (url: string) => void, key?: React.Key }) {
  const category = data.our_work.categories.find(c => c.id === view.categoryId);
  
  const [activeSub, setActiveSub] = useState(view.subId);
  const [visibleCount, setVisibleCount] = useState(6);

  const getItems = () => {
    if (activeSub === 'all') {
      return [
        ...(category?.sub_categories.gaming || []),
        ...(category?.sub_categories.other || [])
      ];
    }
    return category?.sub_categories[activeSub as keyof typeof category.sub_categories] || [];
  };

  const items = getItems();
  const visibleItems = items.slice(0, visibleCount);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-7xl mx-auto px-6"
    >
      <button 
        onClick={onBack}
        className="mb-12 text-white/40 hover:text-white flex items-center gap-2 uppercase text-[10px] font-black tracking-widest transition-colors"
      >
        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Work
      </button>

      <div className="mb-16">
        <span className="text-primary text-xs font-black uppercase tracking-[.3em] mb-4 block">Exploration</span>
        <h2 className="text-6xl font-black tracking-tighter text-gradient italic mb-8">{category?.title}</h2>
        
        {/* Filtering Options */}
        <div className="flex flex-wrap gap-4">
          {['all', 'gaming', 'other'].map((subId) => {
            const hasItems = subId === 'all' || (category?.sub_categories[subId as keyof typeof category.sub_categories]?.length || 0) > 0;
            if (!hasItems) return null;
            
            return (
              <button
                key={subId}
                onClick={() => {
                  setActiveSub(subId);
                  setVisibleCount(6);
                }}
                className={cn(
                  "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                  activeSub === subId 
                    ? "bg-primary text-black shadow-[0_0_20px_rgba(151,169,255,0.3)]" 
                    : "glass text-white/40 hover:text-white border border-white/5"
                )}
              >
                {subId}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.length > 0 ? (
          visibleItems.map((item: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 6) * 0.1 }}
              className="h-full"
            >
              <TiltCard className="glass rounded-[2rem] overflow-hidden group h-full border border-white/5 hover:border-primary transition-all duration-500">
                <div 
                  className="aspect-video bg-obsidian relative overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (item.youtube_id) onPlay(item.youtube_id);
                    else if (item.image_url) onViewImage(item.image_url);
                  }}
                >
                  <img 
                    src={item.image_url || (item.youtube_id ? `https://img.youtube.com/vi/${item.youtube_id}/maxresdefault.jpg` : `https://picsum.photos/seed/${idx + activeSub}/800/450`)} 
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                    onError={(e) => {
                      if (item.youtube_id) {
                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.youtube_id}/sddefault.jpg`;
                      }
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 scale-90 group-hover:scale-100 transition-all">
                      <Play className="w-6 h-6 fill-primary text-primary" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-20 text-center glass rounded-[2rem]">
            <p className="text-white/30 font-black uppercase tracking-widest">No samples uploaded for this category yet.</p>
          </div>
        )}
      </div>

      {visibleCount < items.length && (
        <div className="mt-20 flex justify-center">
          <button 
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="group relative px-12 py-5 glass rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(151,169,255,0.2)]"
          >
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative text-xs font-black uppercase tracking-[0.4em] flex items-center gap-3">
              Load More Samples
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </span>
          </button>
        </div>
      )}
    </motion.div>
  );
}

function Placeholder({ title, message, onBack }: { title: string, message: string, onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-4xl mx-auto text-center py-24 glass rounded-[3rem] p-12 mx-6"
    >
      <div className="mb-12 flex justify-center">
        <Monitor className="w-24 h-24 text-primary animate-pulse" />
      </div>
      <h2 className="text-5xl font-black tracking-tighter mb-8">{title}</h2>
      <p className="text-2xl text-gradient font-black italic max-w-lg mx-auto">
        {message}
      </p>
      <button 
        onClick={onBack}
        className="mt-16 text-white/40 hover:text-white flex items-center gap-2 mx-auto uppercase text-xs font-black tracking-[0.2em] transition-colors"
      >
        <ArrowRight className="w-4 h-4" /> Go Back
      </button>
    </motion.div>
  );
}

function Footer({ data, onNavigate }: { data: AgencyData, onNavigate: (route: string) => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-obsidian pt-32 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Film className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-black uppercase tracking-tighter italic">
                {data.agency_name}
              </span>
            </div>
            <p className="text-white/40 text-lg font-light leading-relaxed max-w-md mb-10">
              Transforming abstract visions into cinematic reality through innovative digital experiences and bleeding-edge creative design.
            </p>
            <div className="flex items-center gap-4">
              <a href={data.contact.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={data.contact.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 hover:text-white transition-all">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all opacity-40">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-40">Navigation</h4>
              <ul className="space-y-4">
                {data.navigation.map(item => (
                  <li key={item}>
                    <button 
                      onClick={() => onNavigate(item)}
                      className="text-white/40 hover:text-primary font-bold uppercase text-[10px] tracking-widest transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-[0.2em] mb-8 opacity-40">Connect</h4>
              <ul className="space-y-4">
                <li><a href={`mailto:${data.contact.email}`} className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Email</a></li>
                <li><a href={data.contact.instagram} className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Instagram</a></li>
                <li><a href={data.contact.twitter} className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">X</a></li>
                <li><a href={data.contact.discord} className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">Discord</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <button 
                onClick={scrollToTop}
                className="w-16 h-16 rounded-3xl glass flex flex-col items-center justify-center gap-1 group hover:bg-primary/20 transition-all"
              >
                <ChevronUp className="w-5 h-5 text-white group-hover:translate-y-[-4px] transition-transform" />
                <span className="text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">TOP</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-white/20">
          <p>{data.footer_copyright}</p>
          <div className="flex items-center gap-8">
            <span className="hover:text-white cursor-help transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-help transition-colors">Terms of Service</span>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-green-500/50">Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
