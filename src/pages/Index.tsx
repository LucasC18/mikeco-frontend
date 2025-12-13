import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import { products } from "@/data/products";
import { Category } from "@/types/product";
import { Sparkles, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-starwars.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category as Category);

      const matchesStock = !showOnlyInStock || product.inStock;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchQuery, selectedCategories, showOnlyInStock]);

  const scrollToProducts = () => {
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      {/* Epic Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="LEGO Star Wars Epic Battle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-secondary animate-pulse-glow" />
              <span className="text-sm font-medium text-secondary">
                Colección Exclusiva
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-foreground drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
                LEGO
              </span>
              <br />
              <span className="text-gradient">VAULT</span>
            </h1>

            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Explorá nuestra colección de sets de LEGO. Agregá los que te
              interesen y consultá directamente por WhatsApp.
            </p>

            <motion.button
              onClick={scrollToProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-lg rounded-lg neon-glow hover:bg-primary/90 transition-colors"
            >
              Ver Colección
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={scrollToProducts}
            >
              <span className="text-muted-foreground text-sm">Scroll</span>
              <ChevronDown className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <main id="productos" className="container mx-auto px-4 py-20 bg-grid">
        {/* Search and Filters */}
        <div className="space-y-6 mb-10">
          <div className="flex justify-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <Filters
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            showOnlyInStock={showOnlyInStock}
            onStockFilterChange={setShowOnlyInStock}
          />
        </div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-muted-foreground text-sm">
            Mostrando{" "}
            <span className="text-primary font-semibold">
              {filteredProducts.length}
            </span>{" "}
            de{" "}
            <span className="text-primary font-semibold">{products.length}</span>{" "}
            productos
          </p>
        </motion.div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </main>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Index;
