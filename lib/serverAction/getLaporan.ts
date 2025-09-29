"use server";

import { prisma } from "@/lib/prisma";

export interface Report {
  id: string;
  lokasi: string;
  lat: number;
  lng: number;
  jenisBencana: string;
  deskripsi: string;
  urgency: number;
  reporters: number;
}

async function geocodeLocationAdvanced(lokasi: string) {
  try {
    const cleanLocation = lokasi.trim().toLowerCase();

    const searchQueries = [
      lokasi,
      `${lokasi}, Indonesia`,
      lokasi.replace(/\b(kab|kabupaten|kota|desa|kelurahan|kecamatan)\b/gi, ""),
      lokasi.split(",")[0].trim(),
    ];

    let bestResult = null;

    for (const query of searchQueries) {
      if (!query.trim()) continue;

      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(
          query
        )}&countrycodes=id&addressdetails=1`;
        const res = await fetch(url, {
          headers: { "User-Agent": "sirana-disaster-app/1.0" },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            bestResult = data[0];
            break;
          }
        }
      } catch (err) {
        console.warn(`Geocode query failed for: ${query}`, err);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    if (bestResult) {
      return {
        found: true,
        confidence: "high",
        lat: parseFloat(bestResult.lat),
        lng: parseFloat(bestResult.lon),
        label: bestResult.display_name,
      };
    }
  } catch (err) {
    console.error("Advanced geocode error:", err);
  }

  return {
    found: false,
    confidence: "none",
    lat: -2.5,
    lng: 118,
    label: `${lokasi} (lokasi tidak ditemukan)`,
  };
}

// async function geocodeLocation(lokasi: string) {
//   try {
//     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//       lokasi
//     )}`;
//     const res = await fetch(url, {
//       headers: { "User-Agent": "sirana-app/1.0" }, // Nominatim wajib
//     });
//     const data = await res.json();

//     if (data.length > 0) {
//       return {
//         lat: parseFloat(data[0].lat),
//         lng: parseFloat(data[0].lon),
//       };
//     }
//   } catch (err) {
//     console.error("Geocode error:", err);
//   }
//   return { lat: 0, lng: 0 }; // fallback
// }

export async function getLaporan(): Promise<Report[]> {
  const reports = await prisma.emergency_reports.findMany({
    orderBy: { timestamp: "desc" },
    take: 50,
  });

  const result: Report[] = [];

  for (const r of reports) {
    if (!r.location) continue;

    const { lat, lng } = await geocodeLocationAdvanced(r.location);

    result.push({
      id: r.id,
      lokasi: r.location,
      lat,
      lng,
      jenisBencana: r.emergency_type ?? "Tidak diketahui",
      deskripsi: r.description ?? "",
      urgency: r.urgency_level ?? 0,
      reporters: 1,
    });
  }

  return result;
}
