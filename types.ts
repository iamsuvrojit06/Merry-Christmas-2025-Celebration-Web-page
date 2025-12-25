
export interface GiftSuggestion {
  name: string;
  description: string;
  reason: string;
}

export interface ChristmasWish {
  message: string;
  author: string;
}

export interface ChatMessage {
  role: 'user' | 'santa';
  text: string;
  timestamp: Date;
}
