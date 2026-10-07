# Shop Showcase

A beginner-friendly marketplace app where you can add items, let guests comment, and share a Line contact button to buy each item.

## Features
- Add products with title, price, description, image, and Line ID
- Guest comments with username and message
- Buy button links directly to Line chat
- MongoDB database for persistent storage
- Works well for a simple marketplace landing page

## Tech stack
- Node.js
- Express
- MongoDB with Mongoose
- HTML + CSS + JavaScript

## Run locally
1. Install dependencies:
   npm install
2. Create a `.env` file using `.env.example`
3. Add your MongoDB connection string
4. Start the app:
   npm start
5. Open http://localhost:3000

## MongoDB Atlas setup
1. Create a free MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Get the MongoDB connection string
5. Paste it into `.env` as `MONGODB_URI`

Example:
MONGODB_URI=mongodb+srv://yourUser:yourPassword@cluster0.mongodb.net/shopshowcase?retryWrites=true&w=majority

## Deploy to Vercel
1. Push this repo to GitHub
2. Import it into Vercel
3. Add the `MONGODB_URI` environment variable in the Vercel project settings
4. Deploy

## Notes
This version is designed for a cleaner beginner-friendly marketplace and uses MongoDB instead of SQLite so the data persists in the cloud.
