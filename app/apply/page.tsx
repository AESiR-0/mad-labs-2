"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import gsap from "gsap";

import FAQAccordion from '@/components/FAQs';
import Link from "next/link";

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
      <Link
        href="/"
        className="mt-8 px-8 py-4 bg-[#bf0414] text-white font-medium rounded-none hover:bg-[#950505] transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 for role selection
  const [role, setRole] = useState<'kid' | 'parent' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const [formData, setFormData] = useState({
    // Kid's Information
    name: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    curious: '',

    // Parent's Information
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentCity: '',
    kidName: '',
    kidAge: '',
    parentCurious: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleSelect = (selectedRole: 'kid' | 'parent') => {
    setRole(selectedRole);
    setCurrentStep(1);
  };

  const handleNext = async () => {
    if (currentStep === 0) return; // Role selection handled separately

    if (role === 'kid') {
      if (currentStep === 1 && !formData.name) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter your name'
        });
        return;
      }
      if (currentStep === 2 && (!formData.email || !formData.phone)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please provide both email and phone'
        });
        return;
      }
      if (currentStep === 3 && !formData.age) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter your age'
        });
        return;
      }
      if (currentStep === 4 && !formData.city) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter your city'
        });
        return;
      }
      if (currentStep === 5 && !formData.curious) {
        setSubmitStatus({
          type: 'error',
          message: 'Please tell us what you\'re curious about'
        });
        return;
      }
      if (currentStep === 5) {
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
          const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              kidData: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                age: formData.age,
                city: formData.city,
                curious: formData.curious
              }
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
        return;
      }
    } else if (role === 'parent') {
      if (currentStep === 1 && !formData.parentName) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter your name'
        });
        return;
      }
      if (currentStep === 2 && (!formData.parentEmail || !formData.parentPhone)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please provide both email and phone'
        });
        return;
      }
      if (currentStep === 3 && !formData.parentCity) {
        setSubmitStatus({
          type: 'error',
          message: 'Please enter your city'
        });
        return;
      }
      if (currentStep === 4 && (!formData.kidName || !formData.kidAge)) {
        setSubmitStatus({
          type: 'error',
          message: 'Please provide your kid\'s name and age'
        });
        return;
      }
      if (currentStep === 5 && !formData.parentCurious) {
        setSubmitStatus({
          type: 'error',
          message: 'Please tell us what you think your child is curious about'
        });
        return;
      }
      if (currentStep === 5) {
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
          const response = await fetch('/api/submit-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              parentData: {
                parentName: formData.parentName,
                parentEmail: formData.parentEmail,
                parentPhone: formData.parentPhone,
                parentCity: formData.parentCity,
                kidName: formData.kidName,
                kidAge: formData.kidAge,
                parentCurious: formData.parentCurious
              }
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
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setRole(null);
    } else {
      setCurrentStep(prev => prev - 1);
    }
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
        src="https://res.cloudinary.com/dyk0ckibz/video/upload/v1749464099/i12swylpftmpbqaiy3os.webm"
      />
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-10 pointer-events-none" />
      <div className="w-full max-w-2xl bg-white/10 border border-white/10 rounded-2xl p-12 shadow-2xl relative z-20 backdrop-blur-md bg-clip-padding transition-all duration-500 hover:shadow-3xl flex flex-col gap-8">
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>

        {currentStep === 6 ? (
          <ThankYouScreen />
        ) : currentStep === 0 ? (
          // Role Selection Screen
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-3xl font-black text-white tracking-tight">I'm a</h2>
            <div className="flex gap-6">
              <button
                onClick={() => handleRoleSelect('kid')}
                className="px-8 py-4 bg-[#bf0414] text-white font-medium rounded-lg hover:bg-[#950505] transition-colors"
              >
                Kid
              </button>
              <button
                onClick={() => handleRoleSelect('parent')}
                className="px-8 py-4 bg-[#bf0414] text-white font-medium rounded-lg hover:bg-[#950505] transition-colors"
              >
                Parent
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="w-full mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-sm">Step {currentStep} of {role === 'kid' ? 5 : 5}</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-[#bf0414] rounded-full transition-all duration-500" 
                  style={{ width: `${(currentStep / 5) * 100}%` }} 
                />
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
                {role === 'kid' && (
                  <>
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">What's your name?</h3>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">How do we contact you?</h3>
                        <div className="space-y-4">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                            placeholder="Your email"
                            required
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                            placeholder="Your phone number"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">How old are you?</h3>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                          placeholder="Enter your age"
                          required
                        />
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Where do you live?</h3>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">What are you most curious about?</h3>
                        <textarea
                          name="curious"
                          value={formData.curious}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                          placeholder="Tell us what you're curious about..."
                          required
                        />
                      </div>
                    )}
                  </>
                )}

                {role === 'parent' && (
                  <>
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Your name</h3>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Your contact</h3>
                        <div className="space-y-4">
                          <input
                            type="email"
                            name="parentEmail"
                            value={formData.parentEmail}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                            placeholder="Your email"
                            required
                          />
                          <input
                            type="tel"
                            name="parentPhone"
                            value={formData.parentPhone}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                            placeholder="Your phone number"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Your city</h3>
                        <input
                          type="text"
                          name="parentCity"
                          value={formData.parentCity}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                          placeholder="Enter your city"
                          required
                        />
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Your kid's name & age</h3>
                        <div className="space-y-4">
                          <input
                            type="text"
                            name="kidName"
                            value={formData.kidName}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                            placeholder="Kid's name"
                            required
                          />
                          <input
                            type="number"
                            name="kidAge"
                            value={formData.kidAge}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                            placeholder="Kid's age"
                            required
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 5 && (
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">What do you think your child is deeply curious about?</h3>
                        <textarea
                          name="parentCurious"
                          value={formData.parentCurious}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-[#bf0414] transition-colors"
                          placeholder="Tell us what you think your child is curious about..."
                          required
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`p-4 rounded-full transition-all duration-300 ${
                      currentStep === 0 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 19l-7-7 7-7" 
                      />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div
                        key={step}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentStep === step 
                            ? 'bg-[#bf0414] w-4' 
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className={`p-4 rounded-full transition-all duration-300 ${
                      isSubmitting 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {currentStep !== 6 && currentStep !== 0 && <FAQAccordion />}
    </main>
  );
}

// Add fade-in animation for error messages
// (Tailwind: animate-fade-in)
// Add this to your global CSS if not present:
// @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fade-in 0.3s ease; } 