"use client";

import { useState } from "react";
import { handleMentorForm } from "@/lib/googleSheets";

export default function MentorForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    work: "",
    links: "",
    whyMentor: "",
    helpStyle: "",
    madFit: "",
    availability: "",
    additional: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await handleMentorForm(formData);
      setSubmitStatus({
        type: 'success',
        message: 'Application submitted successfully! We\'ll be in touch soon.'
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        work: "",
        links: "",
        whyMentor: "",
        helpStyle: "",
        madFit: "",
        availability: "",
        additional: ""
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="w-full bg-gradient-to-b to-[#111111] from-black py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-center mb-12 text-white">Apply to be a Mentor</h2>
        
        {submitStatus.type && (
          <div className={`mb-8 p-4 rounded-lg ${
            submitStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Basic Info Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">👤 Basic Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          {/* Your Work Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">🛠️ Your Work</h3>
            <div>
              <label htmlFor="work" className="block text-sm font-medium text-white/80 mb-2">What do you build or do best?</label>
              <textarea
                id="work"
                name="work"
                value={formData.work}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="links" className="block text-sm font-medium text-white/80 mb-2">Drop 1-2 links to work you're proud of (optional but helpful)</label>
              <textarea
                id="links"
                name="links"
                value={formData.links}
                onChange={handleChange}
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
              />
            </div>
          </div>

          {/* Mentorship Fit Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">🚀 Mentorship Fit</h3>
            <div>
              <label htmlFor="whyMentor" className="block text-sm font-medium text-white/80 mb-2">Why do you want to mentor at Mad Labs?</label>
              <textarea
                id="whyMentor"
                name="whyMentor"
                value={formData.whyMentor}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="helpStyle" className="block text-sm font-medium text-white/80 mb-2">How do you usually help someone when they're stuck?</label>
              <textarea
                id="helpStyle"
                name="helpStyle"
                value={formData.helpStyle}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                required
              />
            </div>
          </div>

          {/* Mad Fit Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">🧠 Mad Fit</h3>
            <div>
              <label htmlFor="madFit" className="block text-sm font-medium text-white/80 mb-2">If a 13-year-old told you they want to "start a business to save trees," what would you say?</label>
              <textarea
                id="madFit"
                name="madFit"
                value={formData.madFit}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                required
              />
            </div>
          </div>

          {/* Logistics Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6">⏳ Logistics</h3>
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-white/80 mb-2">
                Are you available for ~4 hours across the 15 days? (Mentor check-ins happen on Day 6 and Day 11. We'll plan around your schedule.)
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                required
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="maybe">Maybe</option>
              </select>
            </div>
            <div>
              <label htmlFor="additional" className="block text-sm font-medium text-white/80 mb-2">Anything else we should know?</label>
              <textarea
                id="additional"
                name="additional"
                value={formData.additional}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#bf0414] text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#950505]'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
} 