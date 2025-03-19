
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/10 to-background p-4">
      <div className="text-center max-w-md animate-fade-up">
        <div className="mb-6 relative">
          <span className="text-9xl font-bold text-primary opacity-10">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">صفحة غير موجودة</h1>
          </div>
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Button asChild size="lg" className="min-w-[200px]">
          <a href="/" className="inline-flex items-center">
            <ArrowRight size={18} className="ml-2" />
            <span>العودة للرئيسية</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
