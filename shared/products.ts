export interface Product {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  image: string;
  lowestPrice: number;
  priceRange: { min: number; max: number };
  variants: {
    [key: string]: string[];
  };
  description: string;
  minimumOrder: number;
  featured?: boolean;
}

export const sampleProducts: Product[] = [
  // Diamond Ring
  {
    id: "1",
    name: "Classic Solitaire Diamond Ring",
    category: "Diamond Ring",
    categoryId: "diamond-ring",
    image:
      "https://readdy.ai/api/search-image?query=classic%20solitaire%20diamond%20ring%20with%20brilliant%20cut%20center%20stone%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20engagement%20ring&width=400&height=400&seq=prod-ring-1&orientation=squarish",
    lowestPrice: 1800,
    priceRange: { min: 1800, max: 15000 },
    variants: {
      metal: ["White Gold", "Yellow Gold", "Rose Gold", "Platinum"],
      size: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
      stone: ["0.5ct", "1ct", "1.5ct", "2ct"],
    },
    description:
      "Timeless solitaire engagement ring with premium diamond and expert craftsmanship.",
    minimumOrder: 3,
    featured: true,
  },
  {
    id: "2",
    name: "Halo Diamond Engagement Ring",
    category: "Diamond Ring",
    categoryId: "diamond-ring",
    image:
      "https://readdy.ai/api/search-image?query=halo%20diamond%20engagement%20ring%20with%20center%20stone%20surrounded%20by%20smaller%20diamonds%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20ring&width=400&height=400&seq=prod-ring-2&orientation=squarish",
    lowestPrice: 2200,
    priceRange: { min: 2200, max: 18000 },
    variants: {
      metal: ["White Gold", "Yellow Gold", "Rose Gold"],
      size: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
      stone: ["0.75ct", "1ct", "1.5ct", "2ct"],
    },
    description:
      "Stunning halo engagement ring with center diamond surrounded by brilliant accent stones.",
    minimumOrder: 2,
  },

  // Diamond Necklace
  {
    id: "3",
    name: "Tennis Diamond Necklace",
    category: "Diamond Necklace",
    categoryId: "diamond-necklace",
    image:
      "https://readdy.ai/api/search-image?query=tennis%20diamond%20necklace%20with%20brilliant%20cut%20diamonds%20in%20white%20gold%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=prod-necklace-1&orientation=squarish",
    lowestPrice: 2500,
    priceRange: { min: 2500, max: 8500 },
    variants: {
      metal: ["14K Gold", "18K Gold", "Platinum"],
      length: ['16"', '18"', '20"'],
      stone: ["0.5ct", "1ct", "2ct", "3ct"],
    },
    description:
      "Elegant tennis necklace featuring brilliant cut diamonds in a classic setting.",
    minimumOrder: 5,
    featured: true,
  },
  {
    id: "4",
    name: "Diamond Pendant Necklace",
    category: "Diamond Necklace",
    categoryId: "diamond-necklace",
    image:
      "https://readdy.ai/api/search-image?query=diamond%20pendant%20necklace%20with%20solitaire%20diamond%20pendant%20on%20delicate%20chain%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=prod-necklace-2&orientation=squarish",
    lowestPrice: 1200,
    priceRange: { min: 1200, max: 4500 },
    variants: {
      metal: ["14K White Gold", "14K Yellow Gold", "18K Gold"],
      length: ['16"', '18"', '20"'],
      stone: ["0.25ct", "0.5ct", "1ct"],
    },
    description: "Delicate pendant necklace with brilliant solitaire diamond.",
    minimumOrder: 3,
  },

  // Diamond Earring
  {
    id: "5",
    name: "Diamond Stud Earrings",
    category: "Diamond Earring",
    categoryId: "diamond-earring",
    image:
      "https://readdy.ai/api/search-image?query=diamond%20stud%20earrings%20with%20brilliant%20cut%20diamonds%20in%20white%20gold%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=prod-earring-1&orientation=squarish",
    lowestPrice: 450,
    priceRange: { min: 450, max: 1200 },
    variants: {
      metal: ["Sterling Silver", "14K Gold", "18K Gold"],
      stone: ["0.25ct", "0.5ct", "1ct"],
    },
    description: "Classic diamond stud earrings perfect for everyday elegance.",
    minimumOrder: 10,
    featured: true,
  },
  {
    id: "6",
    name: "Diamond Hoop Earrings",
    category: "Diamond Earring",
    categoryId: "diamond-earring",
    image:
      "https://readdy.ai/api/search-image?query=diamond%20hoop%20earrings%20with%20diamonds%20set%20around%20the%20hoop%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20fashion%20jewelry&width=400&height=400&seq=prod-earring-2&orientation=squarish",
    lowestPrice: 680,
    priceRange: { min: 680, max: 2200 },
    variants: {
      metal: ["14K Gold", "18K Gold", "Sterling Silver"],
      size: ["Small", "Medium", "Large"],
    },
    description: "Elegant hoop earrings with diamonds for sophisticated style.",
    minimumOrder: 5,
  },

  // Diamond Bracelet
  {
    id: "7",
    name: "Diamond Tennis Bracelet",
    category: "Diamond Bracelet",
    categoryId: "diamond-bracelet",
    image:
      "https://readdy.ai/api/search-image?query=diamond%20tennis%20bracelet%20with%20brilliant%20cut%20diamonds%20in%20white%20gold%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20bridal%20jewelry&width=400&height=400&seq=prod-bracelet-1&orientation=squarish",
    lowestPrice: 1890,
    priceRange: { min: 1890, max: 6200 },
    variants: {
      metal: ["14K Gold", "18K Gold", "Platinum"],
      length: ['7"', '7.5"', '8"'],
    },
    description:
      "Classic tennis bracelet with brilliant diamonds in premium setting.",
    minimumOrder: 2,
    featured: true,
  },

  // Diamond Band
  {
    id: "8",
    name: "Diamond Eternity Band",
    category: "Diamond Band",
    categoryId: "diamond-band",
    image:
      "https://readdy.ai/api/search-image?query=diamond%20eternity%20band%20with%20brilliant%20cut%20diamonds%20around%20entire%20band%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20wedding%20band&width=400&height=400&seq=prod-band-1&orientation=squarish",
    lowestPrice: 1200,
    priceRange: { min: 1200, max: 4500 },
    variants: {
      metal: ["14K Gold", "18K Gold", "Platinum"],
      size: ["5", "5.5", "6", "6.5", "7", "7.5", "8"],
    },
    description:
      "Stunning eternity band with diamonds around the entire circumference.",
    minimumOrder: 3,
  },

  // Diamond Bangles
  {
    id: "9",
    name: "Luxury Diamond Bangle",
    category: "Diamond Bangles",
    categoryId: "diamond-bangles",
    image:
      "https://readdy.ai/api/search-image?query=luxury%20diamond%20bangle%20with%20multiple%20diamonds%20in%20gold%20setting%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20fashion%20jewelry&width=400&height=400&seq=prod-bangle-1&orientation=squarish",
    lowestPrice: 2800,
    priceRange: { min: 2800, max: 8500 },
    variants: {
      metal: ["14K Gold", "18K Gold", "Platinum"],
      size: ["Small", "Medium", "Large"],
    },
    description: "Elegant diamond bangle with multiple brilliant stones.",
    minimumOrder: 2,
  },

  // Diamond Hip Hop Ring
  {
    id: "10",
    name: "Iced Out Diamond Ring",
    category: "Diamond Hip Hop Ring",
    categoryId: "diamond-hip-hop-ring",
    image:
      "https://readdy.ai/api/search-image?query=iced%20out%20diamond%20hip%20hop%20ring%20with%20multiple%20diamonds%20bold%20design%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20streetwear%20jewelry&width=400&height=400&seq=prod-hiphop-1&orientation=squarish",
    lowestPrice: 1500,
    priceRange: { min: 1500, max: 5500 },
    variants: {
      metal: ["14K Gold", "18K Gold", "White Gold"],
      size: ["8", "9", "10", "11", "12"],
    },
    description: "Bold hip hop style ring completely iced out with diamonds.",
    minimumOrder: 2,
  },

  // Diamond Watches
  {
    id: "11",
    name: "Diamond Bezel Watch",
    category: "Diamond Watches",
    categoryId: "diamond-watches",
    image:
      "https://readdy.ai/api/search-image?query=luxury%20diamond%20watch%20with%20diamond%20bezel%20and%20face%20professional%20jewelry%20photography%20clean%20white%20background%20luxury%20timepiece&width=400&height=400&seq=prod-watch-1&orientation=squarish",
    lowestPrice: 5500,
    priceRange: { min: 5500, max: 25000 },
    variants: {
      metal: ["Gold", "Rose Gold", "Two-Tone"],
      size: ["38mm", "40mm", "42mm"],
    },
    description: "Luxury timepiece with diamond-encrusted bezel and markers.",
    minimumOrder: 1,
  },

  // Loose Diamond
  {
    id: "12",
    name: "Certified Loose Diamonds",
    category: "Loose Diamond",
    categoryId: "loose-diamond",
    image:
      "https://readdy.ai/api/search-image?query=collection%20of%20loose%20diamonds%20various%20cuts%20round%20princess%20emerald%20professional%20jewelry%20photography%20clean%20white%20background%20certified%20diamonds&width=400&height=400&seq=prod-loose-1&orientation=squarish",
    lowestPrice: 200,
    priceRange: { min: 200, max: 10000 },
    variants: {
      cut: ["Round", "Princess", "Emerald", "Oval"],
      carat: ["0.25ct", "0.5ct", "1ct", "2ct", "3ct"],
      clarity: ["SI1", "VS2", "VS1", "VVS2"],
    },
    description:
      "Certified loose diamonds in various cuts, carats, and clarity grades.",
    minimumOrder: 10,
  },
];
