<img src="src/assets/logo.png"></img>

# Fone! Fake Conversations, Real Projects

<b>Create custom real-time conversations for movies, pranks, and more!</b>


## Introduction

[Fone](https://main.df41y9bj358vt.amplifyapp.com) is a real-time chatting application that allows users to customize every part of their conversations. 
Choose from a selection of well-known messaging app themes to get started, and then get started by setting anything
from the receiver's contact details, to message timestamps, to even the messages you receive. 

For the best experience, it is recommended that one user downloads the [Progressive Web App (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) version of **Fone!** onto a mobile device, and that another user should use a desktop version of the website to manipulate the chatroom. When visiting this website on a mobile device, you will immediately be prompted to install the PWA.

This project was built at the request of a friend, who wanted to create custom phone conversations for their films, but 
couldn't change the display settings they wanted to.


## Features

- Real-time messaging that supports both text and images.
- Custom chatroom configuration.
  - 4 chatroom themes based on popular messaging apps.
  - Chatroom creation, deletion, and organization.
  - Message creation for sender and receiver.
  - Ability to hide or remove previous messages.
  - Timestamp customization.
  - Read-receipt customization.
  - Ability to change the contact's name and image.
- Support for both desktop and mobile devices (including an installable [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)).
- User authentication (through Google Auth).
- Google Firestore and Firebase Storage integration.
- CRUD storage operations, with a [public API](Database.md).




## Hosting This Project
To host this project locally, you will first need to set up a [Firebase Firestore project](https://firebase.google.com/products/firestore).  Then, fill out the `.env` file with the corresponding keys and save it as `.env.local`. 

> *Note that Firebase API keys are only for identification, **not** for authorization.*

Then the project can be locally hosted through node.js with `npm start`.


## Project Description

Fone was built with a React front-end and a Google Firebase database (as well as traditional HTML, JavaScript, and CSS).
- Firebase was chosen for their real-time Firestore database, and their Storage functionality to host images from users.
- React was chosen due to its compatibility with many devices and ability to generate a Progressive Web APP (PWA) that can be directly downloaded to a user's phone. Other React frameworks such as [React Router](https://reactrouter.com/en/main) were also used.
- Figma was also used to design the layout of the application.

The ability for the application to be downloaded as a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) was crucial to this project, as
the format of the installable version of **Fone!** makes the app almost indistinguishable from real texting services on mobile devices. This allows the app to seem more realistic in settings like film where the entire screen is captured. 

AWS Amplify was then used to host a demo version of this application, which can be found [here](https://main.dtrjhr0w2mwu1.amplifyapp.com).
