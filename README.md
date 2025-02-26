# Real-time ChatApp with Advanced AI Functionality

## Overview

ChatApp is a next-generation chat application designed to combine the traditional features of modern messaging platforms with cutting-edge AI capabilities. This repository contains the backend code for ChatApp, providing robust security measures, seamless communication, and AI-powered tools to enhance user experience and productivity.

## Features

### Traditional Chat Application Features

- **Real-time Messaging:** Instant and reliable communication.
- **Media Sharing:** Share images, videos, documents, and more.
- **Account Management:** Secure account creation and management.
- **Notification System:** Stay updated with message and activity notifications.

### AI-Powered Features

- **Image Generation:** Generate high-quality images from text inputs using AI.
- **Text Composer:** AI-assisted writing for emails, stories, or professional messages.
- **Writing Style Optimization:** Adjust and refine writing style to suit formal, casual, or creative contexts.
- **Grammar Checker:** Real-time grammar and spelling correction.
- **Language Conversion:** Translate messages into multiple languages seamlessly.
- **Powerful Chatbot:**
  - **Document Analysis:** Upload documents to summarize content efficiently.
  - **Intelligent Query Handling:** Ask questions related to uploaded documents or general topics outside the document’s context.

### Security Features

- **AES Encryption:** Messages, passwords, and sensitive user data are protected using AES encryption, ensuring privacy and security.

## Benefits

- **Enhanced Productivity:** Leverage AI tools to save time and boost efficiency.
- **User-Friendly Interface:** A sleek and intuitive UI for effortless navigation.
- **Cross-Platform Compatibility:** Accessible on web and mobile devices.
- **End-to-End Encryption:** Ensure communication remains private and secure.

## How It Works

### Sign Up

Create an account using your email and password. Email verification ensures authenticity.

### Chat

Start individual chats with real-time updates.

### AI Assistance

- Use the AI composer for writing assistance.
- Translate messages into any desired language.
- Summarize lengthy documents or ask questions about their content.
- Image Generation: Input text to generate creative and context-appropriate images.

### Secure Communication

All interactions and sensitive information are encrypted.

### Additional Features - 
**Large File Handling:** Capable of handling large files thanks to Dropbox integration along

### Environment Variables
Create a .env file in the backend directory and add the following environment variables:

```env
PORT=your_port_number
MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret_key
NODE_ENV=stautus of development
AES_SECRET=your_aes_encryption_key
GOOGLE_USER=your_google_user_email
GOOGLE_PASS=your_google_user_password
OPENAI_API_KEY=your_openai_api_key
DROPBOX_APP_KEY=your_dropbox_app_key
DROPBOX_APP_SECRET=your_dropbox_app_secret
```

## Application Walkthrough

### Login Section

![1](https://github.com/user-attachments/assets/52ed7d5e-06d7-437d-aaa3-53016256ffac)

### Home Section

![9](https://github.com/user-attachments/assets/fef91a66-1b0b-48b2-b8ad-5727525b31de)

![2](https://github.com/user-attachments/assets/4ea59495-7083-48cb-a536-34ac3678f5f3)

![10](https://github.com/user-attachments/assets/578e7a27-01c1-4b90-ad61-fec68e634e49)

## Some AI Functionality 

### Image Generation

![3](https://github.com/user-attachments/assets/172667a1-0ec0-4c27-abcb-78db6bdce6df)

### Composer

![4](https://github.com/user-attachments/assets/0d304044-806f-40ce-8070-bcf74dc4b910)

### Other AI Functionality

![5](https://github.com/user-attachments/assets/cedd9406-dc83-40a9-ac09-7a2f93f29382)

### Advanced AI-powered chatbot

![6'](https://github.com/user-attachments/assets/2851711e-0d60-4e4f-b10b-eebdb6c4cf99)

![7](https://github.com/user-attachments/assets/f7e48658-737f-4644-9952-f42dd30c1b38)

![8](https://github.com/user-attachments/assets/056ceaa2-49f4-4666-b996-8f90165a01da)

## Getting Started

### Clone the repository

```sh
git clone https://github.com/yourusername/chatapp.git
```


## Install dependencies
### Navigate to the backend directory and install the dependencies:

```sh
cd backend
npm install
```

## Start the backend server
```sh
npm run start
```
## Install frontend dependencies
### Navigate to the frontend directory and install the dependencies:

```sh
cd ../frontend
npm install
```

## Start the frontend application
```sh
npm run dev
```
