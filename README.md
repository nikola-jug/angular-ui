# angular-ui

Angular 21 single-page application for the web frontend. Communicates with the BFF exclusively via a session cookie — it never holds or sees OAuth2 tokens. In Docker, it is served by nginx over HTTPS.

## Purpose

- Provides the user-facing web interface for the BFF architecture
- Initiates OAuth2 login flows by navigating to the BFF's `/oauth2/authorization/{provider}` endpoint
- Calls the BFF's proxied API endpoints (`/api/profile`, `/api/payments`) with `withCredentials: true`
- Handles authentication state via an `authGuard` and a `credentialsInterceptor`

## Routes

| Route | Guard | Description |
|---|---|---|
| `/` | None | Home — redirects to `/profile` if already authenticated |
| `/profile` | `authGuard` | Displays profile data from the Resource Server |
| `/payments` | `authGuard` | Displays payments data (Keycloak login required; shows a helpful message for Auth Server users) |

## Development server

```bash
npm install
npm start   # http://localhost:4200
```

The dev server proxies nothing — API calls go directly to `https://spring-boot-web-bff:8080`. Add `spring-boot-web-bff` to `/etc/hosts` pointing to `127.0.0.1` and ensure the BFF is running.

## Docker (production-like)

nginx serves the compiled app over HTTPS. Build the image and start the container from this directory:

```bash
docker compose up -d --build
```

The Angular app is compiled with the `docker` build configuration, which replaces `environment.ts` with `environment.docker.ts` (`bffBaseUrl: 'https://spring-boot-web-bff:8080'`).

The nginx container binds ports 443 and 80 on the host. Port 80 redirects to HTTPS.

## Configuration

| File | Used when | `bffBaseUrl` |
|---|---|---|
| `src/environments/environment.ts` | Local dev (`npm start`) | `http://spring-boot-web-bff:8080` |
| `src/environments/environment.docker.ts` | Docker build | `https://spring-boot-web-bff:8080` |

## Caveats

- **`withCredentials: true` on all requests** — the `credentialsInterceptor` adds this to every outbound HTTP call so the browser includes the session cookie in cross-site requests to the BFF.
- **HTTPS is required in Docker** — the session cookie is `SameSite=None; Secure`. Browsers will not send it over plain HTTP, which breaks the entire OAuth2 flow. See the root `README.md` for mkcert setup.
- **Standalone components only** — there are no NgModules. All DI is wired in `app.config.ts` via `provide*()` functions.
- **Prettier** — 100-char line width, single quotes. Run `npx prettier --write .` before committing.
