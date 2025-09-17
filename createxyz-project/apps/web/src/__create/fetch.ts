const originalFetch = fetch;

// Store original fetch globally so other modules can access it
if (typeof globalThis !== 'undefined') {
  globalThis.originalFetch = originalFetch;
}
const isBackend = () => typeof window === 'undefined';

const safeStringify = (value: unknown) =>
  JSON.stringify(value, (_k, v) => {
    if (v instanceof Date) return { __t: 'Date', v: v.toISOString() };
    if (v instanceof Error)
      return { __t: 'Error', v: { name: v.name, message: v.message, stack: v.stack } };
    return v;
  });

const postToParent = (level: string, text: string, extra: unknown) => {
  try {
    if (isBackend() || !window.parent || window.parent === window) {
      ('level' in console ? console[level] : console.log)(text, extra);
      return;
    }
    window.parent.postMessage(
      {
        type: 'sandbox:web:console-write',
        __viteConsole: true,
        level,
        text,
        args: [safeStringify(extra)],
      },
      '*'
    );
  } catch {
    /* noop */
  }
};
const getURlFromArgs = (...args: Parameters<typeof originalFetch>): string => {
  const [urlArg] = args;
  let url: string;
  if (typeof urlArg === 'string') {
    url = urlArg;
  } else if (urlArg instanceof Request) {
    url = urlArg.url;
  } else {
    url = `${urlArg.protocol}//${urlArg.host}${urlArg.pathname}`;
  }
  return url;
};

const isFirstPartyURL = (url: string) => {
  return url.startsWith('/integrations') || url.startsWith('/api');
};

const isExternalURL = (url: string) => {
  return url.startsWith('http://') || url.startsWith('https://');
};

export const fetchWithHeaders = async function fetchWithHeaders(
  ...args: Parameters<typeof originalFetch>
) {
  const [input, init] = args;
  const url = getURlFromArgs(input, init);

  // If it's an external URL (like Google Apps Script), use original fetch without modifications
  if (isExternalURL(url)) {
    return originalFetch(input, init);
  }

  const headers = {
    'x-createxyz-project-group-id': process.env.NEXT_PUBLIC_PROJECT_GROUP_ID,
  };
  
  const isInternalAPI = isFirstPartyURL(url);
  
  // For internal APIs, we should not add custom headers to /api routes or external fetches
  if (!isInternalAPI || url.startsWith('/api')) {
    return originalFetch(input, init);
  }

  // Fix: Parse headers object correctly and merge them
  const finalHeaders = new Headers(init?.headers ?? {});
  for (const [key, value] of Object.entries(headers)) {
    if (value) {
      finalHeaders.set(key, value);
    }
  }

  if (input instanceof Request) {
    for (const [key, value] of Object.entries(headers)) {
      if (value) {
        input.headers.set(key, value);
      }
    }
  }

  try {
    const result = await originalFetch(
      `${isBackend() ? (process.env.NEXT_PUBLIC_CREATE_BASE_URL ?? 'https://www.create.xyz') : ''}${input}`,
      {
        ...init,
        headers: finalHeaders,
      }
    );
    if (!result.ok) {
      postToParent(
        'error',
        `Failed to load resource: the server responded with a status of ${result.status} (${result.statusText ?? ''})`,
        {
          url,
          status: result.status,
          statusText: result.statusText,
        }
      );
    }
    return result;
  } catch (error) {
    postToParent('error', 'Fetch error', {
      url,
      error:
        error instanceof Error
          ? { name: error.name, message: error.message, stack: error.stack }
          : error,
    });
    throw error; // rethrow the error after logging
  }
};

export default fetchWithHeaders;
