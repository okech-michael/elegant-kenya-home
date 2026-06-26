// Mock catalog data. Replace with backend when ready.

export type Category = {
  slug: string;
  name: string;
  group: "Office" | "Living" | "Dining" | "Bedroom" | "Storage" | "Events" | "Decor";
  blurb: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku: string;
  category: string; // category slug
  price: number; // KES
  salePrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  isBestseller?: boolean;
  shortDescription: string;
  description: string;
  materials: string[];
  colors: { name: string; hex: string }[];
  dimensions: { width: number; depth: number; height: number; unit: "cm" };
  warranty: string;
};

const img = (id: string, w = 1000) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const categories: Category[] = [
  { slug: "office-chairs", name: "Office Chairs", group: "Office", blurb: "Ergonomic seating for every workday.", image: img("1580480055273-228ff5388ef8") },
  { slug: "executive-chairs", name: "Executive Chairs", group: "Office", blurb: "Leather-wrapped authority.", image: img("1549497538-303791108f95") },
  { slug: "office-desks", name: "Office Desks", group: "Office", blurb: "Focused workstations, beautifully built.", image: img("1518455027359-f3f8164ba6bd") },
  { slug: "executive-desks", name: "Executive Desks", group: "Office", blurb: "Statement desks for the corner office.", image: img("1497366754035-f200968a6e72") },
  { slug: "reception-desks", name: "Reception Desks", group: "Office", blurb: "First impressions, expertly crafted.", image: img("1556761175-5973dc0f32e7") },
  { slug: "conference-tables", name: "Conference Tables", group: "Office", blurb: "Designed for decisions.", image: img("1497366216548-37526070297c") },
  { slug: "workstations", name: "Workstations", group: "Office", blurb: "Collaborative & private layouts.", image: img("1604328698692-f76ea9498e76") },
  { slug: "sofas", name: "Sofas", group: "Living", blurb: "Tailored comfort, season after season.", image: img("1555041469-a586c61ea9bc") },
  { slug: "sectional-sofas", name: "Sectional Sofas", group: "Living", blurb: "Modular living, your way.", image: img("1540574163026-643ea20ade25") },
  { slug: "coffee-tables", name: "Coffee Tables", group: "Living", blurb: "Centerpieces in solid wood & stone.", image: img("1567016526105-22da7c13161a") },
  { slug: "tv-stands", name: "TV Stands", group: "Living", blurb: "Considered media storage.", image: img("1616137148650-4aa14651e02a") },
  { slug: "dining-tables", name: "Dining Tables", group: "Dining", blurb: "Long evenings, longer tables.", image: img("1567538096630-e0c55bd6374c") },
  { slug: "dining-chairs", name: "Dining Chairs", group: "Dining", blurb: "Upholstered comfort, daily.", image: img("1503602642458-232111445657") },
  { slug: "bar-stools", name: "Bar Stools", group: "Dining", blurb: "Counter-height, all-day comfort.", image: img("1549497538-303791108f95") },
  { slug: "beds-wardrobes", name: "Beds & Wardrobes", group: "Bedroom", blurb: "Restful rooms, intelligently stored.", image: img("1505693416388-ac5ce068fe85") },
  { slug: "cabinets", name: "Cabinets", group: "Storage", blurb: "Filing, storage & bookshelves.", image: img("1594620302200-9a762244a156") },
  { slug: "event-chairs", name: "Event Chairs", group: "Events", blurb: "Stackable seating built to last.", image: img("1567016432779-094069958ea5") },
  { slug: "decor", name: "Decor & Accessories", group: "Decor", blurb: "Vases, plants & finishing touches.", image: img("1602810318383-e386cc2a3ccf") },
];

const fmt = (i: number) => String(i).padStart(3, "0");
let n = 0;

const make = (
  p: Omit<Product, "id" | "sku" | "rating" | "reviews" | "stock" | "warranty" | "materials" | "colors" | "dimensions" | "shortDescription"> &
    Partial<Pick<Product, "rating" | "reviews" | "stock" | "warranty" | "materials" | "colors" | "dimensions" | "shortDescription">>,
): Product => {
  n += 1;
  return {
    id: `p-${fmt(n)}`,
    sku: `FRN-${fmt(n)}`,
    rating: p.rating ?? 4.6 + (n % 4) * 0.1,
    reviews: p.reviews ?? 28 + ((n * 7) % 140),
    stock: p.stock ?? 6 + ((n * 3) % 22),
    warranty: p.warranty ?? "2 years manufacturer warranty",
    materials: p.materials ?? ["Solid wood frame", "Premium upholstery", "Steel reinforcements"],
    colors: p.colors ?? [
      { name: "Charcoal", hex: "#2b2825" },
      { name: "Walnut", hex: "#5a3a25" },
      { name: "Bone", hex: "#efe9de" },
    ],
    dimensions: p.dimensions ?? { width: 180, depth: 90, height: 78, unit: "cm" },
    shortDescription:
      p.shortDescription ?? "Handcrafted in Nairobi from sustainably sourced hardwoods and premium textiles.",
    ...p,
  };
};

