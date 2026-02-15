# Aurora (BBinary)
### The AI Wellness Assistant

Aurora is the proactive, vision-intelligent heart of the UnifierBBinary suite. Built with **React 19** and **Google Gemini**, it provides empathetic support while monitoring safety through edge-based computer vision.

## Core Features

- **Mood & Emotion Sensing**: Real-time classification of emotional states using ONNX Runtime.
- **Safety Heuristics**: Automated fall detection and hydration tracking using MediaPipe.
- **Contextual Memory**: Remembers past interactions to provide personalized support.
- **Glassmorphism UI**: A premium, high-contrast dashboard for easy status checking.

## 🚀 Independent Setup

If you wish to run Aurora separately:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Ensure `.env` in the root contains:
   ```env
   VITE_GOOGLE_API_KEY=your_key
   ```

3. **Development Server**:
   ```bash
   npm run dev
   ```

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript.
- **Vision**: Google MediaPipe Tasks.
- **AI**: Google Gemini (GenAI SDK).
- **Styling**: TailwindCSS 4.
- **Runtime**: Vite 7.
- **Memory System**: Stores and retrieves conversation history and environmental observations

### User Interface
- **Biometric Dashboard**: Real-time display of emotion, hydration status, safety metrics, and activity timeline
- **Minimalist Chat**: Clean messaging interface with emoji indicators
- **Glassmorphism Design**: Modern, premium UI with backdrop blur effects
- **Responsive Layout**: Optimized for desktop and tablet viewing

## Tech Stack

### Frontend Framework
- **React 19** - UI library with TypeScript
- **Vite 7** - Lightning-fast build tool and dev server
- **React Router 7** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework

### AI & Machine Learning
- **Google GenAI SDK** - Conversational AI (Gemini) and text embeddings
- **MediaPipe Tasks Vision** - Face landmarking, object detection, and pose estimation
  - FaceLandmarker - Facial feature detection (52 blendshapes)
  - ObjectDetector - EfficientDet Lite0 for real-time object detection
  - PoseLandmarker - Body pose tracking for fall detection
- **ONNX Runtime Web** - Client-side emotion classification model inference

### Browser APIs
- **Web Speech API**
  - SpeechRecognition - Voice input
  - SpeechSynthesis - Text-to-speech output
- **MediaDevices API** - Camera access for vision pipeline
- **LocalStorage API** - Persistent chat history

### UI Components & Icons
- **Lucide React** - Icon library (Activity, Heart, Brain, Shield, etc.)
- **Custom Hooks** - Modular React hooks for speech, vision, and state management

### Memory & Storage
- **VectorStore** (Custom Implementation) - In-memory vector embeddings for semantic search
- **LocalStorage** - Chat history persistence

## Prerequisites

- **Node.js** 18+ and npm
- **Google AI Studio API Key** - Required for Gemini chat and embeddings
- **Modern Browser** - Chrome, Edge, or Safari (for Web Speech API and MediaPipe support)
- **Webcam** - For vision-based features

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BBinary
   ```

2. **Install dependencies**
   ```bash
   cd apps/web-app
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in `apps/web-app/`:
   ```env
   VITE_GOOGLE_API_KEY=your_google_ai_studio_api_key
   VITE_MODEL_NAME=gemini-2.0-flash-exp  # or your preferred model
   ```

4. **Add required models**
   Place the following models in `apps/web-app/public/models/`:
   - `face_landmarker.task` - MediaPipe face detection
   - `pose_landmarker.task` - MediaPipe pose estimation
   - `efficientdet_lite0.tflite` - Object detection
   - `emotion_model_no_zipmap.onnx` - Emotion classification

## Usage

### Development
```bash
npm run dev
```
Navigate to `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## Project Structure

```
apps/web-app/
├── src/
│   ├── features/
│   │   ├── chat/           # Chat interface and logic
│   │   └── dashboard/      # Vision dashboard and activity timeline
│   ├── hooks/
│   │   ├── useVisionPipeline.ts    # Vision AI orchestration
│   │   ├── useSpeechRecognition.ts # Voice input
│   │   └── useSpeechSynthesis.ts   # Voice output
│   ├── lib/
│   │   ├── genai.ts        # Gemini API integration
│   │   └── memory.ts       # VectorStore for context retrieval
│   ├── App.tsx             # Main application layout
│   └── main.tsx            # Entry point
└── public/
    └── models/             # AI models (ONNX, MediaPipe, TFLite)
```

## Key Features Explained

### Hydration Detection
Aurora detects when you're drinking water by identifying cups, bottles, or glasses in the upper portion of the camera frame. This triggers a timeline event and is stored in memory for context-aware conversations.

### Fall Detection
Uses pose estimation to monitor torso position and velocity. If rapid downward movement or horizontal posture is detected, Aurora triggers a high-priority alert overlay.

### Emotion Recognition
Facial blendshapes (52 parameters) are extracted and fed into an ONNX emotion classification model. High-confidence emotions are logged to the timeline and influence Aurora's conversational tone.

### Context-Aware Memory
Recent observations (emotions, activities, safety events) are embedded using Gemini's `gemini-embedding-001` model and stored in a local vector database. During chat, relevant context is retrieved to provide situational responses.

## Configuration

### Adjusting Detection Sensitivity
Edit `apps/web-app/src/hooks/useVisionPipeline.ts`:
- **Hydration threshold**: Line 169 (`obj.score > 0.4`)
- **Fall detection sensitivity**: Line 216 (`fallCounterRef.current > 3`)
- **Update intervals**: Lines 127, 156, 188 (emotion, object, pose detection frequencies)

### Changing Aurora's Personality
Edit `apps/web-app/src/lib/genai.ts` (line 24) to modify the system instruction.

## License

This project is built for caregiving and wellness support applications.

## Acknowledgments

- **Google MediaPipe** - Real-time ML solutions
- **Google AI Studio** - Gemini API access
- **ONNX Runtime** - Cross-platform ML inference
- **Lucide** - Beautiful open-source icons
