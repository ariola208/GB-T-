import { motion } from "framer-motion";
import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Download,
  Share2,
  Camera,
  Filter,
  Grid3x3,
  Grid2x2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const categories = ["Toutes", "Paysages", "Culture", "Faune", "Villes", "Plages", "Traditions"];

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800", category: "Culture", title: "Ganvié", location: "Lac Nokoué" },
  { id: 2, src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800", category: "Traditions", title: "Porte du Non-Retour", location: "Ouidah" },
  { id: 3, src: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800", category: "Culture", title: "Palais Royaux", location: "Abomey" },
  { id: 4, src: "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800", category: "Faune", title: "Éléphants", location: "Pendjari" },
  { id: 5, src: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800", category: "Villes", title: "Cotonou", location: "Littoral" },
  { id: 6, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", category: "Plages", title: "Grand-Popo", location: "Mono" },
  { id: 7, src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800", category: "Culture", title: "Marché", location: "Dantokpa" },
  { id: 8, src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800", category: "Paysages", title: "Collines", location: "Atacora" },
  { id: 9, src: "https://images.unsplash.com/photo-1590080669915-3d4e68d2e20f?w=800", category: "Culture", title: "Pirogues", location: "Ganvié" },
  { id: 10, src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800", category: "Traditions", title: "Cérémonie", location: "Ouidah" },
  { id: 11, src: "https://images.unsplash.com/photo-1589308078059-be3c3044eccc?w=800", category: "Culture", title: "Bas-reliefs", location: "Abomey" },
  { id: 12, src: "https://images.unsplash.com/photo-1547970810-dc1e93b62d48?w=800", category: "Faune", title: "Lion", location: "Pendjari" },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [viewMode, setViewMode] = useState<"grid3" | "grid2">("grid3");
  const [likedImages, setLikedImages] = useState<number[]>([]);

  const filteredImages = selectedCategory === "Toutes" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const toggleLike = (id: number) => {
    setLikedImages(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Badge className="mb-4">Galerie</Badge>
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6">
                Le Bénin en images
              </h1>
              <p className="text-xl text-muted-foreground">
                Découvrez la beauté du Bénin à travers notre collection de photos
              </p>
            </motion.div>
          </div>
        </section>

        {/* Controls */}
        <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-sm z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid3" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid3")}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid2" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid2")}
                >
                  <Grid2x2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={`grid gap-4 ${
                viewMode === "grid3" 
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                  : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-square">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-white font-bold">{image.title}</h3>
                        <p className="text-white/80 text-sm">{image.location}</p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(image.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${likedImages.includes(image.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Badge className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {image.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/95" onClick={() => setSelectedImage(null)} />
          
          <div className="relative z-10 max-w-5xl w-full mx-4">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 text-white hover:bg-black/70"
                onClick={() => toggleLike(selectedImage.id)}
              >
                <Heart className={`w-4 h-4 ${likedImages.includes(selectedImage.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 text-white hover:bg-black/70"
              >
                <Share2 className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 text-white hover:bg-black/70"
              >
                <Download className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 text-white hover:bg-black/70"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handleNextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-xl">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.location}</p>
            </div>
            <div className="absolute bottom-4 right-4 text-white/60 text-sm">
              {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
