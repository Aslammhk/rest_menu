import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  ChevronLeft, 
  Star, 
  Clock, 
  Users, 
  Flame, 
  Info, 
  MessageSquare, 
  X, 
  Plus, 
  Minus, 
  PlayCircle,
  Globe,
  CheckCircle,
  ThumbsUp,
  Award,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  QrCode,
  Calendar,
  ChefHat,
  Newspaper,
  Languages,
  Bot,
  Send,
  Sparkles,
  Settings,
  Upload,
  Percent,
  FileJson,
  Lock,
  ArrowRight,
  Camera,
  PartyPopper
} from 'lucide-react';

// --- TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
  EN: {
    menu: "Menu",
    cart: "Cart",
    info: "Info",
    feedback: "Feedback",
    admin: "Admin",
    search: "Search item...",
    add_to_cart: "Add to Cart",
    total: "Total",
    checkout: "Checkout",
    ingredients: "Ingredients",
    servings: "Servings",
    calories: "Calories",
    about_us: "About Us",
    chefs: "Chefs",
    locations: "Branches & Location",
    social: "Events & Social",
    blogs: "Blogs",
    reviews: "Google Reviews",
    events: "Event Booking",
    veg: "Veg",
    nonveg: "Non-Veg",
    bestseller: "Bestseller",
    spicy: "Spicy",
    know_how: "Watch Preparation",
    video_duration: "3 min video",
    empty_cart: "Your cart is empty",
    subtotal: "Subtotal",
    tax: "Tax (10%)",
    submit_feedback: "Submit Feedback",
    suggestions: "Suggestions",
    sold_today: "Sold Today",
    portion: "Portion Size",
    single: "Single",
    regular: "Regular",
    full: "Full",
    addons: "Add-ons",
    happy_hour: "Happy Hour Active! 20% Off",
    import_data: "Import Data",
    welcome: "Welcome to Suzlon Restro",
    enter_menu: "View Menu",
    admin_login: "Admin Login",
    password: "Password",
    login: "Login",
    access_denied: "Access Denied"
  },
  AR: {
    menu: "قائمة الطعام",
    cart: "عربة التسوق",
    info: "معلومات",
    feedback: "ملاحظات",
    admin: "إدارة",
    search: "بحث...",
    add_to_cart: "أضف للسلة",
    total: "المجموع",
    sold_today: "بيعت اليوم",
    portion: "الحجم",
    single: "فردي",
    regular: "عادي",
    full: "كامل",
    welcome: "مرحباً بكم في سوزلون ريسترو",
    enter_menu: "عرض القائمة",
    admin_login: "دخول المشرف",
    password: "كلمة المرور",
    login: "دخول",
    checkout: "دفع",
    ingredients: "مكونات",
    servings: "وجبات",
    calories: "سعرات",
    veg: "نباتي",
    nonveg: "غير نباتي",
    bestseller: "الأكثر مبيعاً",
    spicy: "حار",
    know_how: "طريقة التحضير",
    empty_cart: "السلة فارغة",
    subtotal: "المجموع الفرعي",
    tax: "ضريبة"
  },
  FR: {
    menu: "Menu",
    cart: "Panier",
    info: "Infos",
    feedback: "Avis",
    admin: "Admin",
    search: "Rechercher...",
    add_to_cart: "Ajouter",
    total: "Total",
    sold_today: "Vendu aujourd'hui",
    portion: "Portion",
    single: "Simple",
    regular: "Normal",
    full: "Complet",
    welcome: "Bienvenue chez Suzlon Restro",
    enter_menu: "Voir le menu",
    admin_login: "Connexion Admin",
    password: "Mot de passe",
    login: "Connexion",
    checkout: "Payer",
    ingredients: "Ingrédients",
    servings: "Portions",
    calories: "Calories",
    veg: "Végé",
    nonveg: "Non-Végé",
    bestseller: "Best-seller",
    spicy: "Épicé",
    know_how: "Préparation",
    empty_cart: "Panier vide",
    subtotal: "Sous-total",
    tax: "Taxe"
  }
};

