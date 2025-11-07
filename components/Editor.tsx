import React, { useState, useEffect, useRef } from 'react';
import type { Note } from '../types';
import { useLanguage } from '../lib/i18n';

interface EditorProps {
  activeNote: Note | null;
  onUpdateNote: (note: Partial<Note> & { id: string }) => void;
}

const Editor: React.FC<EditorProps> = ({ activeNote, onUpdateNote }) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  // Debounce logic
  useEffect(() => {
    if (!activeNote) return;

    const handler = setTimeout(() => {
      onUpdateNote({ id: activeNote.id, title, content });
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [title, content, activeNote?.id]);


  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [activeNote]);

  useEffect(() => {
    if (contentRef.current) {
        contentRef.current.style.height = 'auto';
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  if (!activeNote) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-400 font-serif">{t('noNoteSelected')}</h2>
        <p className="mt-2">{t('createNewNotePrompt')}</p>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'full',
      timeStyle: 'long',
    }).format(new Date(timestamp));
  }

  return (
    <div className="flex flex-col h-full bg-gray-900">
        <div className="p-4 border-b border-gray-800 flex-shrink-0 text-center">
             <span className="text-xs text-gray-500">{t('lastModified')}: {formatDate(activeNote.lastModified)}</span>
        </div>
      <div className="p-8 md:p-12 lg:p-16 overflow-y-auto flex-grow">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder={t('untitledNote')}
          className="w-full text-4xl font-bold bg-transparent outline-none mb-6 text-white placeholder-gray-600 font-serif"
        />
        <textarea
          ref={contentRef}
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing..."
          className="w-full text-lg bg-transparent outline-none resize-none leading-relaxed text-gray-300 placeholder-gray-600 font-sans"
          rows={1}
        />
      </div>
    </div>
  );
};

export default Editor;