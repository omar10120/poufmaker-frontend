
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sparkles, Upload, Image as ImageIcon, Check, Loader2, Download, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { generateImage, enhancePromptForPouf } from '@/services/openAIService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AIGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState<string>('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  // Advanced options
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [poufSize, setPoufSize] = useState('');
  const [style, setStyle] = useState('');
  
  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error('يرجى إدخال وصف للتصميم المطلوب');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const enhancedPrompt = showAdvancedOptions 
        ? enhancePromptForPouf(description, { 
            material, 
            color, 
            size: poufSize, 
            style 
          })
        : description;
      
      const result = await generateImage({ 
        prompt: enhancedPrompt,
        size: "1024x1024",
        quality: "standard",
        style: "vivid"
      });
      
      if (result) {
        setGeneratedImage(result.url);
        setHasGenerated(true);
        toast.success('تم إنشاء التصميم بنجاح');
      }
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error('فشل في إنشاء التصميم، يرجى المحاولة مرة أخرى');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleReset = () => {
    setGeneratedImage(null);
    setHasGenerated(false);
  };
  
  const handleDownload = () => {
    if (!generatedImage) return;
    
    // Create temporary anchor to download image
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `pouf-design-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('جاري تنزيل الصورة');
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="ai-generator" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles size={16} className="ml-2" />
            <span>بدعم الذكاء الاصطناعي</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">صمم البوف المثالي بسهولة</h2>
          <p className="text-muted-foreground">
            استخدم الذكاء الاصطناعي لإنشاء تصميم البوف الذي تحلم به أو قم بتحميل صورة لتحصل على عروض مخصصة من الحرفيين المحترفين
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-scale-in">
          <Tabs defaultValue="ai" className="w-full">
            <div className="border-b">
              <div className="px-6">
                <TabsList className="h-14 w-full justify-start gap-4 rounded-none bg-transparent p-0">
                  <TabsTrigger
                    value="ai"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
                  >
                    <Sparkles size={18} className="ml-2" />
                    إنشاء بالذكاء الاصطناعي
                  </TabsTrigger>
                  <TabsTrigger
                    value="upload"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary"
                  >
                    <Upload size={18} className="ml-2" />
                    تحميل صورة
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="ai" className="p-0 m-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 md:p-8 border-b md:border-b-0 md:border-l">
                  <h3 className="text-xl font-semibold mb-6">وصف التصميم الذي تريده</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="title">عنوان التصميم</Label>
                      <Input 
                        id="title" 
                        placeholder="مثال: بوف دائري مخملي بأرجل خشبية" 
                        className="mt-2" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">وصف مفصل</Label>
                      <Textarea 
                        id="description" 
                        placeholder="صف شكل ولون وحجم ومواد البوف الذي ترغب به..." 
                        className="min-h-[120px] mt-2" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="budget">الميزانية المتوقعة (جنيه)</Label>
                      <Input 
                        id="budget" 
                        type="number" 
                        placeholder="500" 
                        className="mt-2"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-reverse space-x-2">
                        <Switch 
                          id="advanced" 
                          checked={showAdvancedOptions}
                          onCheckedChange={setShowAdvancedOptions}
                        />
                        <Label htmlFor="advanced">خيارات متقدمة</Label>
                      </div>
                      
                      <Button 
                        onClick={handleGenerate} 
                        disabled={isGenerating || !description.trim()} 
                        className="min-w-[120px]"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 size={16} className="ml-2 animate-spin" />
                            جاري الإنشاء...
                          </>
                        ) : hasGenerated ? (
                          <>
                            <Check size={16} className="ml-2" />
                            تم الإنشاء
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} className="ml-2" />
                            إنشاء التصميم
                          </>
                        )}
                      </Button>
                    </div>
                    
                    {showAdvancedOptions && (
                      <div className="p-4 bg-muted/30 rounded-lg space-y-4 animate-fade-in">
                        <h4 className="font-medium text-sm mb-2">خيارات متقدمة للتصميم</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="material">المادة</Label>
                            <Select value={material} onValueChange={setMaterial}>
                              <SelectTrigger id="material" className="mt-1">
                                <SelectValue placeholder="اختر مادة الصنع" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="قطيفة">قطيفة</SelectItem>
                                <SelectItem value="جلد">جلد</SelectItem>
                                <SelectItem value="قماش">قماش</SelectItem>
                                <SelectItem value="مخمل">مخمل</SelectItem>
                                <SelectItem value="قطن">قطن</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="color">اللون</Label>
                            <Select value={color} onValueChange={setColor}>
                              <SelectTrigger id="color" className="mt-1">
                                <SelectValue placeholder="اختر اللون" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="أبيض">أبيض</SelectItem>
                                <SelectItem value="أسود">أسود</SelectItem>
                                <SelectItem value="رمادي">رمادي</SelectItem>
                                <SelectItem value="بني">بني</SelectItem>
                                <SelectItem value="أزرق">أزرق</SelectItem>
                                <SelectItem value="أخضر">أخضر</SelectItem>
                                <SelectItem value="أحمر">أحمر</SelectItem>
                                <SelectItem value="ذهبي">ذهبي</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="size">الحجم</Label>
                            <Select value={poufSize} onValueChange={setPoufSize}>
                              <SelectTrigger id="size" className="mt-1">
                                <SelectValue placeholder="اختر الحجم" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="صغير">صغير</SelectItem>
                                <SelectItem value="متوسط">متوسط</SelectItem>
                                <SelectItem value="كبير">كبير</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="style">النمط</Label>
                            <Select value={style} onValueChange={setStyle}>
                              <SelectTrigger id="style" className="mt-1">
                                <SelectValue placeholder="اختر النمط" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="مغربي">مغربي</SelectItem>
                                <SelectItem value="عصري">عصري</SelectItem>
                                <SelectItem value="كلاسيكي">كلاسيكي</SelectItem>
                                <SelectItem value="بسيط">بسيط</SelectItem>
                                <SelectItem value="فاخر">فاخر</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 md:p-8 bg-muted/30">
                  <h3 className="text-xl font-semibold mb-6">معاينة التصميم</h3>
                  
                  {generatedImage ? (
                    <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm relative">
                      <img 
                        src={generatedImage} 
                        alt="التصميم المولّد" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-md">
                        تم الإنشاء بالذكاء الاصطناعي
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square flex flex-col items-center justify-center rounded-lg bg-white/50 border border-dashed border-muted-foreground/20">
                      {isGenerating ? (
                        <>
                          <Loader2 size={48} className="text-primary mb-4 animate-spin" />
                          <p className="text-muted-foreground text-center max-w-xs">
                            جاري إنشاء التصميم... قد تستغرق العملية بضع ثوانٍ
                          </p>
                        </>
                      ) : (
                        <>
                          <ImageIcon size={48} className="text-muted-foreground/40 mb-4" />
                          <p className="text-muted-foreground text-center max-w-xs">
                            أدخل وصفًا مفصلًا واضغط على زر الإنشاء لتوليد تصميمك بالذكاء الاصطناعي
                          </p>
                        </>
                      )}
                    </div>
                  )}
                  
                  {generatedImage && (
                    <div className="mt-6 flex justify-end space-x-reverse space-x-3">
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw size={16} className="ml-2" />
                        إعادة الإنشاء
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download size={16} className="ml-2" />
                        تنزيل
                      </Button>
                      <Button size="sm">
                        طلب عروض
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="p-0 m-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 md:p-8 border-b md:border-b-0 md:border-l">
                  <h3 className="text-xl font-semibold mb-6">تحميل صورة المنتج</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="upload-title">عنوان المنتج</Label>
                      <Input id="upload-title" placeholder="مثال: بوف دائري مخملي" className="mt-2" />
                    </div>
                    
                    <div>
                      <Label htmlFor="upload-description">وصف المنتج</Label>
                      <Textarea 
                        id="upload-description" 
                        placeholder="أضف وصفًا للمنتج الذي تريد تصنيعه..." 
                        className="min-h-[120px] mt-2" 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="upload-budget">الميزانية المتوقعة (جنيه)</Label>
                      <Input id="upload-budget" type="number" placeholder="500" className="mt-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex items-center space-x-reverse space-x-2 text-primary">
                          <Upload size={16} />
                          <span>تغيير الصورة</span>
                        </div>
                        <input 
                          id="file-upload" 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden" 
                        />
                      </Label>
                      
                      <Button disabled={!uploadedImage} className="min-w-[120px]">
                        طلب عروض
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 bg-muted/30">
                  <h3 className="text-xl font-semibold mb-6">صورة المنتج</h3>
                  
                  {uploadedImage ? (
                    <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
                      <img 
                        src={uploadedImage} 
                        alt="الصورة المحملة" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <label 
                      htmlFor="file-upload-area" 
                      className="aspect-square flex flex-col items-center justify-center rounded-lg bg-white/50 border border-dashed border-muted-foreground/20 cursor-pointer"
                    >
                      <Upload size={48} className="text-muted-foreground/40 mb-4" />
                      <p className="text-muted-foreground text-center max-w-xs">
                        اضغط لتحميل صورة أو اسحب الصورة وأفلتها هنا
                      </p>
                      <input 
                        id="file-upload-area" 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AIGenerator;
