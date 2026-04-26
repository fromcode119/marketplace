'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const httpProxy = require('http-proxy');

const apiTarget = process.env.API_TARGET || 'http://127.0.0.1:4000';
const adminTarget = process.env.ADMIN_TARGET || 'http://127.0.0.1:3001';
const port = Number(process.env.GATEWAY_PORT || process.env.PORT || 80);
const adminBasePath = resolveAdminBasePath(process.env.ADMIN_BASE_PATH, process.env.ADMIN_URL);
const retryDelayMs = Number(process.env.GATEWAY_RETRY_DELAY_MS || 350);
const retryableMethods = new Set(['GET', 'HEAD', 'OPTIONS']);
const retryableErrorCodes = new Set(['ECONNREFUSED', 'ECONNRESET', 'EPIPE', 'ETIMEDOUT']);

const proxy = httpProxy.createProxyServer({ ws: true });

proxy.on('error', (error, req, res) => {
  const method = String(req?.method || 'GET').toUpperCase();
  const url = String(req?.url || '/');
  const target = String(req?._proxyTarget || resolveTarget(url));
  const attempt = Number(req?._proxyAttempt || 1);
  const code = String(error?.code || '').trim() || 'UNKNOWN';
  const message = String(error?.message || '').trim() || '(empty message)';
  const syscall = String(error?.syscall || '').trim();
  const address = String(error?.address || '').trim();
  const errorPort = error?.port != null ? String(error.port) : '';

  console.error(
    `[single-domain-gateway] Proxy error method=${method} url=${url} target=${target} attempt=${attempt} code=${code} message=${message}` +
      `${syscall ? ` syscall=${syscall}` : ''}` +
      `${address ? ` address=${address}` : ''}` +
      `${errorPort ? ` port=${errorPort}` : ''}`
  );

  if (shouldRetryProxyRequest(error, req, res)) {
    req._proxyAttempt = attempt + 1;
    console.warn(
      `[single-domain-gateway] Retrying ${method} ${url} -> ${target} in ${retryDelayMs}ms (attempt ${req._proxyAttempt})`
    );
    setTimeout(() => {
      if (!res.destroyed) {
        proxy.web(req, res, { target });
      }
    }, retryDelayMs);
    return;
  }

  if (res && 'writeHead' in res && typeof res.writeHead === 'function' && !res.headersSent) {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Service unavailable - is the target process running?');
  }
});

const isApiPath = (pathname) => RequestSurfaceUtils ? RequestSurfaceUtils.isApiPath(pathname) : pathname.startsWith('/api');
const isAdminPath = (pathname) => hasPathPrefix(normalizePathname(pathname), adminBasePath);

let RequestSurfaceUtils;
try {
  ({ RequestSurfaceUtils } = require('@fromcode119/core'));
} catch {
  console.warn('[single-domain-gateway] @fromcode119/core not found; using local path detection.');
  RequestSurfaceUtils = null;
}

function normalizePathname(value) {
  const raw = String(value || '').trim();
  if (!raw) return '/';
  try {
    const parsed = new URL(raw, 'http://placeholder.local');
    const pathname = String(parsed.pathname || '/').trim();
    if (!pathname) return '/';
    return pathname.startsWith('/') ? pathname : `/${pathname}`;
  } catch {
    return raw.startsWith('/') ? raw : `/${raw}`;
  }
}

function normalizePathPrefix(value) {
  const normalized = normalizePathname(value).replace(/\/+$/, '');
  return normalized === '/' ? '/' : normalized;
}

