import { EnhancementMode, PromptTemplate } from './types';

export const PROMPTS: Record<EnhancementMode, PromptTemplate> = {
  [EnhancementMode.GRAMMAR]: {
    title: "Grammar Fix",
    role: "You are a meticulous editor.",
    instruction: "Fix all grammar, spelling, and punctuation errors in the following text while preserving the original meaning and style. Only fix errors, do not rewrite unnecessarily. Return ONLY the corrected text without any explanations or preamble.",
    settings: {
      temperature: 0.3,
      topK: 40,
      topP: 0.95
    }
  },
  [EnhancementMode.ACADEMIC]: {
    title: "Academic Tone Enhancement",
    role: "You are an academic writing expert.",
    instruction: "Enhance the following text to have a more formal, academic tone suitable for a thesis. Improve scholarly vocabulary, sentence structure, and overall academic quality while maintaining the original arguments and content. Return ONLY the enhanced text without any explanations or preamble.",
    settings: {
      temperature: 0.4,
      topK: 40,
      topP: 0.95
    }
  },
  [EnhancementMode.CLARITY]: {
    title: "Clarity Boost",
    role: "You are a clarity expert.",
    instruction: "Improve the following text for better readability and structure. Make sentences clearer, improve flow, fix awkward phrasing, and ensure logical organization. Maintain the original meaning and key points. Return ONLY the improved text without any explanations or preamble.",
    settings: {
      temperature: 0.4,
      topK: 40,
      topP: 0.95
    }
  }
};