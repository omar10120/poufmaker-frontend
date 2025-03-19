
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    title: "بوف مخملي دائري",
    description: "بوف أنيق مصنوع من الطبيعي مع نسيج ناعم للغاية",
    price: 320,
    image: "https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-6.png",
    rating: 4.8,
    reviews: 56
  },
  {
    id: "2",
    title: "بوف جلدي مربع",
    description: "بوف فاخر مصنوع من الجلد الطبيعي الفاخر بتصميم عصري",
    price: 450,
    image: "https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-2025-02-15T030716.538-1.png",
    rating: 4.9,
    reviews: 42
  },
  {
    id: "3",
    title: "بوف قطيفة ناعم",
    description: "بوف مميز بتصميم عصري مصنوع من القطيفة الناعمة والمريحة",
    price: 280,
    image: "https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-2025-02-15T030947.859.png",
    rating: 4.7,
    reviews: 38
  },
  {
    id: "4",
    title: "بوف مزخرف تقليدي",
    description: "بوف بتصميم كلاسيكي مميز مع زخارف شرقية أصلية",
    price: 380,
    image: "https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-86.png",
    rating: 4.9,
    reviews: 65
  },
  {
    id: "5",
    title: "بوف مخملي فخم",
    description: "بوف فخم بتصميم أنيق ومريح مصنوع من المخمل الفاخر",
    price: 420,
    image: "https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-2025-02-15T030416.261.png",
    rating: 4.8,
    reviews: 47
  },
  {
    id: "6",
    title: "بوف ملكي مزخرف",
    description: "بوف راقي بزخارف ذهبية وتصميم ملكي يليق بالقصور",
    price: 580,
    image: "https://poufmushroom.com/wp-content/uploads/2025/02/image_fx_-2025-02-15T030418.394.png",
    rating: 5.0,
    reviews: 29
  }
];
