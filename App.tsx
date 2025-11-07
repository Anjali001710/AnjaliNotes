import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Vision from './components/Vision';
import Footer from './components/Footer';
import NotesPage from './components/NotesPage';
import NotesSubjectPage from './components/NotesSubjectPage';
import PPTsPage from './components/PPTsPage';
import PPTsSubjectPage from './components/PPTsSubjectPage';
import ContactPage from './components/ContactPage';
import ProgramsPage from './components/ProgramsPage';
import ProgramsSubjectPage from './components/ProgramsSubjectPage';
import SubmissionsPage from './components/SubmissionsPage';
import { useLocalStorage } from './hooks/useLocalStorage';

export type Page = 'home' | 'notes' | 'notes_subject' | 'ppts' | 'ppts_subject' | 'programs' | 'programs_subject' | 'contact' | 'submissions';

export interface File {
  id: string;
  name: string;
  dataUrl: string; // To store the file content
}
export interface Subject {
  id: string;
  name: string;
}
export interface Submission {
  name: string;
  email: string;
  message: string;
  submittedAt: number;
}
export type ContentType = 'notes' | 'ppts' | 'programs';

interface View {
  page: Page;
  params?: {
    subjectId?: string;
  };
}

const initialSubjects = {
  notes: [
    { id: 'c', name: 'C Language' },
    { id: 'cpp', name: 'C++' },
    { id: 'dbms', name: 'Database Systems' },
    { id: 'python', name: 'Python' },
  ],
  ppts: [
    { id: 'se', name: 'Software Engineering' },
    { id: 'java', name: 'Java' },
  ],
  programs: [
    { id: 'c_prog', name: 'C Programs' },
    { id: 'cpp_prog', name: 'C++ Programs' },
    { id: 'java_prog', name: 'Java Programs' },
  ]
};

const initialFiles = {
  notes: {
    'c': [{ id: uuidv4(), name: 'C_Chapter1_Intro.pdf', dataUrl: '' }],
    'cpp': [{ id: uuidv4(), name: 'Cpp_Chapter1_OOP.pdf', dataUrl: '' }],
    'dbms': [{ id: uuidv4(), name: 'DBMS_Chapter1_Intro.pdf', dataUrl: '' }],
    'python': [{ id: uuidv4(), name: 'Python_Basics.pdf', dataUrl: '' }],
  },
  ppts: {
    'se': [{ id: uuidv4(), name: 'SE_Lecture_SDLC.ppt', dataUrl: '' }],
    'java': [{ id: uuidv4(), name: 'Java_Lecture1.ppt', dataUrl: '' }],
  },
  programs: {
    'c_prog': [{ id: uuidv4(), name: 'HelloWorld.c', dataUrl: '' }],
    'cpp_prog': [{ id: uuidv4(), name: 'HelloWorld.cpp', dataUrl: '' }],
    'java_prog': [{ id: uuidv4(), name: 'HelloWorld.java', dataUrl: '' }],
  }
};


