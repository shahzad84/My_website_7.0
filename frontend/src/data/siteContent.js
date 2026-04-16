import { images } from "../components/images";

const DEFAULT_LEARNINGS = [
  "Build real-world projects",
  "Master modern tools and workflows",
  "Write clean and scalable code",
  "Improve UI and UX skills",
];

const DEFAULT_PRODUCT_DETAILS = [
  "Premium quality material",
  "Long-lasting durability",
  "Modern aesthetic design",
  "7-day replacement guarantee",
];

// const IMAGE_MAP = {
//   phone: images.phone,
//   keyboard: images.keyboard,
// };

const normalizeKey = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
// It converts column names into a clean format.
const getField = (row, keys) => {
  if (!row || typeof row !== "object") {
    return "";
  }

  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") {
      return row[key];
    }
  }

  const normalizedEntries = Object.entries(row).map(([key, value]) => [
    normalizeKey(key),
    value,
  ]);

  for (const key of keys) {
    const match = normalizedEntries.find(
      ([candidateKey, candidateValue]) =>
        candidateKey === normalizeKey(key) &&
        candidateValue !== undefined &&
        candidateValue !== null &&
        candidateValue !== ""
    );

    if (match) {
      return match[1];
    }
  }

  return "";
};
// Find correct value in a row EVEN if column names are different.

const parseBoolean = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  const normalized = String(value || "").trim().toLowerCase();
  return ["true", "1", "yes", "y", "featured"].includes(normalized);
};
// Converts anything into boolean
const parseList = (value, fallback) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  const raw = String(value || "").trim();

  if (!raw) {
    return fallback;
  }

  const separator = raw.includes("\n")
    ? "\n"
    : raw.includes("|")
      ? "|"
      : raw.includes(";")
        ? ";"
        : null;

  if (!separator) {
    return [raw];
  }

  return raw
    .split(separator)
    .map((item) => item.replace(/^[*-]\s*/, "").trim())
    .filter(Boolean);
};
// learn to split strings into arrays


const formatPrice = (value) => {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  const raw = String(value).trim();
  const numeric = Number(raw.replace(/[^\d.]/g, ""));

  if (Number.isFinite(numeric) && raw.replace(/[^\d]/g, "") !== "") {
    return `\u20b9${numeric.toLocaleString("en-IN")}`;
  }

  return raw;
};

const resolveImage = (value, fallback = images.phone) => {
  const raw = String(value || "").trim();

  if (!raw) return fallback;

  // Cloudinary or any real URL
  if (raw.startsWith("http")) return raw;

  return fallback;
};

const getCourseTagClass = (level) => {
  switch (String(level || "").trim().toLowerCase()) {
    case "advanced":
      return "tag-adv";
    case "intermediate":
      return "tag-inter";
    default:
      return "tag-beginner";
  }
};

export const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const defaultCourses = [
  {
    id: "course-1",
    type: "course",
    level: "Beginner",
    image: images.phone,
    title: "Bootcamp",
    desc: "HTML to React to Node - build 5 real projects and land your first dev job.",
    price: "\u20b91,999",
    oldPrice: "\u20b93,999",
    tagClass: "tag-beginner",
    featured: true,
    learnings: DEFAULT_LEARNINGS,
  },
  {
    id: "course-2",
    type: "course",
    level: "Intermediate",
    image: images.phone,
    title: "React + Next.js Mastery",
    desc: "Production-grade React patterns and full-stack apps.",
    price: "\u20b92,499",
    oldPrice: "\u20b94,999",
    tagClass: "tag-inter",
    featured: true,
    learnings: DEFAULT_LEARNINGS,
  },
  {
    id: "course-3",
    type: "course",
    level: "Advanced",
    image: images.phone,
    title: "Python + AI/ML Deep Dive",
    desc: "Machine learning and AI products from scratch.",
    price: "\u20b93,499",
    oldPrice: "\u20b96,999",
    tagClass: "tag-adv",
    featured: true,
    learnings: DEFAULT_LEARNINGS,
  },
  {
    id: "course-4",
    type: "course",
    level: "Beginner",
    image: images.phone,
    title: "Mobile App Development with Flutter",
    desc: "Build beautiful cross-platform mobile apps from scratch.",
    price: "\u20b92,199",
    oldPrice: "\u20b94,499",
    tagClass: "tag-beginner",
    featured: false,
    learnings: DEFAULT_LEARNINGS,
  },
  {
    id: "course-5",
    type: "course",
    level: "Intermediate",
    image: images.phone,
    title: "UI/UX Design Masterclass",
    desc: "Learn design principles, Figma, and create stunning interfaces.",
    price: "\u20b91,799",
    oldPrice: "\u20b93,699",
    tagClass: "tag-inter",
    featured: false,
    learnings: DEFAULT_LEARNINGS,
  },
  {
    id: "course-6",
    type: "course",
    level: "Advanced",
    image: images.phone,
    title: "Cybersecurity & Ethical Hacking",
    desc: "Master security concepts and penetration testing techniques.",
    price: "\u20b94,299",
    oldPrice: "\u20b97,999",
    tagClass: "tag-adv",
    featured: false,
    learnings: DEFAULT_LEARNINGS,
  },
];

