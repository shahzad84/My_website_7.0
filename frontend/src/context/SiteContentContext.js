import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCourses,
  fetchProducts,
  fetchVideos,
} from "../api/googleSheetApi";
import {
  defaultCourses,
  defaultProducts,
  defaultVideos,
  normalizeCourse,
  normalizeProduct,
  normalizeVideo,
} from "../data/siteContent";

// This creates a global “box” where data will live.
const SiteContentContext = createContext(null);

// It converts raw API data → clean frontend data.
const mapCollection = (rows, normalizer, fallback) => {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { items: fallback, usingFallback: true };
  }

  const items = rows
    .map((row, index) => normalizer(row, index))
    .filter((item) => item && item.id);

  if (!items.length) {
    return { items: fallback, usingFallback: true };
  }

  return { items, usingFallback: false };
};

// This wraps your whole app
export function SiteContentProvider({ children }) {
  // Default data is shown first
  const [courses, setCourses] = useState(defaultCourses);
  const [products, setProducts] = useState(defaultProducts);
  const [videos, setVideos] = useState(defaultVideos);
  // shows loading screen
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // true = using default data
  const [usingFallback, setUsingFallback] = useState({
    courses: true,
    products: true,
    videos: true,
  });

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
     if (!isOnline) return; 
    // prevents memory leaks if component unmounts
    let ignore = false;

    const loadCourses = async () => {
      try {
        // gets data from Google Sheets
        const rows = await fetchCourses();

        // 🔥 ADD THIS LINE
        // console.log("🔥 RAW COURSES FROM API:", rows);

        // converts raw data → clean UI format
        const result = mapCollection(rows, normalizeCourse, defaultCourses);

        if (!ignore) {
          setCourses(result.items);
          setUsingFallback((prev) => ({
            ...prev,
            courses: result.usingFallback,
          }));
        }
      } catch (error) {
        console.error("Unable to load courses:", error);
      }
    };

    const loadProducts = async () => {
      try {
        const rows = await fetchProducts();
        const result = mapCollection(rows, normalizeProduct, defaultProducts);

        if (!ignore) {
          setProducts(result.items);
          setUsingFallback((prev) => ({
            ...prev,
            products: result.usingFallback,
          }));
        }
      } catch (error) {
        console.error("Unable to load products from Google Sheets:", error);
      }
    };

    const loadVideos = async () => {
      try {
        const rows = await fetchVideos();
        const result = mapCollection(rows, normalizeVideo, defaultVideos);

        if (!ignore) {
          setVideos(result.items);
          setUsingFallback((prev) => ({
            ...prev,
            videos: result.usingFallback,
          }));
        }
      } catch (error) {
        console.error("Unable to load videos from Google Sheets:", error);
      }
    };

    Promise.allSettled([loadCourses(), loadProducts(), loadVideos()]).finally(
      () => {
        if (!ignore) {
          setLoading(false);
        }
      },
    );

    return () => {
      ignore = true;
    };
  }, [isOnline]);

  return (
    <SiteContentContext.Provider
      value={{ courses, products, videos, loading, usingFallback, isOnline }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used inside SiteContentProvider");
  }

  return context;
};
