# Caseora Backend

Production-ready RESTful API backend for an iPhone Back Cover E-commerce business.
Built with Node.js, Express.js, TypeScript, PostgreSQL, and Prisma ORM.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Make sure you have a `.env` file at the root. You can copy the contents of `.env.local` to `.env`.
   ```bash
   cp .env.local .env
   ```

3. **Database Setup**
   Ensure your PostgreSQL instance is running and update the `DATABASE_URL` in `.env`.
   Run the following Prisma commands to generate the client and push the schema:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:5000`.

## Build for Production
```bash
npm run build
```
Start the production server:
```bash
npm start
```
