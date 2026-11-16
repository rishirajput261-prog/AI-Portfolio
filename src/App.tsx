import {useState} from 'react';
import {MotionConfig} from 'motion/react';
import {Navbar} from './components/Navbar';
import {Hero} from './components/Hero';
import {About} from './components/About';
import {Projects} from './components/Projects';
import {Skills} from './components/Skills';
import {Experience} from './components/Experience';
import {Achievements} from './components/Achievements';
import {Education} from './components/Education';
import {Contact} from './components/Contact';
import {Footer} from './components/Footer';
import {ResumeModal} from './components/ResumeModal';
import {ProjectItem} from './data/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080808] text-white">
        <Navbar onOpenResume={() => setResumeModalOpen(true)} />

        <main>
          <Hero
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenResume={() => setResumeModalOpen(true)}
          />
          <About />
          <Projects
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />
          <Skills />
          <Experience />
          <Achievements />
          <Education />
          <Contact />
        </main>

        <Footer />

        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
