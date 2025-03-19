
import { useState, useEffect } from 'react';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown } from 'lucide-react';

const ProductGrid = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    const element = document.getElementById('product-grid');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="marketplace" className="section-padding bg-gradient-to-b from-background to-secondary/5">
      <div id="product-grid" className="container mx-auto">
        <div className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            منتجاتنا المميزة
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">اكتشف مجموعتنا من البوف الفاخر</h2>
          <p className="text-muted-foreground">
            نقدم مجموعة متنوعة من البوف المصنوع يدويًا بجودة عالية وتصاميم عصرية تناسب جميع الأذواق
          </p>
        </div>

        <div className={`flex justify-between items-center mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center space-x-reverse space-x-4">
            <Button variant="outline" size="sm" className="flex items-center">
              <Filter size={16} className="ml-2" />
              <span>فلترة</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <span>الأحدث</span>
              <ChevronDown size={16} className="mr-2" />
            </Button>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-muted-foreground">عرض {products.length} منتج</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className={`flex justify-center mt-12 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <Button variant="outline" size="lg" className="min-w-[200px]">
            عرض المزيد
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
