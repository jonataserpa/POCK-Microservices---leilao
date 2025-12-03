FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json turbo.json ./
COPY apps/portal-publico/package.json ./apps/portal-publico/package.json
COPY apps/painel-admin/package.json ./apps/painel-admin/package.json
COPY packages/ui-kit/package.json ./packages/ui-kit/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

# Install dependencies
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the project
WORKDIR /app/apps/painel-admin
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/painel-admin/public ./apps/painel-admin/public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/painel-admin/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/painel-admin/.next/static ./apps/painel-admin/.next/static

USER nextjs

EXPOSE 3002

ENV PORT 3002
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "apps/painel-admin/server.js"]
