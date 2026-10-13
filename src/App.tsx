import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = lazy(() => import("./pages/Index"));
const Destinations = lazy(() => import("./pages/Destinations"));
const Culture = lazy(() => import("./pages/Culture"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Faq = lazy(() => import("./pages/Faq"));
const Soul = lazy(() => import("./pages/Soul"));
const Planner = lazy(() => import("./pages/Planner"));
const Login = lazy(() => import("./pages/Login"));
const Carte = lazy(() => import("./pages/Carte"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Carnet = lazy(() => import("./pages/Carnet"));
const Infos = lazy(() => import("./pages/Infos"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const routes = [
  { path: "/", element: Index },
  { path: "/destinations", element: Destinations },
  { path: "/culture", element: Culture },
  { path: "/about", element: About },
  { path: "/contact", element: Contact },
  { path: "/profile", element: Profile },
  { path: "/services", element: Services },
  { path: "/blog", element: Blog },
  { path: "/gallery", element: Gallery },
  { path: "/faq", element: Faq },
  { path: "/login", element: Login },
  { path: "/ame-du-benin", element: Soul },
  { path: "/planifier", element: Planner },
  { path: "/carte", element: Carte },
  { path: "/quiz", element: Quiz },
  { path: "/carnet", element: Carnet },
  { path: "/infos-pratiques", element: Infos },
  { path: "*", element: NotFound },
];

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FloatingWhatsApp />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner size="lg" fullScreen />}>
          <Routes>
            {routes.map(({ path, element: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
