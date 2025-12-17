import React, { useState, useCallback } from 'react';
import { EnhancementMode } from './types';
import { enhanceText } from './services/geminiService';
import { Button } from './components/Button';
import { ManualPromptsModal } from './components/ManualPromptsModal';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<EnhancementMode>(EnhancementMode.ACADEMIC);
  const [showPromptsModal, setShowPromptsModal] = useState<boolean>(false);
  const [wordCount, setWordCount] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setWordCount(text.trim() === '' ? 0 : text.trim().split(/\s+/).length);
  };

  const handleEnhance = useCallback(async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setOutputText(''); // Clear previous output to show loading state better
    
    try {
      const result = await enhanceText(inputText, mode);
      setOutputText(result);
    } catch (error) {
      console.error(error);
      setOutputText("An error occurred while communicating with the AI. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [inputText, mode]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-academic-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">
                E
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-slate-900 tracking-tight">Editive</h1>
                <p className="text-xs text-slate-500 -mt-1">Academic AI Editor</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowPromptsModal(true)}
                className="text-sm text-slate-600 hover:text-academic-600 font-medium transition-colors hidden sm:block"
              >
                Manual Prompts
              </button>
              <a 
                href="https://github.com/google-gemini/generative-ai-js" 
                target="_blank" 
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-600"
              >
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6 h-[calc(100vh-4rem)]">
        
        {/* Left: Input */}
        <div className="flex-1 flex flex-col h-full min-h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Original Text</h2>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded">
              {wordCount} words
            </span>
          </div>
          <div className="relative flex-grow group">
            <textarea
              className="w-full h-full p-6 rounded-xl border border-slate-300 focus:ring-2 focus:ring-academic-500 focus:border-academic-500 resize-none font-serif text-lg leading-relaxed text-slate-700 bg-white shadow-sm transition-all"
              placeholder="Paste your abstract, essay, or email here..."
              value={inputText}
              onChange={handleInputChange}
            />
            {inputText && (
               <button
                onClick={() => setInputText('')}
                className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 p-1 rounded-full hover:bg-slate-100 transition-colors"
                title="Clear text"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            )}
          </div>
        </div>

        {/* Center: Controls (Mobile: stacked, Desktop: thin column) */}
        <div className="md:w-64 flex flex-col gap-6 justify-center shrink-0">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Enhancement Mode
              </label>
              <div className="space-y-3">
                {(Object.keys(EnhancementMode) as Array<keyof typeof EnhancementMode>).map((key) => (
                  <label 
                    key={key} 
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      mode === EnhancementMode[key] 
                        ? 'bg-academic-50 border-academic-500 ring-1 ring-academic-500' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={EnhancementMode[key]}
                      checked={mode === EnhancementMode[key]}
                      onChange={() => setMode(EnhancementMode[key])}
                      className="h-4 w-4 text-academic-600 focus:ring-academic-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <span className={`block text-sm font-medium ${mode === EnhancementMode[key] ? 'text-academic-900' : 'text-slate-700'}`}>
                        {key.charAt(0) + key.slice(1).toLowerCase()}
                      </span>
                      <span className="block text-xs text-slate-400 mt-0.5">
                        {key === 'ACADEMIC' ? 'Formal & scholarly' : key === 'GRAMMAR' ? 'Fix errors only' : 'Improve flow'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleEnhance} 
              isLoading={loading} 
              disabled={!inputText.trim()}
              className="w-full h-12 text-base shadow-lg shadow-academic-500/20"
            >
              Enhance Text
            </Button>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
             <h4 className="text-sm font-medium text-indigo-900 mb-2">Pro Tip</h4>
             <p className="text-xs text-indigo-700 mb-3">
               You can also run these prompts manually in Google AI Studio or Claude without an API key here.
             </p>
             <Button variant="ghost" onClick={() => setShowPromptsModal(true)} className="w-full text-xs bg-white text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:bg-indigo-50">
               View Manual Prompts
             </Button>
          </div>
        </div>

        {/* Right: Output */}
        <div className="flex-1 flex flex-col h-full min-h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Enhanced Result</h2>
            {outputText && (
               <button 
               onClick={() => copyToClipboard(outputText)}
               className="text-xs flex items-center gap-1 font-medium text-academic-600 hover:text-academic-800 transition-colors"
             >
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
               </svg>
               Copy
             </button>
            )}
          </div>
          <div className="relative flex-grow">
            {loading ? (
              <div className="w-full h-full p-8 rounded-xl border border-slate-200 bg-slate-50 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-4/6"></div>
              </div>
            ) : (
              <textarea
                readOnly
                className={`w-full h-full p-6 rounded-xl border transition-all resize-none font-serif text-lg leading-relaxed ${
                    outputText 
                    ? 'border-academic-200 bg-academic-50/30 text-slate-800 focus:ring-2 focus:ring-academic-500' 
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
                placeholder="The enhanced text will appear here..."
                value={outputText}
              />
            )}
            
            {outputText && !loading && (
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  AI Generated
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      <ManualPromptsModal 
        isOpen={showPromptsModal} 
        onClose={() => setShowPromptsModal(false)} 
      />
    </div>
  );
};

export default App;