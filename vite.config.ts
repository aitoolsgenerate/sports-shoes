Fix all asset paths, imports, and routing so this app works properly on GitHub Pages with `base: '/sports-shoes/'` in `vite.config.ts`:

1. Replace all hardcoded root-relative asset paths like `"/src/assets/..."` across all `.tsx`, `.ts`, `.jsx`, `.js`, and `.css` files with proper ES module imports (e.g., `import img from '@/src/assets/...'` or relative imports `./assets/...`) OR base-aware paths using `${import.meta.env.BASE_URL}` so images and assets never break on `/sports-shoes/`.
2. Check `tsconfig.json` and all `@/` imports to ensure they match `vite.config.ts` (`'@' -> project root`), fixing any broken import paths.
3. If React Router or client-side routing is used, configure it with `basename="/sports-shoes"` (or use HashRouter) so refreshing or opening routes on GitHub Pages does not cause a 404 error.
4. Keep `base: '/sports-shoes/'` and the existing `copy-unbundled-src-assets` plugin in `vite.config.ts` intact, and verify the production build (`npm run build`) completes cleanly with zero missing assets or broken links.
