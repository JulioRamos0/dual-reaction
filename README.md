<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🚀 Dual Reaction

### A modern React application powered by AI and Vite.

[![Deploy to GitHub Pages](https://github.com/JulioRamos0/dual-reaction/actions/workflows/deploy.yml/badge.svg)](https://github.com/JulioRamos0/dual-reaction/actions/workflows/deploy.yml)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 Overview

**Dual Reaction** is a cutting-edge web application built with **React 19**, **Vite**, and **Tailwind CSS**. It features high-performance rendering, smooth animations with **Framer Motion**, and seamless integration with AI capabilities.

## ✨ Features

- ⚡ **Lightning Fast**: Powered by Vite 6 for near-instant HMR.
- 🎨 **Modern UI**: Styled with Tailwind CSS for a sleek, responsive design.
- 🎭 **Smooth Animations**: Integrated with `motion` for fluid user interactions.
- 🤖 **AI Ready**: Pre-configured for Google's Generative AI integration.
- 🚀 **Auto-Deployment**: GitHub Actions workflow included for seamless GitHub Pages hosting.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JulioRamos0/dual-reaction.git
   cd dual-reaction
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## 📦 Deployment

This project is configured to automatically deploy to **GitHub Pages** via GitHub Actions.

- **Workflow**: Whenever a push is made to the `main` branch, the `.github/workflows/deploy.yml` action triggers.
- **Secrets**: Ensure you have added `GEMINI_API_KEY` to your repository's **Secrets** if your build requires it.

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
Built with ❤️ by [Julio Ramos](https://github.com/JulioRamos0)
</div>
