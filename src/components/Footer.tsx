
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, ChevronRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white pt-16 pb-8 border-t">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-primary">PoufMaker</h2>
              <p className="text-muted-foreground mt-2">
                منصة تربط بين العملاء والحرفيين لتصميم وتنفيذ البوف المثالي بسهولة وجودة عالية.
              </p>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-white transition-colors">
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight size={16} className="ml-1" />
                  <span>الصفحة الرئيسية</span>
                </a>
              </li>
              <li>
                <a href="#marketplace" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight size={16} className="ml-1" />
                  <span>المتجر</span>
                </a>
              </li>
              <li>
                <a href="#ai-generator" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight size={16} className="ml-1" />
                  <span>مولد الصور</span>
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight size={16} className="ml-1" />
                  <span>عن الموقع</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <ChevronRight size={16} className="ml-1" />
                  <span>تواصل معنا</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="ml-2 mt-1 text-primary" />
                <span className="text-muted-foreground">الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-2 text-primary" />
                <span className="text-muted-foreground">+966 12 345 6789</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="ml-2 text-primary" />
                <span className="text-muted-foreground">info@poufmaker.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">النشرة البريدية</h3>
            <p className="text-muted-foreground mb-4">
              اشترك في نشرتنا البريدية للحصول على أحدث العروض والتصاميم.
            </p>
            <div className="flex">
              <Input type="email" placeholder="بريدك الإلكتروني" className="rounded-l-none ml-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
              <Button type="submit" className="rounded-r-none">اشتراك</Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PoufMaker - جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
