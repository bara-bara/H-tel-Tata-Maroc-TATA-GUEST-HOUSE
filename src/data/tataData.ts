export interface PricingTier {
  adults: number;
  label: string;
  price: number;
  compareAtPrice: number;
}

export const PRICING_TIERS: PricingTier[] = [
  { adults: 1, label: '1 Adult', price: 250, compareAtPrice: 300 },
  { adults: 2, label: '2 Adults', price: 400, compareAtPrice: 500 },
  { adults: 3, label: '3 Adults', price: 600, compareAtPrice: 750 },
  { adults: 4, label: '4 Adults', price: 800, compareAtPrice: 1000 },
  { adults: 5, label: '5 Adults', price: 1000, compareAtPrice: 1250 },
  { adults: 6, label: '6 Adults', price: 1200, compareAtPrice: 1500 },
  { adults: 7, label: '7 Adults', price: 1400, compareAtPrice: 1750 },
  { adults: 8, label: '8 Adults', price: 1600, compareAtPrice: 2000 },
  { adults: 9, label: '9 Adults', price: 1800, compareAtPrice: 2250 },
  { adults: 10, label: '10 Adults', price: 2000, compareAtPrice: 2500 },
  { adults: 11, label: '11 Adults', price: 2200, compareAtPrice: 2750 },
  { adults: 12, label: '12 Adults', price: 2400, compareAtPrice: 3000 },
];

export interface RoomRateOption {
  id: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  memberPrice: boolean;
  breakfastIncluded: boolean;
  taxesIncluded: boolean;
  refundable: boolean;
  payOnline: boolean;
  perks: string[];
  perksAr: string[];
}

export interface BookingRoom {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  fallbackImage: string;
  leftCount: number;
  capacityText: string;
  capacityTextAr: string;
  bedsText: string;
  bedsTextAr: string;
  size: string;
  amenities: string[];
  amenitiesAr: string[];
  rateOptions: RoomRateOption[];
}

