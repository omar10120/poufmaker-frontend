
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { AuthModals } from '@/components/AuthModals';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground mr-4">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="text-2xl font-bold text-primary">
              PoufMaker
            </Link>
          </div>

          <nav className={`fixed md:static inset-0 bg-white/95 md:bg-transparent ${
            mobileMenuOpen ? 'flex flex-col pt-20' : 'hidden md:flex'
          } md:flex-row md:items-center md:pt-0 md:space-x-0 md:space-x-reverse space-y-6 md:space-y-0 md:space-x-6 p-6 md:p-0`}>
            <Link to="/" className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1">
              الرئيسية
            </Link>
            <a href="#product-grid" className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1">
              المتجر
            </a>
            <a href="#ai-generator" className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1">
              مولد الصور
            </a>
            <Link to="/offers" className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1">
              العروض
            </Link>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium px-2 py-1">
              تواصل معنا
            </a>
          </nav>

          <div className="flex items-center space-x-0 space-x-reverse space-x-4">
            <button className="rounded-full p-2 text-foreground hover:bg-muted transition-colors">
              <Search size={20} />
            </button>
            <button className="rounded-full p-2 text-foreground hover:bg-muted transition-colors">
              <ShoppingCart size={20} />
            </button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User size={18} className="ml-2" />
                    <span>{user.FullName || user.Email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>المنتجات المفضلة</DropdownMenuItem>
                  <DropdownMenuItem>طلباتي</DropdownMenuItem>
                  <DropdownMenuItem>تعديل الملف الشخصي</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
                    <LogOut size={16} className="ml-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:flex items-center"
                onClick={() => setAuthModalOpen(true)}
              >
                <User size={18} className="ml-2" />
                <span>تسجيل الدخول</span>
              </Button>
            )}
            
            <Link to="/offers">
              <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
                طلب عروض
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <AuthModals open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};

export default Navbar;
