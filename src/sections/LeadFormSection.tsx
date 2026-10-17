import React, { useState, useEffect } from 'react';
import { LeadFormData } from '../types';
import { submitEnquiry } from '../lib/enquiryService';
import { resortConfig, getWhatsAppUrl } from '../data/resortConfig';
import { Send, CheckCircle2, AlertCircle, MessageCircle, RefreshCw, Calendar, Users, Phone, User, Sparkles, ShieldCheck } from 'lucide-react';

interface LeadFormSectionProps {
  initialVisitType?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ initialVisitType }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    phone: '',
    visitType: initialVisitType || 'Day Outing',
    preferredDate: '',
    guestCount: 2,
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    enquiryId: string;
    message: string;
    backendConfigured: boolean;
  } | null>(null);
  const [lastSubmittedPayload, setLastSubmittedPayload] = useState<string>('');

  useEffect(() => {
    if (initialVisitType) {
      setFormData((prev) => ({ ...prev, visitType: initialVisitType }));
    }
  }, [initialVisitType]);

  const visitTypeOptions = [
    'Day Outing (Without Breakfast) - ₹850',
    'Day Outing (With Breakfast) - ₹1,000',
    'Silver Package (₹850 + 18% GST)',
    'Gold Package (₹999 + 18% GST)',
    'Diamond Package (₹1,500 + 18% GST)',
    'Camping Tent Stay - ₹1,800',
    'Dormitory Stay - ₹2,000',
    'Four-Sharing Cottage - ₹2,700',
    'Couple Cottage - ₹3,000 (Provisional)',
    '2-Sharing Room (CP / MAP / AP)',
    '4-Sharing Room (CP / MAP / AP)',
    '7-Sharing Room (CP / MAP / AP)',
    '10-Sharing Dormitory Suite (CP / MAP / AP)',
    'Corporate Events & Team Building',
    'Weddings, Sangeet & Receptions',
    'Birthday Parties & Family Celebrations',
    'Student Retreats & Educational Excursions',
    'Day Outings & Weekend Group Getaways',
    'Dining / Group Banquet Buffet',
    'Other / Custom Enquiry',
  ];

  // Minimum date today in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!cleanPhone || cleanPhone.length < 10 || !/^\d{10,13}$/.test(cleanPhone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.visitType) {
      newErrors.visitType = 'Please select a visit type.';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred visit date.';
    } else if (formData.preferredDate < todayStr) {
      newErrors.preferredDate = 'Visit date cannot be in the past.';
    }

    if (!formData.guestCount || formData.guestCount < 1) {
      newErrors.guestCount = 'Guest count must be at least 1 person.';
    } else if (formData.guestCount > 500) {
      newErrors.guestCount = 'For groups over 500, please call us directly.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Protection against accidental duplicate submission
    const currentPayload = JSON.stringify(formData);
    if (currentPayload === lastSubmittedPayload) {
      alert('This enquiry has already been submitted. Please check WhatsApp or submit with different details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitEnquiry(formData);
      setSubmissionResult(result);
      setLastSubmittedPayload(currentPayload);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission failed', err);
      setErrors({ message: 'Submission failed. Please reach us directly via WhatsApp or phone.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmissionResult(null);
    setFormData({
      fullName: '',
      phone: '',
      visitType: 'Day Outing',
      preferredDate: '',
      guestCount: 2,
      message: '',
    });
    setErrors({});
  };

  // Generate WhatsApp text from current form data
  const getFormWhatsAppUrl = () => {
    const text = `Hello Sams Eden Resorts!\nI would like to enquire with the following details:\n- Name: ${formData.fullName}\n- Phone: ${formData.phone}\n- Package / Visit Type: ${formData.visitType}\n- Preferred Date: ${formData.preferredDate}\n- Number of Guests: ${formData.guestCount}${formData.message ? `\n- Note: ${formData.message}` : ''}`;
    return `https://wa.me/${resortConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="enquiry" className="py-16 sm:py-24 bg-forest-900 text-white relative overflow-hidden">
      {/* Background Decor - constrained strictly within container */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-forest-800/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-light bg-forest-950/60 px-3.5 py-1.5 rounded-full border border-gold/30">
            Booking Enquiries & Rates
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-cream-50 mt-4 tracking-tight">
            Plan Your Resort Experience
          </h2>
          <p className="text-cream-200 text-xs sm:text-sm mt-3 leading-relaxed">
            Fill in your preferred dates and guest count. Our reservations team will confirm availability and share current package rates with you.
          </p>
        </div>

        {/* Success Card State */}
        {isSuccess && submissionResult ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 text-stone-900 shadow-2xl animate-fade-in border-4 border-gold/40 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Enquiry Received
            </span>

            <h3 className="font-serif text-xl sm:text-3xl font-bold text-forest-950 mt-3 mb-2">
              Thank You, {formData.fullName}!
            </h3>

            <p className="text-stone-700 text-xs sm:text-sm mb-6 max-w-md mx-auto">
              {submissionResult.message}
            </p>

            {/* Summary Box */}
            <div className="bg-cream-100 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-stone-700 space-y-2 mb-6 sm:mb-8 border border-stone-200">
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-600">Reference ID:</span>
                <span className="font-mono font-bold text-forest-900">{submissionResult.enquiryId}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-600">Selected Experience:</span>
                <span className="font-semibold text-forest-950">{formData.visitType}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/60 pb-2">
                <span className="text-stone-600">Preferred Date:</span>
                <span className="font-semibold">{formData.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Guest Count:</span>
                <span className="font-semibold">{formData.guestCount} Guests</span>
              </div>
            </div>

            {/* Direct Confirmation Notice & Backend State */}
            <div className="mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 text-xs text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Submission Status
                </span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                  submissionResult.backendConfigured
                    ? 'bg-emerald-200 text-emerald-900'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {submissionResult.backendConfigured ? 'Backend Synced' : 'Local Storage Mode • Webhook Pending'}
                </span>
              </div>
              <p className="leading-relaxed">
                {submissionResult.backendConfigured
                  ? 'Your booking enquiry has been pushed to the resort reservation CRM.'
                  : 'Your enquiry is securely stored in your browser session. Since no remote webhook endpoint is configured, click below to transmit your prefilled enquiry directly to the verified WhatsApp booking desk (+91 98443 92439).'}
              </p>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={getFormWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-6 rounded-xl sm:rounded-2xl shadow-lg transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send via WhatsApp for Instant Reply</span>
              </a>

              <button
                onClick={handleReset}
                className="min-h-[48px] flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-3.5 px-6 rounded-xl sm:rounded-2xl transition-all active:scale-98"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form */
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 text-stone-800 shadow-2xl border border-gold/20">
            <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 text-xs text-stone-600 gap-2">
                <span>Fields marked with <span className="text-rose-600 font-bold">*</span> are required</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Direct Resort Desk
                  </span>
                  <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200 font-mono">
                    Local Cache • WhatsApp Direct
                  </span>
                </div>
              </div>

              {/* Grid 1: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-rose-500 focus:ring-rose-200 bg-rose-50/50'
                          : 'border-stone-300 focus:border-forest-700 focus:ring-forest-200'
                      }`}
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="e.g. 98443 92439"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-200 bg-rose-50/50'
                          : 'border-stone-300 focus:border-forest-700 focus:ring-forest-200'
                      }`}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Grid 2: Visit Type, Preferred Date, Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {/* Visit Type */}
                <div>
                  <label htmlFor="visitType" className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Visit Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="visitType"
                    name="visitType"
                    value={formData.visitType}
                    onChange={(e) => {
                      setFormData({ ...formData, visitType: e.target.value });
                      if (errors.visitType) setErrors({ ...errors, visitType: undefined });
                    }}
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-200 text-base sm:text-sm bg-white transition-all"
                  >
                    {visitTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Visit Date */}
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Preferred Date <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="preferredDate"
                      name="preferredDate"
                      type="date"
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => {
                        setFormData({ ...formData, preferredDate: e.target.value });
                        if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.preferredDate
                          ? 'border-rose-500 focus:ring-rose-200 bg-rose-50/50'
                          : 'border-stone-300 focus:border-forest-700 focus:ring-forest-200'
                      }`}
                      aria-required="true"
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.preferredDate}</span>
                    </p>
                  )}
                </div>

                {/* Number of Guests */}
                <div>
                  <label htmlFor="guestCount" className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Number of Guests <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="guestCount"
                      name="guestCount"
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min={1}
                      max={500}
                      value={formData.guestCount}
                      onChange={(e) => {
                        setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 });
                        if (errors.guestCount) setErrors({ ...errors, guestCount: undefined });
                      }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base sm:text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.guestCount
                          ? 'border-rose-500 focus:ring-rose-200 bg-rose-50/50'
                          : 'border-stone-300 focus:border-forest-700 focus:ring-forest-200'
                      }`}
                      aria-required="true"
                    />
                  </div>
                  {errors.guestCount && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{errors.guestCount}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Optional Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Special Requests or Questions <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  maxLength={500}
                  placeholder="Tell us if you have dietary preferences, require corporate stage audio setup, or need extra beds..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-200 text-base sm:text-sm transition-all resize-none"
                />
              </div>

              {/* Submit Buttons and Action Rows */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-xs text-stone-500 text-center sm:text-left">
                  <p>Your details are used solely to respond to this booking enquiry.</p>
                </div>

                <div className="flex flex-col xs:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <a
                    href={getFormWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                    title="Send via WhatsApp directly"
                  >
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Quick WhatsApp</span>
                  </a>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-7 rounded-xl sm:rounded-2xl bg-forest-900 hover:bg-forest-800 text-white font-semibold text-xs sm:text-sm shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>Submit Booking Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