function App() {
  const [currentView, setCurrentView] = useState<View>({ page: 'home' });
  const [isAdmin, setIsAdmin] = useState(true); // Always show admin view
  const [scrollToAnchor, setScrollToAnchor] = useState<string | null>(null);

  // State management for all content
  const [notesSubjects, setNotesSubjects] = useLocalStorage<Subject[]>('notesSubjects', initialSubjects.notes);
  const [pptsSubjects, setPptsSubjects] = useLocalStorage<Subject[]>('pptsSubjects', initialSubjects.ppts);
  const [programsSubjects, setProgramsSubjects] = useLocalStorage<Subject[]>('programsSubjects', initialSubjects.programs);

  const [notesFiles, setNotesFiles] = useLocalStorage<Record<string, File[]>>('notesFiles', initialFiles.notes);
  const [pptsFiles, setPptsFiles] = useLocalStorage<Record<string, File[]>>('pptsFiles', initialFiles.ppts);
  const [programsFiles, setProgramsFiles] = useLocalStorage<Record<string, File[]>>('programsFiles', initialFiles.programs);
  
  const [submissions, setSubmissions] = useLocalStorage<Submission[]>('submissions', []);

  const subjectStateMap = {
    notes: { subjects: notesSubjects, setSubjects: setNotesSubjects, files: notesFiles, setFiles: setNotesFiles },
    ppts: { subjects: pptsSubjects, setSubjects: setPptsSubjects, files: pptsFiles, setFiles: setPptsFiles },
    programs: { subjects: programsSubjects, setSubjects: setProgramsSubjects, files: programsFiles, setFiles: setProgramsFiles },
  };

  const addSubject = (type: ContentType, name: string) => {
    const { setSubjects } = subjectStateMap[type];
    const newSubject = { id: uuidv4(), name };
    setSubjects(prev => [...prev, newSubject]);
  };

  const deleteSubject = (type: ContentType, id: string) => {
    const { subjects, setSubjects, setFiles } = subjectStateMap[type];
    if (window.confirm(`Are you sure you want to delete the subject "${subjects.find(s => s.id === id)?.name}" and all its files?`)) {
      setSubjects(prev => prev.filter(s => s.id !== id));
      setFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[id];
        return newFiles;
      });
    }
  };
  
  const addFile = (type: ContentType, subjectId: string, name: string, dataUrl: string) => {
    const { setFiles } = subjectStateMap[type];
    const newFile = { id: uuidv4(), name, dataUrl };
    setFiles(prev => ({
      ...prev,
      [subjectId]: [...(prev[subjectId] || []), newFile],
    }));
  };
  
  const deleteFile = (type: ContentType, subjectId: string, fileId: string) => {
     const { setFiles } = subjectStateMap[type];
     setFiles(prev => ({
      ...prev,
      [subjectId]: prev[subjectId].filter(f => f.id !== fileId),
     }));
  };

  const addSubmission = (submission: Omit<Submission, 'submittedAt'>) => {
    const newSubmission = { ...submission, submittedAt: Date.now() };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const navigate = (page: Page, params = {}, anchor: string | null = null) => {
    setCurrentView({ page, params });
    setScrollToAnchor(anchor);
    if (!anchor) {
      window.scrollTo(0, 0);
    }
  };
  
  useEffect(() => {
    if (scrollToAnchor) {
      setTimeout(() => {
        const element = document.getElementById(scrollToAnchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setScrollToAnchor(null);
      }, 100);
    }
  }, [currentView.page, scrollToAnchor]);


  const getSubjectById = (type: ContentType, id: string): Subject | undefined => {
    return subjectStateMap[type].subjects.find(s => s.id === id);
  }

  const renderContent = () => {
    const subjectId = currentView.params?.subjectId || '';
    
    switch (currentView.page) {
      case 'notes':
        return <NotesPage navigate={navigate} subjects={notesSubjects} addSubject={(name) => addSubject('notes', name)} deleteSubject={(id) => deleteSubject('notes', id)} isAdmin={isAdmin} />;
      case 'notes_subject':
        return <NotesSubjectPage navigate={navigate} subject={getSubjectById('notes', subjectId)} files={notesFiles[subjectId] || []} addFile={(name, dataUrl) => addFile('notes', subjectId, name, dataUrl)} deleteFile={(fileId) => deleteFile('notes', subjectId, fileId)} isAdmin={isAdmin} />;
      case 'ppts':
        return <PPTsPage navigate={navigate} subjects={pptsSubjects} addSubject={(name) => addSubject('ppts', name)} deleteSubject={(id) => deleteSubject('ppts', id)} isAdmin={isAdmin} />;
      case 'ppts_subject':
        return <PPTsSubjectPage navigate={navigate} subject={getSubjectById('ppts', subjectId)} files={pptsFiles[subjectId] || []} addFile={(name, dataUrl) => addFile('ppts', subjectId, name, dataUrl)} deleteFile={(fileId) => deleteFile('ppts', subjectId, fileId)} isAdmin={isAdmin} />;
      case 'programs':
        return <ProgramsPage navigate={navigate} subjects={programsSubjects} addSubject={(name) => addSubject('programs', name)} deleteSubject={(id) => deleteSubject('programs', id)} isAdmin={isAdmin} />;
      case 'programs_subject':
        return <ProgramsSubjectPage navigate={navigate} subject={getSubjectById('programs', subjectId)} files={programsFiles[subjectId] || []} addFile={(name, dataUrl) => addFile('programs', subjectId, name, dataUrl)} deleteFile={(fileId) => deleteFile('programs', subjectId, fileId)} isAdmin={isAdmin} />;
      case 'contact':
        return <ContactPage addSubmission={addSubmission} />;
      case 'submissions':
        return isAdmin ? <SubmissionsPage submissions={submissions} navigate={navigate} /> : <p className="text-center py-20">Access Denied</p>;
      case 'home':
      default:
        return (
          <>
            <Hero navigate={navigate} />
            <Services navigate={navigate} />
            <About />
            <Vision />
          </>
        );
    }
  };

  return (
    <div className="antialiased flex flex-col min-h-screen">
      <Header navigate={navigate} isAdmin={isAdmin} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

export default App;