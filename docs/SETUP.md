# Setup & Troubleshooting

## Prerequisites

- **Node.js**: Version 18.0.0 or higher.
- **Package Manager**: `npm` (comes with Node.js).
- **Web Browser**: Chrome or Edge (recommended for MediaPipe/ONNX support).

---

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd UnifierBBinary
```

### 2. Install Root Dependencies
```bash
npm install
```
> [!NOTE]
> This will also trigger a `postinstall` script to set up sub-module dependencies.

### 3. Configure API Keys
Create a `.env` file in the root directory:
```env
GOOGLE_API_KEY=your_gemini_api_key
VITE_MODEL_NAME=gemma-3-4b-it
```
You can obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/).

---

## Running the Application

### Launch All Services
```bash
npm run dev
```
This command starts:
- **Aurora (BBinary)**: [http://localhost:5173](http://localhost:5173)
- **PathGuardian**: [http://localhost:8081](http://localhost:8081)
- **SignMeUp**: [http://localhost:3000](http://localhost:3000)

---

## Troubleshooting

### 1. Browser Performance
If the vision detection is slow, ensure **Hardware Acceleration** is enabled in your browser settings.

### 2. Camera Permissions
Ensure you grant camera access to each port separately when prompted.

### 3. API Key Errors
If the chatbot fails to respond ("Thinking..." indefinitely), check your `.env` file for:
- Correct key format.
- No trailing spaces.
- Active quota on your Google Cloud project.

### 4. Node Version Issues
If `npm install` fails, verify your node version:
```bash
node -v
```
We recommend using **LTS** versions (18.x or 20.x).
