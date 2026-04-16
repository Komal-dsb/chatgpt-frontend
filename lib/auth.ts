import { betterAuth } from "better-auth";
// import { nextjs } from "better-auth/nextjs";

export const auth = betterAuth({
  baseURL: "http://localhost:5000",
  // Add your database and other configurations here
  // For example:
  // database: yourDatabaseConfig,
  // email: yourEmailConfig,
  // socialProviders: yourSocialProviders,
});