import { motion } from 'framer-motion';

export default function DesignHouse() {
  return (
    <div className="space-y-12">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-6 gradient-text">Design House</h2>
        <p className="text-gray-400 text-xl">
          Where art meets engineering. Explore the visual identity and design system 
          that powers Atom UI.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'Color Theory', desc: 'A curated palette of deep blacks and vibrant greens.', icon: 'palette' },
          { title: 'Typography', desc: 'Inter & Outfit providing clarity and character.', icon: 'type' },
          { title: 'Motion', desc: 'Subtle physics-based animations for a living UI.', icon: 'activity' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="glass-panel p-8 rounded-3xl border border-[#333] text-center"
          >
            <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 mb-6">
              <ui-icon name={item.icon} size="32"></ui-icon>
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <section className="space-y-8">
        <h3 className="text-3xl font-bold">Visual Language</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-[#333] relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${
                i % 2 === 0 ? 'from-purple-500/20 to-blue-500/20' : 'from-green-500/20 to-teal-500/20'
              }`} />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
                <span className="text-sm font-medium">Concept 0{i}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="glass-panel p-12 rounded-3xl border border-[#333] bg-gradient-to-tr from-[#0a0a0a] to-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full" />
        <div className="relative z-10">
          <h3 className="text-3xl font-bold mb-4">Our Design Philosophy</h3>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            We believe that enterprise software doesn't have to be boring. By combining 
            minimalist principles with modern aesthetics like glassmorphism and 
            dynamic lighting, we create interfaces that users actually enjoy working with.
          </p>
          <ui-button variant="primary" className="mt-8">Explore the System</ui-button>
        </div>
      </div>
    </div>
  );
}
