import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
    consent: false,
    marketing: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission goes here
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Urbanova | Integrated Development Advisory</title>
        <meta
          name="description"
          content="Get in touch with Urbanova. Reach out for consultations on urban planning, environmental & social safeguards, climate resilience, and project feasibility across Malawi and Southern Africa."
        />
      </Head>

      <div className="w-full font-sans text-neutral-800 bg-white">
        {/* Header Banner - Matches Screenshot Style */}
        <section className="relative overflow-hidden bg-[#13313d] text-white py-16 px-6 md:px-12 lg:px-16">
          <div className="absolute top-0 right-0 h-full w-1/3 bg-[#5ebbb7]/20 transform skew-x-12 translate-x-12 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-block border-b-2 border-[#5ebbb7] pb-1 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Contact
              </h1>
            </div>
          </div>
        </section>

        {/* Start a Conversation / Form Section */}
        <section className="py-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#13313d]">Start a conversation</h2>
            <div className="w-10 h-1 bg-[#5ebbb7] mx-auto my-3" />
            <p className="text-xs md:text-sm text-neutral-600 leading-relaxed">
              If you would like more information about any of our consultancy services, statutory MEPA clearances, or have a project query, please don't hesitate to get in touch[cite: 125, 142]. A member of our team will get back to you promptly.
            </p>
          </div>

          {/* Form Card Container */}
          <div className="max-w-3xl mx-auto bg-[#f9fafb] p-8 md:p-12 rounded-sm border border-neutral-200/80 shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 bg-[#5ebbb7]/20 text-[#13313d] rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[#13313d]">Thank you for reaching out!</h3>
                <p className="text-xs text-neutral-600">
                  Your message has been sent successfully. Our team will review your inquiry and get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 border border-[#13313d] text-[#13313d] px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#13313d] hover:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-neutral-100/80 border border-neutral-300 rounded-xs px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#5ebbb7] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Company Input */}
                  <div>
                    <label htmlFor="company" className="block text-xs font-semibold text-neutral-700 mb-1">
                      Company name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-neutral-100/80 border border-neutral-300 rounded-xs px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#5ebbb7] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Email address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-neutral-100/80 border border-neutral-300 rounded-xs px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#5ebbb7] focus:bg-white transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={1500}
                    placeholder="How can we help?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-neutral-100/80 border border-neutral-300 rounded-xs px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:border-[#5ebbb7] focus:bg-white transition-colors resize-y"
                  />
                  <div className="text-right text-[10px] text-neutral-400 mt-0.5">
                    {formData.message.length} / 1500
                  </div>
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      required
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-0.5 h-3.5 w-3.5 rounded-xs border-neutral-300 text-[#5ebbb7] focus:ring-[#5ebbb7]"
                    />
                    <label htmlFor="consent" className="text-[11px] text-neutral-600 leading-tight">
                      Consent * <br />
                      <span className="text-neutral-500">
                        Yes, I agree with the <a href="/privacy" className="underline text-[#13313d]">privacy policy</a> and <a href="/terms" className="underline text-[#13313d]">terms of use</a>. Your details will be stored to handle your inquiry.
                      </span>
                    </label>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="marketing"
                      name="marketing"
                      checked={formData.marketing}
                      onChange={handleChange}
                      className="mt-0.5 h-3.5 w-3.5 rounded-xs border-neutral-300 text-[#5ebbb7] focus:ring-[#5ebbb7]"
                    />
                    <label htmlFor="marketing" className="text-[11px] text-neutral-600 leading-tight">
                      Marketing and communications <br />
                      <span className="text-neutral-500">
                        We'd love to keep in touch and send updates on our latest work and industry insights. Please check if you consent.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="bg-[#5ebbb7] text-[#0b2834] px-7 py-2.5 text-xs font-bold shadow-xs hover:bg-[#4ea8a4] transition-colors rounded-xs cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* How to Find Us Section */}
        <section className="bg-[#f5f8f8] py-16 px-6 md:px-12 lg:px-16 border-t border-neutral-200/60">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#13313d]">How to find us</h2>
              <div className="w-10 h-1 bg-[#5ebbb7] mt-2" />
            </div>

            {/* Google Map Container */}
            <div className="w-full h-[360px] bg-neutral-200 rounded-sm overflow-hidden border border-neutral-300 shadow-xs">
              <iframe
                title="Urbanova Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.743123403215!2d34.9500!3d-15.7500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ1JzAwLjAiUyAzNMK1NTcnMDAuMCJF!5e0!3m2!1sen!2smw!4v1680000000000!5m2!1sen!2smw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Location & Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Head Office */}
              <div className="bg-white p-6 rounded-sm border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#13313d] mb-2">Blantyre Office</h3>
                  <div className="text-xs text-neutral-600 space-y-1 leading-relaxed">
                    <p className="font-semibold text-neutral-800">Urbanova Consultancy[cite: 122]</p>
                    <p>Ngumbe, Chileka</p>
                    <p>Blantyre Rural, Malawi</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 text-xs">
                  <a
                    href="tel:+265888033358"
                    className="text-[#13313d] font-semibold hover:text-[#5ebbb7] transition-colors block"
                  >
                    📞 +265 888 033 358
                  </a>
                  <a
                    href="tel:+265992266359"
                    className="text-[#13313d] font-semibold hover:text-[#5ebbb7] transition-colors block mt-1"
                  >
                    📞 +265 992 266 359
                  </a>
                </div>
              </div>

              {/* Direct Leadership Contact */}
              <div className="bg-white p-6 rounded-sm border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#13313d] mb-2">Principal Contact</h3>
                  <div className="text-xs text-neutral-600 space-y-1 leading-relaxed">
                    <p className="font-semibold text-neutral-800">Hastings Jolotie Nyirenda[cite: 145]</p>
                    <p>Founder & Lead Consultant[cite: 145]</p>
                    <p>MEPA Registered ESIA Practitioner[cite: 130]</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 text-xs">
                  <a
                    href="mailto:jolotiehastings@gmail.com"
                    className="text-[#13313d] font-semibold hover:text-[#5ebbb7] transition-colors block"
                  >
                    ✉️ jolotiehastings@gmail.com[cite: 145]
                  </a>
                </div>
              </div>

              {/* Registration & Legal Details */}
              <div className="bg-white p-6 rounded-sm border border-neutral-200 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#13313d] mb-2">Business Compliance</h3>
                  <div className="text-xs text-neutral-600 space-y-1 leading-relaxed">
                    <p><span className="font-semibold text-neutral-800">Business Reg No:</span> BRN-PKS44LJ[cite: 145, 146]</p>
                    <p><span className="font-semibold text-neutral-800">TIN:</span> 31179395[cite: 145]</p>
                    <p><span className="font-semibold text-neutral-800">Statutory Alignments:</span> MEPA, MRA, PPDA[cite: 144]</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-neutral-100 text-xs">
                  <span className="inline-block bg-emerald-50 text-emerald-800 font-semibold px-2 py-1 rounded-xs border border-emerald-200 text-[10px]">
                    ✓ Fully Registered & Compliant[cite: 121, 144, 146]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}