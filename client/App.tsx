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
import { AuthProvider } from "./contexts/AuthContext";

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

// Importation de la page de profil
import Profile from "./pages/Profile";

// Importations des nouvelles pages
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import Cookies from "./pages/Cookies";
import Contact from "./pages/Contact";

// Importations des nouvelles pages livraison et retours
import Livraison from "./pages/Livraison";
import Retours from "./pages/Retours";

// Importations des nouvelles pages demandées
import Vetements from "./pages/Vetements";
import Gastronomie from "./pages/Gastronomie";
import Promotions from "./pages/Promotions";
import CircuitsTourisme from "./pages/CircuitsTourisme";
import Restauration from "./pages/Restauration";
import ImpactDurable from "./pages/ImpactDurable";
import Artisans from "./pages/Artisans";

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
          <AuthProvider>
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
                      
                      {/* Page de profil */}
                      <Route path="/profile" element={<Profile />} />
                      
                      {/* Nouvelles pages informatives */}
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsOfUse />} />
                      <Route path="/cookies" element={<Cookies />} />
                      <Route path="/contact" element={<Contact />} />
                      
                      {/* Pages Livraison et Retours */}
                      <Route path="/livraison" element={<Livraison />} />
                      <Route path="/retours" element={<Retours />} />
                      
                      {/* Nouvelles pages demandées */}
                      <Route path="/vetements" element={<Vetements />} />
                      <Route path="/gastronomie" element={<Gastronomie />} />
                      <Route path="/promotions" element={<Promotions />} />
                      <Route path="/circuits-tourisme" element={<CircuitsTourisme />} />
                      <Route path="/restauration" element={<Restauration />} />
                      <Route path="/impact" element={<ImpactDurable />} />
                      <Route path="/artisans" element={<Artisans />} />
                      
                      {/* Page 404 - doit être en dernier */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
