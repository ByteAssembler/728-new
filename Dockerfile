# ---- Build Stage ----
FROM node:20-alpine AS builder
# Use a specific Node.js LTS version on Alpine for a smaller image size

# Install pnpm globally within the build stage
RUN npm install -g pnpm

WORKDIR /app

# Copy package manifests first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./
# Install all dependencies (including devDependencies needed for the build) using the lockfile
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Set NODE_ENV for the build process, if required by build scripts
ENV NODE_ENV=production
# Build the production-ready application artifacts
RUN pnpm run build
# This should generate output in the '.output' directory based on your config

# ---- Production Stage ----
FROM node:20-alpine
# Use the same slim Node.js base image for the final production image

WORKDIR /app

# Set runtime environment variables
ENV NODE_ENV=production
ENV PORT=3000
# Listen on all available network interfaces within the container
ENV ADDRESS=0.0.0.0

# Copy only the essential build artifacts from the builder stage
COPY --from=builder /app/.output ./.output
# If your application requires package.json or production node_modules at runtime (beyond Node built-ins),
# copy package.json/pnpm-lock.yaml and run 'pnpm install --prod' here.
# Otherwise, this minimal setup using the explicit 'node' command is sufficient.

# Expose the port the application will run on
EXPOSE 3000

# Define the command to run the production server
# Uses the entrypoint specified in your start script/build output
CMD ["node", ".output/server/index.mjs"]
