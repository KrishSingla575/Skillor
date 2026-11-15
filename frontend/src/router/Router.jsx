import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const RouterContext = createContext(null);


export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname + window.location.search || '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to, options = {}) => {
    if (!to) return;
    if (to === currentPath && !options.replace) return;

    if (options.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const value = useMemo(
    () => ({
      currentPath,
      navigate,
    }),
    [currentPath]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    return {
      currentPath: typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/',
      navigate: (to, options = {}) => {
        if (!to || typeof window === 'undefined') return;
        if (options.replace) {
          window.history.replaceState({}, '', to);
        } else {
          window.history.pushState({}, '', to);
        }
        window.dispatchEvent(new PopStateEvent('popstate'));
      },
    };
  }
  return ctx;
}

export function useNavigate() {
  const { navigate } = useRouter();
  return navigate;
}

export function useLocation() {
  const { currentPath } = useRouter();
  const [pathname, search] = (currentPath || '/').split('?');
  return {
    pathname: pathname || '/',
    search: search ? `?${search}` : '',
    hash: typeof window !== 'undefined' ? window.location.hash || '' : '',
    fullPath: currentPath,
  };
}

export function matchRoute(pattern, pathname) {
  const cleanPath = (pathname || '').split('?')[0].split('#')[0];


  if (pattern === cleanPath) {
    return { matches: true, params: {} };
  }

  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = cleanPath.split('/').filter(Boolean);

  if (patternParts.length !== pathParts.length) {

    if (
      patternParts.length === 2 &&
      patternParts[1].startsWith(':') &&
      pathParts.length === 1 &&
      patternParts[0] === pathParts[0]
    ) {
      return { matches: true, params: { [patternParts[1].slice(1)]: null } };
    }
    return { matches: false, params: {} };
  }

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pPart = patternParts[i];
    const actualPart = pathParts[i];

    if (pPart.startsWith(':')) {
      const paramName = pPart.slice(1);
      params[paramName] = decodeURIComponent(actualPart);
    } else if (pPart !== actualPart) {
      return { matches: false, params: {} };
    }
  }

  return { matches: true, params };
}

export function Link({ to, children, className = '', onClick, ...props }) {
  const { navigate, currentPath } = useRouter();
  const currentClean = (currentPath || '').split('?')[0];
  const toClean = (to || '').split('?')[0];
  const isActive = currentClean === toClean;

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={`${className} ${isActive ? 'active' : ''}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
}

export default {
  RouterProvider,
  useRouter,
  useNavigate,
  useLocation,
  matchRoute,
  Link,
};