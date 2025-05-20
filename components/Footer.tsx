export default function Footer() {
  return (
    <footer className="py-5 text-center text-lg text-[#f2f2f2] bg-[#121212]">
      <div className="w-full border-t border-[#333] mt-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f2f2f2]">
                Been that <span className="text-[#bf0414]">kid</span>?
              </h3>

              <button className="bg-transparent border-2 border-[#bf0414] hover:bg-[#bf0414]/10 text-[#f2f2f2] font-semibold px-8 sm:px-10 py-4 sm:py-5 rounded-none transition-all duration-300 text-lg sm:text-xl group relative overflow-hidden">
                <span className="relative z-10">Apply to be a mentor</span>
                <div className="absolute inset-0 bg-[#bf0414] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="absolute inset-0 border-2 border-[#bf0414] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p>Built by builders. 🔧</p>
    </footer>
  );
} 