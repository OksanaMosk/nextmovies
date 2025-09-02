
🎬 Gold Frame Flow (Next.js 15)

Gold Frame Flow is a modern, responsive movie discovery app built with Next.js 15 that goes beyond just listing films. Browse, filter, search, and interact with the latest and most popular movies — all in one sleek interface.

🚀 Features

🔍 Search movies by title

🎭 Filter by genre, rating, and popularity

🏷️ Clickable genre badges on movie cards for instant filtering

🎞️ Watch trailers directly via YouTube

📄 Detailed movie pages with posters, metadata, and more

🔐 User authentication with email/password via Firebase


🍪 Session management with HttpOnly cookies and Server Actions

🌙 Light/dark theme switching

📱 Fully responsive design with Tailwind CSS

🧰 Tech Stack

Framework: Next.js 15 (App Router)
Authentication: Firebase Authentication
Session management: Server Actions + cookies() API
Styling: TailWind CSS, CSS Modules

Language: TypeScript

📦 Dependencies
"dependencies": {
"firebase": "^12.2.1",
"next": "15.5.2",
"next-themes": "^0.4.6",
"react": "19.1.0",
"react-dom": "19.1.0"
},


🔐 Authentication with Firebase & Cookies
Firebase Authentication handles signup/login via email and password
Authentication is done inside Server Actions
Upon successful login, an HttpOnly cookie stores the Firebase token securely
Server components access user session via Next.js cookies() API


🚀 How to Run Locally

Clone the repository:
git clone https://github.com/your-username/gold-frame-flow.git
cd gold-frame-flow

Install dependencies:
npm install

Create .env.local with your API keys and Firebase config
Run the development server:
npm run dev

🌙 Theme Switching
Theme is managed via Next Themes

👩‍💻 Author
Oksana Moskalova
Frontend Developer passionate about clean UI and smooth UX
🔗 GitHub

💡 Additional Notes

Use server-side fetch() in Next.js 15 page.tsx components for SSR data fetching
User data can be stored in Firebase Firestore
Protect routes by checking auth token from cookies in server components
Logout handled via API route clearing auth cookies
