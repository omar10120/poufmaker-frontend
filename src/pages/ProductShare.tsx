
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Share2, Upload, Check } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { generateImage } from '@/services/openAIService';

const ProductShare = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [combinedImage, setCombinedImage] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [commission, setCommission] = useState(0);
  
  useEffect(() => {
    // Generate a share URL with referral code
    const referralCode = `REF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const baseUrl = window.location.origin;
    setShareUrl(`${baseUrl}/product/pouf-123?ref=${referralCode}`);
    
    // Set example AI image (in a real app, this would come from previous steps)
    setAiImage('https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-2025-02-15T030416.261.png');
    
    // Calculate commission (10% of price)
    const productPrice = 380;
    setCommission(productPrice * 0.1);
  }, []);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target?.result as string);
        // Simulate processing
        setTimeout(() => {
          generateSideBySideImage(event.target?.result as string, aiImage as string);
          setIsUploading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const generateSideBySideImage = (userImg: string, aiImg: string) => {
    // In a real app, you would combine these images on a server
    // Here we're just setting the AI image as the combined image for demonstration
    setCombinedImage(aiImg);
    toast.success('تم دمج الصور بنجاح!');
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success('تم نسخ الرابط بنجاح');
    
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'شاهد البوف الخاص بي',
          text: 'أحصل على خصم 10% عند الشراء من خلال هذا الرابط',
          url: shareUrl,
        });
        toast.success('تمت مشاركة المنتج بنجاح');
      } else {
        handleCopyLink();
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 rounded-lg p-6 mb-8 text-center">
            <h1 className="text-2xl font-bold text-green-800 mb-2">تم شراء المنتج بنجاح!</h1>
            <p className="text-green-700">سيتم التواصل معك قريباً لتأكيد تفاصيل التوصيل</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold mb-4">شارك منتجك واربح عمولة</h2>
                <p className="text-muted-foreground mb-6">
                  شارك رابط المنتج الخاص بك مع أصدقائك واحصل على عمولة بنسبة 10% من كل عملية شراء تتم من خلال الرابط الخاص بك.
                </p>
                
                <div className="flex items-center mb-6">
                  <Input value={shareUrl} readOnly className="rounded-l-none" />
                  <Button 
                    onClick={handleCopyLink} 
                    variant="outline" 
                    size="icon" 
                    className="h-10 rounded-r-none border-r-0"
                  >
                    {isCopied ? <Check size={18} /> : <Copy size={18} />}
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button onClick={handleShare} className="w-full">
                    <Share2 size={18} className="ml-2" />
                    مشاركة المنتج
                  </Button>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">العمولة المتوقعة لكل عملية بيع</p>
                    <p className="text-lg font-bold text-primary">{commission} جنيه</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold mb-4">أضف صورة لبوف في منزلك</h2>
                <p className="text-muted-foreground mb-4">
                  قم بتحميل صورة للمكان الذي وضعت فيه البوف ليتم عرضها في معرض التصميمات.
                </p>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    {userImage ? (
                      <div>
                        <img 
                          src={userImage} 
                          alt="User uploaded" 
                          className="mx-auto max-h-40 object-contain mb-3" 
                        />
                        <Button variant="ghost" onClick={() => setUserImage(null)}>إزالة الصورة</Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">اضغط لتحميل صورة أو اسحب وأفلت</p>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="image-upload"
                          onChange={handleImageUpload}
                        />
                        <label htmlFor="image-upload">
                          <Button variant="outline" className="cursor-pointer" asChild>
                            <span>اختر صورة</span>
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {combinedImage && (
                    <div>
                      <h3 className="font-medium mb-2">صورتك مع التصميم</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <img 
                          src={combinedImage} 
                          alt="Combined" 
                          className="w-full h-auto" 
                        />
                      </div>
                      <div className="mt-4">
                        <Button variant="secondary" className="w-full">
                          نشر في المعرض العام
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="text-center py-4">
                      <div className="inline-block h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
                      <p className="text-sm text-muted-foreground">جاري معالجة الصورة...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductShare;
