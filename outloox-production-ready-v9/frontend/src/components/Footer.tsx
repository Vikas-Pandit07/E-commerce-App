import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { Camera, CreditCard, Globe, Mail, MapPin, MessageCircle, Phone, PlayCircle, RefreshCw, ShieldCheck, Truck } from '../lib/icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();

  return (
    <footer className="bg-bg-primary border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3"><Truck className="text-[#7c3aed]" size={24} /><div><p className="font-medium text-sm">Free Shipping</p><p className="text-xs text-text-muted">On orders above ₹999</p></div></div>
            <div className="flex items-center gap-3"><RefreshCw className="text-[#7c3aed]" size={24} /><div><p className="font-medium text-sm">Easy Returns</p><p className="text-xs text-text-muted">7-day return policy</p></div></div>
            <div className="flex items-center gap-3"><ShieldCheck className="text-[#7c3aed]" size={24} /><div><p className="font-medium text-sm">Secure Payment</p><p className="text-xs text-text-muted">100% secure checkout</p></div></div>
            <div className="flex items-center gap-3"><CreditCard className="text-[#7c3aed]" size={24} /><div><p className="font-medium text-sm">COD Available</p><p className="text-xs text-text-muted">Pay on delivery</p></div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block"><span className="font-display text-3xl font-bold tracking-wider text-text-primary">OUT<span className="text-[#7c3aed]">LOOX</span></span></Link>
            <p className="mt-4 text-sm text-text-muted max-w-sm leading-relaxed">Premium streetwear and footwear designed for individuals who create their own path. Wear your outlook.</p>
            <div className="mt-6 flex items-center gap-4">{[Camera, Globe, MessageCircle, PlayCircle].map((Icon, index) => <a key={index} href="#" className="w-10 h-10 rounded-full bg-text-primary/5 flex items-center justify-center text-text-secondary hover:bg-[#7c3aed] hover:text-text-primary transition-all"><Icon size={18} /></a>)}</div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-3">{['Men', 'Women', 'Sneakers', 'New Arrivals', 'Sale'].map((item) => { const to = item === 'New Arrivals' || item === 'Sale' ? '/shop' : `/shop?category=${item.toLowerCase()}`; return <li key={item}><Link to={to} className="text-sm text-text-muted hover:text-[#7c3aed] transition-colors">{item}</Link></li>; })}</ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">{['Contact Us', 'Shipping', 'Returns', 'Size Guide', 'FAQs'].map((item) => <li key={item}><Link to="/about" className="text-sm text-text-muted hover:text-[#7c3aed] transition-colors">{item}</Link></li>)}</ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">{['About Us', 'Our Story', 'Privacy Policy', 'Terms & Conditions', 'Careers'].map((item) => <li key={item}><Link to="/about" className="text-sm text-text-muted hover:text-[#7c3aed] transition-colors">{item}</Link></li>)}</ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-text-muted">
            <a href={`mailto:${settings.footer_email}`} className="flex items-center gap-2 hover:text-[#7c3aed] transition-colors"><Mail size={16} /> {settings.footer_email}</a>
            <a href={`tel:${settings.footer_phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-[#7c3aed] transition-colors"><Phone size={16} /> {settings.footer_phone}</a>
            <span className="flex items-center gap-2"><MapPin size={16} /> {settings.footer_city}</span>
          </div>
          <div className="text-sm text-text-muted">© {currentYear} OUTLOOX. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