// --- DEFAULT DATA SOURCE ---
const DEFAULT_MENU_DATA = [
  // BREAKFAST
  {
    "main_category": "Breakfast",
    "sub_category": "North Indian",
    "name_en": "Aloo Paratha",
    "type": "Veg",
    "price": 14,
    "spicy_level": 1,
    "portion": "1,2", 
    "total_sold": 45,
    "video_url": "true",
    "description": "Whole wheat flatbread stuffed with spiced potato filling.",
    "ingredients": "Wheat flour, Potato, Green chili, Spices, Butter",
    "calory": 280
  },
  {
    "main_category": "Breakfast",
    "sub_category": "South Indian",
    "name_en": "Dosa",
    "type": "Veg",
    "price": 14,
    "spicy_level": 0,
    "portion": "1",
    "total_sold": 120,
    "description": "Crispy fermented crepe made from rice batter.",
    "ingredients": "Rice, Urad dal, Fenugreek",
    "calory": 180
  },
  // GRILL & KABAB
  {
    "main_category": "Grill & Kabab",
    "sub_category": "Mutton",
    "name_en": "Mutton Kebab",
    "type": "Nonveg",
    "price": 44,
    "spicy_level": 2,
    "portion": "1,2,3",
    "total_sold": 85,
    "video_url": "true",
    "description": "Succulent pieces of marinated mutton grilled to perfection.",
    "ingredients": "Mutton cubes, Yogurt, Ginger-garlic paste",
    "calory": 310
  },
  {
    "main_category": "Grill & Kabab",
    "sub_category": "Chef Special",
    "name_en": "Chef's Signature Ribs",
    "type": "Nonveg",
    "price": 55,
    "spicy_level": 3,
    "portion": "3",
    "total_sold": 12,
    "chef_special": 1,
    "description": "Slow cooked ribs with secret chef's marinade.",
    "ingredients": "Beef Ribs, BBQ Sauce, Honey, Herbs",
    "calory": 600
  },
  // MAIN COURSE
  {
    "main_category": "Main Course",
    "sub_category": "Mutton",
    "name_en": "Mutton Mughali",
    "type": "Nonveg",
    "price": 44,
    "spicy_level": 1,
    "portion": "2,3",
    "bestseller": 1,
    "total_sold": 200,
    "description": "Rich creamy mutton curry made with nuts and spices.",
    "ingredients": "Mutton, Cashew paste, Cream, Saffron",
    "calory": 550
  },
  {
    "main_category": "Sweet & Drinks",
    "sub_category": "Mocktail",
    "name_en": "Blue Lagoon",
    "type": "Veg",
    "price": 15,
    "spicy_level": 0,
    "portion": "2",
    "total_sold": 50,
    "description": "Refreshing blue curacao mocktail with lemon.",
    "ingredients": "Blue Curacao syrup, Lemon, Soda, Ice",
    "calory": 120
  }
];

// --- MOCK ASSETS ---
const IMAGES = {
  landing: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000",
  event: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000",
  default: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800",
  breakfast: "https://images.unsplash.com/photo-1533089862017-dec9d680a1c9?auto=format&fit=crop&q=80&w=800",
  grill: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800",
  main: "https://images.unsplash.com/photo-1544025162-d76690b6d029?auto=format&fit=crop&q=80&w=800",
  sweet: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=800",
  drinks: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
  chef: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
  map: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
};

const LANGUAGES = [
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'AR', label: 'العربية', flag: '🇸🇦' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
];

const CHAT_QUESTIONS = [
  { label: "Suggest Kids meal", query: "kids_meal" },
  { label: "Create Party Menu", query: "party_menu" },
  { label: "Birthday Party Menu", query: "birthday_menu" },
  { label: "Bestselling Kababs", query: "best_kababs" },
  { label: "Gluten Free Items", query: "gluten_free" },
  { label: "Kuch bi menu (Surprise)", query: "surprise" },
];

// --- HELPER COMPONENTS ---

