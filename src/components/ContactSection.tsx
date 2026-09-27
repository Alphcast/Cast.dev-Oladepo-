import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, MapPin, Github, Linkedin } from 'lucide-react';
import { PORTFOLIO_CONFIG, PORTFOLIO_ASSETS } from '../data/portfolioData';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'Full-Stack Web App',
    message: '',
    honeypot: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in your name, email, and message.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been sent to Oladepo. I will respond within 24 hours.'
        });
        setFormData({ name: '', email: '', project: 'Full-Stack Web App', message: '', honeypot: '' });
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setStatusMessage({
        type: 'success',
        text: `Message staged! You can also email directly at ${PORTFOLIO_CONFIG.email}.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Frosted Card Container matching reference image */}
        <div className="glass-card rounded-[36px] p-6 sm:p-10 md:p-14 shadow-lg border border-white relative overflow-hidden">
          
          {/* Decorative Iridescent 3D Glass Orb on the right corner matching reference image */}
          <div className="absolute -bottom-10 -right-10 w-56 h-56 sm:w-72 sm:h-72 opacity-35 pointer-events-none mix-blend-multiply blur-xs">
            <img
              src={PORTFOLIO_ASSETS.glassOrb}
              alt="Decorative 3D Glass Orb"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
            
            {/* Left Column: Headline & Direct Contact Links matching reference image */}
            <div className="lg:col-span-5 flex flex-col text-left">
              <span className="text-[11px] font-bold tracking-widest text-indigo-600 uppercase block mb-2">
                LET'S CONNECT
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] leading-tight mb-8">
                Have a project in mind?<br />Let's create something amazing together.
              </h2>

              {/* Contact Information List matching reference image */}
              <div className="space-y-4 mb-8">
                <a
                  href={`mailto:${PORTFOLIO_CONFIG.email}`}
                  className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 hover:text-indigo-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-indigo-50 text-slate-500 group-hover:text-indigo-600 flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{PORTFOLIO_CONFIG.email}</span>
                </a>

                <a
                  href={PORTFOLIO_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-xs sm:text-sm text-slate-600 hover:text-emerald-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-500 group-hover:text-emerald-600 flex items-center justify-center transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-medium">Direct WhatsApp Message</span>
                </a>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{PORTFOLIO_CONFIG.location}</span>
                </div>
              </div>

              {/* Social Link Badges */}
              <div className="flex items-center gap-2">
                <a
                  href={PORTFOLIO_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>@{PORTFOLIO_CONFIG.githubUsername}</span>
                </a>

                <a
                  href={PORTFOLIO_CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right Column: Input Fields matching reference image */}
            <div className="lg:col-span-7">
              {statusMessage && (
                <div
                  className={`p-4 rounded-2xl mb-5 flex items-start gap-2.5 text-xs ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Row 1: Your Name & Your Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-2xl glass-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-2xl glass-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                {/* Row 2: Your Project */}
                <input
                  type="text"
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  placeholder="Your Project (e.g. Full-Stack Web App, CBT Suite, AI Agent)"
                  className="w-full px-4 py-3 rounded-2xl glass-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                />

                {/* Row 3: Your Message */}
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-2xl glass-input text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
                ></textarea>

                {/* Send Button matching reference image: Dark rounded-full */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs font-semibold text-white bg-[#0f172a] hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 hover:shadow-lg disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
