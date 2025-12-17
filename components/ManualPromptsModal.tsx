import React from 'react';
import { PromptCard } from './PromptCard';
import { PROMPTS } from '../constants';
import { EnhancementMode } from '../types';

interface ManualPromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualPromptsModal: React.FC<ManualPromptsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-slate-50 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-slate-200">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl leading-6 font-bold text-slate-900" id="modal-title">
                  Manual Prompts Library
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Prefer to use Google AI Studio or Claude directly? Copy these optimized prompts.
                </p>
              </div>
              <button 
                onClick={onClose}
                className="mt-3 sm:mt-0 bg-white rounded-md text-slate-400 hover:text-slate-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-4 py-5 sm:p-6 grid grid-cols-1 gap-6 bg-slate-50">
            {Object.entries(PROMPTS).map(([mode, template]) => (
              <PromptCard 
                key={mode} 
                modeName={mode} 
                template={template} 
              />
            ))}
          </div>

          <div className="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-slate-200">
            <a 
              href="https://aistudio.google.com/app/prompts/new_chat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-academic-600 text-base font-medium text-white hover:bg-academic-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-academic-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Open Google AI Studio &rarr;
            </a>
            <button 
              type="button" 
              className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-academic-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};