export const BOOKING_ROOMS: BookingRoom[] = [
  {
    id: 'triple-room-1',
    name: 'Chambre Triple avec Salle de Bains Privative',
    nameAr: 'غرفة ثلاثية مع حمام خاص',
    image: '/assets/rooms/room_triple_1.jpg',
    fallbackImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/632997009.jpg?k=04db88bb13247fca808bed3f9dc1b8d5db2b592ab9031e1d15ad3c773c1c0cfb&o=',
    leftCount: 1,
    capacityText: 'Capacité : 1 personne adulte',
    capacityTextAr: 'تتسع لـ : شخص بالغ واحد',
    bedsText: '3 lits simples',
    bedsTextAr: '3 أسرة فردية',
    size: '35 m²',
    amenities: ['35 m²', 'Balcon', 'Vue sur cour intérieure', 'Climatisation', 'Salle de bains privative', 'Wi-Fi gratuit'],
    amenitiesAr: ['35 متر مربع', 'شرفة', 'إطلالة على فناء داخلي', 'مكيف هواء', 'حمّام خاص', 'واي فاي مجاناً'],
    rateOptions: [
      {
        id: 'triple-1-opt-1',
        originalPrice: 400,
        discountedPrice: 320,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: ['1 place de parking gratuite', 'Enregistrement tardif inclus', 'Internet haut débit gratuit'],
        perksAr: ['شامل موقف واحد للسيارات + تسجيل الوصول المتأخر + إنترنت عالي السرعة']
      },
      {
        id: 'triple-1-opt-2',
        originalPrice: 404,
        discountedPrice: 323,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: [],
        perksAr: []
      }
    ]
  },
  {
    id: 'family-room',
    name: 'Chambre Familiale avec Salle de Bains Privative',
    nameAr: 'غرفة عائلية مع حمام خاص',
    image: '/assets/rooms/room_family.jpg',
    fallbackImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/632992540.jpg?k=23c7837214fb99cdfabf3cbb87f6479643137c52e2bf0e25a39c4c5bdf3b67ea&o=',
    leftCount: 1,
    capacityText: 'Capacité : 1 personne adulte (Famille)',
    capacityTextAr: 'تتسع لـ : شخص بالغ واحد',
    bedsText: '1 lit simple et 1 grand lit double',
    bedsTextAr: '1 سرير فردي و 1 سرير مزدوج كبير',
    size: '35 m²',
    amenities: ['35 m²', 'Balcon', 'Vue sur cour intérieure', 'Climatisation', 'Salle de bains privative', 'Wi-Fi gratuit'],
    amenitiesAr: ['35 متر مربع', 'شرفة', 'إطلالة على فناء داخلي', 'مكيف هواء', 'حمّام خاص', 'واي فاي مجاناً'],
    rateOptions: [
      {
        id: 'family-opt-1',
        originalPrice: 400,
        discountedPrice: 320,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: ['1 place de parking gratuite', 'Enregistrement tardif inclus', 'Internet haut débit gratuit'],
        perksAr: ['شامل موقف واحد للسيارات + تسجيل الوصول المتأخر + إنترنت عالي السرعة']
      },
      {
        id: 'family-opt-2',
        originalPrice: 404,
        discountedPrice: 323,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: [],
        perksAr: []
      }
    ]
  },
  {
    id: 'twin-room',
    name: 'Chambre Lits Jumeaux avec Salle de Bains Privative',
    nameAr: 'غرفة توأم مع حمام خاص',
    image: '/assets/rooms/room_twin.jpg',
    fallbackImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/668385376.jpg?k=edae9ea842be86bf9357fc6e37527625f3cac9c15030f30f8c9fa44cda60d9d3&o=',
    leftCount: 1,
    capacityText: 'Capacité : 1 personne adulte',
    capacityTextAr: 'تتسع لـ : شخص بالغ واحد',
    bedsText: '2 lits simples',
    bedsTextAr: '2 سرير فردي',
    size: '35 m²',
    amenities: ['35 m²', 'Balcon', 'Vue sur cour intérieure', 'Climatisation', 'Salle de bains privative', 'Wi-Fi gratuit'],
    amenitiesAr: ['35 متر مربع', 'شرفة', 'إطلالة على فناء داخلي', 'مكيف هواء', 'حمّام خاص', 'واي فاي مجاناً'],
    rateOptions: [
      {
        id: 'twin-opt-1',
        originalPrice: 400,
        discountedPrice: 320,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: ['1 place de parking gratuite', 'Enregistrement tardif inclus', 'Internet haut débit gratuit'],
        perksAr: ['شامل موقف واحد للسيارات + تسجيل الوصول المتأخر + إنترنت عالي السرعة']
      },
      {
        id: 'twin-opt-2',
        originalPrice: 404,
        discountedPrice: 323,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: [],
        perksAr: []
      }
    ]
  },
  {
    id: 'triple-room-2',
    name: 'Chambre Triple avec Salle de Bains Privative',
    nameAr: 'غرفة ثلاثية مع حمام خاص',
    image: '/assets/rooms/room_triple_2.jpg',
    fallbackImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/668378229.jpg?k=b63dd0143c278ac884f6e24e49ace934166cee68fd8ad18e0d0f6e352d770618&o=',
    leftCount: 1,
    capacityText: 'Capacité : 1 personne adulte',
    capacityTextAr: 'تتسع لـ : شخص بالغ واحد',
    bedsText: '3 lits simples',
    bedsTextAr: '3 أسرة فردية',
    size: '35 m²',
    amenities: ['35 m²', 'Balcon', 'Vue sur cour intérieure', 'Climatisation', 'Salle de bains privative', 'Wi-Fi gratuit'],
    amenitiesAr: ['35 متر مربع', 'شرفة', 'إطلالة على فناء داخلي', 'مكيف هواء', 'حمّام خاص', 'واي فاي مجاناً'],
    rateOptions: [
      {
        id: 'triple-2-opt-1',
        originalPrice: 400,
        discountedPrice: 320,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: ['1 place de parking gratuite', 'Enregistrement tardif inclus', 'Internet haut débit gratuit'],
        perksAr: ['شامل موقف واحد للسيارات + تسجيل الوصول المتأخر + إنترنت عالي السرعة']
      },
      {
        id: 'triple-2-opt-2',
        originalPrice: 404,
        discountedPrice: 323,
        discountPercent: 20,
        memberPrice: true,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: [],
        perksAr: []
      }
    ]
  },
  {
    id: 'double-room',
    name: 'غرفة مزدوجة مع حمام خاص',
    nameAr: 'غرفة مزدوجة مع حمام خاص',
    image: '/assets/rooms/room_double.jpg',
    fallbackImage: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/668376614.jpg?k=28b1562bbc141f8877821d5d7aaecd99a291b9d303d4ad1f7433350b1279e4ed&o=',
    leftCount: 1,
    capacityText: 'Capacité : 1 personne adulte',
    capacityTextAr: 'تتسع لـ : شخص بالغ واحد',
    bedsText: '1 grand lit double',
    bedsTextAr: '1 سرير مزدوج كبير',
    size: '35 m²',
    amenities: ['35 m²', 'Balcon', 'Vue sur cour intérieure', 'Salle de bains privative', 'Wi-Fi gratuit'],
    amenitiesAr: ['35 متر مربع', 'شرفة', 'إطلالة على فناء داخلي', 'حمّام خاص', 'واي فاي مجاناً'],
    rateOptions: [
      {
        id: 'double-opt-1',
        originalPrice: 400,
        discountedPrice: 356,
        discountPercent: 11,
        memberPrice: false,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: ['1 place de parking gratuite', 'Enregistrement tardif inclus', 'Internet haut débit gratuit'],
        perksAr: ['شامل موقف واحد للسيارات + تسجيل الوصول المتأخر + إنترنت عالي السرعة']
      },
      {
        id: 'double-opt-2',
        originalPrice: 404,
        discountedPrice: 359,
        discountPercent: 11,
        memberPrice: false,
        taxesIncluded: true,
        breakfastIncluded: false,
        refundable: false,
        payOnline: true,
        perks: [],
        perksAr: []
      }
    ]
  }
];

export interface Amenity {
  id: string;
  title: string;
  titleAr: string;
  iconSrc: string;
}

