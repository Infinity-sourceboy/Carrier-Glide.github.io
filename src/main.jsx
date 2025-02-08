const rootElement = document.getElementById('root');
let root;

// Check if a root already exists
if (!rootElement._reactRootContainer) {
  root = createRoot(rootElement);
} else {
  root = rootElement._reactRootContainer._internalRoot;
}

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
); 