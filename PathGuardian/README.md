# PathGuardian 2.0
### Accessibility-First Navigation & Safety

PathGuardian 2.0 is a specialized navigation tool designed for seniors and individuals with cognitive or physical impairments. It prioritizes simplicity, voice interaction, and caregiver peace of mind.

## Key Features

- **Voice-First Interaction**: Hands-free navigation commands using the Web Speech API.
- **Zero-Friction UI**: 64px touch targets and high-contrast color schemes for better accessibility.
- **Real-Time Caregiver Dashboard**: Live tracking with route deviation alerts and location history.
- **Simulation Mode**: Test and demonstrate safety features without needing to travel.
- **SOS Integration**: One-tap emergency triggers that notify trusted contacts immediately.

## 🚀 Setup

If running standalone:

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Launch Server**:
   ```bash
   npx http-server . -p 8081
   ```

## 🛠️ Technology

- **Frontend**: Vanilla JavaScript + HTML5.
- **Mapping**: Leaflet.js with OpenStreetMap (OSM).
- **Voice Engine**: Web Speech API (Recognition & Synthesis).
- **Styling**: Custom CSS optimized for accessibility.

### For Navigators (Seniors / Users)
- **Voice-first navigation** — say "Take me to National Museum" and go
- **Real-time walking map** with turn-by-turn instructions (Leaflet.js)
- **Route deviation detection** — alerts when user veers off the planned path
- **Auto-play movement simulation** — 12-step walk from City Hall MRT → National Museum
- **Red NEED HELP button** — instantly alerts caretaker with name + location
- **Destination selection** — dropdown of Singapore landmarks or voice input
- **SOS / I'm Lost** page for emergency situations

### For Caregivers
- **Live map dashboard** — see all managed people on one map (Arthur walking, Eleanor at home, Marcus at pharmacy)
- **Alerts panel** — active emergencies (red), route deviations (amber), resolved (green), past alerts
- **Settings panel** — toggle route deviation alerts, slow pace warnings, geofence notifications, check-in reminders
- **Managed people list** — add new people by name without QR codes
- **One-tap check-in** and phone call buttons

### Accessibility
- Extra-large buttons (64px touch targets)
- High-contrast text and colors
- Voice input with Web Speech API
- Minimal cognitive load — one action per screen
- Works on mobile and desktop

---

## Project Structure

```
PathGuardian--main/
├── index.html                 # Landing page with wheelchair hero image
├── senior_home.html           # Senior dashboard — destination picker
├── voice_input.html           # Voice recognition — "Take me to..."
├── wayfinding.html            # Walking map with auto-play simulation
├── dashboard_live.html        # Caregiver live map + alerts + settings
├── caregiver_welcome.html     # Add people (no QR code)
├── im_lost.html               # Emergency "I'm Lost" page
├── safety_checkin.html        # Safety check-in
├── deviation_alert.html       # Route deviation alert detail
├── alert_escalation.html      # Alert escalation flow
├── alert_prefs.html           # Alert preferences
├── invite_circle.html         # Invite care circle
├── journey_history.html       # Past journey history
├── journey_details.html       # Journey detail view
├── profile.html               # User profile
├── wheelchair_hero.png        # Landing page hero image
├── README.md                  # This file
├── PRD.md                     # Product Requirements Document
├── TASK.md                    # Development task checklist
└── ... (other supporting pages)
```

---

## Getting Started

### Run Locally
```bash
cd PathGuardian--main
python3 -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

### User Flows
1. **Senior flow**: `index.html` → `senior_home.html` → select destination → `wayfinding.html` (auto-plays walking simulation)
2. **Voice flow**: `senior_home.html` → `voice_input.html` → say "Take me to National Museum" → `wayfinding.html`
3. **Caregiver flow**: `index.html` → `caregiver_welcome.html` → add people → `dashboard_live.html` (live map + alerts)

---

## Tech Stack

| Technology | Usage |
|-----------|-------|
| HTML5 | Structure and semantics |
| Tailwind CSS (CDN) | Styling and responsive design |
| JavaScript (Vanilla) | Logic, simulation, Web Speech API |
| Leaflet.js | Interactive maps with OpenStreetMap tiles |
| Google Fonts (Lexend) | Readable, accessibility-friendly typography |

---

## Key Screens

| Screen | Description |
|--------|-------------|
| **Landing** | Wheelchair hero + role selection (Navigator / Caregiver) |
| **Senior Dashboard** | Destination picker with City Hall MRT as origin |
| **Wayfinding Map** | Auto-play walking simulation with deviation detection |
| **NEED HELP** | Red emergency button → "Alert sent to Caretaker Sarah" |
| **Caregiver Dashboard** | Live map of all managed people + Alerts + Settings tabs |
| **Add People** | Simple name/relationship form (no QR codes) |

---

## Documentation

- [PRD.md](PRD.md) — Product Requirements Document
- [TASK.md](TASK.md) — Development task checklist

---

## Team

Built for accessibility and independent mobility.

## License

MIT License