export const AMENITIES: Amenity[] = [
  { id: 'cleaning', title: 'Nettoyage professionnel', titleAr: 'تنظيف احترافي يومي', iconSrc: '/assets/icon_cleaning.png' },
  { id: 'wifi', title: 'WiFi à fibre optique', titleAr: 'واي فاي ألياف بصرية فائق السرعة', iconSrc: '/assets/icon_wifi.png' },
  { id: 'kitchen', title: 'Cuisine équipée', titleAr: 'مطبخ مجهز بالكامل للضيوف', iconSrc: '/assets/icon_kitchen.png' },
  { id: 'soaps', title: 'Produits de douche', titleAr: 'مستلزمات استحمام مجانية', iconSrc: '/assets/icon_soaps.png' },
  { id: 'mattress', title: 'Literie confortable', titleAr: 'أفرشة فندقية ومراتب مريحة', iconSrc: '/assets/icon_mattress.png' },
  { id: 'laundry', title: 'Machine a laver', titleAr: 'غسالة ملابس متاحة للنزلاء', iconSrc: '/assets/icon_laundry.png' },
  { id: 'towels', title: 'Serviettes de bain', titleAr: 'مناشف حمام قطنية نظيفة', iconSrc: '/assets/icon_towels.png' },
  { id: 'support', title: 'Disponibilité 24/7', titleAr: 'استقبال وخدمة 24/7 على مدار الساعة', iconSrc: '/assets/icon_support.png' },
];

export interface RealPhoto {
  id: string;
  src: string;
  title: string;
  titleAr: string;
  category: 'chambre' | 'salon' | 'terrasse' | 'touristes';
  description: string;
  descriptionAr: string;
}

