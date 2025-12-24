import { Product } from "@/types/product"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, PackageX, Plus, Check } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { motion } from "framer-motion"

interface Props {
  product: Product | null
  open: boolean
  onClose: () => void
}

const ProductDetailModal = ({ product, open, onClose }: Props) => {
  const { addToCart, isInCart } = useCart()
  if (!product) return null

  const inCart = isInCart(product.id)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-6xl
          w-full
          max-h-[95vh]
          p-0
          bg-neutral-950
          border border-white/10
          overflow-y-auto
          lg:overflow-hidden
        "
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative w-full h-[260px] sm:h-[340px] lg:h-full">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* INFO */}
          <div className="flex flex-col justify-between px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-12">

            {/* TOP */}
            <div className="space-y-4 lg:space-y-6">

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                {product.name}
              </h2>

              {/* BADGES */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`px-3 py-1 text-xs sm:text-sm font-semibold ${
                    product.inStock
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {product.inStock ? (
                    <>
                      <Package className="w-4 h-4 mr-2" />
                      Disponible
                    </>
                  ) : (
                    <>
                      <PackageX className="w-4 h-4 mr-2" />
                      No disponible
                    </>
                  )}
                </Badge>

                <Badge
                  variant="outline"
                  className="px-3 py-1 text-xs sm:text-sm bg-secondary/20 text-secondary border-secondary/50"
                >
                  {product.category}
                </Badge>
              </div>

              {/* DESCRIPTION */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Button
                disabled={!product.inStock || inCart}
                onClick={() => addToCart(product)}
                size="lg"
                variant={inCart ? "outline" : "default"}
                className={`w-full h-12 sm:h-14 ${
                  inCart
                    ? "bg-primary/20 text-primary border-primary/50"
                    : product.inStock
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground cursor-not-allowed"
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Ya en consulta
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Agregar a consulta
                  </>
                )}
              </Button>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailModal
