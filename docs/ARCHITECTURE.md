# Architecture & Design

## System Philosophy: Multimodal Inclusion

The core design principle of **UnifierBBinary** is **Multimodal Inclusion**. Most assistive technology is built around a single interface (e.g., just voice or just touch), which unintentionally excludes users with limitations in those areas.

UnifierBBinary bridges this gap by combining:
1.  **Computer Vision**: Proactive monitoring (falls, hydration, emotions).
2.  **Conversational AI**: Empathetic, natural language support via Gemini.
3.  **Large-Target UI**: High-contrast, 64px touch interactions.
4.  **Gesture Recognition**: Non-verbal communication via sign language translation.

---

## System Components

### 1. Unified Management Layer (Node.js)
The root workspace uses a custom `manage.js` script to orchestrate the lifecycle of all services.
- **Environment Sync**: Propagates `.env` variables to sub-modules.
- **Concurrent Execution**: Launches React, Next.js, and static servers simultaneously.

### 2. Aurora AI Assistant (React + MediaPipe + ONNX)
- **Vision Pipeline**: A multi-stage pipeline using MediaPipe for landmarks and ONNX Runtime Web for real-time emotion classification.
- **Contextual Memory**: A local memory system that stores environmental observations, allowing the Gemini LLM to respond with situational awareness.
- **Vite Integration**: High-performance build system for near-instant reactivity.

### 3. PathGuardian 2.0 (Vanilla JS + Leaflet)
- **Accessibility Engine**: "Zero-Friction" design with voice-first input and high-contrast visuals.
- **Simulation Logic**: A pre-built movement simulator to test safety features like route deviation detection.

### 4. SignMeUp Interpreter (Next.js + MediaPipe + LSTM)
- **Local ML**: Uses an LSTM (Long Short-Term Memory) neural network trained locally in the browser to translate hand landmarks into phrases.
- **Privacy-First**: No video data leaves the device; only landmarks are processed.

---

## Project Structure

```text
UnifierBBinary/
├── README.md               # Master documentation
├── docs/                   # Detailed technical guides
├── scripts/                # Workspace orchestration scripts
├── BBinary/                # Aurora AI Assistant (React)
│   ├── apps/web-app/       # Main vision/chat application
│   └── ...
├── PathGuardian/           # Navigation & Caregiver (Static/Vanilla JS)
└── SignLanguageInterpreter/# Gesture Recognition (Next.js)
```

---

## Data Flow

1.  **Input**: Sensors (Camera/Mic) capture raw data.
2.  **Edge Processing**: MediaPipe/ONNX extracts landmarks and features locally.
3.  **Cognition**: Gemini API processes requests with local context.
4.  **Output**: UI updates (dashboard) and Speech Synthesis (TTS).