export const REAL_PHOTOS: RealPhoto[] = [
  // --- TOURISTES & EXCURSIONS (Booking.com & Hôtes de Tata) ---
  {
    id: 'touristes-safari',
    src: '/assets/booking/booking_safari_guests_group.jpg',
    title: 'Excursion Safari 4x4 avec nos Visiteurs',
    titleAr: 'سياح في رحلة سفاري واستكشاف بالسيارات الرباعية',
    category: 'touristes',
    description: 'Moments d’aventure et de convivialité partagés avec nos hôtes dans le désert et les canyons de Tata.',
    descriptionAr: 'لحظات استكشاف ومغامرة ممتعة يشاركها السياح في صحراء ووديان طاطا الجميلة.'
  },
  {
    id: 'touristes-oasis',
    src: '/assets/booking/booking_oasis_excursion.jpg',
    title: 'Découverte des Oasis & Palmeraies',
    titleAr: 'جولة استكشافية للواحة والوديان مع السياح',
    category: 'touristes',
    description: 'Visite guidée des kasbahs en pisé et des palmeraies verdoyantes entourant la maison d’hôtes.',
    descriptionAr: 'جولة تعريفية بقصبات الواحة التاريخية ونخيل طاطا البهيج بصحبة الزوار.'
  },
  {
    id: 'touristes-desert',
    src: '/assets/booking/booking_guests_desert_trip.jpg',
    title: 'Aventure Saharienne & Immersion Désert',
    titleAr: 'مغامرة صحراوية استثنائية لضيوفنا في الجنوب',
    category: 'touristes',
    description: 'Nos voyageurs découvrent la magie des dunes et des grands espaces du sud marocain.',
    descriptionAr: 'سياح يستمتعون بسحر الكثبان الرملية والمساحات الطبيعية الشاسعة بالجنوب المغربي.'
  },
  {
    id: 'touristes-randonnee',
    src: '/assets/booking/booking_guests_adventure_2.jpg',
    title: 'Randonnée & Pause Thé dans la Nature',
    titleAr: 'جلسة شاي مغربي واستراحة طبيعية مع السياح',
    category: 'touristes',
    description: 'Hospitalité légendaire : thé à la menthe et partage d’histoires locales avec Mr Oussama et son père.',
    descriptionAr: 'كرم الضيافة الأصيل: شاي بالنعناع وتبادل أطراف الحديث مع السيد أسامة ووالده.'
  },
  {
    id: 'touristes-activites',
    src: '/assets/booking/booking_tourists_activities_1.jpg',
    title: 'Accueil Chaleureux de Voyageurs & Cyclotouristes',
    titleAr: 'استقبال حار للدراجين والمسافرين من مختلف الجنسيات',
    category: 'touristes',
    description: 'Lieu de rendez-vous réputé pour les cyclistes internationaux sillonnant l’Anti-Atlas.',
    descriptionAr: 'المحطة المفضلة لراكبي الدراجات والمسافرين الدوليين القادمين عبر الأطلس الصغير.'
  },

  // --- CHAMBRES & SUITES (Photos Booking.com) ---
  {
    id: 'chambre-master',
    src: '/assets/booking/booking_master_bedroom.jpg',
    title: 'Chambre Principale Spacieuse',
    titleAr: 'غرفة النوم الرئيسية الفسيحة والمريحة',
    category: 'chambre',
    description: 'Grande chambre climatisée avec lit double, literie de qualité supérieure et ambiance reposante.',
    descriptionAr: 'غرفة نوم مكيفة مع سرير مزدوج مريح، أفرشة فندقية ممتازة وهدوء تام.'
  },
  {
    id: 'chambre-double-1',
    src: '/assets/booking/booking_room_double_1.jpg',
    title: 'Chambre Double Confort',
    titleAr: 'غرفة مزدوجة أنيقة ومكيفة',
    category: 'chambre',
    description: 'Décoration marocaine soignée, sol en carrelage brillant et propreté exemplaire.',
    descriptionAr: 'ديكور مغربي راقٍ، أرضية لامعة، ونظافة يومية معتمدة وفق معايير Booking.com.'
  },
  {
    id: 'chambre-lits-multiples',
    src: '/assets/booking/booking_room_beds.jpg',
    title: 'Chambre Familiale à Lits Multiples',
    titleAr: 'غرفة عائلية بأسرة متعددة ومفروشة بعناية',
    category: 'chambre',
    description: 'Idéale pour les familles ou groupes d’amis souhaitant partager le même espace.',
    descriptionAr: 'مثالية للعائلات أو الأصدقاء لقضاء إقامة متماسكة وممتعة وبسعر مناسب.'
  },
  {
    id: 'chambre-suite-panoramique',
    src: '/assets/booking/booking_suite_wide.jpg',
    title: 'Suite Complète & Vue Panoramique',
    titleAr: 'جناح فسيح متكامل مع إطلالة مشرقة',
    category: 'chambre',
    description: 'Espace spacieux et lumineux avec coin salon, table de travail et rangements.',
    descriptionAr: 'مساحة رحبة ومضاءة بنور الشمس الطبيعي، مع ركن استراحة وخزائن للملابس.'
  },
  {
    id: 'chambre-suite-salon',
    src: '/assets/booking/booking_suite_seating.jpg',
    title: 'Coin Séjour & Détente dans la Suite',
    titleAr: 'ركن الجلوس والاسترخاء الخاص بالجناح',
    category: 'chambre',
    description: 'Banquettes confortables pour se relaxer après une longue journée de route ou de vélo.',
    descriptionAr: 'جلسة مريحة للاسترخاء بعد يوم سفر طويل أو جولة بالدراجة في طاطا.'
  },
  {
    id: 'chambre-suite-4',
    src: '/assets/booking/booking_room_suite_4.jpg',
    title: 'Chambre Cosy & Calme',
    titleAr: 'غرفة مريحة وهادئة لنوم عميق',
    category: 'chambre',
    description: 'Isolation phonique naturelle, calme absolu pour une récupération parfaite.',
    descriptionAr: 'هدوء تام وعزلة عن الضوضاء لنوم صحي ومريح طوال الليل.'
  },
  {
    id: 'chambre-literie',
    src: '/assets/booking/booking_clean_linens.jpg',
    title: 'Literie Fraîche & Linge Désinfecté',
    titleAr: 'أغطية فندقية معقمة ونظافة فائقة',
    category: 'chambre',
    description: 'Draps frais en coton, oreillers ergonomiques et changement quotidien du linge.',
    descriptionAr: 'أغطية قطنية بيضاء نظيفة، وسائد مريحة وتعقيم دوري ومستمر.'
  },
  {
    id: 'chambre-ambiance',
    src: '/assets/booking/booking_bedroom_ambiance.jpg',
    title: 'Ambiance Feutrée & Éclairage Doux',
    titleAr: 'إضاءة هادئة وأجواء دافئة للاستجمام',
    category: 'chambre',
    description: 'Un cocon de sérénité au cœur de l’oasis de Tata.',
    descriptionAr: 'ملاذ من السكينة والهدوء في قلب واحة طاطا الخلابة.'
  },
  {
    id: 'chambre-salle-de-bain',
    src: '/assets/booking/booking_bathroom_private.jpg',
    title: 'Salle de Bain Privative avec Eau Chaude',
    titleAr: 'حمام خاص نظيف مع مياه ساخنة ولوازم استحمام',
    category: 'chambre',
    description: 'Douche chaude à bonne pression, serviettes fournies et produits de toilette.',
    descriptionAr: 'دوش مياه ساخنة بضغط ممتاز، مناشف قطنية نظيفة ومستلزمات صابون مجانية.'
  },
  {
    id: 'chambre-details',
    src: '/assets/booking/booking_room_detail_lamp.jpg',
    title: 'Détails Artisanaux & Lampes Marocaines',
    titleAr: 'لمسات تقليدية وفوانيس نحاسية أصيلة',
    category: 'chambre',
    description: 'Chaque détail célèbre l’artisanat et la tradition architecturale du Sud.',
    descriptionAr: 'تفاصيل معمارية تراثية تعكس أصالة وتاريخ الجنوب المغربي العريق.'
  },

  // --- SALONS & ESPACES COMMUNS (Photos Booking.com) ---
  {
    id: 'salon-moroccan-living',
    src: '/assets/booking/booking_moroccan_living.jpg',
    title: 'Grand Salon Marocain Traditionnel',
    titleAr: 'الصالون المغربي الكبير للاستقبال والضيافة',
    category: 'salon',
    description: 'Espace majestueux aux zelliges et banquettes artisanales pour vos moments de partage.',
    descriptionAr: 'صالون فسيح ومريح يجمع الضيوف لتبادل الحديث وشرب الشاي المغربي المنعش.'
  },
  {
    id: 'salon-traditional-convivial',
    src: '/assets/booking/booking_salon_traditional.jpg',
    title: 'Salon de Détente & Lecture',
    titleAr: 'فضاء هادئ للقراءة والاسترخاء وتبادل الآراء',
    category: 'salon',
    description: 'Atmosphère calme, coussins moelleux et Wi-Fi haut débit disponible.',
    descriptionAr: 'أجواء مريحة ومقاعد وثيرية مع إنترنت واي فاي سريع مجاناً.'
  },
  {
    id: 'salon-patio-courtyard',
    src: '/assets/booking/booking_patio_courtyard.jpg',
    title: 'Patio Intérieur Lumineux',
    titleAr: 'الفناء الداخلي المضاء بنور الشمس',
    category: 'salon',
    description: 'Architecture marocaine avec lumière zénithale et fraîcheur naturelle.',
    descriptionAr: 'هندسة معمارية مغربية تقليدية توفر الانتعاش والإضاءة الطبيعية.'
  },
  {
    id: 'salon-hallway-arches',
    src: '/assets/booking/booking_hallway_arches.jpg',
    title: 'Arcades & Couloirs Décorés',
    titleAr: 'أقواس معمارية وأروقة بتصميم مغربي أصيل',
    category: 'salon',
    description: 'Finition artisanale raffinée et carrelage impeccable dans toutes les allées.',
    descriptionAr: 'تشطيبات يدوية أنيقة وأرضيات نظيفة تمنح المكان رونقاً متميزاً.'
  },
  {
    id: 'salon-entrance-decor',
    src: '/assets/booking/booking_entrance_decor.jpg',
    title: 'Entrée Accueillante de la Villa',
    titleAr: 'مدخل الدار المرحب بالنزلاء والزوار',
    category: 'salon',
    description: 'Porte d’entrée traditionnelle ouvrant sur une hospitalité généreuse.',
    descriptionAr: 'باب تقليدي أصيل يفتح على كرم الضيافة والترحيب المغربي.'
  },
  {
    id: 'salon-hero-main',
    src: '/assets/booking/booking_hero_main.jpg',
    title: 'Vue d’Ensemble des Espaces Intérieurs',
    titleAr: 'نظرة عامة على مرافق وفضاءات الدار',
    category: 'salon',
    description: 'Maison d’hôtes soignée, spacieuse et sécurisée, recommandée par nos visiteurs.',
    descriptionAr: 'دار ضيافة منظمة، آمنة وموصى بها بشدة من كافة النزلاء.'
  },

  // --- TERRASSE, REPAS & NATURE (Photos Booking.com) ---
  {
    id: 'terrasse-view-top',
    src: '/assets/booking/booking_terrace_view.jpg',
    title: 'Grande Terrasse Panoramique',
    titleAr: 'شرفة السطح البانورامية المشمسة',
    category: 'terrasse',
    description: 'Vue imprenable sur l’oasis, les palmiers et les reliefs de l’Anti-Atlas.',
    descriptionAr: 'إطلالة خلابة وساحرة على واحة النخيل وجبال إقليم طاطا الرائعة.'
  },
  {
    id: 'terrasse-dining-breakfast',
    src: '/assets/booking/booking_dining_area.jpg',
    title: 'Espace Petit-Déjeuner & Dîners',
    titleAr: 'فضاء تقديم وجبات الإفطار والعشاء الطازجة',
    category: 'terrasse',
    description: 'Prenez vos repas en plein air : msemmen, miel, thé à la menthe et tajines savoureux.',
    descriptionAr: 'استمتع بأشهى أطباق الإفطار المغربي والطواجن المحلية المحضرة عند الطلب.'
  },
  {
    id: 'terrasse-garden-cour',
    src: '/assets/booking/booking_garden_outdoor.jpg',
    title: 'Cour Extérieure & Coin Jardin',
    titleAr: 'الفناء الخارجي وركن الحديقة الهادئ',
    category: 'terrasse',
    description: 'Espace extérieur ombragé parfait pour garer vélos et motos en toute sécurité.',
    descriptionAr: 'فضاء خارجي هادئ وظليل ومثالي لركن الدراجات والسيارات بأمان تام.'
  },
  {
    id: 'terrasse-sunset-rooftop',
    src: '/assets/booking/booking_sunset_rooftop.jpg',
    title: 'Coucher de Soleil Magique sur Tata',
    titleAr: 'غروب الشمس الساحر من أعلى سطح الدار',
    category: 'terrasse',
    description: 'Couleurs flamboyantes du ciel de Tata en fin de journée depuis notre terrasse.',
    descriptionAr: 'ألوان السماء المذهلة وقت الغروب في طاطا تمنحكم تجربة استرخاء لا تُنسى.'
  },
  {
    id: 'terrasse-mountain-view',
    src: '/assets/booking/booking_mountain_view.jpg',
    title: 'Vue sur la Chaîne de l’Anti-Atlas',
    titleAr: 'إطلالة مباشرة على جبال الأطلس الصغير الشامخة',
    category: 'terrasse',
    description: 'Un panorama naturel exceptionnel qui inspire calme, sérénité et déconnexion.',
    descriptionAr: 'مشهد طبيعي جبلي أخّاذ يبعث على الهدوء والسكينة والراحة النفسية.'
  },
  {
    id: 'terrasse-oasis-landscape',
    src: '/assets/booking/booking_panoramic_landscape.jpg',
    title: 'Paysage et Horizons de Tata',
    titleAr: 'بانوراما طبيعة واحات وجبال طاطا',
    category: 'terrasse',
    description: 'La beauté brute du Sud marocain à contempler directement depuis la maison.',
    descriptionAr: 'جمال طبيعة الجنوب المغربي الخلابة في متناول أعينكم مباشرة من مكان إقامتكم.'
  }
];

