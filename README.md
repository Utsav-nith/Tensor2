# TensorGo Project

This repository contains assessment for Tensorgo where I was asked to build a billing invoice and automation application

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Utsav-nith/Tensor2.git
   ```

2. Install dependencies for the client1 and the server:

   ```bash
   cd client1
   npm install

   cd server
   npm install
   ```

3. Fill the `.env`
   - create `.env` file in server folder in root directory and enter the following path
     `bash
        PORT=
        MONGO_URL=
        CLIENT_ID=
        CLIENT_SECRET=
        EMAIL=
        PASSWORD=
     `
     `Note` I have mentioned the .env file in the submission , kindly copy and paste that

## Usage

1. Run the client:

   ```bash
   cd client1
   npm start
   ```

   This will start the client1 application.

2. Run the service host:

   ```bash
   cd server
   npm start
   ```
   This will start the server application 

### About

1.Mainly CRUD functionalities for Invoice Management and also there are some action like pdf generation and reminder generation to send email to user using nodemailer and mailgen

2.Adding a Google Oauth without token
