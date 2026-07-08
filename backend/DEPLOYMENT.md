# Trust Assessment Engine - Backend Deployment Guide

This document outlines the steps and configuration required to deploy the Trust Assessment Engine backend to [Render](https://render.com) using Docker.

## Render Configuration

When creating a new **Web Service** on Render, use the following configuration:

- **Build Method:** Docker
- **Root Directory:** `backend`
- **Branch:** `main`
- **Region:** Any supported region (e.g., Oregon, Frankfurt)
- **Instance Type:** Starter (or Free tier if within limits)

### Environment Variables
Configure the following environment variables in the Render dashboard:
- `PORT`: `8080` (Matches the exposed port in the Dockerfile)
- *Database URL, API Keys, etc. should be added here as needed for your specific deployment.*

## Docker Runtime

The deployment utilizes a production-ready, multi-stage `Dockerfile`:
1. **Stage 1 (Build):** Uses `maven:3.9.6-eclipse-temurin-21` to compile and package the Spring Boot application, bypassing tests for faster deployments.
2. **Stage 2 (Runtime):** Uses the highly optimized `eclipse-temurin:21-jre-alpine` image to minimize footprint and reduce attack vectors. The application runs as a non-root `spring` user.

## Build Process
During the Render deployment process, Render will automatically detect the `Dockerfile` inside the `backend` directory (due to the specified Root Directory). It will execute:
```bash
docker build -t trust-engine-backend .
```

## Start Process
Upon successful build, Render will spin up the container. The Docker image inherently defines the entry point:
```bash
java -jar app.jar
```

## Health Check URL
Ensure Render can verify the application's uptime.
- **Path:** `/actuator/health` (Assuming Spring Boot Actuator is enabled) or the root `/` endpoint.

## Troubleshooting

1. **Deployment Fails during Build:**
   - Verify that all dependencies are resolvable and the Maven wrapper/pom.xml are intact.
   - Check the `.dockerignore` file to ensure necessary files (`src/`, `pom.xml`) are not inadvertently excluded.

2. **Container Fails to Start (OOM):**
   - Java applications can consume significant memory. If the container is killed upon startup on a Free instance, configure JVM memory limits via an environment variable in Render: 
     `JAVA_TOOL_OPTIONS="-Xmx256m -Xss512k"`

3. **Port Binding Issues:**
   - Render automatically maps the external port to your internal `PORT` variable. Ensure the Spring Boot application is listening on port `8080` (which is the default, and is explicitly exposed in the Dockerfile).