export interface Review {
  name: string;
  rating: number;
  country: string;
  type: string;
  content: string;
}

export const REVIEWS: Review[] = [
  {
    name: 'David Boddy',
    rating: 5,
    country: 'Royaume-Uni 🇬🇧',
    type: 'Cyclotouriste',
    content: "Superbly decorated guest house just set back from the main road heading north out of Tata. Owner was super helpful when we arrived as touring cyclists when we couldn't find the auberge we had intended to stay. Both dinner and breakfast were superb."
  },
  {
    name: 'HANI LABOUIDI',
    rating: 5,
    country: 'Maroc 🇲🇦',
    type: 'Voyageur régulier',
    content: "It was a great experience, specially with Mr Oussama and his father, they treat their clients with a special hospitality, and big heart, they offer a lot of help in many ways, it is an experience that i repeat it next year 👍"
  },
  {
    name: 'Matthias Lausch',
    rating: 5,
    country: 'Allemagne 🇩🇪',
    type: 'Touriste international',
    content: "Beautiful guest house with a lovely owner. The house is set back a little from the main road and looks unremarkable at first glance. But it’s a real beauty inside! Fresh colors, shiny tiles and decorations fill the rooms and hallways. The owner gave us a warm welcome and did everything to make our stay comfortable. He shared his personal history and view on the country with us."
  },
  {
    name: 'othman amellouk',
    rating: 5,
    country: 'Maroc 🇲🇦',
    type: 'Visiteur en famille',
    content: "c’était une expérience inoubliable ...avec un accueil tres chaleureux ...le gérant est tres gentil et calme ...un emplacement tres calme et proche du centre ville , sécurisé ....fortement recommandé pour se reposer et profiter de la simplicité la générosité et la sagesse du theme marocain."
  },
  {
    name: 'Danielle Floch',
    rating: 5,
    country: 'France 🇫🇷',
    type: 'Voyageuse passionnée',
    content: "Un accueil tellement gentil,une attention de tous les instants,une générosité inattendue,des échanges riches et intéressants.... voilà pourquoi on espère repasser chez vous à l'avenir. Merci mille fois pour tout."
  },
  {
    name: 'celine parisotto',
    rating: 5,
    country: 'France 🇫🇷',
    type: 'Arrivée tardive',
    content: "Endroit très calme. Patron adorable et très serviable. Malgré une arrivée tardive, nous avons été très bien accueilli."
  }
];

