# 3D Monochrome Minimalist Portfolio

A premium, modern, and highly interactive **3D Animated Portfolio** built using **Vite + React + Three.js**. The application features a high-contrast black-and-white minimalist design, responsive layouts, 3D card tilt effects, typewriter animations, and an automated deployment pipeline.

---

## 🚀 Features

- **Constellation Plexus & 3D Shapes**: An interactive background canvas rendering moving particles and floating 3D wireframe geometries (icosahedrons, cubes, torus knots) that respond to mouse movement and scrolls.
- **Glassmorphic Tactile Cards**: Frosted cards that tilt in 3D perspective based on real-time mouse position.
- **Typewriter Cycling Banner**: Dynamic title typing animations on the landing page hero.
- **Career & Achievements Timeline**: A vertical chronologically arranged work experience timeline.
- **Interactive Contact Form**: Client-side validation with asynchronous simulated messaging state indicators.
- **Single File Configuration**: Edit your details, projects, skills, and links in one central place.

---

## 🛠️ Tech Stack

- **Core**: React & JavaScript
- **Styling**: Vanilla CSS (Custom tokens, variables, responsive typography)
- **3D Graphics**: Three.js (WebGL Canvas)
- **Icons**: Lucide Icons
- **Build Tool**: Vite (Rolldown bundler)

---

## ⚙️ How to Update Your Information

You only need to edit one configuration file to update your personal details:
👉 **File Location**: `src/data/portfolioData.js`

Here is the editable structure:
```javascript
export const portfolioData = {
  profile: {
    name: "Kotha Sri Ram Prasad",
    titles: ["Game Developer", "Frontend Developer", ...],
    bio: "Intro bio...",
    about: "Detailed background...",
    stats: [...]
  },
  socials: {
    github: "https://github.com/2300030356",
    linkedin: "https://www.linkedin.com/in/sriramprasad-kottha/",
    email: "sriramprasadkottha@gmail.com"
  },
  skills: [...],
  projects: [...],
  experience: [...]
};
```

---

## 📦 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Dev Server**:
   ```bash
   npm run dev
   ```
3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🚀 Deployment to GitHub Pages

We configured the project with **GitHub Actions**, which automatically builds and deploys your site whenever you push to the `main` branch.

### Step-by-Step Deployment:

1. **Create a GitHub Repository**:
   Create a new repository on your GitHub account called `3d-portfolio`. *Do not initialize it with a README, gitignore, or license.*

2. **Initialize Git & Push Local Code**:
   Open your terminal in the project directory and run:
   ```bash
   # Initialize Git
   git init

   # Stage all files
   git add .

   # Commit
   git commit -m "feat: first release of 3d portfolio"

   # Rename default branch to main
   git branch -M main

   # Add GitHub remote (replace with your repository link)
   git remote add origin https://github.com/2300030356/3d-portfolio.git

   # Push to GitHub
   git push -u origin main
   ```

3. **Configure Pages Source**:
   - Go to your repository settings page on GitHub.
   - Click **Settings** in the top bar.
   - Click **Pages** in the left sidebar.
   - Under **Build and deployment** -> **Source**, select **GitHub Actions** from the dropdown.

4. **Verify Deployment**:
   GitHub will trigger a deployment run (visible under the **Actions** tab). In about 1 minute, your portfolio will be live at:
   👉 **`https://2300030356.github.io/3d-portfolio/`**
