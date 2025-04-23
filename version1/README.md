# React App with Ruby Backend
This is a very simple web app created using React as the Front End Framework and Ruby as Backend.

app.rb is running in the port 4567 which deals with user authentication

process.rb is running in the port 4568 which deals with details transferred from and to the backend

**DIRECTORY STRUCTURE :**

The backend consisting of ruby code and spec file (not fully functional) is organised into the folder named `backend` and other files in the repository belong to the front end.

- Backend :
    `app.rb` file is responsible for handling process related to authentication of the user and  `process.rb` file is responsible for handling processes that happens in the landing page.

    A simple backend is developed by using a text file which stores user's information like email and password. While the email is kept as plain text, the password is hashed and stored using the functionality of BCrypt library that Ruby provides.

    Proccess.rb file uses a simple array to store the 

    **FUTURE ENHANCEMENTS:** Planning on integrating with DB and including JWT so that a session can be created and user experience can be enhanced

- Frontend (src folder) :
    - components:

        - apcard.jsx : This component is responsible for rendering the card components seen in the landing page when user submits an entry about the device.

        - header.jsx : This component is responsible for rendering the navbar seen in all pages. It is a simple header which consists of routes to pages : Home, Log In, Sign Up and About.

    - pages :
        - About
        - Home
        - Landing
        - Login
        - Signup

    The index.js is the main file which renders the App component which with the help of above listed pages and components, serve the functionality of the web app.
