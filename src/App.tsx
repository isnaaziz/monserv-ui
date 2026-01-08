import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { routes } from './routes';
import { ThemeProvider } from './context/ThemeContext';

// Loading fallback component
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="size-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-zinc-500">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <DashboardLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </DashboardLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