export const defaultProducts = [
  {
    id: "product-1",
    type: "product",
    title: "Mechanical Keyboard",
    desc: "Premium RGB keyboard for developers",
    price: "\u20b92,999",
    oldPrice: "\u20b94,999",
    category: "Accessories",
    image: images.phone,
    details: DEFAULT_PRODUCT_DETAILS,
  },
  {
    id: "product-2",
    type: "product",
    title: "Gaming Mouse",
    desc: "High precision RGB gaming mouse",
    price: "\u20b91,499",
    oldPrice: "\u20b92,499",
    category: "Accessories",
    image: images.keyboard,
    details: DEFAULT_PRODUCT_DETAILS,
  },
  {
    id: "product-3",
    type: "product",
    title: "Mechanical Keyboard Pro",
    desc: "Hot-swappable switches with RGB lighting",
    price: "\u20b94,499",
    oldPrice: "\u20b96,999",
    category: "Accessories",
    image: images.phone,
    details: DEFAULT_PRODUCT_DETAILS,
  },
  {
    id: "product-4",
    type: "product",
    title: "Wireless Headphones",
    desc: "Noise cancelling over-ear headphones",
    price: "\u20b93,999",
    oldPrice: "\u20b95,999",
    category: "Audio",
    image: images.keyboard,
    details: DEFAULT_PRODUCT_DETAILS,
  },
  {
    id: "product-5",
    type: "product",
    title: "Laptop Stand",
    desc: "Aluminium ergonomic adjustable stand",
    price: "\u20b9899",
    oldPrice: "\u20b91,499",
    category: "Accessories",
    image: images.keyboard,
    details: DEFAULT_PRODUCT_DETAILS,
  },
  {
    id: "product-6",
    type: "product",
    title: "USB-C Hub",
    desc: "7-in-1 multiport adapter for laptops",
    price: "\u20b91,299",
    oldPrice: "\u20b92,199",
    category: "Tech",
    image: images.phone,
    details: DEFAULT_PRODUCT_DETAILS,
  },
  {
    id: "product-7",
    type: "product",
    title: "Smartwatch",
    desc: "Fitness tracking with AMOLED display",
    price: "\u20b92,999",
    oldPrice: "\u20b94,499",
    category: "Wearables",
    image: images.keyboard,
    details: DEFAULT_PRODUCT_DETAILS,
  },
];

