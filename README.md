Google Calendar Clone
A responsive and functional calendar application inspired by Google Calendar.

# 🔗 Demo
https://google-calendar-clone-pi.vercel.app

# 🚀 Setup & Run Instructions

# 1. Clone the repo
git clone https://github.com/adila099/google-calendar-clone.git
cd google-calendar-clone

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
http://localhost:5173

# 🧠 Architecture & Design Decisions
React + Redux Toolkit: Chosen for predictable state management and clean integration with the component tree.

Redux Persist: Used for persisting calendar state across sessions without requiring a backend.

Component Structure: Divided by views (MonthView, WeekView, DayView) and modals (EventModal, EventDetails) to maintain separation of concerns.

Tailwind CSS: Enables rapid UI development with a consistent design system.

date-fns: Lightweight and modular date utility library to handle date calculations.

# ✅ Bonus Features

Scrollable time slots (similar to Google Calendar)

Event color coding

Responsive design for mobile and desktop

Fixed headers for better navigation experience

# ⚠ Known Issues / Limitations

No backend: data is only saved in local storage (not shared across devices)

No user authentication or calendar sharing

Limited calendar navigation (no year or multi-month view)