function hasPathPrefix(pathname, prefix) {
  const normalizedPath = normalizePathname(pathname);
  const normalizedPrefix = normalizePathPrefix(prefix);
  if (normalizedPrefix === '/') {
    return normalizedPath.startsWith('/');
  }
  return normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`);
}

function resolveAdminBasePath(rawBasePath, rawAdminUrl) {
  const configuredBasePath = normalizePathPrefix(rawBasePath || '');
  if (configuredBasePath && configuredBasePath !== '/') {
    return configuredBasePath;
  }

  try {
    const parsed = new URL(String(rawAdminUrl || '').trim());
    const derived = normalizePathPrefix(parsed.pathname || '/admin');
    return derived === '/' ? '/admin' : derived;
  } catch {
    return '/admin';
  }
}

function shouldRetryProxyRequest(error, req, res) {
  if (!req || !res || res.headersSent || res.destroyed) {
    return false;
  }

  const method = String(req.method || 'GET').toUpperCase();
  if (!retryableMethods.has(method)) {
    return false;
  }

  const attempt = Number(req._proxyAttempt || 1);
  if (attempt >= 2) {
    return false;
  }

  const code = String(error?.code || '').trim().toUpperCase();
  return retryableErrorCodes.has(code);
}

class MarketplacePublicRouteMapper {
  static rewrite(url) {
    const pathname = (url || '/').split('?')[0].split('#')[0];
    const search = url && url.includes('?') ? url.slice(url.indexOf('?')) : '';

    if (pathname === '/marketplace.json') {
      return `/api/v1/plugins/marketplace${pathname}${search}`;
    }

    if (
      pathname.startsWith('/download/') ||
      pathname.startsWith('/download-theme/') ||
      pathname.startsWith('/download-core/') ||
      pathname.startsWith('/docs/') ||
      pathname.startsWith('/stats/')
    ) {
      return `/api/v1/plugins/marketplace${pathname}${search}`;
    }

    if (pathname === '/submit' || pathname === '/sync') {
      return `/api/v1/plugins/marketplace${pathname}${search}`;
    }

    return '';
  }
}

class MarketplaceStaticAssetResponder {
  static rootDir = '/app/marketplace';

  static assetDirectories = [
    { prefix: '/plugins/', dir: 'plugins' },
    { prefix: '/themes/', dir: 'themes' },
    { prefix: '/core/', dir: 'core' }
  ];

  static contentTypes = {
    '.zip': 'application/zip',
    '.json': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml'
  };

  static tryRespond(req, res) {
    if (!req?.url || !['GET', 'HEAD'].includes(String(req.method || 'GET').toUpperCase())) {
      return false;
    }

    const pathname = req.url.split('?')[0].split('#')[0];
    const match = this.assetDirectories.find((entry) => pathname.startsWith(entry.prefix));
    if (!match) {
      return false;
    }

    const relativePath = decodeURIComponent(pathname.slice(match.prefix.length));
    if (!relativePath || relativePath.includes('..')) {
      this.respondNotFound(res);
      return true;
    }

    const baseDir = path.resolve(this.rootDir, match.dir);
    const filePath = path.resolve(baseDir, relativePath);
    if (!filePath.startsWith(baseDir + path.sep) && filePath !== baseDir) {
      this.respondNotFound(res);
      return true;
    }

    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch {
      return false;
    }

    if (!stat.isFile()) {
      return false;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = this.contentTypes[extension] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });

    if (String(req.method || 'GET').toUpperCase() === 'HEAD') {
      res.end();
      return true;
    }

    fs.createReadStream(filePath).pipe(res);
    return true;
  }

  static respondNotFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
}

const resolveTarget = (url) => {
  const pathname = (url || '/').split('?')[0].split('#')[0];
  if (isApiPath(pathname)) {
    return apiTarget;
  }
  if (isAdminPath(pathname)) {
    return adminTarget;
  }
  return apiTarget;
};

const server = http.createServer((req, res) => {
  if (MarketplaceStaticAssetResponder.tryRespond(req, res)) {
    return;
  }
  const rewrittenUrl = MarketplacePublicRouteMapper.rewrite(req.url);
  if (rewrittenUrl) {
    req.url = rewrittenUrl;
  }
  const target = resolveTarget(req.url);
  req._proxyTarget = target;
  req._proxyAttempt = 1;
  console.log(`[single-domain-gateway] ${req.method} ${req.url} -> ${target}`);
  proxy.web(req, res, { target });
});

server.on('upgrade', (req, socket, head) => {
  const rewrittenUrl = MarketplacePublicRouteMapper.rewrite(req.url);
  if (rewrittenUrl) {
    req.url = rewrittenUrl;
  }
  const target = resolveTarget(req.url);
  console.log(`[single-domain-gateway] UPGRADE ${req.url} -> ${target}`);
  proxy.ws(req, socket, head, { target });
});

server.listen(port, () => {
  console.log(`[single-domain-gateway] Listening on http://0.0.0.0:${port}`);
  console.log(`[single-domain-gateway] API target: ${apiTarget}`);
  console.log(`[single-domain-gateway] Admin target: ${adminTarget}`);
  if (RequestSurfaceUtils) {
    console.log(`[single-domain-gateway] Admin base path: ${RequestSurfaceUtils.ADMIN_BASE_PATH}`);
  }
  console.log(`[single-domain-gateway] Local admin base path: ${adminBasePath}`);
});
