import React, { useState } from 'react';
import { PromptTemplate } from '../types';

interface PromptCardProps {
  modeName: string;
  template: PromptTemplate;
}

export const PromptCard: React.FC<PromptCardProps> = ({ modeName, template }) => {
  const [copied, setCopied] = useState(false);

  const fullPromptText = `${template.role} ${template.instruction}\n\nText to fix:\n[PASTE YOUR TEXT HERE]\n\nReturn ONLY the corrected text without any explanations or preamble.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{template.title}</h3>
          <p className="text-sm text-slate-500 mt-1">Best for: {modeName.toLowerCase().replace('_', ' ')}</p>
        </div>
        <button
          onClick={handleCopy}
          className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
            copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {copied ? 'Copied!' : 'Copy Prompt'}
        </button>
      </div>
      
      <div className="bg-slate-50 rounded-md p-4 font-mono text-xs text-slate-700 overflow-x-auto border border-slate-200">
        <pre className="whitespace-pre-wrap">{fullPromptText}</pre>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
          Temp: {template.settings.temperature}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-50 text-purple-700">
          Top-K: {template.settings.topK}
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
          Top-P: {template.settings.topP}
        </span>
      </div>
    </div>
  );
};