![](src/assets/logo.png)
# Fone! Fake Conversations, Real Projects

[Fone](https://main.df41y9bj358vt.amplifyapp.com) is a real-time chatting application where users can customize every part of the conversation. 
Choose from a selection of well-known messaging app themes to get started, and then get started setting anything
from the receiver's contact details, to when messages say they are sent, and even to the messages they send you. 

This project was built at the request of a friend, who wanted to create custom phone conversations for their films, but 
couldn't change the display settings they wanted to.

# Features

- Real-time messaging (through both text messages and images).
- Custom chatroom configuration.
- Support for both desktop and mobile devices (including installable [PWAs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)).
- User authentication (through Google Auth).
- Google Firestore and Firebase Storage integration. The database structure for this project can be found [here](database.md).


# Project Description

Fone was built using React to render the website and a Google Firebase database (as well as traditional HTML, JavaScript, and CSS).
- Firebase was chosen for their real-time Firestore database, and their Storage functionality to host images from users.
- React was chosen due to its compatibility with many devices and ability to generate a Progressive Web APP (PWA) that can be directly downloaded to a user's phone. Other React frameworks such as [React Router](https://reactrouter.com/en/main) were also used.

Additionally, AWS Amplify was used to host a test version of this application, which can be found [here](https://main.df41y9bj358vt.amplifyapp.com).


# Hosting This Project
To locally host this project, you will first need to set up a [Firebase Firestore project](https://firebase.google.com/products/firestore).  Then, fill out the `.env` file with the corresponding keys and save it as `.env.local`. 

- *Note that Firebase API keys are only for identification, **not** for authorization.*

Then the project can be locally hosted through node.js with `npm start`
