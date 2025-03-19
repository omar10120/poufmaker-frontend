
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Offer {
  id: string;
  sellerId: string;
  sellerName: string;
  price: number;
  description: string;
  estimatedDelivery: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const Offers = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      sellerId: 'seller1',
      sellerName: 'محمد صالح',
      price: 350,
      description: 'بوف مخملي فاخر بألوان طبيعية',
      estimatedDelivery: '10-15 يوم',
      status: 'pending'
    },
    {
      id: '2',
      sellerId: 'seller2',
      sellerName: 'أحمد علي',
      price: 420,
      description: 'بوف جلدي أصلي مع تطريز مميز',
      estimatedDelivery: '7-10 أيام',
      status: 'pending'
    },
    {
      id: '3',
      sellerId: 'seller3',
      sellerName: 'عمر محمود',
      price: 380,
      description: 'بوف قطني ناعم بألوان متعددة',
      estimatedDelivery: '12-18 يوم',
      status: 'pending'
    }
  ]);
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleAcceptOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowPaymentForm(true);
  };
  
  const handleRejectOffer = (offerId: string) => {
    setOffers(offers.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: 'rejected' as const } 
        : offer
    ));
    toast.success('تم رفض العرض بنجاح');
  };
  
  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error('الرجاء اختيار طريقة الدفع');
      return;
    }
    
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setShowPaymentForm(false);
      
      if (selectedOffer) {
        setOffers(offers.map(offer => 
          offer.id === selectedOffer.id 
            ? { ...offer, status: 'accepted' as const } 
            : offer
        ));
        
        toast.success('تمت عملية الدفع بنجاح');
        setTimeout(() => {
          navigate('/products/share');
        }, 1500);
      }
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-10 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">عروضك</h1>
          
          {offers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-muted-foreground mb-4">ليس لديك أي عروض حالياً</p>
              <Button onClick={() => navigate('/')}>العودة للصفحة الرئيسية</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {offers.map(offer => (
                <div 
                  key={offer.id} 
                  className={`bg-white p-6 rounded-lg shadow-md border ${
                    offer.status === 'accepted' ? 'border-green-400' : 
                    offer.status === 'rejected' ? 'border-red-400 opacity-60' : 'border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">عرض من {offer.sellerName}</h3>
                      <p className="text-muted-foreground">{offer.description}</p>
                    </div>
                    <p className="text-xl font-bold text-primary">{offer.price} جنيه</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm">مدة التسليم المتوقعة: {offer.estimatedDelivery}</p>
                    
                    {offer.status === 'pending' && (
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => handleRejectOffer(offer.id)}
                        >
                          رفض
                        </Button>
                        <Button onClick={() => handleAcceptOffer(offer)}>
                          قبول والدفع
                        </Button>
                      </div>
                    )}
                    
                    {offer.status === 'accepted' && (
                      <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">
                        تم قبول العرض
                      </div>
                    )}
                    
                    {offer.status === 'rejected' && (
                      <div className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-sm">
                        تم رفض العرض
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {showPaymentForm && selectedOffer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">إتمام الدفع</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-lg font-medium">المبلغ الإجمالي</p>
                  <p className="text-3xl font-bold text-primary">{selectedOffer.price} جنيه</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm mb-2">اختر طريقة الدفع</p>
                  
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طريقة الدفع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">بطاقة ائتمان</SelectItem>
                      <SelectItem value="debit_card">بطاقة خصم</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank_transfer">تحويل بنكي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowPaymentForm(false)} className="flex-1">
                    إلغاء
                  </Button>
                  <Button 
                    onClick={handlePayment} 
                    className="flex-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="mr-2">جاري المعالجة</span>
                        <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
                      </>
                    ) : (
                      'إتمام الدفع'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Offers;
