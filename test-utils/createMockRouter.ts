import { NextRouter } from "next/router";
import { vi } from "vitest";

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    query: {},
    isFallback: false,
    back: vi.fn(),
    beforePopState: vi.fn(),
    basePath: "/",
    pathname: "/",
    route: "/",
    asPath: "/",
    prefetch: vi.fn(),
    push: vi.fn(),
    reload: vi.fn(),
    replace: vi.fn(),
    events: {
      off: vi.fn(),
      on: vi.fn(),
      emit: vi.fn(),
    },
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    forward: vi.fn(),
    locale: "/",
    locales: [],
    ...router,
  };
}
