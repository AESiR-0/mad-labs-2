"use client";

import { useState } from "react";
import Link from "next/link";

export default function MentorForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate basic info
      if (!formData.name || !formData.email || !formData.phone || !formData.city) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all required fields'
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate work section
      if (!formData.work) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all required fields'
        });
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Validate mentorship fit
      if (!formData.whyMentor || !formData.helpStyle) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all required fields'
        });
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Validate mad fit
      if (!formData.madFit) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all required fields'
        });
        return;
      }
      setCurrentStep(5);
    } else if (currentStep === 5) {
      // Validate logistics
      if (!formData.availability) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all required fields'
        });
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });

      try {
        const response = await fetch('/api/submit-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mentorData: formData
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to submit application');
        }

        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We\'ll be in touch soon.'
        });
        setCurrentStep(6); // Move to thank you screen
      } catch (error) {
        setSubmitStatus({
          type: 'error',
          message: 'Failed to submit application. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  function ThankYouScreen() {
    return (
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="w-20 h-20 rounded-full bg-[#bf0414]/20 flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-[#bf0414]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Application Received!</h2>
        <p className="text-lg text-white/80 max-w-md">
          We're excited to review your application. You'll hear from us within 48 hours with next steps.
        </p>
        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">What's Next?</h3>
          <ul className="text-left space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <span className="text-[#bf0414] mt-1">1.</span>
              <span>We'll review your application and get back to you within 48 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#bf0414] mt-1">2.</span>
              <span>If selected, we'll schedule a quick chat to learn more about you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#bf0414] mt-1">3.</span>
              <span>Final selection and onboarding will happen in early June</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b to-[#111111] from-black py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Close Button */}
        <div className="absolute top-0 right-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        <h2 className="text-3xl font-black text-center mb-12 text-white">Apply to be a Mentor</h2>
        
        {submitStatus.type && (
          <div className={`mb-8 p-4 rounded-lg ${
            submitStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
          }`}>
            {submitStatus.message}
          </div>
        )}

        {currentStep === 6 ? (
          <ThankYouScreen />
        ) : (
          <div className="space-y-12">
            {/* Progress Bar */}
            <div className="w-full mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Step {currentStep} of 5</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-[#bf0414] rounded-full transition-all duration-500" 
                  style={{ width: `${(currentStep / 5) * 100}%` }} 
                />
              </div>
            </div>

            <form className="space-y-12">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">👤 Basic Info</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">Name *</label>
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
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">Email *</label>
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
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Phone Number *</label>
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
                      <label htmlFor="city" className="block text-sm font-medium text-white/80 mb-2">City *</label>
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
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">🛠️ Your Work</h3>
                  <div>
                    <label htmlFor="work" className="block text-sm font-medium text-white/80 mb-2">What do you build or do best? *</label>
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
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">🚀 Mentorship Fit</h3>
                  <div>
                    <label htmlFor="whyMentor" className="block text-sm font-medium text-white/80 mb-2">Why do you want to mentor at Mad Labs? *</label>
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
                    <label htmlFor="helpStyle" className="block text-sm font-medium text-white/80 mb-2">How do you usually help someone when they're stuck? *</label>
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
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">🧠 Mad Fit</h3>
                  <div>
                    <label htmlFor="madFit" className="block text-sm font-medium text-white/80 mb-2">If a 13-year-old told you they want to "start a business to save trees," what would you say? *</label>
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
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-6">⏳ Logistics</h3>
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-white/80 mb-2">
                      Are you available for ~4 hours across the 15 days? (Mentor check-ins happen on Day 6 and Day 11. We'll plan around your schedule.) *
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
              )}

              <div className="flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-white/5 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors duration-300"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`ml-auto bg-[#bf0414] text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#950505]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : currentStep === 5 ? 'Submit Application' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
} 