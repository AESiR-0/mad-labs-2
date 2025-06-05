"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import gsap from "gsap";
import { handleKidForm, handleParentForm } from '@/lib/googleSheets';
import FAQAccordion from '@/components/FAQs';

const roleSchema = z.enum(["kid", "parent"]);
const kidInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age is required")
});
const kidContactSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone required"),
  city: z.string().min(1, "City is required")
});
const kidCuriousSchema = z.object({
  curious: z.string().min(1, "Required")
});

const parentInfoSchema = z.object({
  name: z.string().min(1, "Name is required")
});
const parentContactSchema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone required"),
  city: z.string().min(1, "City is required")
});
const parentKidSchema = z.object({
  kidName: z.string().min(1, "Required"),
  kidAge: z.string().min(1, "Required"),
  curious: z.string().min(1, "Required")
});

const stepsByRole = {
  kid: [
    { label: "What's your name?", key: "name" },
    { label: "How old are you?", key: "age" },
    { label: "How do we contact you?", key: "contact" },
    { label: "Where do you live?", key: "city" },
    { label: "What are you most curious about?", key: "curious" },
  ],
  parent: [
    { label: "Your name", key: "name" },
    { label: "Your contact", key: "contact" },
    { label: "Your city", key: "city" },
    { label: "Your kid's name & age", key: "kid" },
    { label: "What do you think your child is deeply curious about?", key: "curious" },
  ],
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
      <a 
        href="/"
        className="mt-8 px-8 py-4 bg-[#bf0414] text-white font-medium rounded-none hover:bg-[#950505] transition-colors"
      >
        Return Home
      </a>
    </div>
  );
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    // Kid's Information
    name: '',
    age: '',
    email: '',
    phone: '',
    city: '',
    interests: '',
    whyJoin: '',
    projectIdea: '',
    availability: '',
    additional: '',

    // Parent's Information
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    kidName: '',
    kidAge: '',
    parentCity: '',
    whyMadLabs: '',
    expectations: '',
    parentAvailability: '',
    parentAdditional: ''
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
      // Validate kid's form
      if (!formData.name || !formData.age || !formData.email || !formData.phone || !formData.city) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all required fields'
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate parent's form
      if (!formData.parentName || !formData.parentEmail || !formData.parentPhone) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fill in all required fields'
        });
        return;
      }

      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });

      try {
        // Submit kid's form
        await handleKidForm({
          name: formData.name,
          age: formData.age,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          interests: formData.interests,
          whyJoin: formData.whyJoin,
          projectIdea: formData.projectIdea,
          availability: formData.availability,
          additional: formData.additional
        });

        // Submit parent's form
        await handleParentForm({
          parentName: formData.parentName,
          parentEmail: formData.parentEmail,
          parentPhone: formData.parentPhone,
          kidName: formData.name, // Use kid's name from first form
          kidAge: formData.age, // Use kid's age from first form
          city: formData.parentCity,
          whyMadLabs: formData.whyMadLabs,
          expectations: formData.expectations,
          availability: formData.parentAvailability,
          additional: formData.parentAdditional
        });

        setSubmitStatus({
          type: 'success',
          message: 'Application submitted successfully! We\'ll be in touch soon.'
        });
        setCurrentStep(3); // Move to thank you screen
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#010101] px-4 py-12 relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/animated_video/starry_bg.mp4"
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 pointer-events-none" />
      <div className="w-full max-w-2xl bg-white/10 border border-white/10 rounded-2xl p-12 shadow-2xl relative z-20 backdrop-blur-md bg-clip-padding transition-all duration-500 hover:shadow-3xl flex flex-col gap-8">
        {currentStep === 3 ? (
          <ThankYouScreen />
        ) : (
          <>
            {/* Progress Bar */}
            <div className="w-full mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Step {currentStep} of 2</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-2 bg-[#bf0414] rounded-full transition-all duration-500" style={{ width: "100%" }} />
              </div>
            </div>
            <div>
              {submitStatus.type && (
                <div className={`mb-8 p-4 rounded-lg ${
                  submitStatus.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="space-y-12">
                {currentStep === 1 ? (
                  // Kid's Form
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">👤 Kid's Information</h3>
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
                        <label htmlFor="age" className="block text-sm font-medium text-white/80 mb-2">Age *</label>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
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
                        <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">Phone *</label>
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

                    <div>
                      <label htmlFor="interests" className="block text-sm font-medium text-white/80 mb-2">What are you interested in?</label>
                      <textarea
                        id="interests"
                        name="interests"
                        value={formData.interests}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="whyJoin" className="block text-sm font-medium text-white/80 mb-2">Why do you want to join Mad Labs?</label>
                      <textarea
                        id="whyJoin"
                        name="whyJoin"
                        value={formData.whyJoin}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectIdea" className="block text-sm font-medium text-white/80 mb-2">Do you have any project ideas in mind?</label>
                      <textarea
                        id="projectIdea"
                        name="projectIdea"
                        value={formData.projectIdea}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="availability" className="block text-sm font-medium text-white/80 mb-2">Are you available for the full 15 days?</label>
                      <textarea
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="additional" className="block text-sm font-medium text-white/80 mb-2">Anything else we should know?</label>
                      <textarea
                        id="additional"
                        name="additional"
                        value={formData.additional}
                        onChange={handleChange}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>
                  </div>
                ) : (
                  // Parent's Form
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">👨‍👩‍👧‍👦 Parent's Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="parentName" className="block text-sm font-medium text-white/80 mb-2">Parent's Name *</label>
                        <input
                          type="text"
                          id="parentName"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="parentEmail" className="block text-sm font-medium text-white/80 mb-2">Parent's Email *</label>
                        <input
                          type="email"
                          id="parentEmail"
                          name="parentEmail"
                          value={formData.parentEmail}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="parentPhone" className="block text-sm font-medium text-white/80 mb-2">Parent's Phone *</label>
                        <input
                          type="tel"
                          id="parentPhone"
                          name="parentPhone"
                          value={formData.parentPhone}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="parentCity" className="block text-sm font-medium text-white/80 mb-2">City</label>
                        <input
                          type="text"
                          id="parentCity"
                          name="parentCity"
                          value={formData.parentCity}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="whyMadLabs" className="block text-sm font-medium text-white/80 mb-2">Why do you want your child to join Mad Labs?</label>
                      <textarea
                        id="whyMadLabs"
                        name="whyMadLabs"
                        value={formData.whyMadLabs}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="expectations" className="block text-sm font-medium text-white/80 mb-2">What are your expectations from the program?</label>
                      <textarea
                        id="expectations"
                        name="expectations"
                        value={formData.expectations}
                        onChange={handleChange}
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="parentAvailability" className="block text-sm font-medium text-white/80 mb-2">Are you available for parent check-ins?</label>
                      <textarea
                        id="parentAvailability"
                        name="parentAvailability"
                        value={formData.parentAvailability}
                        onChange={handleChange}
                        rows={2}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#bf0414] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="parentAdditional" className="block text-sm font-medium text-white/80 mb-2">Anything else we should know?</label>
                      <textarea
                        id="parentAdditional"
                        name="parentAdditional"
                        value={formData.parentAdditional}
                        onChange={handleChange}
                        rows={2}
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
                    {isSubmitting ? 'Submitting...' : currentStep === 1 ? 'Next' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {currentStep !== 3 && <FAQAccordion />}
    </main>
  );
}

// Add fade-in animation for error messages
// (Tailwind: animate-fade-in)
// Add this to your global CSS if not present:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 0.3s ease; } 