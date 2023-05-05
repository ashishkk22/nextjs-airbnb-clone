
<div align="center">
  <h1>Airbnb NextJs Clone</h1>
</div>

<br />

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://www.prisma.io/">Prisma</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- Property owners can add their properties to the website and they can manage their properties' reservations.
- Users can filter the properties like countries, dates, rooms, guests etc.
- Users can add the properties to the favourites section.
- Users can manage their existing reservations from my reservation section
- This website supports login with GitHub, Google and Email.

<!-- Env Variables -->

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file. you can refer .env.example file for the references.

`DATABASE_URL`
`NEXTAUTH_SECRET`
`GOOGLE_ID`
`GOOGLE_SECRET`
`GITHUB_ID`
`GITHUB_SECRET`
`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

<!-- Getting Started -->

## :toolbox: Getting Started

### System Requirements

- git v2.13 or greater
- nodejs `14 || 16 || 18`
- npm v8.16.0 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```

<!-- Prerequisites -->

### :bangbang: Prerequisites

This project uses Yarn as package manager

```bash
 npm install --global yarn
```

<!-- Run Locally -->

### :running: Run Locally

Clone the project

```bash
  https://github.com/ashishkk22/nextjs-airbnb-clone.git
```

Go to the project directory

```bash
  cd nextjs-airbnb-clone
```

Install dependencies and add the required environment variables in the .env

```bash
  yarn install
```

To synchronize your Prisma schema with your database schema run

```bash
  npx prisma db push
```

Start the dev server

```bash
  yarn dev
```


<!-- Contact -->

## :handshake: Contact

Ashish Kachhadiya - ashishkachhadiya22@gmail.com
