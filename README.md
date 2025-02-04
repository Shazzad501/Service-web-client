# Service Provider Platform

## 📌 Introduction

The **Service Provider Platform** is an interactive web application where users can explore a variety of services, rate them, and manage their reviews. Users can also add, update, or delete their own services, offering a dynamic and user-driven experience.

---

## 📖 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Development](#development)
- [License](#license)

---

## ✨ Features

- 🏆 **Service Listings** – Browse and view detailed service pages.
- ⭐ **Ratings & Reviews** – Rate services and manage your posted reviews.
- ✏️ **Service Management** – Add, update, and delete your own services.
- 🔥 **Animated UI** – Smooth animations powered by `AOS` and `motion`.
- 🔐 **Authentication** – Firebase authentication for user accounts.
- 📩 **Email Notifications** – Integrated with EmailJS for service notifications.

---

## ⚙️ Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: v16+)
- [Vite](https://vitejs.dev/)
- [Firebase Account](https://firebase.google.com/)
- [EmailJS Account](https://www.emailjs.com/)

### Steps

1. **Clone the Repository**  
   ```sh
   git clone https://github.com/Shazzad501/service-provider-platform.git
   cd service-provider-platform
   ```

2. **Install Dependencies**  
   ```sh
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and configure it as follows:

   ```env
   VITE_apiKey=your-firebase-api-key
   VITE_authDomain=your-firebase-auth-domain
   VITE_projectId=your-firebase-project-id
   VITE_storageBucket=your-firebase-storage-bucket
   VITE_messagingSenderId=your-firebase-messaging-sender-id
   VITE_appId=your-firebase-app-id

   # EmailJS Configuration
   VITE_SERVICE_ID=your-emailjs-service-id
   VITE_TEMPLATE_ID=your-emailjs-template-id
   VITE_PUBLIC_KEY=your-emailjs-public-key
   ```

   **⚠️ Do not share this file publicly!**

4. **Run the Development Server**  
   ```sh
   npm run dev
   ```

5. **Build for Production**  
   ```sh
   npm run build
   ```

---

## 🚀 Usage

- **Browse Services** – View available services and their details.
- **Rate & Review** – Share your experiences by rating and reviewing services.
- **Manage Services** – Add, edit, or remove your own services.
- **Authentication** – Secure login with Firebase authentication.
- **Email Notifications** – Receive updates via EmailJS.

---

## 🔧 Configuration

The project uses Firebase for authentication and EmailJS for service-related emails. Ensure your `.env` file is properly set up with valid API keys.

---

## 📦 Dependencies

The project uses the following dependencies:

### **Main Dependencies**
- React (`18.3.1`)
- React Router DOM (`7.1.0`)
- Axios (`1.7.9`)
- Firebase (`11.1.0`)
- EmailJS (`emailjs-com 3.2.0`)
- AOS Animations (`2.3.4`)
- Motion (`11.15.0`)
- React Icons (`5.4.0`)
- React Hot Toast (`2.4.1`)
- React Rating (`2.0.5`)

### **Development Dependencies**
- Vite (`6.0.3`)
- ESLint (`9.17.0`)
- PostCSS (`8.4.49`)
- Tailwind CSS (`3.4.17`)
- DaisyUI (`4.12.22`)

To install all dependencies, run:

```sh
npm install
```

---

## 🎨 Development

### **Linting & Formatting**
Run ESLint to check for code quality issues:

```sh
npm run lint
```

### **Run Development Server**
```sh
npm run dev
```

### **Build for Production**
```sh
npm run build
```

---

## 👨‍💻 Contributors

- Shazzad Maruf – Creator & Maintainer

---
