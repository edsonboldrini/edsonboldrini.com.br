# syntax=docker/dockerfile:1

# Next.js 16 requires Node 20.9+; the host still runs EOL Node 18, which is
# exactly why the production build happens in here and never on the host.
ARG NODE_VERSION=22-alpine

# ---- deps: install only what package-lock pins, cached separately from source
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: produce .next/standalone
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner: minimal image, no build tooling, no full node_modules
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Run as an unprivileged user rather than root.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# standalone already contains the pruned node_modules and the server entrypoint.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
