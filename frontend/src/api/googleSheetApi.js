// const BASE_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL;
const BASE_URL = "/.netlify/functions/googlesheet";

const DEFAULT_ACTIONS = {
  courses: process.env.REACT_APP_GOOGLE_SHEET_COURSES_ACTION || "get_courses",
  products: process.env.REACT_APP_GOOGLE_SHEET_PRODUCTS_ACTION || "get_products",
  videos:
    process.env.REACT_APP_GOOGLE_SHEET_VIDEOS_ACTION ||
    process.env.REACT_APP_GOOGLE_SHEET_YOUTUBE_ACTION ||
    "get_videos",
  order: process.env.REACT_APP_GOOGLE_SHEET_ORDER_ACTION || "create_order",
  contact: process.env.REACT_APP_GOOGLE_SHEET_CONTACT_ACTION || "contact_message",
};

const parseResponse = async (res) => {
  const raw = await res.text();

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return { raw };
  }
};

const extractCollection = (response, key) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (!response || typeof response !== "object") {
    return [];
  }

  const candidates = [
    response[key],
    response.data,
    response.rows,
    response.items,
    response.result?.[key],
    response.result?.data,
    response.payload?.[key],
  ];

  const match = candidates.find(Array.isArray);
  return match || [];
};

export const postToSheet = async (payload = {}) => {
  if (!BASE_URL) {
    throw new Error("Missing Netlify function URL");
  }

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await parseResponse(res);

    if (!res.ok) {
      throw new Error(data?.message || `Request failed with ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error("Google Sheet API error:", err);
    throw err;
  }
};

export const submitContactMessage = (data) => {
  return postToSheet({
    action: DEFAULT_ACTIONS.contact || "contact_message",
    ...data,
  });
};

export const createOrder = (data) => {
  return postToSheet({
    action: DEFAULT_ACTIONS.order,
    ...data,
  });
};

export const fetchCourses = async () => {
  const response = await postToSheet({
    action: DEFAULT_ACTIONS.courses,
  });

  // console.log("FULL API RESPONSE:", response);

  const courses =
    response?.courses ||
    response?.data?.courses ||
    response?.result?.courses ||
    [];

  if (!Array.isArray(courses)) return [];

  return courses;
};

export const fetchProducts = async () => {
  const response = await postToSheet({ action: DEFAULT_ACTIONS.products });
  return extractCollection(response, "products");
};

export const fetchVideos = async () => {
  const response = await postToSheet({
    action: "get_videos", // 🔥 FORCE THIS
  });

  // console.log("VIDEOS API RESPONSE:", response);

  const videos =
    response?.videos ||
    response?.data?.videos ||
    [];

  return videos.map((v) => ({
    ...v,
    videoId: v.videoId || v.videoid,
    playlist: v.playlist?.trim(),
  }));
};