export const TOURIST_HIGHLIGHTS = [
  {
    title: 'Tourisme à Vélo & Randonneurs',
    titleAr: 'سياحة الدراجات الهوائية والمغامرين',
    desc: 'Arrêt incontournable pour les cyclistes sillonnant le sud marocain avec garage sécurisé pour vos vélos.',
    descAr: 'المحطة المفضلة لراكبي الدراجات الهوائية في جنوب المغرب مع كراج آمن ومغلق للدراجات.'
  },
  {
    title: 'Oasis & Patrimoine de Tata',
    titleAr: 'واحات طاطا والتراث العريق',
    desc: 'Visitez les gravures rupestres, l’horloge à eau traditionnelle et les magnifiques palmeraies de la province.',
    descAr: 'اكتشف النقوش الصخرية القديمة، والساعة المائية التراثية، والواحات الخلابة في إقليم طاطا.'
  },
  {
    title: 'Dîners & Petits-Déjeuners Locaux',
    titleAr: 'أطباق طاطاوية ومغربية أصيلة',
    desc: 'Tajines faits maison, thé à la menthe et délices préparés sur commande avec les produits frais du terroir.',
    descAr: 'طواجن محلية شهية، شاي مغربي أصيل، وفطور بلدي طازج يُحضر بحب وعناية للنزلاء.'
  }
];

