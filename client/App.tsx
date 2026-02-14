import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { LanguageProvider } from "./contexts/LanguageContext";

// Importations des pages existantes
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Tourism from "./pages/Tourism";
import Artisanat from "./pages/Artisanat";
import Culture from "./pages/Culture";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Importations des composants d'authentification
import Login from "./pages/Login";
import Register from "./pages/Register";

// Importations des nouvelles pages
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Cookies from "./pages/Cookies";

const queryClient = new QueryClient();

if (typeof window !== "undefined") {
  document.documentElement.classList.add("dark");
}

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Layout>
                  <Routes>
                    {/* Pages principales */}
                    <Route path="/" element={<Index />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/tourism" element={<Tourism />} />
                    <Route path="/artisanat" element={<Artisanat />} />
                    <Route path="/culture" element={<Culture />} />
                    <Route path="/about" element={<About />} />
                    
                    {/* Pages d'authentification */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Nouvelles pages informatives */}
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/cookies" element={<Cookies />} />
                    
                    {/* Page 404 - doit être en dernier */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
