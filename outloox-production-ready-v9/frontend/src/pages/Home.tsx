import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CollectionCard from '../components/CollectionCard';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';
import TrustBadges from '../components/TrustBadges';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductsContext';
import { useSettings } from '../context/SettingsContext';
import { featuredCollections } from '../lib/data';
import { ArrowRight, ChevronRight } from '../lib/icons';

export default function Home() {
  const { products, loading, error } = useProducts();
  const { isAuthenticated, user } = useAuth();
  const { settings } = useSettings();
  const bestSellers = products.slice(0, 6);

  return (
    <div className="min-h-screen bg-bg-primary">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/hero/hero-bg.svg" alt="OUTLOOX streetwear" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
          <div className="absolute inset-0 bg-noise" />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-[#7c3aed]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block text-[#7c3aed] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                {settings.hero_badge}
              </span>

              {isAuthenticated && (
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-[#7c3aed]/12 border border-[#7c3aed]/25 text-sm text-text-primary">
                  Welcome back, <span className="font-semibold text-[#c4b5fd]">{user?.username}</span>
                </div>
              )}

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tight mb-6">
                {settings.hero_title_line1} <br />
                <span className="text-gradient-accent">{settings.hero_title_line2}</span>
              </h1>

              <p className="text-base sm:text-lg text-text-secondary mb-8 max-w-lg leading-relaxed">
                {settings.hero_subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop?category=men"
                  className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-text-primary px-7 py-3.5 rounded font-semibold uppercase text-sm tracking-wider transition-all hover:gap-3"
                >
                  Shop Men <ArrowRight size={18} />
                </Link>
                <Link
                  to="/shop?category=women"
                  className="inline-flex items-center gap-2 bg-text-primary/10 hover:bg-text-primary/15 text-text-primary border border-border-subtle px-7 py-3.5 rounded font-semibold uppercase text-sm tracking-wider transition-all"
                >
                  Shop Women
                </Link>
                <Link
                  to={isAuthenticated ? '/profile' : '/login'}
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-text-primary/5 text-text-primary border border-text-primary/20 px-7 py-3.5 rounded font-semibold uppercase text-sm tracking-wider transition-all"
                >
                  {isAuthenticated ? 'My Account' : 'Login to Continue'}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBadges />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide mb-2">
                Best Sellers
              </h2>
              <p className="text-text-muted">Most loved pieces by the OUTLOOX community.</p>
              {error && <p className="text-xs text-amber-400 mt-2">{error}</p>}
            </div>
            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#7c3aed] hover:text-[#8b5cf6] transition-colors uppercase tracking-wider"
            >
              View All <ChevronRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div className="text-text-muted">Loading products…</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
              {bestSellers.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-[#7c3aed] uppercase tracking-wider">
              View All <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide mb-3">
              Featured Collections
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Curated drops for every mood. From oversized streetwear to everyday essentials.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCollections.map((collection, index) => (
              <CollectionCard
                key={collection.id}
                title={collection.title}
                subtitle={collection.subtitle}
                image={collection.image}
                link={collection.link}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-bg-primary" />
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#7c3aed]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src="/about/brand-statement.svg" alt="OUTLOOX brand" className="w-full aspect-[4/5] object-cover rounded-lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:pl-8"
            >
              <span className="text-[#7c3aed] text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                More Than Fashion
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-wide mb-6">
                Confidence. Ambition. Individuality.
              </h2>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                OUTLOOX represents confidence, ambition and individuality. Every piece is designed for people who refuse to blend in. We believe what you wear is an extension of who you are.
              </p>
              <p className="text-text-muted leading-relaxed mb-8">
                From premium heavyweight tees to performance sneakers, each product is crafted with attention to detail, quality materials, and a fearless attitude.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-text-primary px-7 py-3.5 rounded font-semibold uppercase text-sm tracking-wider transition-all"
              >
                About Outloox <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
