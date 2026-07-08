# Trust Assessment Engine - Backend Deployment Guide

This document outlines the specific configuration for deploying the Trust Assessment Engine backend to [Render](https://render.com) using Docker.

## Render Configuration

Configure your **Web Service** on Render with the exact parameters below:

- **Build Method:** Docker
- **Root Directory:** `backend`
- **Dockerfile Path:** `Dockerfile` (Relative to the root directory, which evaluates to `backend/Dockerfile`)
- **Port:** `8080`
- **Branch:** `main`

### Docker Configuration
- **Stage 1:** Uses `maven:3.9.8-eclipse-temurin-21` to execute `./mvnw clean package -DskipTests`.
- **Stage 2:** Uses `eclipse-temurin:21-jre` to run the generated application artifact natively.
- **Dynamic JAR Copying:** The Dockerfile is configured to use `COPY --from=build /app/target/*.jar app.jar` to ensure deployment stability without hardcoding artifact versions.

### Health Check Configuration
**Note:** A formal `HEALTHCHECK` directive and `/actuator/health` endpoint configuration have been **intentionally omitted**. 

**Reasoning:** 
A complete project audit revealed that `spring-boot-starter-actuator` is NOT included in the backend's `pom.xml` dependencies. Therefore, exposing an actuator health endpoint would fail and cause false-positive downtime alerts in Render. Render natively tracks application crashes at the container level by monitoring the exposed `8080` TCP port, which serves as a sufficient health indicator for this MVP iteration.

## Troubleshooting
If the container crashes on initialization:
- Verify that the `PORT` environment variable is explicitly set to `8080` in the Render dashboard.
- Check Render logs to verify if the Java runtime exceeded Free-tier memory constraints. If so, configure JVM parameters: `JAVA_TOOL_OPTIONS="-Xmx256m"`.
