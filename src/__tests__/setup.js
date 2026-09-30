// ============================================
// Vitest Test Setup — JSDOM Environment Polyfills
// ============================================

// Mock IntersectionObserver (not available in jsdom)
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.elements = [];
  }
  observe(el) {
    this.elements.push(el);
  }
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver;

// Mock matchMedia (used by MouseGlow)
globalThis.matchMedia = globalThis.matchMedia || function (query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
};
