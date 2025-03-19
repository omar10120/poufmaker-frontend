
import { useState } from 'react';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md card-hover"
      style={{ 
        opacity: 0,
        animation: 'fade-up 0.5s forwards',
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/10">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        <button className={`absolute top-4 left-4 p-2 rounded-full bg-white/90 shadow-sm text-foreground transition-all duration-300 hover:bg-white hover:text-primary ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Heart size={18} />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">{product.title}</h3>
          <span className="text-lg font-bold text-primary">{product.price} جنيه</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center space-x-0.5 space-x-reverse mr-1.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
          
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary transition-colors">
            <ShoppingCart size={16} className="ml-1.5" />
            <span>إضافة</span>
          </Button>
        </div>
      </div>
      
      <div className={`absolute inset-x-0 bottom-0 h-1 bg-primary transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
    </div>
  );
};

export default ProductCard;