export const defaultVideos = [
  {
    id: "1",
    title: "Build a DevStore UI",
    desc: "Learn how to design a premium developer UI from scratch.",
    category: "UI Design",
    duration: "22m",
    level: "Intermediate",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/ddjwOAZYssM/hqdefault.jpg",
  },
  {
    id: "2",
    title: "React Landing Page",
    desc: "Create modern SaaS landing pages using React.",
    category: "React",
    duration: "18m",
    level: "Beginner",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/ddjwOAZYssM/hqdefault.jpg",
  },
  {
    id: "3",
    title: "CSS Neon Effects",
    desc: "Master glowing UI effects and animations in CSS.",
    category: "CSS",
    duration: "15m",
    level: "Beginner",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/ddjwOAZYssM/hqdefault.jpg",
  },
  {
    id: "4",
    title: "Node.js REST API",
    desc: "Build production-ready REST APIs with Node.js.",
    category: "Backend",
    duration: "28m",
    level: "Intermediate",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/ddjwOAZYssM/hqdefault.jpg",
  },
  {
    id: "5",
    title: "React Hooks Mastery",
    desc: "Deep dive into React Hooks and custom hooks.",
    category: "React",
    duration: "25m",
    level: "Advanced",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/ddjwOAZYssM/hqdefault.jpg",
  },
  {
    id: "6",
    title: "Database Design 101",
    desc: "Learn SQL and database design patterns.",
    category: "Database",
    duration: "32m",
    level: "Intermediate",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/ddjwOAZYssM/hqdefault.jpg",
  },
];
// It converts ONE Google Sheet row → frontend object
export const normalizeCourse = (row, index) => {
  const level = getField(row, ["level"]) || "Beginner";
  const title = getField(row, ["title", "name", "courseName"]) || `Course ${index + 1}`;

  return {
    id:
      String(getField(row, ["id", "courseId", "course_id"]) || `course-${index + 1}`),
    type: "course",
    level,
    image: resolveImage(
      row.image || row.imageUrl || row.thumbnail
    ),
    title,
    desc:
      row.desc ||
      row.description ||
      row.details ||
      "",
    price: formatPrice(getField(row, ["price", "salePrice", "currentPrice"])),
    oldPrice: formatPrice(getField(row, ["oldPrice", "originalPrice", "mrp"])),
    tagClass: getCourseTagClass(level),
    duration: getField(row, ["duration"]),
    lessons: getField(row, ["lessons", "lessonCount"]),
    category: getField(row, ["category", "topic"]),
    featured: parseBoolean(getField(row, ["featured", "isFeatured"])),
    learnings: parseList(
      getField(row, ["learnings", "outcomes", "whatYouWillLearn"]),
      DEFAULT_LEARNINGS
    ),
  };
};

export const normalizeProduct = (row, index) => {
  const category = getField(row, ["category"]) || "Accessories";
  const title = getField(row, ["title", "name", "productName"]) || `Product ${index + 1}`;

  return {
    id:
      String(getField(row, ["id", "productId", "product_id"]) || `product-${index + 1}`),
    type: "product",
    title,
    desc: getField(row, ["desc", "description", "details"]) || "",
    price: formatPrice(getField(row, ["price", "salePrice", "currentPrice"])),
    oldPrice: formatPrice(getField(row, ["oldPrice", "originalPrice", "mrp"])),
    category,
    image: resolveImage(getField(row, ["image", "imageUrl", "thumbnail"]), images.keyboard),
    rating: getField(row, ["rating"]),
    details: parseList(getField(row, ["features", "details"]), DEFAULT_PRODUCT_DETAILS),
  };
};

export const normalizeVideo = (row, index) => {
  const videoId = String(getField(row, ["videoId", "video_id", "youtubeId"]) || "").trim();

  return {
    id: String(getField(row, ["id", "videoNo", "videoNumber"]) || `${index + 1}`),
    title: getField(row, ["title", "name", "videoTitle"]) || `Video ${index + 1}`,
    desc: getField(row, ["desc", "description"]) || "",
    category: getField(row, ["category"]) || "Tutorial",
    duration: getField(row, ["duration"]) || "",
    level: getField(row, ["level"]) || "Beginner",
    videoId,
    thumbnail:
      resolveImage(getField(row, ["thumbnail", "image", "imageUrl"])) ||
      `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    details: parseList(
      getField(row, ["details", "points", "highlights"]),
      [
        "Learn by building real projects",
        "Step-by-step explanation",
        "Practical coding techniques",
      ]
    ),
  };
};
