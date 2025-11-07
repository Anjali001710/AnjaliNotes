import React, { useState, useMemo } from 'react';
import type { Note } from '../types';
import { useLanguage } from '../lib/i18n';
import { PlusIcon, TrashIcon } from './Icons';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNoteId: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ notes, activeNoteId, setActiveNoteId, onNewNote, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => b.lastModified - a.lastModified);
  }, [notes, searchTerm]);
  
  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(timestamp));
  }

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 border-r border-gray-800 bg-gray-900/50 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-2 py-2 text-sm bg-gray-800 border border-transparent rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition placeholder-gray-500 text-gray-200"
          />
        </div>
        <button
          onClick={onNewNote}
          className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-gray-900 bg-amber-400 rounded-lg hover:bg-amber-500 active:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          {t('newNote')}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {filteredNotes.length > 0 ? (
          <ul>
            {filteredNotes.map((note) => (
              <li
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`group relative cursor-pointer p-4 border-b border-gray-800 transition-colors ${
                  activeNoteId === note.id
                    ? 'bg-gray-800'
                    : 'hover:bg-gray-800/60'
                }`}
              >
                {activeNoteId === note.id && <div className="absolute left-0 top-0 h-full w-1 bg-amber-400 rounded-r-full"></div>}
                <div className="flex justify-between items-start">
                  <div className="flex-grow overflow-hidden">
                    <h3 className="font-semibold text-gray-100 truncate">{note.title || t('untitledNote')}</h3>
                    <p className="text-xs text-gray-400 mt-1 truncate">{note.content || '...'}</p>
                     <p className="text-xs text-gray-500 mt-2">{formatDate(note.lastModified)}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                    className="ml-2 p-1 text-gray-500 rounded-full hover:bg-red-900/50 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    aria-label="Delete note"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-500">
             <p>{t('createNewNotePrompt')}</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;