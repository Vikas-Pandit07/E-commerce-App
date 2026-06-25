import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Send } from '../lib/icons';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-noise" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c3aed]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide mb-4">
            Join The <span className="text-[#7c3aed]">Outloox</span> Community
          </h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            Get 10% off your first order and exclusive access to new drops, limited editions, and member-only offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-text-primary/5 border border-border-subtle rounded-lg px-4 py-3 text-text-primary placeholder-text-muted focus:border-[#7c3aed] transition-colors"
            />
            <button
              type="submit"
              disabled={subscribed}
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-text-primary font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {subscribed ? (
                <>
                  <Check size={18} /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <Send size={18} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
