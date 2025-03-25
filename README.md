
---

# Memo 📝  

**Memo** is a simple and efficient memory saving web application that allows users to create, manage, and share their mems effortlessly across the web.  

## Features 🚀  

- 🔒 **Authentication** – Secure user login and signup  
- 📝 **Create, Read, Update, Delete (CRUD) Mem**  
- 🔍 **Search Notes** – Quickly find notes with search functionality  
- 📤 **Share Notes** – Generate shareable links for public notes  
- 🎨 **Responsive UI** – Clean and modern design using DaisyUI & Tailwind CSS  
- 🌐 **Deployed Online** – Accessible from anywhere  

## Tech Stack 🛠  

- **Frontend:** React, Vite, DaisyUI, Tailwind CSS  
- **State Management:** Zustand
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** Cookie & JWT-based authentication  
- **Hosting:** Vercel (Frontend & Backend)  

## Installation & Setup 🏗  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/Prathvish-Shetty/Memo.git
cd Memo
```

### 2️⃣ Set Up the Backend  

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add:  

```env
PORT=8000
MONGODB_URL=your_mongodb_url
CORS_ORIGIN=your_frontend_url
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
DB_NAME=Memo
```

Run the backend:  
```bash
npm run dev
```

### 3️⃣ Set Up the Frontend  

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory and add:  

```env
VITE_API_URL=http://localhost:8000/api
```

Run the frontend:  
```bash
npm run dev
```

## Deployment 🌍  

Both the **frontend** and **backend** are deployed on **Vercel**. Update the `.env` files accordingly for production.  

## Future Enhancements 🚀  

- **Tagging system for better organization**  
- **More authentication options**  
- **Performance optimizations**  
- **Memo Chrome Extension**

## Special Thanks ❤️
A huge thanks to DaisyUI for providing an amazing UI component library, making the design process smooth and efficient!

## License 📝  

This project is **open-source** under the **MIT License**.  

---  