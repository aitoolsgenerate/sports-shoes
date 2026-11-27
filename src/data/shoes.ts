import heroSportsShoesBanner from '../assets/images/hero_sports_shoes_banner_1795778189495.jpg';
import shoeBlackMidtopBball from '../assets/images/shoe_black_midtop_bball_1795778190805.jpg';
import shoeBlackNavySpeedBoot from '../assets/images/shoe_black_navy_speed_boot_1795778191823.jpg';
import shoeBlackNavyTurf from '../assets/images/shoe_black_navy_turf_1795778190482.jpg';
import shoeBlackWhiteRunner from '../assets/images/shoe_black_white_runner_1795777719034.jpg';
import shoeNavyAgilityTrainer from '../assets/images/shoe_navy_agility_trainer_1795778191748.jpg';
import shoeNavyBlackMarathon from '../assets/images/shoe_navy_black_marathon_1795778190077.jpg';
import shoeNavyCourtPro from '../assets/images/shoe_navy_court_pro_1795778190873.jpg';
import shoeNavyRunner from '../assets/images/shoe_navy_runner_1795777718152.jpg';
import { BrandLine, PriceTier, ShoeColor, ShoeProduct, Subcategory } from '../types/store';

export const HERO_BANNER_IMAGE = heroSportsShoesBanner;

export const PRICE_TIERS: PriceTier[] = [6000, 7000, 8000];

export const SUBCATEGORIES: Subcategory[] = [
  'Running',
  'Football & Soccer',
  'Basketball',
  'Tennis & Indoor Court',
  'Training',
];

export const BRAND_LINES: BrandLine[] = [
  'Velocity',
  'Strider Pro',
  'PitchMaster',
  'CourtLine',
];

export const AVAILABLE_SIZES: number[] = [39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 46];

export const AVAILABLE_COLORS: ShoeColor[] = ['Black', 'Navy Blue'];