export const SITE_INFO = {
  logoUrl: "/assets/logo.png",
  logoFallbackUrl: "https://cdn.youcan.shop/stores/6a7a769d7cc6310903eeab7d736283bd/others/LxVmrquaJ1XrZZ8rRbvaTxbGF08QkMAPcJJK3bcu.png",
  heroPhotoUrl: "/assets/hero_photo.png",
  heroPhotoFallbackUrl: "https://cdn.youcan.shop/stores/6a7a769d7cc6310903eeab7d736283bd/others/dAur7DxGS18jQ6taQsjDHuygDAqtPOYXsKUYnqYv.png",
  trustBadgeUrl: "/assets/trust_badge1.png",
  trustBadgeFallbackUrl: "https://cdn.youcan.shop/stores/522e98998f2a378d0f469a528cbba610/others/BqJ5NuVwRnLLE6TtSKHXPMzDUOaq84WC2ywHg8TP.png",
  paymentMethodsUrl: "/assets/payment_methods.png",
  paymentMethodsFallbackUrl: "https://cdn.youcan.shop/stores/6a7a769d7cc6310903eeab7d736283bd/others/yJSwRagoBfeR184PSgVXk21vimvHhyZDRLmypEXM.png",
  whatsappUrl: "https://wa.me/212655828966?text=Bonjour%20!%0AJe%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20services%20et%20j%E2%80%99aimerais%20r%C3%A9server%20une%20chambre.%20Voici%20les%20d%C3%A9tails%20:%0A%0A-%20Date%20de%20r%C3%A9servation%20:%20%5BIns%C3%A9rez%20la%20date%20ici%5D%0A-%20Dur%C3%A9e%20:%20%5BNombre%20de%20nuit%C3%A9es%5D%0A-%20Nombre%20de%20personnes%20:%20%5BIns%C3%A9rez%20le%20nombre%20ici%5D%0APourriez-vous,%20s%E2%80%99il%20vous%20pla%C3%AEt,%20me%20confirmer%20la%20disponibilit%C3%A9%20et%20m%E2%80%99envoyer%20plus%20d%E2%80%99informations%20?%20Merci%20!",
  bookingComUrl: "https://www.booking.com/hotel/ma/tata-guest-house.ar.html",
  googleMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.7714026721073!2d-7.976529223526333!3d29.755328375070455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb74ffc2af2454d%3A0x3f0f16235e52f72f!2sTata%20Guest%20House!5e0!3m2!1sen!2sma!4v1733099557901!5m2!1sen!2sma",
  phone: "+212 655 828 966",
  phoneRaw: "212655828966",
  email: "contact.tataguesthouse@gmail.com",
  bookingScore: "9.2 / 10",
  bookingScoreLabel: "Superbe",
  googleScore: "5.0 ★★★★★"
};

export interface FaqItem {
  qAr: string;
  qFr: string;
  aAr: string;
  aFr: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    qAr: "ما هو أفضل فندق للإقامة في مدينة طاطا بالمغرب؟",
    qFr: "Quel est le meilleur hôtel pour séjourner à Tata, Maroc ?",
    aAr: "يُعد فندق ودار ضيافة TATA GUEST HOUSE الخيار الأول والموصى به للمسافرين والسياح في مدينة طاطا بفضل تقييم Google الاستثنائي (5.0/5) وتقييم Booking.com (9.2/10). يوفر الفندق غرفاً مكيفة ونظيفة بحمامات خاصة، إنترنت فائق السرعة، ومواقف آمنة للسيارات والدراجات في بيئة هادئة ومريحة.",
    aFr: "TATA GUEST HOUSE est l'établissement n°1 recommandé à Tata, avec une note Google exceptionnelle de 5.0/5 et 9.2/10 sur Booking.com. Vous profiterez de chambres climatisées avec salle de bains privative, Wi-Fi rapide et parking sécurisé dans un cadre paisible et chaleureux."
  },
  {
    qAr: "كم يبلغ سعر حجز الغرفة في فندق TATA GUEST HOUSE بطاطا؟",
    qFr: "Quels sont les tarifs d'une chambre à Tata Guest House ?",
    aAr: "تبدأ الأسعار من 320 درهم مغربي لليلة الواحدة (تخفيض 20% مباشر للأعضاء والحجز المباشر)، شاملة لكافة الضرائب والرسوم وموقف السيارات المجاني، وتتوفر غرف ثلاثية وعائلية وتوأم ومزدوجة لتناسب كافة الرحلات بأسعار تنافسية جداً.",
    aFr: "Les tarifs débutent à 320 MAD la nuitée (remise immédiate de 20% pour les membres et réservations directes), toutes taxes comprises, incluant chambres triples, familiales, twin et doubles avec un excellent rapport qualité-prix."
  },
  {
    qAr: "هل تحتوي جميع الغرف على مكيف هواء وحمام خاص وواي فاي؟",
    qFr: "Les chambres disposent-elles de climatisation, salle de bain privée et Wi-Fi ?",
    aAr: "نعم، كافة الغرف في TATA GUEST HOUSE مجهزة بمكيف هواء حديث (تبريد وتدفئة)، حمام خاص نظيف ومجهز بالمياه الساخنة ومستلزمات النظافة، بالإضافة إلى شبكة واي فاي مجانية سريعة تغطي الغرف والفناء والشرفة.",
    aFr: "Oui, toutes les chambres sont entièrement équipées de climatisation réversible, d'une salle de bains privative soignée avec eau chaude, et d'un accès Wi-Fi haut débit gratuit dans tout l'établissement."
  },
  {
    qAr: "أين يقع فندق TATA GUEST HOUSE في مدينة طاطا وكيف أصل إليه؟",
    qFr: "Où se situe l'hôtel Tata Guest House et comment y accéder ?",
    aAr: "يقع الفندق في فيلا رقم 3، أدنون، دوار تالغرمت، عند المدخل الشمالي لمدينة طاطا على شارع محمد الخامس. يبعد دقائق معدودة عن مركز المدينة والواحة، وموقعه يجمع بين الهدوء التام وسهولة الوصول بالسيارة أو الدراجة مع توفر خريطة Google Maps دقيقة.",
    aFr: "Situé Villa N°03, Adnoun, Douar Tighremte, à l'entrée nord de Tata sur l'Avenue Mohamed V. À quelques minutes du centre-ville et de la palmeraie, combinant quiétude et accès rapide en voiture ou à vélo."
  },
  {
    qAr: "هل يتوفر موقف آمن ومجاني للسيارات والدراجات الهوائية والنارية؟",
    qFr: "Le parking est-il sécurisé et gratuit pour voitures, motos et vélos ?",
    aAr: "نعم، نوفر فناءً وكراجاً خاصاً ومغلقاً وآمناً بالمجان لجميع النزلاء، مما يجعله الوجهة المفضلة لعشاق رحلات الدراجات الهوائية وسائقي السيارات والرحالة في جنوب المغرب.",
    aFr: "Oui, un garage privé clos et gratuit est mis à la disposition exclusive de nos clients pour stationner voitures, 4x4, motos et vélos en totale sécurité."
  },
  {
    qAr: "كيف يمكنني تأكيد حجز الغرفة مباشرة للحصول على أفضل سعر؟",
    qFr: "Comment réserver directement et bénéficier de la meilleure offre ?",
    aAr: "يمكنك تحديد نوع الغرفة وتاريخ الوصول وعدد الليالي من جدول الحجز، ثم الضغط على زر 'تأكيد الحجز فوراً على واتساب' على الرقم +212655828966 للحصول على تأكيد مباشر وسريع من إدارة الفندق بدون أي وسيط.",
    aFr: "Sélectionnez votre chambre et vos dates sur le tableau de réservation ci-dessus, puis cliquez sur 'Confirmer directement sur WhatsApp' au +212655828966 pour une validation directe sans frais intermédiaires."
  }
];

