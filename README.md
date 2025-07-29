
# **GenAI ATS**  
AI-powered Applicant Tracking System built with React, TypeScript, and Vite.  
[**Beyond Career**](https://beyond-career.netlify.app/)  

---

## 📖 **Overview**  
GenAI ATS is a next-generation Applicant Tracking System leveraging **AI** to streamline resume parsing, job matching, and candidate evaluation. Built with **React + TypeScript** and powered by **Vite**, it ensures blazing-fast performance and developer experience.

---

## ✨ **Features**
- ✅ AI-powered resume parsing  
- ✅ Job-candidate matching algorithm  
- ✅ Modern UI with responsive design  
- ✅ Fast and optimized build with Vite  
- ✅ Docker support for containerized deployments  
- ✅ TypeScript for type safety  

---

## 🛠 **Tech Stack**
- **Frontend:** React 18, TypeScript, Vite  
- **Routing:** React Router  
- **Styling:** (add CSS framework if used, e.g., Tailwind or SCSS)  
- **Containerization:** Docker  
- **Build Tool:** Vite  

---

## 📂 **Project Structure**
```

genai\_ats/
│
├── Dockerfile                # Docker configuration
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── react-router.config.ts    # Router setup
├── public/                   # Static assets
└── src/                      # Application source code
├── components/           # Reusable UI components
├── pages/                # Page-level components
├── hooks/                # Custom React hooks
├── services/             # API calls and services
└── assets/               # Images, icons

````

---

## ⚙️ **Installation & Setup**

### ✅ **Prerequisites**
- Node.js >= 18.x  
- npm or yarn  
- Docker (optional for containerized setup)  

---

### 🔹 **Local Development**
```bash
# Clone the repository
git clone <your-repo-url>
cd genai_ats

# Install dependencies
npm install

# Start development server
npm run dev
````

App will be running at: **[http://localhost:5173/](http://localhost:5173/)**

---

### 🔹 **Build for Production**

```bash
npm run build
```

---

### 🔹 **Docker Setup**

```bash
# Build Docker image
docker build -t genai-ats .

# Run container
docker run -p 3000:3000 genai-ats
```

---

## 📜 **Available Scripts**

| Command             | Description                |
| ------------------- | -------------------------- |
| `npm run dev`       | Start development server   |
| `npm run build`     | Build production-ready app |
| `npm run start`     | Start the production build |
| `npm run typecheck` | Run TypeScript type checks |

---

## 📸 **Screenshots / Demo**

* **Homepage**
  ![Home page](https://res.cloudinary.com/dglwzejwk/image/upload/v1753772034/Screenshot_2025-07-29_122011_wybgdw.png)

* **Upload Resume**
  ![Resume upload](https://res.cloudinary.com/dglwzejwk/image/upload/v1753772041/Screenshot_2025-07-29_122141_c0xi0l.png)

* **Resume Feedback**
  ![Resume Feedback](https://res.cloudinary.com/dglwzejwk/image/upload/v1753772050/Screenshot_2025-07-29_122251_yk1ryg.png)

---

## 📖 **API Documentation**

If you have backend APIs, link to the API docs or include endpoints here.

---

## 🤝 **Contribution Guidelines**

1. Fork the repo
2. Create a new branch (`feature/awesome-feature`)
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


