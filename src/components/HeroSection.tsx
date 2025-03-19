
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Wand2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleDesignClick = () => {
    // Navigate to AI Generator section in the same page
    const aiGeneratorSection = document.getElementById('ai-generator');
    if (aiGeneratorSection) {
      aiGeneratorSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('AI Generator section not found');
    }
  };

  const handleShopClick = () => {
    // Navigate to the product grid section
    const productGridSection = document.getElementById('product-grid');
    if (productGridSection) {
      productGridSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Product grid section not found');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 to-transparent -z-10"></div>
      <div 
        className="absolute top-20 -right-60 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl -z-10"
        style={{ 
          opacity: isLoaded ? 0.4 : 0,
          transition: 'opacity 1s ease-in-out 0.3s'
        }}
      ></div>
      <div 
        className="absolute bottom-20 -left-40 w-[400px] h-[400px] rounded-full bg-secondary/20 blur-3xl -z-10"
        style={{ 
          opacity: isLoaded ? 0.5 : 0,
          transition: 'opacity 1s ease-in-out 0.6s'
        }}
      ></div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div 
          className="order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
          }}
        >
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6">
            صمم البوف المثالي لمنزلك <span className="text-primary">بسهولة</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            منصة رائدة تربط بين العملاء والحرفيين لتصميم وتنفيذ البوف المثالي. قم بتحميل صورة أو استخدم الذكاء الاصطناعي لإنشاء تصميمك واحصل على عروض مخصصة.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              onClick={handleDesignClick}
            >
              <Wand2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              ابدأ التصميم الآن
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-md"
              onClick={handleShopClick}
            >
              <ShoppingBag className="mr-2 h-5 w-5 group-hover:rotate-6 transition-transform" />
              تصفح المتجر
            </Button>
          </div>
          <div className="mt-12 flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-foreground">+500</span>
              <span className="text-muted-foreground">حرفي محترف</span>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-foreground">+2000</span>
              <span className="text-muted-foreground">منتج مُنفَذ</span>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-foreground">+95%</span>
              <span className="text-muted-foreground">عملاء راضون</span>
            </div>
          </div>
        </div>
        
        <div 
          className="order-1 lg:order-2 relative"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
            transition: 'opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s'
          }}
        >
          <div className="relative aspect-square max-w-[500px] mx-auto">
            <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full animate-pulse"></div>
            <img 
              src="https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-6.png" 
              alt="بوف فاخر" 
              className="relative z-10 w-full h-full object-contain animate-float"
              loading="lazy"
            />
          </div>
          <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm font-semibold">جودة عالية</span>
            </div>
          </div>
          <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
              <span className="text-sm font-semibold">تصنيع محلي</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
