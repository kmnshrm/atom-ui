
export default function Documentation() {
  return (
    <div className="max-w-4xl space-y-12">
      <header>
        <h2 className="text-4xl font-bold mb-4">Documentation</h2>
        <p className="text-gray-400 text-xl leading-relaxed">
          Welcome to the Atom UI documentation. Here you'll find everything you need to build
          modern, high-performance interfaces using our enterprise component library.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <ui-icon name="zap" size="24" class="text-green-500"></ui-icon>
            Getting Started
          </h3>
          <p className="text-gray-400">
            Learn how to install and configure Atom UI in your React application. 
            Our setup process is designed to be quick and painless.
          </p>
          <ui-button variant="outline" size="sm">Installation Guide</ui-button>
        </section>

        <section className="space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <ui-icon name="palette" size="24" class="text-blue-500"></ui-icon>
            Theming
          </h3>
          <p className="text-gray-400">
            Customize every aspect of your application with our powerful theming engine.
            Support for light/dark mode and custom color palettes.
          </p>
          <ui-button variant="outline" size="sm">Theme Editor</ui-button>
        </section>
      </div>

      <hr className="border-[#222]" />

      <section className="space-y-6">
        <h3 className="text-2xl font-bold">Core Concepts</h3>
        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-xl border border-[#333]">
            <h4 className="text-lg font-bold mb-2">Shadow DOM & Encapsulation</h4>
            <p className="text-gray-400">
              Atom UI uses standard Web Components technology. This means your styles stay
              encapsulated and won't leak out, ensuring consistency across your entire app.
            </p>
          </div>
          <div className="glass-panel p-6 rounded-xl border border-[#333]">
            <h4 className="text-lg font-bold mb-2">Event Handling</h4>
            <p className="text-gray-400">
              All components emit standard DOM events. We provide React-friendly wrappers
              to handle these events seamlessly in your functional components.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-green-500/5 border border-green-500/20 p-8 rounded-2xl">
        <h3 className="text-xl font-bold text-green-500 mb-2">Pro Tip</h3>
        <p className="text-gray-400">
          Use the `ui-navigation-bar` component to quickly build enterprise-grade sidebars
          like the one you're using right now!
        </p>
      </section>
    </div>
  );
}
