# URL Shortener 🔗

A full-stack URL Shortener built using Node.js, Express, and MongoDB, featuring authentication, role-based access control, EJS-based views, and visit tracking.

## 🚀 Features

- ✅ Shorten long URLs with unique short IDs
- 🔁 Redirect users via short URLs
- 📈 Visit tracking with timestamps
- 🔐 User authentication with cookies
- 🧑‍💼 Role-based access control (NORMAL, ADMIN)
- 🖥️ Dynamic rendering using EJS
- ⚙️ Modular code structure

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Templating Engine**: EJS
- **Authentication**: Custom middleware, Cookies
- **Environment Variables**: dotenv

## 📦 Dependencies

| Package          | Purpose                                      |
|------------------|----------------------------------------------|
| `express`        | Web framework for Node.js                    |
| `mongoose`       | ODM for MongoDB                              |
| `dotenv`         | Load environment variables                   |
| `ejs`            | Templating engine for rendering HTML         |
| `cookie-parser`  | Parse cookies for authentication             |
| `shortid`        | Generate short unique IDs                    |
| `bcrypt`         | Password hashing for authentication          |
| `jsonwebtoken`   | For creating and verifying tokens            |

## 🧪 DevDependencies

| Package     | Purpose                                                    |
|-------------|------------------------------------------------------------|
| `nodemon`   | Automatically restarts server on file changes (development only) |

## 📂 Folder Structure

```bash
short-url/
├── src/                      # Source code directory
│   ├── controllers/          # Controller logic for routes
│   │   ├── url.controller.js
│   │   └── user.controller.js
│   ├── middlewares/          # Custom authentication middleware
│   │   └── auth.middleware.js
│   ├── model/                # Mongoose schemas
│   │   ├── url.model.js
│   │   └── user.model.js
│   ├── routes/               # Route definitions
│   │   ├── static.router.js
│   │   ├── url.router.js
│   │   └── user.router.js
│   ├── service/              # Business logic / reusable services
│   │   └── auth.service.js
│   ├── utils/                # Utility functions
│   │   └── db.js
│   └── views/                # EJS templates for frontend rendering
│       ├── home.view.ejs
│       ├── login.view.ejs
│       └── signup.view.ejs
├── node_modules/             # Node.js dependencies
├── .env                      # Environment variable declarations
├── .env.example              # Environment variable template
├── .gitignore               # Ignored files for Git
├── index.js                 # Entry point of the application
├── LICENSE                  # MIT License file
├── package.json             # Project metadata and scripts
├── package-lock.json        # Dependency tree
└── README.md                # Project documentation
```

## ✅ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=8000
DB_URI=mongodb://localhost:27017/urlshortener
```

> **Note**: Replace the `DB_URI` value with your own MongoDB connection string.

### 4. Run the app

```bash
npm start
```

The server should start on `http://localhost:8000`

## 🌐 Routes Overview

### Public Routes

| Method | Route           | Description                    |
|--------|-----------------|--------------------------------|
| GET    | `/`             | Landing page                   |
| GET    | `/test`         | View all URLs (admin/testing)  |
| GET    | `/url/:shortId` | Redirect to original long URL  |

### Authenticated Routes

| Method   | Route        | Access       | Description                    |
|----------|--------------|--------------|--------------------------------|
| GET/POST | `/url`       | NORMAL, ADMIN| Create new short URL           |
| GET/POST | `/user/*`    | All users    | Signup/Login functionality     |

## 📌 How It Works

1. User signs up or logs in
2. User creates a short URL
3. System stores it with visit history
4. Visiting `/url/:shortId` redirects to the original URL
5. Each visit is timestamped

## 🔐 Middleware Logic

- **`checkForAuth`**: Verifies auth token from cookies
- **`restrictTo([roles])`**: Restricts route access to specific user roles

## 🧑‍💻 Author

**Your Name**
- GitHub: [@AniketDey06](https://github.com/AniketDey06)

## 📄 License

This project is licensed under the MIT License.

---

⭐ **Don't forget to star this repo if you found it helpful!**