export const SHOES_CATALOG: ShoeProduct[] = [
  {
    id: 'shoe-duramo-navy',
    sku: 'SS-RN-402',
    name: 'Duramo Navy Mesh Runner',
    brand: 'Velocity',
    subcategory: 'Running',
    price: 7000,
    originalPrice: 8500,
    colors: ['Navy Blue'],
    sizes: [40, 40.5, 41, 42, 43, 44, 45],
    isNew: true,
    image: shoeNavyRunner,
    description:
      'Breathable navy blue engineered mesh upper paired with a dual-density cushioned midsole for daily road mileage and tempo sessions.',
    specs: {
      upper: 'Open-cell breathable navy mesh with supportive midfoot cage',
      midsole: 'Lightweight dual-density cushioned EVA foam',
      outsole: 'High-abrasion segmented road rubber',
      weight: '268 g (EU 42)',
    },
  },
  {
    id: 'shoe-stride-black',
    sku: 'SS-RN-108',
    name: 'Runblaze Black Road Trainer',
    brand: 'Velocity',
    subcategory: 'Running',
    price: 6000,
    originalPrice: 7400,
    colors: ['Black'],
    sizes: [39, 40, 41, 42, 42.5, 43, 44, 45],
    isNew: true,
    image: shoeBlackWhiteRunner,
    description:
      'Sleek jet-black knit trainer designed for versatile road running, gym warmups, and everyday athletic wear.',
    specs: {
      upper: 'Seamless matte black knit textile with reinforced lace eyelets',
      midsole: 'Responsive compression-molded EVA heel-to-toe',
      outsole: 'Flex-groove non-marking traction tread',
      weight: '254 g (EU 42)',
    },
  },
  {
    id: 'shoe-supernova-navy',
    sku: 'SS-RN-810',
    name: 'Supernova Navy Black Marathon',
    brand: 'Strider Pro',
    subcategory: 'Running',
    price: 8000,
    originalPrice: 9800,
    colors: ['Navy Blue', 'Black'],
    sizes: [41, 42, 42.5, 43, 44, 44.5, 45, 46],
    isNew: true,
    image: shoeNavyBlackMarathon,
    description:
      'High-stack marathon cushioning platform in midnight navy blue and matte black built for long-distance energy return.',
    specs: {
      upper: 'Adaptive midnight navy engineered knit with padded black heel collar',
      midsole: 'High-rebound sculpted foam with midfoot stability plate',
      outsole: 'Wet-grip directional carbon rubber',
      weight: '282 g (EU 42)',
    },
  },
  {
    id: 'shoe-predator-black-navy',
    sku: 'SS-FB-315',
    name: 'Predator Black & Navy Turf',
    brand: 'PitchMaster',
    subcategory: 'Football & Soccer',
    price: 7000,
    originalPrice: 8800,
    colors: ['Black', 'Navy Blue'],
    sizes: [40, 41, 42, 43, 44, 45],
    isNew: false,
    image: shoeBlackNavyTurf,
    description:
      'Precision synthetic turf football shoe in matte black and deep navy blue with a micro-textured strike zone for artificial pitches.',
    specs: {
      upper: 'Micro-textured black & navy synthetic strike upper',
      midsole: 'Low-profile shock-absorbing heel wedge',
      outsole: 'Multi-directional artificial turf (TF) black lugged rubber',
      weight: '245 g (EU 42)',
    },
  },
  {
    id: 'shoe-gamecourt-navy',
    sku: 'SS-CT-204',
    name: 'Gamecourt Navy & Black Leather',
    brand: 'CourtLine',
    subcategory: 'Tennis & Indoor Court',
    price: 6000,
    originalPrice: 7500,
    colors: ['Navy Blue', 'Black'],
    sizes: [39, 40, 41, 42, 43, 44],
    isNew: false,
    image: shoeNavyCourtPro,
    description:
      'Hard-court and indoor badminton silhouette in deep navy blue and charcoal black with reinforced toe drag protection.',
    specs: {
      upper: 'Full-grain charcoal & navy leather overlays with breathable mesh vamp',
      midsole: 'Lateral-stabilized EVA court chassis',
      outsole: 'Non-marking herringbone dark slate rubber',
      weight: '310 g (EU 42)',
    },
  },
  {
    id: 'shoe-ownthegame-black',
    sku: 'SS-BK-509',
    name: 'Court Flight Black Midtop',
    brand: 'CourtLine',
    subcategory: 'Basketball',
    price: 8000,
    originalPrice: 9900,
    colors: ['Black', 'Navy Blue'],
    sizes: [41, 42, 43, 44, 44.5, 45, 46],
    isNew: true,
    image: shoeBlackMidtopBball,
    description:
      'Stealth jet-black and midnight navy mid-cut basketball shoe engineered for explosive drives and lateral hardwood stability.',
    specs: {
      upper: 'Ballistic black mesh with midnight navy lockdown collar',
      midsole: 'Dual-zone impact absorption core with torsion bar',
      outsole: 'Multi-zone parquet herringbone rubber',
      weight: '365 g (EU 42)',
    },
  },
  {
    id: 'shoe-agility-navy',
    sku: 'SS-TR-612',
    name: 'Agility Navy & Black Trainer',
    brand: 'PitchMaster',
    subcategory: 'Training',
    price: 7000,
    originalPrice: 8400,
    colors: ['Navy Blue', 'Black'],
    sizes: [39, 40, 40.5, 41, 42, 43, 44],
    isNew: false,
    image: shoeNavyAgilityTrainer,
    description:
      'Lightweight navy blue and obsidian black agility trainer built for speed drills, outdoor conditioning, and gym turf work.',
    specs: {
      upper: 'Abrasion-resistant navy mesh with obsidian speed overlays',
      midsole: 'Thin-profile responsive forefoot EVA',
      outsole: 'High-grip black turf & field agility tread',
      weight: '238 g (EU 42)',
    },
  },
  {
    id: 'shoe-speed-black-navy',
    sku: 'SS-FB-701',
    name: 'Turf Blaze Black & Navy Speed',
    brand: 'PitchMaster',
    subcategory: 'Football & Soccer',
    price: 6000,
    originalPrice: 7600,
    colors: ['Black', 'Navy Blue'],
    sizes: [40, 41, 42, 42.5, 43, 44, 45],
    isNew: true,
    image: shoeBlackNavySpeedBoot,
    description:
      'Aerodynamic jet-black and royal navy speed turf trainer featuring a knit collar lockdown and responsive studded outsole.',
    specs: {
      upper: 'Textured black coated textile with royal navy speed accents',
      midsole: 'Full-length cushioned EVA footbed',
      outsole: 'Studded non-marking black-navy turf rubber',
      weight: '240 g (EU 42)',
    },
  },
];

export function formatRs(amount: number): string {
  return `Rs ${amount.toLocaleString('en-PK')}`;
}
