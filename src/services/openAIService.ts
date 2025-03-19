import { toast } from "sonner";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = import.meta.env.VITE_OPENAI_API_URL || "https://api.openai.com/v1/images/generations";

export interface GenerateImageParams {
  prompt: string;
  model?: string;
  n?: number;
  size?: string;
  quality?: string;
  style?: string;
}

export interface GeneratedImage {
  url: string;
  revisedPrompt?: string;
}

// Helper function to enhance prompts with relevant context
export const enhancePromptForPouf = (prompt: string, options: { 
  material?: string, 
  color?: string, 
  size?: string,
  style?: string
}) => {
  const { material, color, size, style } = options;
  
  let enhancedPrompt = prompt;
  
  if (material) enhancedPrompt += `, مصنوع من ${material}`;
  if (color) enhancedPrompt += `, بلون ${color}`;
  if (size) enhancedPrompt += `, بحجم ${size}`;
  if (style) enhancedPrompt += `, بتصميم ${style}`;
  
  return enhancedPrompt;
};

export const generateImage = async (params: GenerateImageParams): Promise<GeneratedImage | null> => {
  if (!OPENAI_API_KEY) {
    toast.error("OpenAI API key is not configured");
    return null;
  }

  try {
    const { prompt, model = "dall-e-3", n = 1, size = "1024x1024", quality = "standard", style = "vivid" } = params;
    
    // Add Arabic context to the prompt to improve results for pouf designs
    const enhancedPrompt = `بوف (pouf - Ottoman furniture) design: ${prompt}. Photorealistic, high detail, elegant furniture, interior design, Moroccan style`;
    
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        prompt: enhancedPrompt,
        n,
        size,
        quality,
        style
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(errorData.error?.message || "فشل في إنشاء الصورة");
    }

    const data = await response.json();
    return {
      url: data.data[0].url,
      revisedPrompt: data.data[0].revised_prompt
    };
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error(error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الصورة");
    return null;
  }
};
