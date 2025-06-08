# 📦 Skip Hire App

A modern web application built with **React**, **TailwindCSS**, and **@react-three/fiber**, allowing users to explore and select 3D skip bins interactively.

🌐 **Live URL**: [https://skip-hire-app.pages.dev/](https://skip-hire-app.pages.dev/)  
📁 **Repo**: [github.com/aswinandro/skip-hire-app](https://github.com/aswinandro/skip-hire-app)

---

## 🚀 Features

- **3D interactive skip bin viewer** using Three.js
- **Dynamic skip selection and rotation**
- **Realistic hollow container with open top**
- **SVG logo stickers** placed on both sides
- **Fully responsive UI with scrollable skip cards**
- **Sticky footer for back and continue actions**
- **Lightweight and blazing-fast interface**

---

## 🧠 My Custom Approaches

- **Designed based on the client’s existing TailwindCSS-based website.** I matched their branding, layout style, and color scheme for a seamless visual experience.

- **Mobile Resposive for various Screen Sizes**  for a seamless visual experience.

- **A Rotation Pause and Resume Button for interacting above available skip sizes**  for a seamless visual experience.

- **All 3D geometry handcrafted using `BufferGeometry` and `BoxGeometry`.** The skip model simulates real-world structure with an open-top and internal cavity.

- **SVG branding logos loaded using `SVGLoader`** and accurately mapped on skip sidewalls with scaling and centering.

- **Used `useMemo` to optimize geometry calculations**, preventing unnecessary re-renders when selecting between skip sizes.

- **SkipModel rotation is optional**, controlled by toggle, using `useFrame` for smooth animations.

- **The top face is purposefully omitted** in the skip model to reflect real skip bins used for dumping.

- **Four metallic rim bars added** as standalone geometries to enhance realism.

- **Modularized every component** for maintainability and scalability. Each piece (e.g. `SkipCard`, `SkipModel`, etc.) is separated into reusable components.

- **Kept routing and state logic centralized in `App.js`** to keep the merge process simple for integrating into larger apps.

- **Prepared a `services/` folder** for future API integrations (quote requests, bookings, etc.) to follow proper separation of concerns and RESTful design.

- **We can further enhance this app by creating the skip model in Blender 3D and importing it for photorealistic rendering with lights, shadows, and materials.**

---

## ⚙️ Technical Highlights

- Built using:
  - **React 18**
  - **TailwindCSS**
  - **Three.js + @react-three/fiber**
  - **SVGLoader (Three.js)**

- **Optimized with:**
  - `useMemo`, `useLoader`, `useFrame` for performant rendering
  - `OrbitControls` with `enablePan: false` to lock camera drag
  - Scrollable skip selector cards using `scrollbar-thin`

- **CI/CD & DevOps:**
  - **Connected to GitHub main branch**
  - Automatically deployed to **Cloudflare Pages**
  - **Build is triggered on every `git push`** to main, ensuring continuous deployment
  - 🔗 [Deployed App on Cloudflare](https://skip-hire-app.pages.dev/)

---

## 🗂️ Project File Structure


src/
├── assets/
│ └── recycle.svg # Logo used on skip side
│
├── components/
│ ├── SkipCard.jsx # Individual card for each skip size
│ ├── SkipList.jsx # Horizontal scrollable list
│ ├── SkipModel.jsx # Core 3D skip rendering logic
│ ├── SkipViewer.jsx # Canvas + OrbitControls wrapper
│ └── Footer.jsx # Sticky footer navigation
│
├── services/
│ └── api.js # Placeholder for future API calls
│
└── App.jsx # Routing + state mgmt kept simple for merging


💡 Ideas for Future
🎨 Import GLTF/GLB skip models created in Blender

📩 Add a form to request skip hire with validations

🗓️ Add calendar to pick hire duration

🧾 Integrate price estimators per size and region

🌐 Add i18n for multi-language support

🤝 Contributing
Feel free to fork the repo, raise issues, or suggest features via PRs. Open to collaboration!

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

