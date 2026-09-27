import { useState } from 'react';
import { useGitHubData } from './hooks/useGitHubData';
import { CASE_STUDIES } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { ServicesSection } from './components/ServicesSection';
import { TechnicalSkills } from './components/TechnicalSkills';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ArchitectureVisualizer } from './components/ArchitectureVisualizer';
import { AiCreativeStudio } from './components/AiCreativeStudio';
import { GitHubActivity } from './components/GitHubActivity';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CvModal } from './components/CvModal';
import { AllProjectsModal } from './components/AllProjectsModal';
import { GeminiChatbotModal } from './components/GeminiChatbotModal';
import { GeminiLiveVoiceModal } from './components/GeminiLiveVoiceModal';
import { VeoVideoStudioModal } from './components/VeoVideoStudioModal';
import { EngineeringDashboard } from './components/EngineeringDashboard';
import { Sparkles, Bot, Mic } from 'lucide-react';

export default function App() {
  const {
    profile,
    repositories,
    isLoading,
    isLive,
    totalStars,
    totalForks,
    languageStats
  } = useGitHubData();

  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [isAllProjectsModalOpen, setIsAllProjectsModalOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isLiveVoiceOpen, setIsLiveVoiceOpen] = useState<boolean>(false);
  const [isVeoStudioOpen, setIsVeoStudioOpen] = useState<boolean>(false);
  const [isEngineeringDashboardOpen, setIsEngineeringDashboardOpen] = useState<boolean>(false);

  const selectedCaseStudy = selectedCaseStudyId
    ? CASE_STUDIES.find((cs) => cs.id === selectedCaseStudyId) || null
    : null;

  const scrollToSection = (sectionId: string) => {
    setIsTerminalOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fc] text-slate-800 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900 relative">
      
      {/* Soft continuous ambient gradient mesh matching reference image */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/40 via-purple-100/30 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/30 via-indigo-50/20 to-transparent blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-10 w-[550px] h-[550px] bg-gradient-to-tl from-purple-100/30 via-indigo-100/20 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Floating Pill Navigation matching reference image */}
      <Navbar
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)}
        onOpenAiChat={() => setIsChatbotOpen(true)}
      />

      <main className="flex-grow relative z-10">
        {/* 1. Hero Section matching reference image */}
        <Hero
          profile={profile}
          totalStars={totalStars}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenAiChat={() => setIsChatbotOpen(true)}
        />

        {/* 2. About Me Section matching reference image */}
        <AboutMe
          profile={profile}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* 3. Services I Offer matching reference image */}
        <ServicesSection
          onOpenCaseStudy={(id) => setSelectedCaseStudyId(id)}
        />

        {/* 4. Technologies I Use (Tools & Skills) matching reference image */}
        <TechnicalSkills />

        {/* 5. Selected Work (Featured Projects) matching reference image */}
        <FeaturedProjects
          repositories={repositories}
          onOpenCaseStudy={(id) => setSelectedCaseStudyId(id)}
          onOpenAllProjectsModal={() => setIsAllProjectsModalOpen(true)}
        />

        {/* 6. Engineering Process I Follow matching reference image */}
        <ArchitectureVisualizer />

        {/* 7. AI Creative Studio Showreel & Veo Video Generation */}
        <AiCreativeStudio
          onOpenVeoStudio={() => setIsVeoStudioOpen(true)}
        />

        {/* 8. Live GitHub Activity & Statistics */}
        <GitHubActivity
          profile={profile}
          repositories={repositories}
          totalStars={totalStars}
          totalForks={totalForks}
          languageStats={languageStats}
          isLive={isLive}
          onOpenEngineeringDashboard={() => setIsEngineeringDashboardOpen(true)}
        />

        {/* 9. What Clients Say (Testimonials) matching reference image */}
        <TestimonialsSection />

        {/* 10. Let's Connect (Contact Form) matching reference image */}
        <ContactSection />
      </main>

      {/* Footer matching reference image */}
      <Footer
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Floating AI Assistant Launcher Pill */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setIsLiveVoiceOpen(true)}
          className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full glass-card hover:bg-white text-indigo-600 shadow-lg border border-white hover:scale-105 transition-all cursor-pointer"
          title="Start real-time voice call with Gemini Live"
          aria-label="Start Live Voice Call"
        >
          <Mic className="w-5 h-5 animate-pulse" />
        </button>

        <button
          onClick={() => setIsChatbotOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-xl shadow-indigo-600/25 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer border border-white/20"
          aria-label="Ask Oladepo's AI Technical Assistant"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-none tracking-tight flex items-center gap-1.5">
              <span>Ask AI Architect</span>
              <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono uppercase">Gemini</span>
            </div>
            <div className="text-[10px] text-indigo-100 font-medium leading-none mt-1">
              Chat or talk live
            </div>
          </div>
        </button>
      </div>

      {/* Modals & Dialogs */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudyId(null)}
      />

      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenCvModal={() => {
          setIsTerminalOpen(false);
          setIsCvModalOpen(true);
        }}
        onScrollToSection={scrollToSection}
      />

      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

      <AllProjectsModal
        isOpen={isAllProjectsModalOpen}
        onClose={() => setIsAllProjectsModalOpen(false)}
        repositories={repositories}
        onOpenCaseStudy={(id) => {
          setIsAllProjectsModalOpen(false);
          setSelectedCaseStudyId(id);
        }}
      />

      <GeminiChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onOpenLiveVoice={() => setIsLiveVoiceOpen(true)}
      />

      <GeminiLiveVoiceModal
        isOpen={isLiveVoiceOpen}
        onClose={() => setIsLiveVoiceOpen(false)}
      />

      <VeoVideoStudioModal
        isOpen={isVeoStudioOpen}
        onClose={() => setIsVeoStudioOpen(false)}
      />

      <EngineeringDashboard
        isOpen={isEngineeringDashboardOpen}
        onClose={() => setIsEngineeringDashboardOpen(false)}
        profile={profile}
        totalStars={totalStars}
        totalForks={totalForks}
        languageStats={languageStats}
      />

    </div>
  );
}
