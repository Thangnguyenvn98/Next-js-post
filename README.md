

# Next.js 13 FullStack Projects - PostUrThought

This is a web application built with Next.js 13, Prisma, Next-Auth, Tanstack-Query, TypeScript, TailWind and Postgresql, that allows users to authenticate with Google Account, create posts, comment on posts, edit their posts, delete posts, and search for posts.



## Table of Contents

* Getting Started
* Project Structure
* Tech Stack
* Features
* Deployment
* Contributing
* License


## Getting Started

To get started with the application, you will need to follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/your-username/PostUrThought.git

```

2. Navigate to the project directory:


```
cd PostUrThought
```

3. Install the dependencies:
```
npm install
```

4. Create a new PostgreSQL database and add the database credentials to a new file called `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/posturthought"


```

5. Add these credential to a new file created in the folder called `.env.local`

```
GOOGLE_CLIENT_ID = "your-google-client-id"
GOOGLE_CLIENT_SECRET = "your-google-client-secret"
NEXTAUTH_SECRET = TypeWhatEverYouWantInhere
NEXTAUTH_URL = http://localhost:3000/
```

6. Run the migrations

```
npx prisma migrate dev

```

7. Start the application

```
npm run dev

```

## Project Structure

The project has the following directory structure:
```
.
├── app                   # React components used in the application, pages routing
├── pages                 # Next.js pages for the application
├── public                # Public assets (images, fonts, etc.)
├── prisma                # Prisma schema and migrations
├── node_modules          # Dependencies installed
├── styles                # Tailwind CSS styles
├── types                 # TypeScript type definitions
├── .env                  # Environment variables
├── .env.local            # Environment local variables
├── .gitignore            # Files and directories to be ignored by git
├── next.config.js        # Next.js configuration
├── package.json          # NPM dependencies and scripts
├── README.md             # Project README file
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration

```

## Tech Stack

* Next.js 13
* Prisma
* Next-Auth
* Tanstack-Query
* TypeScript
* Tailwind CSS
* PostgreSQL
* Toast
* Axios

## Deployment

This project was deployed on Vercel Platform from the creators of Next.js.

Check out Next.js [deployment documentation](https://vercel.com/docs/concepts/deployments/overview) for more details.

## Features

The application includes the following features:

* User Authentication with Google Account
* Creating a new posts
* Edit existing posts
* Delete existing posts
* Adding comments to your posts and other posts
* Search for posts

## Contributing

Contributions to the project are welcome. Before contributing, please read the contribution guidelines.

## License

This project is licensed under the MIT License.





