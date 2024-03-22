<h1 align="center">
    INTELLITAX
</h1>

<h3 align="center">
Streamline school management, class organization, and add students and faculty.<br>
Seamlessly track attendance, assess performance, and provide feedback. <br>
Access records, view marks, and communicate effortlessly.
</h3>

<br>

# About

## Features

- **User Roles:** The system supports three user roles: Admin, Teacher, and Student. Each role has specific functionalities and access levels.

- **Admin Dashboard:** Administrators can add new students and teachers, create classes and subjects, manage user accounts, and oversee system settings.

- **Attendance Tracking:** Teachers can easily take attendance for their classes, mark students as present or absent, and generate attendance reports.

- **Performance Assessment:** Teachers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

- **Data Visualization:** Students can visualize their performance data through interactive charts and tables, helping them understand their academic performance at a glance.

- **Communication:** Users can communicate effortlessly through the system. Teachers can send messages to students and vice versa, promoting effective communication and collaboration.

## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB

<br>

## Work flow

<img src="../DESISASCEND/IntelliTax-Photos/img1.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img2.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img3.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img4.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img5.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img6.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img7.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img8.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img9.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img10.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img11.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img12.jpg" >
<img src="../DESISASCEND/IntelliTax-Photos/img13.jpg" >
<br>

# Installation

```sh
git clone https://github.com/monisha-max/INTELLITAX_GROUP6
```

Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend

```sh
cd backend
npm install
npm start
```

Create a file called .env in the backend folder.
Inside it write this :

MONGO_URL = mongodb://127.0.0.1/school

Instead of this link write your database link.

Terminal 2: Setting Up Frontend

```sh
cd frontend
npm install
npm start
```

Now, navigate to `localhost:3000` in your browser.
The Backend API will be running at `localhost:5000`.

If this is not working then go to the src > redux > userRelated > userHandle.js

Write this after the import statements :

const REACT_APP_BASE_URL = "http://localhost:5000"

Now replace all process.env.REACT_APP_BASE_URL with REACT_APP_BASE_URL.

The problem here was that the .env file in the frontend was not working for other users while it works for me.
So you have to do this in the frontend. After this the project will run smoothly if not then you can contact me.

<br>

# Deployment

- Render - server side
- Netlify - client side