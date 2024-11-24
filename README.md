# Voice Room

This project is a Voice Room application built with React, TypeScript, and Vite on the client side, and Express with TypeScript on the server side. The application allows users to sign in and create voice rooms or spaces for chit chat. It leverages the Stream API for user management and token generation.

## Table of Contents

- [Voice Room](#voice-room)
- [Prerequisites](#prerequisites)
- [Getting Stream API Key and Secret](#getting-stream-api-key-and-secret)
- [Getting Started](#getting-started)
  - [Client](#client)
  - [Server](#server)
- [Usage](#usage)


## Prerequisites

- Node.js
- npm


## Getting Stream API Key and Secret

To get your Stream API key and secret, follow these steps:

1. Go to the [Stream website](https://getstream.io/).
2. Sign up for an account or log in if you already have one.
3. Navigate to the [Stream Dashboard](https://getstream.io/dashboard/).
4. Create a new application by clicking on the "Create App" button.
5. Fill in the required details and submit the form.
6. Once the application is created, you will see your API key and secret on the application dashboard.

Copy the API key and secret and add them to your `.env` files in the client and server directories as described in the [Getting Started](#getting-started) section.

## Getting Started

### Client

1. Navigate to the `client` directory:

    ```sh
    cd client
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `client` directory and add your environment variables:

    ```env
    VITE_API_KEY=your_api_key
    VITE_SECRET_KEY=your_secret_key
    ```

4. Start the development server:

    ```sh
    npm run dev
    ```

### Server

1. Navigate to the `server` directory:

    ```sh
    cd server
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the `server` directory and add your environment variables:

    ```env
    VITE_API_KEY=your_api_key
    VITE_SECRET_KEY=your_secret_key
    VITE_PORT=5000
    ```

4. Start the server:

    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to `http://localhost:5173` to access the client application.
2. Sign in with a username and name.
3. The server will handle user creation and token generation.