import React, { useState } from 'react';
import {
  PRICING_TIERS,
  AMENITIES,
  REVIEWS,
  TOURIST_HIGHLIGHTS,
  SITE_INFO,
  BOOKING_ROOMS,
  BookingRoom,
  RoomRateOption,
  FAQ_ITEMS,
  TATA_GUIDE_ITEMS,
} from './data/tataData';
import {
  Calendar,
  Phone,
  CheckCircle,
  Car,
  Star,
  MapPin,
  ExternalLink,
  Globe,
  Compass,
  Award,
  Sparkles,
  Users,
  Maximize2,
  X,
  Image as ImageIcon,
  Bed,
  Wifi,
  Wind,
  Check,
  ShieldCheck,
  Clock,
  Coffee,
  Info,
  Tag,
  CreditCard,
  Lock,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'FR' | 'AR'>('AR');
  const [bookingMode, setBookingMode] = useState<'rooms' | 'guests'>('rooms');
  
  // Selected room quantities: maps rate option ID -> quantity (0 or 1)
  const [selectedRoomQuantities, setSelectedRoomQuantities] = useState<Record<string, number>>({
    'triple-1-opt-1': 1,
  });

  const [selectedAdults, setSelectedAdults] = useState<number>(1);
  const [nights, setNights] = useState<number>(1);
  const [roomModalPhoto, setRoomModalPhoto] = useState<{ src: string; title: string; titleAr: string } | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Reservation form matching YouCan & Booking fields
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const isAr = lang === 'AR';

  // Room selections calculation
  const selectedRoomItems = Object.entries(selectedRoomQuantities)
    .filter(([_, qty]) => qty > 0)
    .map(([optId, qty]) => {
      for (const room of BOOKING_ROOMS) {
        const option = room.rateOptions.find((o) => o.id === optId);
        if (option) {
          return { room, option, qty };
        }
      }
      return null;
    })
    .filter(Boolean) as { room: BookingRoom; option: RoomRateOption; qty: number }[];

  const totalSelectedRoomsCount = selectedRoomItems.reduce((acc, item) => acc + item.qty, 0);
  const roomsTotalPerNight = selectedRoomItems.reduce(
    (acc, item) => acc + item.option.discountedPrice * item.qty,
    0
  );
  const roomsOriginalTotalPerNight = selectedRoomItems.reduce(
    (acc, item) => acc + item.option.originalPrice * item.qty,
    0
  );
  const roomsTotalAmount = roomsTotalPerNight * nights;
  const roomsCompareAmount = roomsOriginalTotalPerNight * nights;
  const roomsSavings = roomsCompareAmount - roomsTotalAmount;

  // Guest Tier calculations
  const currentTier = PRICING_TIERS.find((t) => t.adults === selectedAdults) || PRICING_TIERS[0];
  const guestsTotalAmount = currentTier.price * nights;
  const guestsCompareAmount = currentTier.compareAtPrice * nights;
  const guestsSavings = guestsCompareAmount - guestsTotalAmount;

  // Active pricing based on booking mode
  const isRoomModeActive = bookingMode === 'rooms' && totalSelectedRoomsCount > 0;
  const activeTotal = isRoomModeActive ? roomsTotalAmount : guestsTotalAmount;
  const activeCompare = isRoomModeActive ? roomsCompareAmount : guestsCompareAmount;
  const activeSavings = isRoomModeActive ? roomsSavings : guestsSavings;

  const updateRoomQuantity = (optId: string, delta: number) => {
    setSelectedRoomQuantities((prev) => {
      const current = prev[optId] || 0;
      const next = Math.max(0, Math.min(1, current + delta));
      const updated = { ...prev };
      if (next === 0) {
        delete updated[optId];
      } else {
        updated[optId] = next;
      }
      return updated;
    });
  };

  const setRoomQuantityDirect = (optId: string, val: number) => {
    setSelectedRoomQuantities((prev) => {
      const updated = { ...prev };
      if (val <= 0) {
        delete updated[optId];
      } else {
        updated[optId] = Math.min(1, val);
      }
      return updated;
    });
  };

  const scrollToCheckout = () => {
    document.getElementById('reservation-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lastName.trim() || !firstName.trim() || !whatsapp.trim() || !arrivalDate.trim()) {
      setFormError(isAr ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  const constructWhatsAppUrl = () => {
    let detailsText = '';
    if (isRoomModeActive) {
      const roomsSummary = selectedRoomItems
        .map(
          (item) =>
            `- ${isAr ? item.room.nameAr : item.room.name} (${item.option.discountedPrice} MAD/nuitée x ${item.qty})`
        )
        .join('\n');
      detailsText = `\n- الغرف المختارة:\n${roomsSummary}`;
    } else {
      detailsText = `\n- عدد الأشخاص: ${currentTier.label}`;
    }
    const text = encodeURIComponent(
      `السلام عليكم TATA GUEST HOUSE !\nأود حجز إقامة لديكم :\n- الاسم الكامل: ${lastName} ${firstName}${detailsText}\n- تاريخ الوصول: ${arrivalDate}\n- مدة الإقامة: ${nights} ليلة\n- المجموع الإجمالي: ${activeTotal} درهم مغربي (MAD)\n- رقم الواتساب: ${whatsapp}\n\nيرجى تأكيد الحجز وتوافر الغرف، شكراً جزيلاً!`
    );
    return `https://wa.me/${SITE_INFO.phoneRaw}?text=${text}`;
  };

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="min-h-screen bg-white text-[#26292E] font-sans antialiased">
      {/* Top Banner: Booking.com & Google Verified Trust Bar */}
      <div className="bg-[#1A1A1A] text-white text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[#F7A708] font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Google 5.0 ★★★★★</span>
            </span>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-400" />
              <span>Booking.com Partner : <strong>{SITE_INFO.bookingScore}</strong> ({SITE_INFO.bookingScoreLabel})</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <span>{isAr ? 'شارع محمد الخامس، فيلا رقم 3، طاطا' : 'Avenue Mohamed V, Villa N°03, Tata'}</span>
            <a href={`tel:${SITE_INFO.phoneRaw}`} className="text-[#F5A623] hover:underline font-bold">
              {SITE_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img
              src={SITE_INFO.logoUrl}
              alt="TATA GUEST HOUSE"
              referrerPolicy="no-referrer"
              className="h-14 sm:h-16 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = SITE_INFO.logoFallbackUrl;
              }}
            />
          </a>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setLang(lang === 'FR' ? 'AR' : 'FR')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'FR' ? 'العربية' : 'Français'}</span>
            </button>

            <button
              onClick={scrollToCheckout}
              className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#F5A623] hover:bg-[#E59300] text-black font-extrabold text-xs sm:text-sm rounded-md transition-colors shadow-xs cursor-pointer"
            >
              {isAr ? 'احجز غرفتك الآن' : 'Réserver votre chambre'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Title */}
        <div className="text-center my-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-[#8B572A] text-xs font-black mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'فندق ودار ضيافة موصى بها في مدينة طاطا · تقييم 5.0 ★★★★★' : 'Hôtel & Maison d’Hôtes Recommandée à Tata · 5.0 ★★★★★'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#8B572A] leading-tight">
            <span className="tata-title-highlight px-2 py-0.5 inline-block">
              {isAr ? 'فندق في مدينة طاطا المغرب' : 'Hôtel à Tata, Maroc'}
            </span>{' '}
            <span className="text-gray-900 block mt-2 sm:mt-1 font-black">
              TATA GUEST HOUSE
            </span>
          </h1>
          <p className="text-base sm:text-xl font-bold text-gray-700 mt-3 max-w-2xl mx-auto">
            {isAr
              ? 'أفضل خيار للإقامة والمبيت في طاطا: غرف مكيفة ونظيفة بحمام خاص، هدوء تام، وحجز فوري بأفضل الأسعار.'
              : 'Votre hébergement de référence à Tata : chambres climatisées avec salle de bain privée, calme absolu et tarifs directs garantis.'}
          </p>
        </div>

        {/* Real Main Photo Showcase (Original Collage from the official guesthouse) */}
        <div className="my-8 flex justify-center">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg max-w-5xl w-full bg-gray-900 group">
            <img
              src={SITE_INFO.heroPhotoUrl}
              alt={isAr ? "فندق في مدينة طاطا المغرب TATA GUEST HOUSE - صور الغرف والصالون والشرفة" : "Hôtel Tata Maroc TATA GUEST HOUSE Photos des chambres et du salon"}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.src = SITE_INFO.heroPhotoFallbackUrl;
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md text-white flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#F7A708]">
                  {isAr ? 'غرف مجهزة ومكيفة · صالون مغربي تقليدي · شرفة مشمسة' : 'Chambres Climatisées · Salon Marocain · Terrasse'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  {isAr ? 'صور حقيقية 100% من داخل دار الضيافة طاطا' : 'Photos réelles de la villa TATA GUEST HOUSE'}
                </p>
              </div>
              <button
                onClick={scrollToCheckout}
                className="px-4 py-2 bg-[#F5A623] hover:bg-[#E59300] text-black font-extrabold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {isAr ? 'اختر الغرفة واحجز' : 'Choisir une chambre'}
              </button>
            </div>
          </div>
        </div>

        {/* SEO Trust & Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-8">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-center flex flex-col items-center justify-center">
            <Star className="w-5 h-5 text-amber-500 fill-current mb-1" />
            <span className="font-black text-xs sm:text-sm text-gray-900">{isAr ? 'تقييم Google 5.0' : 'Google 5.0 ★★★★★'}</span>
            <span className="text-[11px] text-gray-500">{isAr ? '100% رضا النزلاء' : 'Booking.com 9.2/10'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-green-50/70 border border-green-200 text-center flex flex-col items-center justify-center">
            <Wind className="w-5 h-5 text-green-600 mb-1" />
            <span className="font-black text-xs sm:text-sm text-gray-900">{isAr ? 'مكيف هواء وحمام خاص' : 'Climatisé & Privatif'}</span>
            <span className="text-[11px] text-gray-500">{isAr ? 'في جميع الغرف' : 'Toutes les chambres'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-center flex flex-col items-center justify-center">
            <Car className="w-5 h-5 text-blue-600 mb-1" />
            <span className="font-black text-xs sm:text-sm text-gray-900">{isAr ? 'موقف مجاني آمن' : 'Parking Sécurisé Gratuit'}</span>
            <span className="text-[11px] text-gray-500">{isAr ? 'للسيارات والدراجات' : 'Voitures, motos, vélos'}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-center flex flex-col items-center justify-center">
            <Tag className="w-5 h-5 text-purple-600 mb-1" />
            <span className="font-black text-xs sm:text-sm text-gray-900">{isAr ? 'من 320 درهم / الليلة' : 'Dès 320 MAD / Nuit'}</span>
            <span className="text-[11px] text-gray-500">{isAr ? 'تخفيض 20% مباشر' : 'Remise membre 20%'}</span>
          </div>
        </div>

        {/* Subtitles */}
        <div className="text-center my-10 space-y-3">
          <p className="text-lg sm:text-2xl font-bold text-[#8B572A]">
            {isAr
              ? 'نحن نقدم ضيافة استثنائية وبأسعار في متناول الجميع.'
              : 'Nous offrons une hospitalité à la fois remarquable mais surtout accessible.'}
          </p>
          <p className="text-base sm:text-xl font-medium text-[#26292E]">
            {isAr
              ? 'لأن كل شخص يستحق الاستمتاع بإقامة مميزة في مدينة طاطا.'
              : 'Parce que tout le monde a le droit de s’offrir un séjour d’exception à Tata.'}
          </p>
        </div>

        {/* SECTION: Tourists, Cyclists & Desert Explorers Spotlight */}
        <section className="my-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#417505] uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>{isAr ? 'وجهة السياح والدراجين المفضلة' : 'L’Étape Idéale pour les Touristes & Cyclistes'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {isAr ? 'لماذا يفضل المسافرون والسياح الإقامة عندنا في طاطا؟' : 'Pourquoi les Voyageurs Choisissent Tata Guest House'}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
              {isAr
                ? 'نستقبل سنوياً عشاق الدراجات الهوائية، المجموعات السياحية، وعشاق رحلات الصحراء في أجواء عائلية دافئة.'
                : 'Nous accueillons toute l’année cyclotouristes, voyageurs solitaires et groupes en quête d’authenticité saharienne.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TOURIST_HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-linear-to-b from-amber-50/40 to-white border border-amber-100 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#8B572A] flex items-center justify-center font-black mb-4">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isAr ? h.titleAr : h.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {isAr ? h.descAr : h.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Des espaces de vie entièrement équipés pour vous! */}
        <div className="my-14">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#41A85F]">
              {isAr
                ? 'فضاءات عيش مجهزة بالكامل لراحتكم!'
                : 'Des espaces de vie entièrement équipés pour vous!'}
            </h2>
            <p className="text-base sm:text-lg font-bold text-[#3B4249]">
              {isAr
                ? 'غرفنا مجهزة بالكامل لتوفير أقصى درجات الراحة للمسافرين.'
                : 'Nos chambres sont entièrement équipées pour le plus grand confort des voyageurs.'}
            </p>
            <p className="text-base sm:text-lg font-bold text-[#3B4249]">
              {isAr
                ? 'أفرشة عالية الجودة، مناشف حمام متوفرة، واي فاي فائق السرعة...'
                : 'Literie de qualité, linge de bain fourni, WIFI à haut débit…'}
            </p>
            <p className="text-base sm:text-lg font-bold text-[#3B4249]">
              {isAr
                ? 'كل ما يلزم لتشعر وكأنك في بيتك!'
                : 'Tout ce qu’il faut pour se sentir comme chez vous!'}
            </p>
          </div>

          {/* 8 Original Amenities Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 my-8">
            {AMENITIES.map((amenity) => (
              <div
                key={amenity.id}
                className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-amber-50/40 hover:border-amber-200 transition-all"
              >
                <div className="w-24 h-24 mb-3 flex items-center justify-center">
                  <img
                    src={amenity.iconSrc}
                    alt={amenity.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-gray-800">
                  {isAr ? amenity.titleAr : amenity.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6 & 7: Parking Gratuit 0 (€) & WhatsApp */}
        <div className="my-14 text-center bg-linear-to-b from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-3">
            <Car className="w-4 h-4" />
            <span>{isAr ? 'موقف مجاني' : 'Stationnement Inclus'}</span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 mb-2">
            Parking Gratuit <span className="text-[#417505] underline">0 (€)</span>
          </h3>

          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto mb-6">
            {isAr
              ? 'موقف سيارات آمن ومجاني متاح لجميع زوارنا بدون أي تكلفة إضافية.'
              : 'Stationnement gratuit sur place et sécurisé pour voitures, motos et vélos.'}
          </p>

          <a
            href={SITE_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-[#62B800] to-[#417505] hover:from-[#529b00] hover:to-[#335d04] text-white font-extrabold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Phone className="w-5 h-5" />
            <span>Contactez-nous (Whatsapp)</span>
          </a>
        </div>

        {/* Section 8: Google Maps Location & Local SEO */}
        <div className="my-14">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-[#8B572A] rounded-full text-xs font-black mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? 'الموقع الجغرافي وخريطة الوصول' : 'Localisation & Accès'}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-gray-900">
              {isAr ? 'موقع فندق TATA GUEST HOUSE في مدينة طاطا' : 'Emplacement de l’Hôtel Tata Guest House'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl mx-auto">
              {isAr
                ? 'Villa N°03, Adnoun, Douar Tighremte, شارع محمد الخامس، طاطا 84000 (قرب المدخل الشمالي والواحة)'
                : 'Villa N°03, Adnoun, Douar Tighremte, Avenue Mohamed V, Tata 84000 (Entrée Nord & Proche de l’Oasis)'}
            </p>
            <a
              href="https://maps.google.com/?q=29.755328,-7.976529"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#003B95] border border-blue-200 rounded-xl text-xs font-black transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#003B95]" />
              <span>{isAr ? 'افتح في خرائط Google للوصول المباشر والتقييمات' : 'Ouvrir sur Google Maps (Itinéraire & Avis)'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <iframe
              src={SITE_INFO.googleMapsUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="فندق TATA GUEST HOUSE على خريطة طاطا Google Maps"
            ></iframe>
          </div>
        </div>

        {/* Section 9: Avis récents de nos visiteurs */}
        <div className="my-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F5A623]">
              {isAr ? 'آراء زوارنا وسياحنا الأخيرة :' : 'Avis récents de nos visiteurs & touristes :'}
            </h3>
            <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-gray-700 text-sm font-bold ml-2">5.0 / 5 (100% vérifié)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between hover:border-[#F5A623] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-extrabold text-gray-900 block">{rev.name}</span>
                      <span className="text-xs text-gray-400">{rev.country} · {rev.type}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic mt-3">
                    "{rev.content}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-green-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إقامة مؤكدة في طاطا' : 'Avis vérifié · Séjour à Tata'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 10: 3 Steps */}
        <div className="my-14 bg-amber-50/50 p-8 rounded-2xl border border-amber-200/60">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-8">
            {isAr ? 'كيفية الحجز في 3 خطوات بسيطة' : 'Comment réserver votre séjour :'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white rounded-xl border border-amber-100 shadow-xs">
              <div className="w-10 h-10 mx-auto bg-amber-100 text-[#8B572A] font-black text-lg rounded-full flex items-center justify-center mb-3">
                1
              </div>
              <p className="font-bold text-gray-800 text-sm sm:text-base">
                1- Choisissez le logement que vous désirez
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-amber-100 shadow-xs">
              <div className="w-10 h-10 mx-auto bg-amber-100 text-[#8B572A] font-black text-lg rounded-full flex items-center justify-center mb-3">
                2
              </div>
              <p className="font-bold text-gray-800 text-sm sm:text-base">
                2- Utilisez votre carte de débit pour réserver votre séjour
              </p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-amber-100 shadow-xs">
              <div className="w-10 h-10 mx-auto bg-amber-100 text-[#8B572A] font-black text-lg rounded-full flex items-center justify-center mb-3">
                3
              </div>
              <p className="font-bold text-gray-800 text-sm sm:text-base">
                3- Recevez les détails de votre check-in dans votre boite email
              </p>
            </div>
          </div>
        </div>

        {/* Section 11 & 12: Booking.com Room Selection & Express Checkout */}
        <section id="reservation-section" className="my-16 scroll-mt-24">
          <div className="bg-white rounded-3xl border-2 border-[#F5A623] p-4 sm:p-8 lg:p-10 shadow-xl">
            
            {/* Header: Exact Booking.com Table Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#003B95] text-xs font-black mb-3">
                <Award className="w-4 h-4 text-[#003B95]" />
                <span>{isAr ? 'أسعار حصرية مضمونة · مطابقة لـ Booking.com مع تخفيضات مباشرة' : 'Tarifs Officiels & Vérifiés Booking.com avec Remises Immédiates'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                {isAr
                  ? 'حجز الغرف في فندق TATA GUEST HOUSE بطاطا'
                  : 'Réservation de Chambres à Tata Guest House'}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-2xl mx-auto font-medium">
                {isAr
                  ? 'اختر نوع الغرفة وعدد الغرف التي ترغب بحجزها، بأسعار اليوم الحصرية شاملة الضرائب والرسوم وكافة المزايا'
                  : 'Sélectionnez votre chambre idéale avec les tarifs préférentiels, taxes incluses et avantages exclusifs.'}
              </p>

              {/* Mode Toggle Tabs */}
              <div className="mt-6 inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200 max-w-md w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setBookingMode('rooms')}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    bookingMode === 'rooms'
                      ? 'bg-[#003B95] text-white shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {isAr ? 'حجز الغرف (نظام Booking.com)' : 'Par Type de Chambre (Booking)'}
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode('guests')}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                    bookingMode === 'guests'
                      ? 'bg-[#F5A623] text-black shadow-md'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {isAr ? 'حجز حسب عدد الأفراد (1-12 بالغين)' : 'Par Nombre d’Adultes (1-12)'}
                </button>
              </div>
            </div>

            {/* MODE 1: BOOKING.COM ROOM SELECTION TABLE */}
            {bookingMode === 'rooms' && (
              <div className="space-y-8 mb-10">
                {/* Duration of Stay Picker */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F5A623]/20 flex items-center justify-center text-[#8B572A]">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase block">
                        {isAr ? 'مدة الإقامة المطلوبة' : 'Durée du séjour'}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-gray-900">
                        {nights} {isAr ? (nights === 1 ? 'ليلة واحدة' : 'ليالٍ') : (nights === 1 ? 'nuit' : 'nuits')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-600 hidden sm:inline">
                      {isAr ? 'تعديل عدد الليالي:' : 'Modifier les nuits :'}
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => setNights(Math.max(1, nights - 1))}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-5 py-2 font-extrabold text-gray-900 min-w-[3rem] text-center">
                        {nights}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNights(nights + 1)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Booking.com Table Header (Desktop) */}
                <div className="hidden lg:grid grid-cols-12 gap-4 bg-[#003B95] text-white p-4 rounded-xl font-bold text-sm shadow-xs">
                  <div className="col-span-5">{isAr ? 'نوع الغرفة' : 'Type de Chambre'}</div>
                  <div className="col-span-2 text-center">{isAr ? 'سعر اليوم' : 'Tarif du jour'}</div>
                  <div className="col-span-3">{isAr ? 'الأسعار المتوفرة والمزايا' : 'Tarifs & Options disponibles'}</div>
                  <div className="col-span-2 text-center">{isAr ? 'اختر العدد' : 'Sélectionnez'}</div>
                </div>

                {/* List of 5 Rooms */}
                <div className="space-y-6">
                  {BOOKING_ROOMS.map((room) => {
                    return (
                      <div
                        key={room.id}
                        className="border border-gray-200 hover:border-[#003B95]/40 rounded-2xl bg-white overflow-hidden shadow-xs hover:shadow-md transition-all"
                      >
                        <div className="p-4 sm:p-6 lg:grid lg:grid-cols-12 lg:gap-6 items-start">
                          
                          {/* Column 1: Room Details & Photo */}
                          <div className="lg:col-span-5 space-y-3">
                            <div className="relative rounded-xl overflow-hidden group bg-gray-100 border border-gray-200">
                              <img
                                src={room.image}
                                alt={isAr ? `${room.nameAr} - فندق TATA GUEST HOUSE بمدينة طاطا المغرب` : `${room.name} - Hôtel Tata Guest House Maroc`}
                                className="w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                                onClick={() => setRoomModalPhoto({ src: room.image, title: room.name, titleAr: room.nameAr })}
                                onError={(e) => {
                                  e.currentTarget.src = room.fallbackImage;
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => setRoomModalPhoto({ src: room.image, title: room.name, titleAr: room.nameAr })}
                                className="absolute bottom-2 right-2 bg-black/75 hover:bg-black text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
                              >
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>{isAr ? 'عرض الصورة' : 'Agrandir'}</span>
                              </button>
                              <div className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-xs animate-pulse">
                                {isAr ? `بقي لدينا ${room.leftCount}` : `Plus que ${room.leftCount} disponible !`}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-lg sm:text-xl font-black text-blue-900 hover:text-blue-700 transition-colors cursor-pointer">
                                {isAr ? room.nameAr : room.name}
                              </h3>
                              <p className="text-xs font-semibold text-gray-500 mt-1 flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-gray-400" />
                                <span>{isAr ? room.capacityTextAr : room.capacityText}</span>
                              </p>
                            </div>

                            {/* Bed information */}
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                              <Bed className="w-4 h-4 text-amber-600" />
                              <span>{isAr ? room.bedsTextAr : room.bedsText}</span>
                            </div>

                            {/* Room amenities */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {(isAr ? room.amenitiesAr : room.amenities).map((amenity, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] font-medium px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md border border-gray-200"
                                >
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Column 2 & 3 & 4: Options & Pricing */}
                          <div className="mt-6 lg:mt-0 lg:col-span-7 space-y-4">
                            {room.rateOptions.map((opt, optIdx) => {
                              const qty = selectedRoomQuantities[opt.id] || 0;
                              const isSelected = qty > 0;
                              const optTotalForNights = opt.discountedPrice * nights;
                              const optCompareForNights = opt.originalPrice * nights;

                              return (
                                <div
                                  key={opt.id}
                                  className={`p-4 rounded-xl border-2 transition-all ${
                                    isSelected
                                      ? 'border-[#003B95] bg-blue-50/40 shadow-xs'
                                      : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'
                                  }`}
                                >
                                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    {/* Pricing & Member Badge */}
                                    <div className="space-y-2 flex-1">
                                      <div className="flex items-baseline gap-2.5">
                                        <span className="text-2xl font-black text-gray-900">
                                          {opt.discountedPrice} <span className="text-sm font-bold">MAD</span>
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                          {opt.originalPrice} MAD
                                        </span>
                                        <span className="text-xs font-extrabold px-2 py-0.5 bg-green-100 text-green-800 rounded-md">
                                          {isAr ? `توفير بنسبة ${opt.discountPercent}%` : `-${opt.discountPercent}%`}
                                        </span>
                                      </div>

                                      <div className="text-[11px] text-gray-500 font-semibold">
                                        {isAr
                                          ? `السعر الأصلي ${opt.originalPrice} MAD · السعر الحالي ${opt.discountedPrice} MAD`
                                          : `Prix original ${opt.originalPrice} MAD · Prix actuel ${opt.discountedPrice} MAD`}
                                      </div>

                                      {/* Member rate tag */}
                                      {opt.memberPrice && (
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-[#8B572A] rounded-md text-xs font-black">
                                          <Star className="w-3.5 h-3.5 fill-current" />
                                          <span>{isAr ? 'تسجيل الدخول للحصول على هذا السعر الحصري للأعضاء' : 'Prix exclusif réservé aux membres'}</span>
                                        </div>
                                      )}

                                      {/* Features & Inclusions */}
                                      <div className="space-y-1 pt-1 text-xs text-gray-700">
                                        <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                                          <Check className="w-3.5 h-3.5 text-green-600" />
                                          <span>{isAr ? 'شامل الضرائب والرسوم' : 'Taxes et frais inclus'}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                          <Coffee className="w-3.5 h-3.5 text-gray-400" />
                                          <span>{isAr ? 'غير شامل للإفطار' : 'Petit-déjeuner non inclus'}</span>
                                        </div>

                                        {/* Extra Perks if included */}
                                        {opt.perks.length > 0 && (
                                          <div className="flex items-start gap-1.5 text-[#003B95] font-bold bg-blue-100/70 p-2 rounded-lg mt-1.5">
                                            <Car className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span>
                                              {isAr
                                                ? opt.perksAr[0]
                                                : opt.perks.join(' + ')}
                                            </span>
                                          </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 text-[11px] pt-1">
                                          <span className="flex items-center gap-1 text-gray-600">
                                            <Lock className="w-3 h-3 text-gray-400" />
                                            {isAr ? 'غير قابل للاسترداد' : 'Non remboursable'}
                                          </span>
                                          <span className="flex items-center gap-1 text-gray-600">
                                            <CreditCard className="w-3 h-3 text-gray-400" />
                                            {isAr ? 'ادفع عبر الإنترنت' : 'Paiement sécurisé en ligne'}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Quantity Selector: 0 or 1 */}
                                    <div className="sm:text-center shrink-0 pt-2 sm:pt-0">
                                      <label className="block text-xs font-bold text-gray-700 mb-2">
                                        {isAr ? 'اختر الغرف :' : 'Nombre :'}
                                      </label>
                                      <div className="flex items-center justify-center border border-gray-300 rounded-xl overflow-hidden bg-white shadow-xs">
                                        <button
                                          type="button"
                                          onClick={() => updateRoomQuantity(opt.id, -1)}
                                          className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors disabled:opacity-40"
                                          disabled={qty === 0}
                                        >
                                          -
                                        </button>
                                        <span className={`px-4 py-2 font-black min-w-[2.5rem] text-center ${isSelected ? 'text-[#003B95] bg-blue-50' : 'text-gray-900'}`}>
                                          {qty}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => updateRoomQuantity(opt.id, 1)}
                                          className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700 transition-colors disabled:opacity-40"
                                          disabled={qty >= 1}
                                        >
                                          +
                                        </button>
                                      </div>

                                      {isSelected && (
                                        <div className="text-[11px] font-extrabold text-[#003B95] mt-1.5">
                                          {isAr ? `تم تحديد 1 غرفة (${optTotalForNights} MAD)` : `1 sélectionnée (${optTotalForNights} MAD)`}
                                        </div>
                                      )}
                                    </div>

                                  </div>
                                </div>
                              );
                            })}
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MODE 2: ORIGINAL 12 ADULT TIERS SELECTION */}
            {bookingMode === 'guests' && (
              <div className="mb-8">
                {/* Room Specifications Box from the original product details */}
                <div className="mb-8 p-6 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-extrabold text-[#8B572A] text-base mb-2">
                        {isAr ? 'سعة الإقامة والضيوف' : 'Capacité d’hébergement'}
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• {isAr ? '1 سرير كينغ (أو أسرّة حسب عدد الأفراد)' : '1 Lit King Size (ou lits selon capacité)'}</li>
                        <li>• {isAr ? 'من 1 إلى 12 ضيفاً متوفرة' : '1 à 12 Invités disponibles'}</li>
                        <li>• {isAr ? 'شرفة وفضاء جلوس وتناول وجبات' : 'Balcon & espace repas'}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#8B572A] text-base mb-2">
                        {isAr ? 'المرافق والتجهيزات' : 'Fonctionnalités & Équipements'}
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• {isAr ? 'مكيف هواء في جميع الفضاءات' : 'Air Conditioning (Climatisation)'}</li>
                        <li>• {isAr ? 'موقف سيارات مجاني في الموقع' : 'Free parking on premises'}</li>
                        <li>• {isAr ? 'علاقات ملابس وواي فاي سريع' : 'Hangers & Wi-Fi haut débit'}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#8B572A] text-base mb-2">
                        {isAr ? 'الوصول والأمان' : 'Accès & Sécurité'}
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• {isAr ? 'موقف سيارات مجاني ومحروس' : 'Parking gratuit'}</li>
                        <li>• {isAr ? 'استقبال ومساعدة 24/7' : 'Réception 24/7'}</li>
                        <li>• {isAr ? 'أمان وهدوء تام طوال اليوم' : 'Sécurité toute la journée'}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <label className="block text-sm font-extrabold text-gray-900 mb-3">
                  {isAr ? 'عدد الأشخاص البالغين (12 عرضاً للاختيار) :' : 'Nombre des Adults (12 offres au choix) :'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                  {PRICING_TIERS.map((tier) => {
                    const isSelected = tier.adults === selectedAdults;
                    return (
                      <button
                        key={tier.adults}
                        type="button"
                        onClick={() => setSelectedAdults(tier.adults)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-2 border-[#F5A623] bg-amber-50 font-bold shadow-xs'
                            : 'border-gray-200 bg-white hover:border-gray-400'
                        }`}
                      >
                        <div className="text-sm font-bold text-gray-900">{tier.label}</div>
                        <div className="text-base font-extrabold text-[#417505] mt-1">
                          {tier.price} <span className="text-xs">MAD</span>
                        </div>
                        <div className="text-xs text-gray-400 line-through">
                          {tier.compareAtPrice} MAD
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Number of Nights */}
                <div className="mt-6 max-w-xs">
                  <label className="block text-sm font-extrabold text-gray-900 mb-2">
                    {isAr ? 'مدة الإقامة (عدد الليالي) :' : 'Durée du séjour (Nuitées) :'}
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center font-bold text-gray-900">
                      {nights} {isAr ? (nights === 1 ? 'ليلة' : 'ليالٍ') : (nights === 1 ? 'Nuit' : 'Nuits')}
                    </div>
                    <button
                      type="button"
                      onClick={() => setNights(nights + 1)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Price Preview & Selected Summary Banner */}
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-amber-50/90 border-2 border-[#F5A623]/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-900 uppercase tracking-wider block">
                  {isRoomModeActive
                    ? isAr
                      ? `تفاصيل الحجز المحدد (${totalSelectedRoomsCount} غرفة · ${nights} ${nights === 1 ? 'ليلة' : 'ليالٍ'})`
                      : `Détails de la réservation (${totalSelectedRoomsCount} chambre · ${nights} nuit${nights > 1 ? 's' : ''})`
                    : isAr
                    ? `عرض الإقامة لـ ${currentTier.label} (${nights} ${nights === 1 ? 'ليلة' : 'ليالٍ'})`
                    : `Tarif pour ${currentTier.label} (${nights} nuit${nights > 1 ? 's' : ''})`}
                </span>
                
                {isRoomModeActive && (
                  <div className="text-xs text-gray-700 space-y-0.5 py-1">
                    {selectedRoomItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 font-bold text-blue-950">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                        <span>
                          {isAr ? item.room.nameAr : item.room.name} — {item.option.discountedPrice} MAD/nuit
                          {item.option.perks.length > 0 && (
                            <span className="text-[11px] font-normal text-amber-800 ml-1">
                              ({isAr ? 'شامل موقف سيارات + وصول متأخر' : 'Parking + Late check-in inclus'})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#417505]">
                    {activeTotal} <span className="text-lg font-bold">MAD</span>
                  </span>
                  <span className="text-base sm:text-lg text-gray-400 line-through">
                    {activeCompare} MAD
                  </span>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-green-800 bg-green-100 font-extrabold px-3 py-1.5 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-700" />
                  <span>{isAr ? `توفير فوري قدره ${activeSavings} درهم مغربي` : `Économie immédiate de ${activeSavings} Dirhams`}</span>
                </div>
                <div className="text-[11px] text-gray-500 font-medium">
                  {isAr ? '✓ شامل كافة الرسوم والضرائب · لا توجد تكاليف خفية' : '✓ Taxes comprises · Aucun frais caché'}
                </div>
              </div>
            </div>

            {/* Reservation Form */}
            {!formSubmitted ? (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                {formError && (
                  <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-semibold">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isAr ? 'النسب / اسم العائلة : *' : 'Nom : *'}
                    </label>
                    <input
                      type="text"
                      placeholder={isAr ? 'اكتب اسم العائلة هنا...' : 'Écrivez votre nom içi...'}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {isAr ? 'الاسم الشخصي : *' : 'Prénom : *'}
                    </label>
                    <input
                      type="text"
                      placeholder={isAr ? 'اكتب اسمك الشخصي هنا...' : 'Écrivez votre prénom içi...'}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isAr ? 'رقم الواتساب (WhatsApp) للتأكيد المباشر : *' : 'Whatsapp : *'}
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? 'مثال: 0655828966 أو +212...' : 'Écrivez votre numéro de Whatsapp içi...'}
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {isAr ? 'تاريخ الوصول (Check-in) : *' : 'Date d’arriver : *'}
                  </label>
                  <input
                    type="text"
                    placeholder={isAr ? 'يوم / شهر / سنة ، مثال : 31/12/2026' : 'JJ/MM/AAAA , Exemple : 31/12/2026'}
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#F5A623] focus:border-transparent outline-none text-sm"
                  />
                </div>

                {/* Submit button: Exactly "Réserver mon 1ér jour d'arriver" with original gradient */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="flex-1 w-full py-4 px-6 bg-linear-to-r from-[#FF9F00] via-[#417505] to-[#417505] hover:opacity-95 text-white font-black text-lg sm:text-xl rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer text-center"
                  >
                    {isAr ? 'تأكيد وحجز يوم الوصول الأول' : "Réserver mon 1ér jour d'arriver"}
                  </button>
                  <a
                    href={constructWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{isAr ? 'حجز مباشر عبر واتساب' : 'Réserver via WhatsApp'}</span>
                  </a>
                </div>
              </form>
            ) : (
              <div className="p-6 sm:p-8 bg-green-50 border-2 border-green-300 rounded-2xl text-center space-y-4">
                <CheckCircle className="w-14 h-14 text-green-600 mx-auto" />
                <h4 className="text-2xl font-black text-green-950">
                  {isAr ? 'تم تسجيل طلب حجزكم بنجاح!' : 'Votre demande a été enregistrée avec succès !'}
                </h4>
                <div className="text-sm text-gray-700 max-w-lg mx-auto bg-white p-4 rounded-xl border border-green-200 shadow-xs space-y-1.5 text-right">
                  <div className="font-bold text-gray-900">
                    {firstName} {lastName}
                  </div>
                  {isRoomModeActive ? (
                    <div>
                      <span className="text-gray-500 font-semibold">{isAr ? 'الغرف المطلوبة : ' : 'Chambres : '}</span>
                      {selectedRoomItems.map((item, idx) => (
                        <div key={idx} className="font-bold text-[#003B95]">
                          • {isAr ? item.room.nameAr : item.room.name} ({item.qty})
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <span className="text-gray-500 font-semibold">{isAr ? 'الفئة : ' : 'Catégorie : '}</span>
                      <strong>{currentTier.label}</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500 font-semibold">{isAr ? 'تاريخ الوصول : ' : 'Arrivée : '}</span>
                    <strong>{arrivalDate}</strong> ({nights} {isAr ? (nights === 1 ? 'ليلة' : 'ليالٍ') : (nights === 1 ? 'nuit' : 'nuits')})
                  </div>
                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-700">{isAr ? 'المجموع المستحق :' : 'Total à régler :'}</span>
                    <strong className="text-xl text-[#417505] font-black">{activeTotal} MAD</strong>
                  </div>
                </div>

                <div className="pt-3">
                  <a
                    href={constructWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#417505] hover:bg-[#325b04] text-white font-black text-base rounded-xl shadow-lg transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{isAr ? 'تأكيد الحجز فوراً على واتساب' : 'Confirmer directement sur WhatsApp'}</span>
                  </a>
                </div>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-gray-500 underline block mx-auto pt-2 cursor-pointer hover:text-gray-700"
                >
                  {isAr ? 'تعديل بيانات الحجز' : 'Modifier ma demande'}
                </button>
              </div>
            )}

            {/* Original Trust and Payment Badges from Section 12 Footer */}
            <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-6">
              <img
                src={SITE_INFO.trustBadgeUrl}
                alt="Satisfaction Garantie"
                referrerPolicy="no-referrer"
                className="h-14 sm:h-16 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = SITE_INFO.trustBadgeFallbackUrl;
                }}
              />
              <img
                src={SITE_INFO.paymentMethodsUrl}
                alt="Modes de Paiement"
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = SITE_INFO.paymentMethodsFallbackUrl;
                }}
              />
            </div>
          </div>
        </section>

        {/* SECTION: Google SEO FAQs Accordion */}
        <section id="faq-section" className="my-16 scroll-mt-24">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-[#8B572A] text-xs font-black mb-3">
              <HelpCircle className="w-4 h-4 text-[#8B572A]" />
              <span>{isAr ? 'الأسئلة الشائعة حول الإقامة في طاطا' : 'FAQ · Questions Fréquentes Hôtel Tata'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">
              {isAr ? 'الأسئلة الأكثر بحثاً حول حجز فندق في مدينة طاطا' : 'Questions Fréquentes sur le Séjour à Tata'}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
              {isAr
                ? 'إجابات شاملة وموثقة تساعدك في اختيار أفضل فندق وترتيب رحلتك إلى إقليم طاطا بكل راحة وثقة.'
                : 'Toutes les réponses pour préparer sereinement votre réservation et séjourner dans les meilleures conditions à Tata.'}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs transition-all hover:border-amber-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-start p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  >
                    <span className="font-extrabold text-base sm:text-lg text-gray-900 flex items-center gap-3">
                      <span className="w-7 h-7 shrink-0 rounded-full bg-amber-100 text-[#8B572A] flex items-center justify-center text-xs font-black">
                        {idx + 1}
                      </span>
                      <span>{isAr ? item.qAr : item.qFr}</span>
                    </span>
                    <span className="shrink-0 p-1.5 rounded-full bg-gray-100 text-gray-600">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-amber-50/20">
                      <p>{isAr ? item.aAr : item.aFr}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: Tata Travel & Tourism Guide (Topical Authority for SEO) */}
        <section className="my-16 bg-linear-to-b from-stone-50 to-amber-50/30 p-6 sm:p-10 rounded-3xl border border-stone-200">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#417505]/10 text-[#417505] text-xs font-black mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'دليل السياحة والضيافة في الجنوب' : 'Guide Touristique & Découverte de Tata'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              {isAr ? 'دليل زوار مدينة طاطا: معالم، واحات وأفضل أماكن الإقامة' : 'Pourquoi Visiter la Région de Tata, Maroc ?'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
              {isAr
                ? 'مدينة طاطا لؤلؤة الجنوب المغربي، تجمع بين الواحات الخضراء، التراث التاريخي الشامخ، وأصالة الضيافة في TATA GUEST HOUSE.'
                : 'Tata est le carrefour authentique entre Anti-Atlas et portes du Sahara. Découvrez ses trésors en profitant d’un hébergement de premier choix.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TATA_GUIDE_ITEMS.map((guide, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between hover:border-[#F5A623] transition-all"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-amber-100 text-[#8B572A] mb-3">
                    {isAr ? guide.tagAr : guide.tagFr}
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mb-2">
                    {isAr ? guide.titleAr : guide.titleFr}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {isAr ? guide.descAr : guide.descFr}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Contact & Action Banner */}
          <div className="mt-8 p-5 bg-white rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-start">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                {isAr ? 'هل تخطط لرحلتك القادمة إلى طاطا؟' : 'Vous préparez votre voyage à Tata ?'}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {isAr ? 'فريقنا مستعد لتزويدك بأفضل النصائح وتأمين إقامتك بأفضل سعر مباشرة.' : 'Contactez directement M. Oussama pour réserver et obtenir des conseils de visite.'}
              </p>
            </div>
            <a
              href={SITE_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#417505] hover:bg-[#335d04] text-white font-black text-xs sm:text-sm rounded-xl transition-colors shrink-0 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{isAr ? 'استفسر أو احجز عبر واتساب' : 'Contacter sur WhatsApp'}</span>
            </a>
          </div>
        </section>

        {/* Section 12: Politique de Réservation & Règles */}
        <div className="my-16 p-6 sm:p-8 rounded-2xl bg-gray-50 border border-gray-200 text-sm leading-relaxed text-[#3B4249]">
          <h3 className="text-xl font-bold text-[#3B4249] mb-4 underline">
            Politique de Réservation
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-900">Vérification de Disponibilité :</h4>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Avant d’effectuer tout paiement, il est obligatoire de nous contacter au préalable pour vérifier la disponibilité des chambres.</li>
                <li>Vous pouvez nous joindre par téléphone au +212655828966 ou via WhatsApp au même numéro.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">Politique de Paiement :</h4>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Le paiement intégral doit être effectué au plus tard 2 jours avant la date d’arrivée.</li>
                <li>Les modes de paiement acceptés sont : Carte bancaire marocaine, PayPal, virement bancaire.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900">Politique de Modification et d’Annulation :</h4>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Annulation le J-1 : Remboursement partiel (50%).</li>
                <li>Annulation le jour J : Aucun remboursement ne sera pris en compte.</li>
                <li>Toute modification de réservation (dates, nombre de personnes, etc.) doit être demandée au moins 2 jours avant la date d’arrivée.</li>
                <li>Les modifications sont sujettes à disponibilité et peuvent entraîner des frais supplémentaires.</li>
              </ul>
            </div>

            <hr className="my-4 border-gray-300" />

            <div>
              <h4 className="font-bold text-gray-900 text-base mb-2">
                Informations supplémentaires sur les règles
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Pour un enregistrement sans encombre, tous les clients doivent signer un contrat. Les ressortissants étrangers doivent présenter leur passeport, tandis que les citoyens marocains doivent présenter leur carte nationale d'identité.</li>
                <li>Conformément à la législation hôtelière marocaine, les couples marocains non mariés et les groupes mixtes d'amis marocains ne sont pas autorisés à séjourner dans la même chambre.</li>
                <li>Pour assurer le confort et la sécurité de tous les clients, veuillez respecter le nombre maximal d'occupants de la chambre.</li>
                <li>Pour profiter d'un air frais, nos chambre sont non-fumeurs. Les clients disposant d'un balcon peuvent fumer à l'extérieur.</li>
              </ul>
            </div>
          </div>
        </div>

      </main>

      {/* Room Photo Preview Modal */}
      {roomModalPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setRoomModalPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-800 text-white">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg">
                  {isAr ? roomModalPhoto.titleAr : roomModalPhoto.title}
                </h4>
                <span className="text-xs text-amber-400 font-semibold">
                  {isAr ? 'صورة حقيقية موثقة من Booking.com' : 'Photo officielle Booking.com'}
                </span>
              </div>
              <button
                onClick={() => setRoomModalPhoto(null)}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                title={isAr ? 'إغلاق' : 'Fermer'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-2 flex items-center justify-center bg-black/50">
              <img
                src={roomModalPhoto.src}
                alt={roomModalPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="p-4 border-t border-neutral-800 flex items-center justify-between bg-neutral-900">
              <span className="text-xs text-neutral-400">
                TATA GUEST HOUSE · Villa N°03, Adnoun, Douar Tighremte
              </span>
              <button
                onClick={() => {
                  setRoomModalPhoto(null);
                  scrollToCheckout();
                }}
                className="px-5 py-2 bg-[#F5A623] hover:bg-[#E59300] text-black font-extrabold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
              >
                {isAr ? 'احجز هذه الغرفة الآن' : 'Réserver cette chambre'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={SITE_INFO.logoUrl}
              alt="شعار فندق TATA GUEST HOUSE في مدينة طاطا"
              referrerPolicy="no-referrer"
              className="h-12 w-auto object-contain bg-white rounded-md p-1"
              onError={(e) => {
                e.currentTarget.src = SITE_INFO.logoFallbackUrl;
              }}
            />
            <div>
              <div className="font-extrabold text-white text-sm">
                TATA GUEST HOUSE — فندق ودار ضيافة طاطا
              </div>
              <div className="text-gray-400">Villa N°03, Adnoun, Douar Tighremte, Tata 84000, Maroc</div>
              <div className="text-gray-500 text-[11px] mt-0.5">
                {isAr
                  ? 'الخيار الأول للإقامة والمبيت في مدينة طاطا · تقييم Google 5.0 ★★★★★ و Booking.com 9.2'
                  : 'Partenaire officiel Booking.com & Google Verified · Meilleur Séjour à Tata'}
              </div>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1.5">
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-gray-400 text-[11px]">
              <a href="#reservation-section" className="hover:text-amber-400 underline">
                {isAr ? 'حجز الغرف' : 'Réservation'}
              </a>
              <span>·</span>
              <a href="#faq-section" className="hover:text-amber-400 underline">
                {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
              </a>
              <span>·</span>
              <a
                href="https://maps.google.com/?q=29.755328,-7.976529"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 underline"
              >
                {isAr ? 'خرائط Google' : 'Google Maps'}
              </a>
              <span>·</span>
              <a
                href={SITE_INFO.bookingComUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 underline"
              >
                Booking.com
              </a>
            </div>
            <div>WhatsApp 24/7 : <a href={SITE_INFO.whatsappUrl} className="text-[#F5A623] hover:underline font-bold">+212 655 828 966</a></div>
            <div>Email : <a href="mailto:contact.tataguesthouse@gmail.com" className="text-gray-400 hover:underline">contact.tataguesthouse@gmail.com</a></div>
            <div className="text-gray-500 pt-2">© {new Date().getFullYear()} tataguesthouse.com · {isAr ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
