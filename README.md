# AI Talent Discovery Platform

A platform designed to help recruiters discover AI professionals by allowing users to upload their profiles, skills, experience, and projects. Recruiters can search using a natural language-powered search bar and apply filters to find suitable candidates.

## Features

- User Authentication & Profile Management
- Natural Language Search & Filtering
- Resume Handling & Profile Import
- Recruiter Features (bookmarking, contacting candidates)
- Notifications & Messaging
- Security & Privacy

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL for structured data
- **Search**: Natural language search integration
- **Authentication**: JWT for secure authentication

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/opportu-ai.git
cd opportu-ai
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit the `.env.local` file with your configuration.

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app`: Next.js App Router pages and layouts
- `/src/components`: Reusable UI components
- `/src/lib`: Utility functions and shared code
- `/src/api`: API routes and handlers
- `/src/models`: Database models and schemas
- `/public`: Static assets

## License

[MIT](LICENSE) 
