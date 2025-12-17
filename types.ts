export enum EnhancementMode {
  GRAMMAR = 'GRAMMAR',
  ACADEMIC = 'ACADEMIC',
  CLARITY = 'CLARITY'
}

export interface PromptTemplate {
  title: string;
  role: string;
  instruction: string;
  settings: {
    temperature: number;
    topK: number;
    topP: number;
  };
}

export interface EnhancementResponse {
  originalText: string;
  enhancedText: string;
  mode: EnhancementMode;
  timestamp: number;
}