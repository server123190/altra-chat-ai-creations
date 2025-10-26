# AltraChat - AI Assistant

**Created by Mr. Masum Ahmed**  
**Powered by AltraCloud**

AltraChat is a powerful AI assistant application with three core capabilities:
- 💬 **AI Chat** - Intelligent conversations powered by advanced AI
- 🎨 **Image Generation** - Create stunning visuals from text descriptions
- 💻 **Code Assistant** - Expert help with programming tasks

## Features

- **Google Authentication** - Secure sign-in with Google accounts via Firebase
- **Real-time AI Chat** - Stream responses from advanced AI models
- **Image Generation** - Generate high-quality images using AI
- **Code Assistance** - Get expert help with coding questions
- **Beautiful UI** - Modern design with purple-blue gradients and smooth animations
- **Responsive Design** - Works perfectly on desktop and mobile devices

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Lovable Cloud (Supabase)
- **AI**: Lovable AI Gateway (Google Gemini models)
- **Authentication**: Firebase Google Auth
- **UI Components**: shadcn/ui

## Getting Started

1. **Sign in** with your Google account
2. **Choose a mode**:
   - Chat: Ask questions, get help, have conversations
   - Image: Describe images you want to create
   - Code: Get coding help and solutions
3. **Start chatting!**

## Development

This project is built with [Lovable](https://lovable.dev) and uses:
- Lovable Cloud for backend infrastructure
- Lovable AI for AI capabilities (no API keys needed!)
- Firebase for Google authentication

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # App header with user info
│   ├── LandingPage.tsx     # Welcome page with branding
│   ├── ChatInterface.tsx   # Main chat UI
│   └── ui/                 # shadcn UI components
├── lib/
│   └── firebase.ts         # Firebase configuration
└── pages/
    └── Index.tsx           # Main app page

supabase/
└── functions/
    └── chat-ai/           # Edge function for AI processing
```

## AI Capabilities

AltraChat uses Lovable AI Gateway with:
- **google/gemini-2.5-flash** for chat and coding assistance
- **google/gemini-2.5-flash-image-preview** for image generation

## Design System

The app features a custom design system with:
- Deep purple to blue gradients
- Dark theme optimized for AI interfaces
- Smooth animations and transitions
- Glassmorphism effects
- Responsive layouts

## Credits

- **Creator**: Mr. Masum Ahmed
- **Company**: AltraCloud
- **Platform**: Lovable

---

Built with ❤️ using [Lovable](https://lovable.dev)