export const products: Product[] = [
  make({
    slug: "amani-executive-chair",
    name: "Amani Executive Chair",
    category: "executive-chairs",
    price: 48500, salePrice: 39900,
    images: [img("1580480055273-228ff5388ef8", 1200), img("1549497538-303791108f95", 1200), img("1592078615290-033ee584e267", 1200)],
    isBestseller: true,
    description: "A high-back executive chair upholstered in full-grain leather with a polished aluminum base, lumbar support, and a five-year mechanism warranty.",
  }),
  make({
    slug: "kazi-ergonomic-mesh-chair",
    name: "Kazi Ergonomic Mesh Chair",
    category: "office-chairs",
    price: 27500,
    images: [img("1592078615290-033ee584e267", 1200), img("1580480055273-228ff5388ef8", 1200)],
    isNew: true,
    description: "Breathable mesh back with synchronized tilt, adjustable arms, and a contoured seat for all-day support.",
  }),
  make({
    slug: "nuru-orthopedic-chair",
    name: "Nuru Orthopedic Chair",
    category: "office-chairs", price: 34900,
    images: [img("1503602642458-232111445657", 1200)],
    description: "Doctor-recommended lumbar geometry for long sessions at the desk.",
  }),
  make({
    slug: "savanna-executive-desk",
    name: "Savanna Executive Desk",
    category: "executive-desks", price: 95000, salePrice: 84500,
    images: [img("1497366754035-f200968a6e72", 1200), img("1518455027359-f3f8164ba6bd", 1200)],
    isBestseller: true,
    description: "A 1.8m solid walnut executive desk with concealed cable routing and side credenza.",
    dimensions: { width: 180, depth: 90, height: 76, unit: "cm" },
  }),
  make({
    slug: "habari-workstation",
    name: "Habari Collaborative Workstation",
    category: "workstations", price: 68000,
    images: [img("1604328698692-f76ea9498e76", 1200)],
    description: "Four-person modular workstation with acoustic dividers and integrated power.",
  }),
  make({
    slug: "tafiti-study-desk",
    name: "Tafiti Study Desk",
    category: "office-desks", price: 18500,
    images: [img("1518455027359-f3f8164ba6bd", 1200)],
    isNew: true,
    description: "A clean, compact desk in oak veneer—ideal for home study or a small office.",
  }),
  make({
    slug: "mawingu-reception-desk",
    name: "Mawingu Reception Desk",
    category: "reception-desks", price: 72000,
    images: [img("1556761175-5973dc0f32e7", 1200)],
    description: "Curved reception desk with a backlit front panel and concealed storage.",
  }),
  make({
    slug: "baraza-conference-table",
    name: "Baraza 10-Seater Conference Table",
    category: "conference-tables", price: 145000,
    images: [img("1497366216548-37526070297c", 1200)],
    isBestseller: true,
    description: "A 3.0m walnut conference table with brushed steel base and grommets for power.",
    dimensions: { width: 300, depth: 110, height: 75, unit: "cm" },
  }),
  make({
    slug: "tulivu-sectional-sofa",
    name: "Tulivu L-Shape Sectional",
    category: "sectional-sofas", price: 165000, salePrice: 139000,
    images: [img("1540574163026-643ea20ade25", 1200), img("1555041469-a586c61ea9bc", 1200)],
    isBestseller: true,
    description: "A deep, modular sectional in stain-resistant linen with kiln-dried hardwood frame and high-resilience foam cushions.",
    dimensions: { width: 310, depth: 210, height: 86, unit: "cm" },
  }),
  make({
    slug: "pendo-three-seater",
    name: "Pendo Three-Seater Sofa",
    category: "sofas", price: 89500,
    images: [img("1555041469-a586c61ea9bc", 1200)],
    description: "Tailored three-seater with feather-blend cushions and tapered oak legs.",
  }),
  make({
    slug: "ufundi-coffee-table",
    name: "Ufundi Live-Edge Coffee Table",
    category: "coffee-tables", price: 32500,
    images: [img("1567016526105-22da7c13161a", 1200)],
    isNew: true,
    description: "A single slab of live-edge mvule wood on a sculpted steel base.",
  }),
  make({
    slug: "kaya-tv-console",
    name: "Kaya Media Console",
    category: "tv-stands", price: 45500,
    images: [img("1616137148650-4aa14651e02a", 1200)],
    description: "A 1.8m media console with reeded oak doors and cable management.",
  }),
  make({
    slug: "mezza-dining-table",
    name: "Mezza Six-Seater Dining Table",
    category: "dining-tables", price: 78500,
    images: [img("1567538096630-e0c55bd6374c", 1200)],
    isBestseller: true,
    description: "A pedestal-base dining table in solid mahogany with a hand-rubbed oil finish.",
    dimensions: { width: 200, depth: 100, height: 76, unit: "cm" },
  }),
  make({
    slug: "kiti-upholstered-dining-chair",
    name: "Kiti Upholstered Dining Chair",
    category: "dining-chairs", price: 12500,
    images: [img("1503602642458-232111445657", 1200)],
    description: "Bouclé-upholstered dining chair with solid ash legs.",
  }),
  make({
    slug: "ngazi-bar-stool",
    name: "Ngazi Adjustable Bar Stool",
    category: "bar-stools", price: 9800,
    images: [img("1549497538-303791108f95", 1200)],
    description: "A swivel bar stool with adjustable gas lift and brushed brass footrest.",
  }),
  make({
    slug: "lala-platform-bed",
    name: "Lala Walnut Platform Bed",
    category: "beds-wardrobes", price: 98500,
    images: [img("1505693416388-ac5ce068fe85", 1200)],
    description: "A low-profile platform bed in walnut with an integrated headboard shelf.",
    dimensions: { width: 200, depth: 220, height: 95, unit: "cm" },
  }),
  make({
    slug: "imara-wardrobe",
    name: "Imara Six-Door Wardrobe",
    category: "beds-wardrobes", price: 125000,
    images: [img("1595428774223-ef52624120d2", 1200)],
    description: "A six-door wardrobe with soft-close hinges, fluted fronts, and full-extension drawers.",
  }),
  make({
    slug: "akiba-filing-cabinet",
    name: "Akiba Three-Drawer Filing Cabinet",
    category: "cabinets", price: 28500,
    images: [img("1594620302200-9a762244a156", 1200)],
    description: "A locking, three-drawer steel filing cabinet with anti-tip mechanism.",
  }),
  make({
    slug: "soma-bookshelf",
    name: "Soma Open Bookshelf",
    category: "cabinets", price: 36500,
    images: [img("1594620302200-9a762244a156", 1200)],
    isNew: true,
    description: "A six-shelf open bookcase in oak with a powder-coated steel frame.",
  }),
  make({
    slug: "hafla-stackable-chair",
    name: "Hafla Stackable Event Chair",
    category: "event-chairs", price: 3850,
    images: [img("1567016432779-094069958ea5", 1200)],
    description: "Lightweight stackable chair for events, conferences, and overflow seating.",
  }),
  make({
    slug: "uwa-decorative-vase",
    name: "Uwa Ceramic Vase",
    category: "decor", price: 4500,
    images: [img("1602810318383-e386cc2a3ccf", 1200)],
    description: "A hand-thrown ceramic vase with a matte stone glaze.",
    dimensions: { width: 22, depth: 22, height: 38, unit: "cm" },
  }),
  make({
    slug: "mti-decorative-plant",
    name: "Mti Decorative Plant (Faux)",
    category: "decor", price: 6900,
    images: [img("1602810318383-e386cc2a3ccf", 1200)],
    description: "A premium faux fiddle-leaf in a stoneware pot—no watering required.",
  }),
];

export const featuredCollections = [
  { id: "office", title: "The Modern Office", blurb: "Built for focus and longevity.", image: "/__cat__/office", categorySlug: "office-desks" },
  { id: "living", title: "Quiet Living", blurb: "Soft forms, considered materials.", image: "/__cat__/living", categorySlug: "sofas" },
  { id: "dining", title: "The Long Table", blurb: "Designed for shared evenings.", image: "/__cat__/dining", categorySlug: "dining-tables" },
];

export const KES = (v: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(v);

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
