import { motion } from 'framer-motion';

export default function Overview() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-4xl font-bold mb-2">System Overview</h2>
        <p className="text-gray-400 text-lg">Real-time performance metrics and system status.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Components', value: '124', change: '+12%', color: 'green' },
          { label: 'Active Users', value: '1,284', change: '+5%', color: 'blue' },
          { label: 'System Uptime', value: '99.9%', change: 'Stable', color: 'purple' },
          { label: 'Avg. Load Time', value: '142ms', change: '-18ms', color: 'orange' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-[#333] bg-[#111]/50"
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${stat.color}-500/10 text-${stat.color}-500`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="glass-panel p-8 rounded-2xl border border-[#333]">
          <h3 className="text-xl font-bold mb-6">Component Usage</h3>
          <div className="space-y-6">
            {[
              { name: 'Buttons', usage: 85 },
              { name: 'Inputs', usage: 62 },
              { name: 'Cards', usage: 45 },
              { name: 'Navigation', usage: 92 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-gray-500">{item.usage}%</span>
                </div>
                <div className="h-2 bg-[#222] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.usage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-green-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel p-8 rounded-2xl border border-[#333]">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { user: 'Sarah Jenkins', action: 'updated ui-button styling', time: '2m ago' },
              { user: 'Marcus Chen', action: 'published v1.2.4', time: '15m ago' },
              { user: 'Team Alpha', action: 'merged pull request #452', time: '1h ago' },
              { user: 'System', action: 'automated backup completed', time: '3h ago' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex-shrink-0" />
                <div>
                  <p className="text-sm"><span className="font-bold">{activity.user}</span> {activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
