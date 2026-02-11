# UnifierBBinary - Unified Wellness & Safety Suite

This workspace integrates two powerful tools for safety and independence: **PathGuardian 2.0** and **Aurora (BBinary)**.

---

## PathGuardian 2.0
**Independent Mobility, Shared Peace of Mind**

PathGuardian is an accessibility-first navigation app designed for seniors and people with disabilities. It provides voice-guided wayfinding, real-time location tracking for caregivers, and smart deviation detection.

### Key Features
- **Voice-first navigation**: "Take me to National Museum"
- **Real-time walking map**: Turn-by-turn simulation and tracking.
- **Caregiver Dashboard**: Live map + Alerts panel.
- **SOS / I'm Lost**: Instant emergency alerts.

---

## Aurora (BBinary)
**AI-Powered Wellness & Safety Assistant**

Aurora is an intelligent wellness companion that combines real-time computer vision, emotion detection, and conversational AI to provide empathetic support and safety monitoring.

### Key Features
- **Vision Intelligence**: Real-time emotion, activity (hydration), and fall detection.
- **Conversational AI**: Natural language interactions powered by Google Gemini.
- **Biometric Dashboard**: Real-time health and activity metrics.

---

## Getting Started

### Prerequisites
- **Node.js**: 18+ and npm.
- **Google AI Studio API Key**: Required for Aurora's Conversational AI.

### Quick Start
1.  **Install everything**:
    ```bash
    npm run install:all
    ```
2.  **Configure Secrets**:
    Open the root `.env` file and add your `GOOGLE_API_KEY`.
3.  **Run the Workspace**:
    ```bash
    npm run dev
    ```
    This launches an interactive menu to start PathGuardian, BBinary, or both.

---

## Port Reference
- **PathGuardian**: [http://localhost:8081](http://localhost:8081)
- **BBinary**: [http://localhost:5173](http://localhost:5173) (or next available port)

---

## Project Structure
- `PathGuardian/`: Source for version 2.0 navigation app.
- `BBinary/`: Source for Aurora AI assistant.
- `scripts/`: Integration management scripts.
- `.env`: Centralized secrets.

---

## Integration Details
The applications are linked via a **Launch PathGuardian** button on the Aurora dashboard, ensuring a seamless experience for caregivers.
