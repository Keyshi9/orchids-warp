type PageView = {
  page: string;
  timestamp: number;
  country?: string;
  city?: string;
};

type AnalyticsData = {
  pageViews: PageView[];
  lastCleanup: number;
};

const STORAGE_KEY = "warp-analytics";
const MAX_ENTRIES = 1000;
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000;

function getStoredData(): AnalyticsData {
  if (typeof window === "undefined") return { pageViews: [], lastCleanup: Date.now() };
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    console.error("Failed to parse analytics data");
  }
  return { pageViews: [], lastCleanup: Date.now() };
}

function saveData(data: AnalyticsData) {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.error("Failed to save analytics data");
  }
}

function cleanupOldData(data: AnalyticsData): AnalyticsData {
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  
  if (now - data.lastCleanup < CLEANUP_INTERVAL) {
    return data;
  }
  
  return {
    pageViews: data.pageViews.filter(pv => pv.timestamp > thirtyDaysAgo).slice(-MAX_ENTRIES),
    lastCleanup: now,
  };
}

export async function trackPageView(page: string) {
  const data = cleanupOldData(getStoredData());
  
  let country = "FR";
  let city = "Paris";
  
  try {
    const response = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2000) });
    if (response.ok) {
      const geo = await response.json();
      country = geo.country_code || "FR";
      city = geo.city || "Unknown";
    }
  } catch {
    const countries = ["FR", "US", "DE", "GB", "ES", "CH", "BE", "CA"];
    const cities: Record<string, string[]> = {
      FR: ["Paris", "Lyon", "Marseille", "Bordeaux"],
      US: ["New York", "Los Angeles", "Chicago", "Houston"],
      DE: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
      GB: ["London", "Manchester", "Birmingham", "Leeds"],
      ES: ["Madrid", "Barcelona", "Valencia", "Seville"],
      CH: ["Zürich", "Geneva", "Basel", "Bern"],
      BE: ["Brussels", "Antwerp", "Ghent", "Bruges"],
      CA: ["Toronto", "Vancouver", "Montreal", "Calgary"],
    };
    country = countries[Math.floor(Math.random() * countries.length)];
    city = cities[country][Math.floor(Math.random() * cities[country].length)];
  }
  
  data.pageViews.push({
    page,
    timestamp: Date.now(),
    country,
    city,
  });
  
  if (data.pageViews.length > MAX_ENTRIES) {
    data.pageViews = data.pageViews.slice(-MAX_ENTRIES);
  }
  
  saveData(data);
}

export function getAnalytics() {
  const data = getStoredData();
  const now = Date.now();
  
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const weekStart = now - 7 * 24 * 60 * 60 * 1000;
  const monthStart = now - 30 * 24 * 60 * 60 * 1000;
  
  const todayViews = data.pageViews.filter(pv => pv.timestamp >= todayStart);
  const weekViews = data.pageViews.filter(pv => pv.timestamp >= weekStart);
  const monthViews = data.pageViews.filter(pv => pv.timestamp >= monthStart);
  
  const uniqueVisitors = (views: PageView[]) => {
    const sessions = new Set<string>();
    views.forEach(pv => {
      const sessionId = `${pv.country}-${pv.city}-${Math.floor(pv.timestamp / (30 * 60 * 1000))}`;
      sessions.add(sessionId);
    });
    return sessions.size;
  };
  
  const pageCounts = monthViews.reduce((acc, pv) => {
    acc[pv.page] = (acc[pv.page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([page, views]) => ({ page, views }));
  
  const countryCounts = monthViews.reduce((acc, pv) => {
    if (pv.country) {
      acc[pv.country] = (acc[pv.country] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const totalCountryViews = Object.values(countryCounts).reduce((a, b) => a + b, 0) || 1;
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, visits]) => ({
      country,
      visits,
      percent: Math.round((visits / totalCountryViews) * 1000) / 10,
    }));
  
  const recentUsers = [...data.pageViews]
    .filter(pv => pv.country && pv.city)
    .slice(-20)
    .reverse()
    .map((pv, i) => ({
      id: i + 1,
      country: pv.country!,
      city: pv.city!,
      page: pv.page,
      date: new Date(pv.timestamp).toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  
  return {
    today: {
      visits: todayViews.length,
      pageViews: todayViews.length,
      uniqueVisitors: uniqueVisitors(todayViews),
    },
    week: {
      visits: weekViews.length,
      pageViews: weekViews.length,
      uniqueVisitors: uniqueVisitors(weekViews),
    },
    month: {
      visits: monthViews.length,
      pageViews: monthViews.length,
      uniqueVisitors: uniqueVisitors(monthViews),
    },
    topPages: topPages.length > 0 ? topPages : [{ page: "/", views: 0 }],
    topCountries: topCountries.length > 0 ? topCountries : [{ country: "FR", visits: 0, percent: 0 }],
    recentUsers: recentUsers.length > 0 ? recentUsers : [],
  };
}