const Badge = ({ children, className }) => (
  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const VegIcon = ({ type }) => (
  <div className={`w-4 h-4 border-2 flex items-center justify-center flex-shrink-0 ${type === 'Veg' ? 'border-green-500' : 'border-red-500'}`}>
    <div className={`w-2 h-2 rounded-full ${type === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} />
  </div>
);

const SpicyLevel = ({ level }) => {
  if (!level) return null;
  return (
    <div className="flex -space-x-1">
      {[...Array(level)].map((_, i) => (
        <Flame key={i} size={12} className="text-red-500 fill-red-500" />
      ))}
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function RestaurantApp() {
  const [activeTab, setActiveTab] = useState('menu'); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); 
  const [language, setLanguage] = useState('EN');
  const [showChat, setShowChat] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  
  // --- ADMIN & DATA STATES ---
  const [menuData, setMenuData] = useState(DEFAULT_MENU_DATA);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [happyHour, setHappyHour] = useState({ active: false, discount: 20 }); 
  
  // Filter States
  const [showVeg, setShowVeg] = useState(true);
  const [showNonVeg, setShowNonVeg] = useState(true);

  // Translation Helper
  const t = (key) => TRANSLATIONS[language]?.[key] || TRANSLATIONS['EN'][key] || key;
  const getName = (item) => (language === 'AR' && item.name_ar) ? item.name_ar : item.name_en;

  // --- DERIVED DATA ---
  
  const categories = useMemo(() => {
    return ['All', ...new Set(menuData.map(item => item.main_category))];
  }, [menuData]);

  const subCategories = useMemo(() => {
    if (selectedCategory === 'All') return [];
    const subs = menuData
      .filter(item => item.main_category === selectedCategory)
      .map(item => item.sub_category)
      .filter(Boolean);
    return ['All', ...new Set(subs)];
  }, [selectedCategory, menuData]);

  const filteredItems = useMemo(() => {
    return menuData.filter(item => {
      const matchesMain = selectedCategory === 'All' || item.main_category === selectedCategory;
      const matchesSub = selectedSubCategory === 'All' || item.sub_category === selectedSubCategory;
      const matchesSearch = (getName(item) || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesVeg = showVeg && item.type === 'Veg';
      const matchesNonVeg = showNonVeg && item.type === 'Nonveg';
      const matchesType = matchesVeg || matchesNonVeg;

      return matchesMain && matchesSub && matchesSearch && matchesType;
    });
  }, [selectedCategory, selectedSubCategory, searchQuery, showVeg, showNonVeg, language, menuData]);

  // Cart Logic
  const addToCart = (item, options = {}, sizePrice, sizeLabel) => {
    setCart(prev => {
      const existing = prev.find(i => 
        i.name_en === item.name_en && 
        JSON.stringify(i.options) === JSON.stringify(options) &&
        i.sizeLabel === sizeLabel
      );
      
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, options, finalPrice: sizePrice, sizeLabel }];
    });
  };

  const updateQty = (index, delta) => {
    setCart(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(0, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }).filter(i => i.qty > 0));
  };

  const cartTotal = cart.reduce((sum, item) => {
    return sum + (item.finalPrice * item.qty);
  }, 0);

  const finalCartTotal = happyHour.active ? cartTotal * (1 - happyHour.discount / 100) : cartTotal;

  // --- LANDING PAGE ---
  const LandingPage = () => (
    <div className="fixed inset-0 z-[60] bg-black flex flex-col animate-fadeIn">
       <div className="flex-1 relative overflow-hidden">
          {/* Slideshow Effect */}
          <div className="absolute inset-0 flex animate-slide">
             <div className="w-full h-full flex-shrink-0 relative">
                <img src={IMAGES.landing} className="w-full h-full object-cover opacity-60" alt="Restaurant" />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black via-transparent to-black">
                  <div className="text-center space-y-4 p-6">
                    <h1 className="text-5xl md:text-7xl font-serif text-emerald-500 tracking-tighter">SUZLON</h1>
                    <p className="text-xl text-white tracking-[0.3em] uppercase">Restro & Lounge</p>
                    <div className="flex justify-center gap-2 text-yellow-500 mt-4">
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                      <Star fill="currentColor" size={20} />
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
          {/* Event Teaser */}
          <div className="absolute bottom-32 left-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
            <img src={IMAGES.event} className="w-16 h-16 rounded-lg object-cover" alt="Event" />
            <div>
              <p className="text-emerald-400 text-xs font-bold uppercase">Upcoming Event</p>
              <p className="text-white font-bold">Jazz Night & Live Grill</p>
              <p className="text-gray-300 text-xs">This Friday, 8 PM onwards</p>
            </div>
          </div>
       </div>
       
       <div className="p-6 bg-neutral-900 border-t border-neutral-800">
          <button 
            onClick={() => setShowLanding(false)}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/50 group"
          >
            {t('enter_menu')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
       </div>
    </div>
  );

  // --- CHATBOT COMPONENT ---
  const ChatWidget = () => {
    const [messages, setMessages] = useState([
      { id: 1, text: "Hello! I'm your food assistant. How can I help you today?", isBot: true }
    ]);
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages, typing]);

    const handleBotQuery = (query, label) => {
      setMessages(prev => [...prev, { id: Date.now(), text: label, isBot: false }]);
      setTyping(true);

      setTimeout(() => {
        let responseItems = [];
        let responseText = "";

        switch(query) {
          case 'kids_meal':
            responseItems = menuData.filter(i => i.spicy_level === 0 && (i.main_category.includes("Sweet") || i.main_category.includes("Breakfast")));
            responseText = "For the little ones, I recommend our mild and sweet options:";
            break;
          case 'party_menu':
            const starters = menuData.filter(i => i.main_category.includes("Grill")).slice(0, 2);
            const mains = menuData.filter(i => i.main_category.includes("Main")).slice(0, 2);
            responseItems = [...starters, ...mains];
            responseText = "Here's a perfect party combo with starters and mains:";
            break;
           case 'birthday_menu':
            const b_sweets = menuData.filter(i => i.main_category.includes("Sweet")).slice(0, 2);
            const b_snacks = menuData.filter(i => i.main_category.includes("Breakfast")).slice(0, 2);
            responseItems = [...b_snacks, ...b_sweets];
            responseText = "Celebrate with these delicious treats!";
            break;
          case 'best_kababs':
            responseItems = menuData.filter(i => i.main_category.includes("Kabab"));
            responseText = "These are our crowd-favorite Kababs:";
            break;
          case 'gluten_free':
            responseItems = menuData.filter(i => i.gluten_free === 1);
            responseText = responseItems.length > 0 ? "Safe and tasty Gluten Free options:" : "Sorry, no specific gluten free items marked today.";
            break;
          case 'surprise':
            const random = menuData[Math.floor(Math.random() * menuData.length)];
            responseItems = [random];
            responseText = "Kuch bhi? How about this chef's choice!";
            break;
          default:
            responseText = "I'm not sure, but here is our menu!";
        }

        setMessages(prev => [
          ...prev, 
          { id: Date.now() + 1, text: responseText, items: responseItems, isBot: true }
        ]);
        setTyping(false);
      }, 1000);
    };

    return (
      <div className="flex flex-col h-full bg-neutral-900 text-white rounded-t-2xl md:rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 animate-fadeIn">
        <div className="p-4 bg-emerald-700 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="text-emerald-700" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Suzlon Assistant</h3>
              <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/> Online
              </p>
            </div>
          </div>
          <button onClick={() => setShowChat(false)} className="hover:bg-black/20 p-1 rounded">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900 custom-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
               <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-neutral-800 rounded-tl-none text-gray-200' : 'bg-emerald-600 rounded-tr-none text-white'}`}>
                 {msg.text}
               </div>
               {msg.items && msg.items.length > 0 && (
                 <div className="mt-2 space-y-2 w-full max-w-[90%]">
                   {msg.items.map((item, idx) => (
                     <div key={idx} onClick={() => { setSelectedItem(item); setShowChat(false); }} className="flex gap-2 bg-black/40 p-2 rounded-lg border border-neutral-700 cursor-pointer hover:bg-neutral-800 transition-colors">
                        <img src={item.main_category.includes("Drink") ? IMAGES.drinks : IMAGES.default} className="w-10 h-10 rounded object-cover" alt="item"/>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs truncate text-white">{getName(item)}</p>
                          <p className="text-emerald-500 text-xs">${item.price}</p>
                        </div>
                        <Plus size={16} className="text-gray-400 self-center"/>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          ))}
          {typing && (
             <div className="flex items-start">
               <div className="bg-neutral-800 p-3 rounded-2xl rounded-tl-none flex gap-1">
                 <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 bg-neutral-900 border-t border-neutral-800 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0">
          <div className="flex gap-2 px-2">
            {CHAT_QUESTIONS.map((q, i) => (
              <button 
                key={i}
                onClick={() => handleBotQuery(q.query, q.label)}
                className="px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-full text-xs text-gray-300 hover:bg-emerald-900/50 hover:text-emerald-400 hover:border-emerald-500 transition-all"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- INFO VIEW COMPONENT ---
  const InfoView = () => {
    const [infoPage, setInfoPage] = useState('about');

    const navItems = [
      { id: 'about', label: t('about_us'), icon: Info },
      { id: 'chefs', label: t('chefs'), icon: ChefHat },
      { id: 'locations', label: t('locations'), icon: MapPin },
      { id: 'social', label: t('social'), icon: PartyPopper },
      { id: 'reviews', label: t('reviews'), icon: ThumbsUp },
    ];

    const renderContent = () => {
      switch(infoPage) {
        case 'about':
          return (
            <div className="space-y-6 animate-fadeIn">
              <div className="h-48 rounded-2xl overflow-hidden relative mb-6">
                <img src={IMAGES.landing} className="w-full h-full object-cover" alt="About" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h2 className="text-4xl font-serif text-white">{t('about_us')}</h2>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed text-center">
                "Welcome to Suzlon Restro. Since 1984, we have been serving authentic flavors in a modern setting. Our mission is to provide a memorable dining experience."
              </p>
            </div>
          );
        case 'chefs':
          return (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-2xl font-serif text-emerald-400 mb-4">{t('chefs')}</h2>
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-4 bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
                  <img src={IMAGES.chef} className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500" alt="Chef" />
                  <div>
                    <h3 className="font-bold text-white text-lg">Chef Gordon {i}</h3>
                    <p className="text-emerald-500 text-sm">Executive Chef</p>
                    <p className="text-gray-500 text-xs mt-1">Specialist in Tandoor & Grills with 15 years of experience.</p>
                  </div>
                </div>
              ))}
            </div>
          );
        case 'locations':
          return (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-serif text-emerald-400">{t('locations')}</h2>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                <img src={IMAGES.map} className="w-full h-40 object-cover opacity-50" alt="Map" />
                <div className="p-4 space-y-4">
                  <div className="flex gap-3 items-start border-b border-neutral-800 pb-4">
                    <MapPin className="text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white">Downtown Branch</h4>
                      <p className="text-gray-400 text-sm">123 Culinary Avenue, Food District</p>
                      <div className="flex gap-2 mt-2">
                        <button className="px-3 py-1 bg-emerald-900/50 text-emerald-400 text-xs rounded border border-emerald-800">Navigate</button>
                        <button className="px-3 py-1 bg-neutral-800 text-white text-xs rounded border border-neutral-700">Call</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <MapPin className="text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white">Marina Branch</h4>
                      <p className="text-gray-400 text-sm">45 Seaside Blvd, Marina Walk</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'reviews':
          return (
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-2xl font-serif text-emerald-400">{t('reviews')}</h2>
              <div className="flex items-center justify-between bg-neutral-900 p-6 rounded-2xl border border-neutral-800 mb-6">
                <div>
                  <div className="text-5xl font-bold text-white">4.8</div>
                  <div className="flex text-yellow-500 text-xs mt-1"><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor"/><Star fill="currentColor" className="text-gray-600"/></div>
                </div>
                <div className="text-right">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-8 h-8 mb-2 ml-auto" alt="Google" />
                  <p className="text-gray-400 text-xs">Based on 1,200+ reviews</p>
                </div>
              </div>
              <div className="space-y-3">
                 {[1,2,3].map(i => (
                    <div key={i} className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
                       <div className="flex justify-between mb-2">
                          <span className="font-bold text-white text-sm">John Doe</span>
                          <div className="flex text-yellow-500 text-[10px]"><Star fill="currentColor" size={10}/><Star fill="currentColor" size={10}/><Star fill="currentColor" size={10}/><Star fill="currentColor" size={10}/><Star fill="currentColor" size={10}/></div>
                       </div>
                       <p className="text-gray-400 text-xs italic">"Amazing food and ambiance. The mutton kebab is a must try!"</p>
                    </div>
                 ))}
              </div>
            </div>
          );
        case 'social':
          return (
            <div className="space-y-6 animate-fadeIn">
               <div className="relative h-40 rounded-2xl overflow-hidden">
                 <img src={IMAGES.event} className="w-full h-full object-cover" alt="Party" />
                 <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80 flex items-center justify-center flex-col">
                    <PartyPopper className="text-yellow-400 w-10 h-10 mb-2" />
                    <h3 className="text-2xl font-bold text-white">Events & Parties</h3>
                 </div>
               </div>
               
               <div className="bg-white p-6 rounded-2xl flex flex-col items-center text-center">
                 <QrCode size={100} className="text-black mb-4" />
                 <p className="text-black font-bold text-sm">Scan to follow us @suzlon_restro</p>
                 <div className="flex gap-4 mt-4">
                    <Instagram className="text-pink-600" />
                    <Facebook className="text-blue-600" />
                    <Twitter className="text-sky-500" />
                 </div>
               </div>
            </div>
          );
        default: return null;
      }
    };

    return (
      <div className="flex h-full flex-col animate-fadeIn pb-20">
        <div className="w-full bg-neutral-900/30 border-b border-neutral-800 px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0 mb-4">
           <div className="flex gap-2">
             {navItems.map(item => (
               <button
                 key={item.id}
                 onClick={() => setInfoPage(item.id)}
                 className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                   infoPage === item.id 
                     ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                     : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700 hover:text-white'
                 }`}
               >
                 <item.icon size={14} />
                 {item.label}
               </button>
             ))}
           </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {renderContent()}
        </div>
      </div>
    );
  };

  // --- ADMIN PANEL ---
  const AdminPanel = () => {
    const fileInputRef = useRef(null);

    if (!isAdminLoggedIn) {
      return (
        <div className="flex items-center justify-center h-full p-4 animate-fadeIn">
           <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 w-full max-w-sm text-center">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-emerald-500" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">{t('admin_login')}</h2>
              <p className="text-gray-400 text-sm mb-6">Restricted access for staff only.</p>
              
              <input 
                type="password" 
                placeholder={t('password')}
                className="w-full bg-black border border-neutral-700 rounded-xl p-3 text-white mb-4 focus:border-emerald-500 outline-none text-center tracking-widest"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              
              <button 
                onClick={() => {
                  if(adminPassword === 'admin123') setIsAdminLoggedIn(true); 
                  else alert('Incorrect Password');
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
              >
                {t('login')}
              </button>
           </div>
        </div>
      );
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result);
            if (Array.isArray(json)) {
              setMenuData(json);
              alert("Menu Data Imported Successfully!");
            } else {
              alert("Invalid JSON format. Expected an array.");
            }
          } catch (error) {
            alert("Error parsing JSON file.");
          }
        };
        reader.readAsText(file);
      }
    };

    return (
      <div className="p-8 animate-fadeIn max-w-4xl mx-auto pb-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif text-emerald-400 flex items-center gap-2">
             <Settings /> Admin Dashboard
          </h2>
          <button onClick={() => setIsAdminLoggedIn(false)} className="text-red-400 text-sm underline">Logout</button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="text-orange-500" /> Happy Hour Settings
            </h3>
            <div className="flex items-center justify-between bg-neutral-800 p-4 rounded-xl mb-4">
              <span className="text-white font-medium">Enable Happy Hour</span>
              <button 
                onClick={() => setHappyHour(prev => ({ ...prev, active: !prev.active }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${happyHour.active ? 'bg-emerald-500' : 'bg-neutral-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${happyHour.active ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-gray-400 text-sm">Discount Percentage</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={happyHour.discount} 
                  onChange={(e) => setHappyHour(prev => ({...prev, discount: parseInt(e.target.value)}))}
                  className="bg-black border border-neutral-700 rounded-lg p-2 text-white w-24" 
                />
                <Percent size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Upload className="text-blue-500" /> Data Management
            </h3>
            <p className="text-gray-400 text-sm mb-4">Import menu items from external JSON file.</p>
            <input 
              type="file" 
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl text-white flex items-center justify-center gap-2 transition-colors"
            >
              <FileJson size={20} /> Import JSON File
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- FEEDBACK VIEW ---
  const FeedbackView = () => (
    <div className="p-6 max-w-2xl mx-auto animate-fadeIn pb-24">
      <h2 className="text-3xl font-serif mb-6 text-emerald-400 text-center">We Value Your Feedback</h2>
      <div className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-2xl">
        <div className="flex justify-center gap-4 mb-8">
          {['😭', '😐', '😊', '😍'].map((emoji, idx) => (
             <button key={idx} className="text-4xl hover:scale-125 transition-transform">{emoji}</button>
          ))}
        </div>
        <div className="space-y-4 mb-8">
          <input type="text" placeholder="Your Name (Optional)" className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-white focus:border-emerald-500 outline-none" />
          <input type="text" placeholder="Phone Number (Optional)" className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-white focus:border-emerald-500 outline-none" />
          <textarea 
            className="w-full bg-black border border-neutral-700 rounded-xl p-4 text-white h-32 resize-none focus:border-emerald-500 outline-none"
            placeholder="Tell us about your experience..."
          />
        </div>
        <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg transition-all">
          {t('submit_feedback')}
        </button>
      </div>
    </div>
  );

  // --- MODAL COMPONENT ---
  const ItemDetailModal = ({ item, onClose }) => {
    if (!item) return null;
    
    const availablePortions = item.portion ? item.portion.split(',').map(p => p.trim()) : ['1'];
    const PORTION_MAP = {
      '1': { label: 'Single', mult: 0.4 },
      '2': { label: 'Regular', mult: 0.7 },
      '3': { label: 'Full', mult: 1.0 }
    };
    
    const defaultSizeKey = availablePortions[availablePortions.length - 1];
    const [selectedSize, setSelectedSize] = useState(defaultSizeKey);
    const [addons, setAddons] = useState({ cheese: false, sauce: false });

    const basePrice = item.price;
    const sizeMult = PORTION_MAP[selectedSize]?.mult || 1;
    let currentPrice = basePrice * sizeMult;
    
    if(addons.cheese) currentPrice += 5;
    if(addons.sauce) currentPrice += 3;

    const getImage = (cat) => {
      const c = (cat || "").toLowerCase();
      if(c.includes('break')) return IMAGES.breakfast;
      if(c.includes('grill') || c.includes('kabab')) return IMAGES.grill;
      if(c.includes('sweet')) return IMAGES.sweet;
      if(c.includes('drink')) return IMAGES.drinks;
      return IMAGES.main;
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn">
        <div className="bg-neutral-900 w-full max-w-4xl h-[90vh] rounded-3xl overflow-hidden flex flex-col md:flex-row border border-neutral-800 shadow-2xl relative">
          
          <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-neutral-800 text-white">
            <X size={24} />
          </button>

          <div className="w-full md:w-1/2 h-64 md:h-full relative bg-neutral-800 group">
            <img src={getImage(item.main_category)} alt={getName(item)} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 flex gap-2">
               <VegIcon type={item.type} />
               {item.spicy_level > 0 && <div className="bg-black/50 px-2 rounded-full flex items-center"><SpicyLevel level={item.spicy_level} /></div>}
            </div>
            
            {item.video_url && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-100 transition-opacity">
                 <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 cursor-pointer hover:scale-110 transition-transform flex flex-col items-center">
                    <PlayCircle size={48} className="text-white fill-emerald-600" />
                    <span className="text-xs text-white font-bold mt-2 shadow-black drop-shadow-md">{t('know_how')}</span>
                 </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 flex flex-col bg-neutral-900 text-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-emerald-500 text-xs uppercase font-bold tracking-wider">{item.main_category}</span>
                <h2 className="text-3xl font-serif mt-1">{getName(item)}</h2>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-emerald-400">${currentPrice.toFixed(2)}</span>
                {happyHour.active && <div className="text-xs text-orange-500 font-bold animate-pulse">Happy Hour!</div>}
              </div>
            </div>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">{item.description}</p>

            {availablePortions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">{t('portion')}</h3>
                <div className="flex bg-neutral-800 p-1 rounded-xl">
                  {availablePortions.map(sizeKey => {
                    const info = PORTION_MAP[sizeKey];
                    const isSelected = selectedSize === sizeKey;
                    return (
                      <button
                        key={sizeKey}
                        onClick={() => setSelectedSize(sizeKey)}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                          isSelected ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {t(info.label.toLowerCase())} <span className="text-[10px] opacity-70">({Math.round(info.mult * 100)}%)</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mb-6">
               <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">{t('addons')}</h3>
               <div className="space-y-2">
                  <div 
                    onClick={() => setAddons(p => ({...p, cheese: !p.cheese}))}
                    className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-colors ${addons.cheese ? 'border-emerald-500 bg-emerald-900/20' : 'border-neutral-800 bg-neutral-800'}`}
                  >
                    <span className="text-sm">Extra Cheese</span>
                    <span className="text-emerald-400 text-sm">+$5.00</span>
                  </div>
                  <div 
                    onClick={() => setAddons(p => ({...p, sauce: !p.sauce}))}
                    className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer transition-colors ${addons.sauce ? 'border-emerald-500 bg-emerald-900/20' : 'border-neutral-800 bg-neutral-800'}`}
                  >
                    <span className="text-sm">Special Sauce</span>
                    <span className="text-emerald-400 text-sm">+$3.00</span>
                  </div>
               </div>
            </div>

            <button 
              onClick={() => { 
                addToCart(item, { addons }, currentPrice, PORTION_MAP[selectedSize].label); 
                onClose(); 
              }} 
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl mt-auto flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/50"
            >
              <ShoppingCart size={20} /> {t('add_to_cart')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // --- CART VIEW ---
  const CartView = () => (
    <div className="h-full flex flex-col animate-fadeIn p-4 md:p-8 max-w-4xl mx-auto w-full pb-24">
       <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2"><ShoppingCart className="text-emerald-500" /> {t('cart')}</h2>
       {cart.length === 0 ? (
         <div className="flex-1 flex flex-col items-center justify-center text-gray-500"><ShoppingCart size={64} className="mb-4 opacity-20" /><p>{t('empty_cart')}</p></div>
       ) : (
         <div className="flex-1 overflow-y-auto space-y-4 pr-2">
           {cart.map((item, idx) => (
             <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
               <div>
                 <h3 className="font-bold text-white">{getName(item)}</h3>
                 <div className="flex gap-2 text-xs text-gray-400">
                    <span className="text-emerald-500 font-bold">{item.sizeLabel}</span>
                    {item.options.addons.cheese && <span>+Cheese</span>}
                 </div>
                 <p className="text-emerald-400 text-sm mt-1 font-mono">${item.finalPrice.toFixed(2)}</p>
               </div>
               <div className="flex items-center gap-4 bg-neutral-800 rounded-lg p-1">
                  <button onClick={() => updateQty(idx, -1)} className="p-1 hover:bg-neutral-700 text-white"><Minus size={16} /></button>
                  <span className="w-6 text-center text-white font-bold">{item.qty}</span>
                  <button onClick={() => updateQty(idx, 1)} className="p-1 hover:bg-neutral-700 text-white"><Plus size={16} /></button>
               </div>
             </div>
           ))}
           
           <div className="mt-8 pt-4 border-t border-neutral-800 space-y-2">
              <div className="flex justify-between text-gray-400"><span>{t('subtotal')}</span><span>${cartTotal.toFixed(2)}</span></div>
              {happyHour.active && (
                <div className="flex justify-between text-orange-500"><span>Happy Hour ({happyHour.discount}%)</span><span>-${(cartTotal * (happyHour.discount/100)).toFixed(2)}</span></div>
              )}
              <div className="flex justify-between text-gray-400"><span>{t('tax')}</span><span>${(finalCartTotal * 0.1).toFixed(2)}</span></div>
              <div className="flex justify-between text-xl font-bold text-white border-t border-neutral-800 pt-4 mt-2">
                <span>{t('total')}</span>
                <span>${(finalCartTotal * 1.1).toFixed(2)}</span>
              </div>
           </div>
         </div>
       )}
    </div>
  );

  // --- RENDER ---
  return (
    <div className={`flex flex-col md:flex-row h-screen w-full bg-black text-white font-sans overflow-hidden selection:bg-emerald-500 selection:text-black`}>
      
      {showLanding && <LandingPage />}

      {/* SIDEBAR */}
      <div className="hidden md:flex flex-col w-64 bg-neutral-900 border-r border-neutral-800 flex-shrink-0 z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center"><Menu className="text-black" /></div>
          <h1 className="text-xl font-bold tracking-tight">SUZLON <span className="text-emerald-500">RESTRO</span></h1>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setSelectedSubCategory('All'); setActiveTab('menu'); }} className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between ${selectedCategory === cat && activeTab === 'menu' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-400 hover:bg-neutral-800'}`}>
              <span className="font-medium">{cat}</span>
              {selectedCategory === cat && activeTab === 'menu' && <ChevronLeft size={16} className="rotate-180" />}
            </button>
          ))}
          <div className="my-6 border-t border-neutral-800" />
          <button onClick={() => setActiveTab('info')} className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${activeTab === 'info' ? 'bg-neutral-800 text-white' : 'text-gray-400 hover:bg-neutral-800'}`}><Info size={18} /> {t('info')}</button>
          <button onClick={() => setActiveTab('feedback')} className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${activeTab === 'feedback' ? 'bg-neutral-800 text-white' : 'text-gray-400 hover:bg-neutral-800'}`}><MessageSquare size={18} /> {t('feedback')}</button>
          <button onClick={() => setActiveTab('admin')} className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${activeTab === 'admin' ? 'bg-neutral-800 text-white' : 'text-gray-400 hover:bg-neutral-800'}`}><Settings size={18} /> {t('admin')}</button>
        </nav>
        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex gap-2">
           {LANGUAGES.slice(0, 5).map(lang => <button key={lang.code} onClick={() => setLanguage(lang.code)} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border ${language === lang.code ? 'border-emerald-500 bg-emerald-900/30' : 'border-neutral-700 bg-neutral-800'}`}>{lang.flag}</button>)}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full relative bg-black">
        <header className="h-auto md:h-20 bg-neutral-900/50 backdrop-blur border-b border-neutral-800 flex flex-col md:flex-row items-center justify-between px-4 py-4 md:py-0 z-10 shrink-0 gap-4">
          <div className="md:hidden flex items-center justify-between w-full">
            <span className="font-bold text-lg text-emerald-500">SUZLON</span>
            <button onClick={() => setActiveTab('cart')} className="relative p-2"><ShoppingCart className="text-white" />{cart.length > 0 && <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-[10px] rounded-full flex items-center justify-center">{cart.reduce((a, b) => a + b.qty, 0)}</span>}</button>
          </div>
          {activeTab === 'menu' && (
            <div className="w-full flex flex-col md:flex-row items-center gap-4 flex-1">
              <div className="w-full md:max-w-md relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="text" placeholder={t('search')} className="w-full bg-neutral-900 border border-neutral-700 rounded-full py-2 pl-10 pr-4 text-white focus:border-emerald-500 focus:bg-neutral-800" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex items-center gap-4 self-start md:self-center">
                 <label className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${showVeg ? 'bg-green-600 border-green-600' : 'border-neutral-600'}`} onClick={() => setShowVeg(!showVeg)}>{showVeg && <CheckCircle size={14} className="text-white" />}</div><span className="text-sm text-gray-300">{t('veg')}</span></label>
                 <label className="flex items-center gap-2 cursor-pointer select-none"><div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${showNonVeg ? 'bg-red-600 border-red-600' : 'border-neutral-600'}`} onClick={() => setShowNonVeg(!showNonVeg)}>{showNonVeg && <CheckCircle size={14} className="text-white" />}</div><span className="text-sm text-gray-300">{t('nonveg')}</span></label>
              </div>
              {happyHour.active && (
                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/50 rounded-full text-orange-500 text-sm font-bold animate-pulse">
                  <Clock size={14} /> Happy Hour Active!
                </div>
              )}
            </div>
          )}
          <button onClick={() => setActiveTab('cart')} className="hidden md:block relative p-2 rounded-full hover:bg-neutral-800"><ShoppingCart className={activeTab === 'cart' ? 'text-emerald-500' : 'text-white'} />{cart.length > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{cart.reduce((a, b) => a + b.qty, 0)}</span>}</button>
        </header>

        {activeTab === 'menu' && subCategories.length > 1 && (
          <div className="w-full bg-neutral-900/30 border-b border-neutral-800 px-4 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0"><div className="flex gap-2">{subCategories.map(sub => (<button key={sub} onClick={() => setSelectedSubCategory(sub)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${selectedSubCategory === sub ? 'bg-neutral-100 text-black' : 'bg-neutral-800 text-gray-400'}`}>{sub}</button>))}</div></div>
        )}

        <div className="md:hidden overflow-x-auto whitespace-nowrap bg-neutral-900 border-b border-neutral-800 p-2 scrollbar-hide shrink-0"><div className="flex gap-2">{categories.map(cat => (<button key={cat} onClick={() => { setSelectedCategory(cat); setSelectedSubCategory('All'); setActiveTab('menu'); }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-neutral-800 text-gray-400'}`}>{cat}</button>))}</div></div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative p-4 md:p-8">
          {activeTab === 'menu' && (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
               {filteredItems.map((item, idx) => {
                 const image = (item.main_category || "").toLowerCase().includes('break') ? IMAGES.breakfast : (item.main_category || "").toLowerCase().includes('sweet') ? IMAGES.sweet : (item.main_category || "").toLowerCase().includes('drink') ? IMAGES.drinks : IMAGES.main;
                 return (
                   <div key={idx} onClick={() => setSelectedItem(item)} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-emerald-600/50 transition-all cursor-pointer group flex flex-col h-full animate-fadeIn">
                     <div className="h-48 overflow-hidden relative">
                       <img src={image} alt={getName(item)} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                       <div className="absolute top-3 left-3 flex gap-2">
                         <VegIcon type={item.type} />
                         {item.bestseller === 1 && <Badge className="bg-yellow-500 text-black">{t('bestseller')}</Badge>}
                       </div>
                       {item.video_url && <div className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full"><PlayCircle size={14} className="text-white" /></div>}
                       <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
                     </div>
                     <div className="p-5 flex flex-col flex-1">
                       <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{getName(item)}</h3>
                          {item.spicy_level > 0 && <SpicyLevel level={item.spicy_level} />}
                       </div>
                       <p className="text-gray-500 text-xs mb-4 line-clamp-2">{item.description}</p>
                       <div className="mt-auto flex items-center justify-between">
                         <div className="flex flex-col">
                            <span className="text-xl font-bold text-white">${item.price}</span>
                            {item.total_sold && <span className="text-[10px] text-gray-500">{t('sold_today')}: {item.total_sold}</span>}
                         </div>
                         <button onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }} className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 shadow-lg"><Plus size={18} /></button>
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
          )}
          {activeTab === 'info' && <InfoView />}
          {activeTab === 'admin' && <AdminPanel />}
          {activeTab === 'feedback' && <FeedbackView />}
          {activeTab === 'cart' && <CartView />}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800 p-2 flex justify-around items-center shrink-0 safe-area-bottom">
           <button onClick={() => setActiveTab('menu')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'menu' ? 'text-emerald-500' : 'text-gray-500'}`}><Menu size={20} /><span className="text-[10px] mt-1">{t('menu')}</span></button>
           <button onClick={() => setActiveTab('cart')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'cart' ? 'text-emerald-500' : 'text-gray-500'}`}><div className="relative"><ShoppingCart size={20} />{cart.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />}</div><span className="text-[10px] mt-1">{t('cart')}</span></button>
           <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'info' ? 'text-emerald-500' : 'text-gray-500'}`}><Info size={20} /><span className="text-[10px] mt-1">{t('info')}</span></button>
           <button onClick={() => setActiveTab('feedback')} className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'feedback' ? 'text-emerald-500' : 'text-gray-500'}`}><MessageSquare size={20} /><span className="text-[10px] mt-1">{t('feedback')}</span></button>
        </div>
      </div>

      {/* CHATBOT FLOATING BUTTON */}
      <div className="fixed bottom-24 md:bottom-10 right-4 z-50">
        {!showChat && (
          <button 
            onClick={() => setShowChat(true)}
            className="w-14 h-14 bg-emerald-600 rounded-full shadow-2xl shadow-emerald-900/50 flex items-center justify-center text-white hover:bg-emerald-500 transition-transform hover:scale-110 animate-bounce-slow relative group"
          >
            <Bot size={28} />
            <span className="absolute right-0 top-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
            <div className="absolute right-16 bg-white text-black px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Ask AI Assistant
            </div>
          </button>
        )}
      </div>

      {showChat && (
        <div className="fixed inset-x-0 bottom-0 md:bottom-24 md:right-4 md:left-auto w-full md:w-96 h-[80vh] md:h-[600px] z-50 flex flex-col animate-slideUp">
           <ChatWidget />
        </div>
      )}

      {selectedItem && <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #404040; border-radius: 3px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes slide { from { transform: scale(1); } to { transform: scale(1.1); } }
        .animate-slide { animation: slide 20s linear infinite alternate; }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
}