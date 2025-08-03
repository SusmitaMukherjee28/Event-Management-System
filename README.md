#  FunFusion - Event Management System

## 🗒About

**FunFusion** is a full-stack event management system where users can explore and book events while administrators manage event listings, view bookings, and handle user feedback.

**This project is built using:**
-  **React.js + Html + CSS + Axios** for the frontend
-  **Node.js + Express** for the backend API
-  **MySQL** for the database
---

## Features

### User Side
- Browse upcoming events
- Book tickets with name, age, gender, and quantity
- View success confirmation after booking
- Submit feedback after event

### Admin Side
- Add new events (Tech, Music, Food, Art,Theatre)
- View event list with total ticket stats
- Manage all user bookings
- View and delete user feedback

---

### Main API Endpoints
### Events

| Method | Endpoint     | Description              |
|--------|--------------|--------------------------|
| GET    | `/events`    | Get all events           |
| POST   | `/events`    | Add new event (admin)    |

### 🎟️ Bookings

| Method | Endpoint     | Description              |
|--------|--------------|--------------------------|
| GET    | `/bookings`  | Get all bookings (admin) |
| POST   | `/bookings`  | Book tickets (user)      |

### 💬 Feedback

| Method   | Endpoint          | Description                   |
|----------|-------------------|-------------------------------|
| GET      | `/feedback`       | Get all feedback (admin)      |
| POST     | `/feedback`       | Submit feedback (user)        |
| DELETE   | `/feedback/:id`   | Delete feedback by ID (admin) |

---

##  Screenshots

_<img width="1920" height="1080" alt="Screenshot (388)" src="https://github.com/user-attachments/assets/c4edff9e-7de9-4bea-be62-f845d400eb14" />
<img width="1920" height="1080" alt="Screenshot (380)" src="https://github.com/user-attachments/assets/1eecc3bf-d02f-489a-9eea-4fab90a9ffd1" />
<img width="1920" height="1080" alt="Screenshot (382)" src="https://github.com/user-attachments/assets/a423eb10-ba6a-4da8-82bb-56816a7e13f9" />
<img width="1920" height="1080" alt="Screenshot (389)" src="https://github.com/user-attachments/assets/ffe9d890-21f3-4a5a-a6c6-1cf5fbd31b2c" />
<img width="1920" height="1080" alt="Screenshot (383)" src="https://github.com/user-attachments/assets/dd5c64fd-1d7a-4728-acd3-7e66469fa549" />



---

##  Tech Stack

| Layer       | Tech Used             |
|-------------|------------------------|
| Frontend    | React.js, Html, CSS |
| Backend     | Node.js, Express.js    |
| Database    | MySQL                  |
| Deployment  | Localhost / Your host  |

---

