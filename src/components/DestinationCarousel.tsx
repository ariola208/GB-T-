import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: number;
  title: string;
  image: string;
};

type Props = {
  slides: Slide[];
};

const DestinationCarousel = ({ slides }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    if (!ref.current) return;
    const width = ref.current.clientWidth;
    ref.current.scrollBy({ left: dir * width * 0.8, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        aria-label="Précédent"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {slides.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="min-w-[80%] snap-center md:min-w-[60%] lg:min-w-[40%]"
          >
            <div className="overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-dramatic">
              <img
                src={s.image}
                alt={s.title}
                className="h-80 w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="bg-card p-4">
                <h3 className="font-heading text-xl font-bold">{s.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => scroll(1)}
        aria-label="Suivant"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default DestinationCarousel;
