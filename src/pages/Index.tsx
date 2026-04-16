import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load des sections pour optimiser le chargement initial
const HeroSection = lazy(() => import("@/components/HeroSection"));
const DestinationsPreview = lazy(() => import("@/components/DestinationsPreview"));
const CultureSection = lazy(() => import("@/components/CultureSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        }>
          <HeroSection />
          <DestinationsPreview />
          <CultureSection />
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
