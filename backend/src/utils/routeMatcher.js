function splitPath(pathname) {
  return pathname.split("/").filter(Boolean);
}

function matchPath(pattern, pathname) {
  const patternParts = splitPath(pattern);
  const pathParts = splitPath(pathname);

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params = {};

  for (let index = 0; index < patternParts.length; index += 1) {
    const expected = patternParts[index];
    const actual = pathParts[index];

    if (expected.startsWith(":")) {
      params[expected.slice(1)] = decodeURIComponent(actual);
      continue;
    }

    if (expected !== actual) {
      return null;
    }
  }

  return params;
}

function findRoute(routes, method, pathname) {
  const normalizedMethod = method.toUpperCase();

  for (const route of routes) {
    if (route.method !== normalizedMethod) {
      continue;
    }

    const params = matchPath(route.path, pathname);

    if (params !== null) {
      return { route, params };
    }
  }

  return null;
}

module.exports = {
  findRoute,
  matchPath
};