export interface TataGuideItem {
  titleAr: string;
  titleFr: string;
  descAr: string;
  descFr: string;
  tagAr: string;
  tagFr: string;
}

export const TATA_GUIDE_ITEMS: TataGuideItem[] = [
  {
    tagAr: "طبيعة وواحات",
    tagFr: "Nature & Oasis",
    titleAr: "واحة النخيل والأودية الطبيعية في طاطا",
    titleFr: "Palmeraies et Canyons Sahariens de Tata",
    descAr: "تتميز مدينة طاطا بواحاتها النضرة الممتدة على طول الوديان، حيث تلتقي أشجار النخيل الباسقة بالصخور الوردية للأطلس الصغير في مشهد ساحر يمنحك تجربة استجمام فريدة.",
    descFr: "Tata est réputée pour ses palmeraies luxuriantes le long des oueds et ses panoramas uniques où la roche rouge rencontre la verdure apaisante du Sud."
  },
  {
    tagAr: "تاريخ وتراث",
    tagFr: "Patrimoine & Histoire",
    titleAr: "النقوش الصخرية الأثرية وساعة الماء التراثية",
    titleFr: "Gravures Rupestres & Horloge à Eau Millénaire",
    descAr: "تضم منطقة طاطا مواقع أثرية عالمية تحوي نقوشاً صخرية تعود لآلاف السنين قبل الميلاد، بالإضافة إلى نظام توزيع مياه السقي التراثي 'التنفست' المبتكر عبر ساعات الماء التقليدية.",
    descFr: "Un carrefour historique doté de sites rupestres préhistoriques majeurs et du célèbre système hydraulique traditionnel de partage de l'eau."
  },
  {
    tagAr: "مغامرات ورياضة",
    tagFr: "Aventure & Cyclisme",
    titleAr: "مسارات الدراجات الهوائية ورحلات الدفع الرباعي 4x4",
    titleFr: "Itinéraires Cyclotouristes & Safari Saharien",
    descAr: "تعتبر طاطا نقطة عبور مفضلة لراكبي الدراجات الهوائية والرحالة القادمين عبر مسارات تافراوت وتارودانت والزاكورة، مع طرق خلابة ومسارات صحراوية لا مثيل لها.",
    descFr: "Étape incontournable des cyclotouristes et motards traversant l'Anti-Atlas, offrant des routes panoramiques et des pistes vers les dunes du Sahara."
  },
  {
    tagAr: "كرم وضيافة",
    tagFr: "Hospitalité & Saveurs",
    titleAr: "المطبخ الجنوبي الأصيل والشاي المغربي بالنعناع",
    titleFr: "Cuisine Terroir du Sud & Thé à la Menthe",
    descAr: "استمتع بالطواجن المغربية الطازجة المحضرة بزيت الزيتون المحلي والخضار الطبيعية، إلى جانب كرم الضيافة الاستثنائي الذي يشتهر به أهل طاطا.",
    descFr: "Savourez des tajines savoureux mitonnés avec amour, des petits-déjeuners traditionnels et le thé d'accueil partagé dans la pure tradition marocaine."
  }
];
