# 🦜 Transportflow

Web page to view departures or plan a route in germany. [Live Demo 🛰](https://transportflow.online/)

### ⛸ Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

#### 📦 Prerequisites

- [Node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/lang/en/)

#### 💈 Installing

How to start the site on your system:

- clone the repo
- cd into it
- run `$ yarn` to install dependencies
- then run `$ yarn run build-css` to build the tailwind.css file
- finally run `$ yarn start` to start the development server
- visit [localhost:3000](http://localhost:3000/) in your browser
- enjoy 🎉

Since we use next.js for the routing stuff, the page automatically reloads when you make changes during development.

### 🌍 Deployment

The demo page is hosted on a kubernetes cluster. You can find the deployment file as `transportflow.yaml` in this repository.

### 🔨 Build with

- [dvbjs](https://github.com/kiliankoe/dvbjs) & [hafas-client](https://github.com/public-transport/hafas-client)
- [Tailwind CSS](https://tailwindcss.com/)

### 🖋 Authors

- **Adrian Böhme** - *Creator/Maintainer* - [Adwirawien](https://github.com/Adwirawien)
