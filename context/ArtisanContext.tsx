'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ProductItem {
  id: string;
  titleHi: string;
  titleEn: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock';
  category: string;
  imageUrl: string;
  giTag: boolean;
  craftType: string;
  views: number;
  salesCount: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  buyerName: string;
  buyerCity: string;
  productNameHi: string;
  productNameEn: string;
  productImage: string;
  amount: number;
  quantity: number;
  status: 'new' | 'processing' | 'ready_to_dispatch' | 'delivered';
  orderDate: string;
  chatMessages: { id: string; sender: 'buyer' | 'artisan'; text: string; time: string; voiceUrl?: string }[];
}

export interface WizardState {
  photoUrl: string;
  enhancedPhotoUrl: string;
  bgPreset: 'linen' | 'studio' | 'terracotta' | 'wood';
  voiceTranscriptHi: string;
  voiceTranscriptEn: string;
  titleHi: string;
  titleEn: string;
  storyHi: string;
  storyEn: string;
  materialTags: string[];
  craftTechnique: string;
  materialCost: number;
  craftHours: number;
  hourlyRate: number;
  overheadCost: number;
  calculatedPrice: number;
  marketPriceRange: string;
  stockQty: number;
}

interface ArtisanContextType {
  language: string;
  setLanguage: (lang: string) => void;
  artisanNameHi: string;
  artisanNameEn: string;
  artisanLocation: string;
  craftTypeHi: string;
  craftTypeEn: string;
  vishwakarmaId: string;
  totalEarnings: number;
  products: ProductItem[];
  orders: OrderItem[];
  wizard: WizardState;
  setWizard: React.Dispatch<React.SetStateAction<WizardState>>;
  updateWizard: (partial: Partial<WizardState>) => void;
  resetWizard: () => void;
  addProductFromWizard: () => ProductItem;
  toggleProductStatus: (id: string) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderItem['status']) => void;
  sendChatMessage: (orderId: string, text: string) => void;
  speakText: (textHi: string, textEn?: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const initialWizardState: WizardState = {
  photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1dqIARw-1xwjhImYi0ed79aPZugCiKHaooqJM9bhSX0ocqPxRxP7wjFizIBLafRT-SoIeAg8XI0dWrrjwVhw9guXylvOdkLQHhRXclIWT92fr22mrAZedkJOtBiTyE6pi8hkokqQx6XLAGVKiMW9Ev9UfcL92vcY1E5O2U6wqurHFCuAwem1-NdYkx2gClUTjlNl1ncyxwiOS3Wj4vez2_b-yxoWTR2yGNPciA1M806vw8I3dtWgi',
  enhancedPhotoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1dqIARw-1xwjhImYi0ed79aPZugCiKHaooqJM9bhSX0ocqPxRxP7wjFizIBLafRT-SoIeAg8XI0dWrrjwVhw9guXylvOdkLQHhRXclIWT92fr22mrAZedkJOtBiTyE6pi8hkokqQx6XLAGVKiMW9Ev9UfcL92vcY1E5O2U6wqurHFCuAwem1-NdYkx2gClUTjlNl1ncyxwiOS3Wj4vez2_b-yxoWTR2yGNPciA1M806vw8I3dtWgi',
  bgPreset: 'linen',
  voiceTranscriptHi: 'यह एक हाथ से बना मिट्टी का दीपक पात्र है, जिस पर गंगा माटी की नक्काशी और शुद्ध प्राकृतिक रंग का प्रयोग किया गया है।',
  voiceTranscriptEn: 'This is a hand-carved terracotta oil lamp pot made from Ganga clay with natural dye finishes.',
  titleHi: 'हाथ से बना गंगा माटी टेराकोटा कलश',
  titleEn: 'Handcrafted Heritage Terracotta Kalash',
  storyHi: 'वाराणसी की पवित्र गंगा नदी के तट से ली गई मिट्टी से निर्मित। प्राचीन मिट्टी कला शैली में 12 घंटे भट्टियों में पकाकर तैयार किया गया टिकाऊ हस्तशिल्प।',
  storyEn: 'Hand-fashioned from sacred Varanasi clay, fired for 12 hours in traditional kiln furnaces following century-old artisan techniques.',
  materialTags: ['शुद्ध टेराकोटा (Pure Terracotta)', 'गंगा माटी (River Clay)', 'जीआई टैग प्रमाणित (GI Tag Certified)'],
  craftTechnique: 'कड़वा बुनाई व प्राकृतिक नक्काशी',
  materialCost: 250,
  craftHours: 8,
  hourlyRate: 150,
  overheadCost: 100,
  calculatedPrice: 1550,
  marketPriceRange: '₹1,400 - ₹1,800',
  stockQty: 5,
};

const initialProducts: ProductItem[] = [
  {
    id: 'p1',
    titleHi: 'बनारसी काढ़वा रेशम साड़ी',
    titleEn: 'Handwoven Banarasi Kadwa Silk Saree',
    price: 8450,
    stock: 4,
    status: 'active',
    category: 'Handloom',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_dwPgjCDx1nmh8Nxa5chUCMmhh3ltjM7kuQ-HZ3GFY5T-Ll_opK8c8b3ZqSZ4cypNOBdbFwiY1bGVL5BRrBOZ4OxC75Xjf82CNrjCbrwGWbsRiS04JrOyAp3EqNaHLmewrABzCR_1XxYDd456Y-JXeOVDWGFZZ2dlg7CvCHNwmqnzYW7QwejN9kMYzVVqOmtXCDPAC4muh3_IxiRH5wRRcDDqWw8GzQI3Xs9Pgi08U4qohUiSt8G',
    giTag: true,
    craftType: 'Banarasi Weaving',
    views: 342,
    salesCount: 12,
    createdAt: '2026-09-20',
  },
  {
    id: 'p2',
    titleHi: 'हस्तनिर्मित पीतल दीपक सेठ',
    titleEn: 'Hand-carved Brass Oil Lamp Set',
    price: 1850,
    stock: 8,
    status: 'active',
    category: 'Brassware',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80',
    giTag: true,
    craftType: 'Metalwork',
    views: 189,
    salesCount: 18,
    createdAt: '2026-09-22',
  },
  {
    id: 'p3',
    titleHi: 'लकड़ी की नक्काशीदार मूर्ति',
    titleEn: 'Carved Wooden Artifact',
    price: 3200,
    stock: 2,
    status: 'active',
    category: 'Woodcraft',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    giTag: false,
    craftType: 'Woodworking',
    views: 94,
    salesCount: 5,
    createdAt: '2026-09-24',
  },
  {
    id: 'p4',
    titleHi: 'ऑर्गेनिक इंडिगो ब्लॉक प्रिंट दुपट्टा',
    titleEn: 'Organic Indigo Block-Print Dupatta',
    price: 1250,
    stock: 0,
    status: 'out_of_stock',
    category: 'Textile',
    imageUrl: 'https://images.unsplash.com/photo-1606744888344-49423b7413f2?auto=format&fit=crop&w=600&q=80',
    giTag: true,
    craftType: 'Block Print',
    views: 210,
    salesCount: 22,
    createdAt: '2026-09-15',
  },
];

const initialOrders: OrderItem[] = [
  {
    id: 'ORD-8821',
    buyerName: 'Priya Sharma',
    buyerCity: 'Bengaluru, Karnataka',
    productNameHi: 'बनारसी काढ़वा रेशम साड़ी',
    productNameEn: 'Banarasi Kadwa Silk Saree',
    productImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_dwPgjCDx1nmh8Nxa5chUCMmhh3ltjM7kuQ-HZ3GFY5T-Ll_opK8c8b3ZqSZ4cypNOBdbFwiY1bGVL5BRrBOZ4OxC75Xjf82CNrjCbrwGWbsRiS04JrOyAp3EqNaHLmewrABzCR_1XxYDd456Y-JXeOVDWGFZZ2dlg7CvCHNwmqnzYW7QwejN9kMYzVVqOmtXCDPAC4muh3_IxiRH5wRRcDDqWw8GzQI3Xs9Pgi08U4qohUiSt8G',
    amount: 8450,
    quantity: 1,
    status: 'new',
    orderDate: 'Today, 11:30 AM',
    chatMessages: [
      { id: 'm1', sender: 'buyer', text: 'Namaste Ramesh ji! Is this saree pure Banarasi silk with GI tag certification?', time: '11:32 AM' },
      { id: 'm2', sender: 'artisan', text: 'नमस्ते प्रिया जी! जी हां, यह 100% शुद्ध रेशम और भारत सरकार द्वारा जीआई टैग प्रमाणित है।', time: '11:35 AM' },
      { id: 'm3', sender: 'buyer', text: 'Wonderful! Please pack it securely. Looking forward to receiving it.', time: '11:38 AM' },
    ],
  },
  {
    id: 'ORD-8819',
    buyerName: 'Vikram Mehta',
    buyerCity: 'Mumbai, Maharashtra',
    productNameHi: 'हस्तनिर्मित पीतल दीपक सेठ',
    productNameEn: 'Hand-carved Brass Oil Lamp Set',
    productImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=600&q=80',
    amount: 3700,
    quantity: 2,
    status: 'ready_to_dispatch',
    orderDate: 'Yesterday',
    chatMessages: [
      { id: 'm1', sender: 'buyer', text: 'Hi, when will this order be dispatched?', time: 'Yesterday' },
      { id: 'm2', sender: 'artisan', text: 'नमस्ते जी, आपका ऑर्डर आज स्पीड पोस्ट से भेजा जा रहा है। ट्रैकिंग नंबर जल्द शेयर करेंगे।', time: 'Yesterday' },
    ],
  },
  {
    id: 'ORD-8790',
    buyerName: 'Ananya Roy',
    buyerCity: 'Kolkata, West Bengal',
    productNameHi: 'ऑर्गेनिक इंडिगो ब्लॉक प्रिंट दुपट्टा',
    productNameEn: 'Organic Indigo Block-Print Dupatta',
    productImage: 'https://images.unsplash.com/photo-1606744888344-49423b7413f2?auto=format&fit=crop&w=600&q=80',
    amount: 1250,
    quantity: 1,
    status: 'delivered',
    orderDate: '24 Sep 2026',
    chatMessages: [
      { id: 'm1', sender: 'buyer', text: 'Received the dupatta! Beautiful craftsmanship, thank you so much.', time: '25 Sep' },
    ],
  },
];

const ArtisanContext = createContext<ArtisanContextType | undefined>(undefined);

export const ArtisanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('hi');
  const [wizard, setWizard] = useState<WizardState>(initialWizardState);
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const artisanNameHi = 'रमेश कुमार';
  const artisanNameEn = 'Ramesh Kumar';
  const artisanLocation = 'Varanasi, Uttar Pradesh';
  const craftTypeHi = 'बनारसी हथकरघा व रेशम बुनाई';
  const craftTypeEn = 'Banarasi Silk Handloom';
  const vishwakarmaId = 'VK-VAR-2024-8841';
  const totalEarnings = 42850;

  const updateWizard = (partial: Partial<WizardState>) => {
    setWizard((prev) => ({ ...prev, ...partial }));
  };

  const resetWizard = () => {
    setWizard(initialWizardState);
  };

  const addProductFromWizard = () => {
    const newProduct: ProductItem = {
      id: `p${Date.now()}`,
      titleHi: wizard.titleHi || 'नया हस्तशिल्प उत्पाद',
      titleEn: wizard.titleEn || 'New Handcrafted Product',
      price: wizard.calculatedPrice || 1550,
      stock: wizard.stockQty || 5,
      status: 'active',
      category: 'Craft Item',
      imageUrl: wizard.enhancedPhotoUrl || wizard.photoUrl,
      giTag: true,
      craftType: craftTypeEn,
      views: 1,
      salesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const nextStatus =
            prod.status === 'active'
              ? 'out_of_stock'
              : prod.status === 'out_of_stock'
              ? 'draft'
              : 'active';
          return { ...prod, status: nextStatus };
        }
        return prod;
      })
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderItem['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  const sendChatMessage = (orderId: string, text: string) => {
    if (!text.trim()) return;
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const newMsg = {
            id: `m${Date.now()}`,
            sender: 'artisan' as const,
            text,
            time: 'Just now',
          };
          return { ...ord, chatMessages: [...ord.chatMessages, newMsg] };
        }
        return ord;
      })
    );
  };

  const speakText = (textHi: string, textEn?: string) => {
    if (typeof window === 'undefined') return;

    if (isSpeaking) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = language === 'hi' ? textHi : (textEn || textHi);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.92;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <ArtisanContext.Provider
      value={{
        language,
        setLanguage,
        artisanNameHi,
        artisanNameEn,
        artisanLocation,
        craftTypeHi,
        craftTypeEn,
        vishwakarmaId,
        totalEarnings,
        products,
        orders,
        wizard,
        setWizard,
        updateWizard,
        resetWizard,
        addProductFromWizard,
        toggleProductStatus,
        deleteProduct,
        updateOrderStatus,
        sendChatMessage,
        speakText,
        isSpeaking,
        stopSpeaking,
      }}
    >
      {children}
    </ArtisanContext.Provider>
  );
};

export const useArtisan = () => {
  const context = useContext(ArtisanContext);
  if (!context) {
    throw new Error('useArtisan must be used within an ArtisanProvider');
  }
  return context;
};
