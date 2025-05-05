# React App with Ruby Backend
This is a very simple web app created using React as the Front End Framework and Ruby as Backend.

app.rb is running in the port 4500 which deals with backend processing.

**DIRECTORY STRUCTURE :**
The backend consisting of ruby code and spec file is organised into the folder named backend and other files in the repository belong to the front end.

    
- Frontend (src folder) :

    - components:

        - apcard.jsx : This component is responsible for rendering the card components seen in the landing page when user submits an entry about the device.

        - header.jsx : This component is responsible for rendering the navbar seen in all pages. It is a simple header which consists of routes to pages : Home, About Us, Team and conditionally renders Log Out.

    - pages :
        - Landing - The main page which shows after a user is successfully logged into the system.Allows the user to add more devices, view, modify and delete existing devices.
        - Login - Renders a simple form which after proper validation from the backend permits the user into the system.
        - Signup - Renders a simple form which after proper validation from the backend allows the user to create an .

    The index.js is the main file which renders the App.js page which plays a crucial role in communicating with the backend in order to learn the Public key of the server which is uses during Sign Up/Login. **Two Way Encryption** is implemented where sensitive credentials which are passed from frontend to backend is encrypted using Server's public key which the server decrypts using its private key and hashes the password before storing in the database.

    **_References :_**
    - [Cards used in Landing Page](https://getbootstrap.com/docs/4.0/components/card/#card-styles)
    - [Header](https://getbootstrap.com/docs/4.0/components/card/#card-styles)
    - [Passing data between Pages](https://stackoverflow.com/questions/52238637/react-router-how-to-pass-data-between-pages-in-react)
    - [JSEncrypt](https://www.npmjs.com/package/jsencrypt)
    - [Routing](https://reactrouter.com/6.30.0/start/tutorial)

- Backend :

    **app.rb** file is responsible for handling process related to authentication of the user and handling processes that happens in the landing page such as creation of device.

    **Gemfile** contains the gems that backend processing needs.

    **spec/** folder contains the app_spec.rb file which is the test file that tests backend. (I am facing difficulties in running the code but the structure written tests the backend for successful login).

    **_References :_**
    - [RSPEC](https://www.theodinproject.com/lessons/ruby-introduction-to-rspec)
    - [BCRYPT](https://github.com/bcrypt-ruby/bcrypt-ruby)
    - [OPENSSL](https://ruby-doc.org/stdlib-2.6.3/libdoc/openssl/rdoc/OpenSSL.html)

- Database :

    The project uses Postgres as its database. It has three simple tables namely: 
    - **Users :** This table contains two columns- email and password and user_id which is serially incremented. Password stored in the table is hashed using BCrypt library
    - **Sessions :** This table contains two columns- user_id and logged_in. Each time a user logs in to the system, the table updates with user_id and a true value. When the user logs out, the entry is deleted
    - **Devices :** This table maintains the list of devices that a particular user has added. It contains 4 columns- user_id,header,count and health.

    CRUD operation is performed on the above relations in the database.

    **_References :_**
    - [Documentation](https://www.postgresql.org/docs/16/index.html)

## DOCKER :
The web app is containerized using docker. For this purpose, a dockerfile is written seperately for frontend and backend in their respective folders. A docker-compose.yaml file is written in the root directory which manages multiple containers used. The docker-compose.yaml file is used to mention the services, their dependencies, the ports that they run on and other information about the environment needed to run the container. 

In order to run docker, following commands needs to be executed in order:
```
$ docker compose build
$ docker compose up
$ docker compose down 
```
**_References :_**
- [Containerizing the Front End](https://www.docker.com/blog/how-to-dockerize-react-app/)
- [Containerizing the Back End](https://hub.docker.com/_/ruby)
- [Containerizing the Database Using Docker Compose](https://medium.com/@agusmahari/docker-how-to-install-postgresql-using-docker-compose-d646c793f216)

The status of a container(s) can be viewed using the command `docker compose ps`.

## MAKEFILE :
Makefile, widely used in C programs and Linux Driver Develpoment, is a tool used to automate software building procedure and its deployment.

Assuming that the MAKEFILE and docker-compose.yaml are located in the root directory of the project, the following commands can be used to run the docker file using minimal commands.

```
$ make 
(or) 
$ make all
```
Either command works are the target need not be specified for the default target(mentioned first in the makefile).This command builds and runs the containers available in docker-compose.yaml file


```
$ make build
 ```
This command builds containers available in docker-compose.yaml file


```
$ make run
``` 
This command runs the containers that has been builded.


```
$ make kill
``` 
This command stops the containers that are actively running.


```
$ make restart
``` 
This command restarts the containers that are actively running. This command is ideally used when application has been changed, and the containers need to be build according to the changed version.This command kills the containers, re-builds them and starts them again


```
$ make status
``` 
This command is used to check the status of the containers providing information about Container ID, Image, Services, Timestamp, Status and the Ports it is running on.
