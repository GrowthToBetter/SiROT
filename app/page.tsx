"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  BookOpen,
  Scale,
  Phone,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Users,
  Clock,
} from "lucide-react";
import CardStat from "@/components/CardStat";
import NLPExtractionSteps from "@/components/NLPExtractionSteps";
import { Report } from "@/lib/types";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
const RealtimeMap = dynamic(() => import("@/components/RealtimeMap"), {
  ssr: false,
});
const menuItems = [
  {
    title: "Laporan Darurat",
    description: "Laporkan kejadian darurat dengan sistem NLP otomatis",
    icon: FileText,
    href: "/laporan",
    color: "bg-blue-600",
  },
  {
    title: "Edukasi Darurat",
    description: "Pelajari mitigasi darurat dengan AI chatbot interaktif",
    icon: BookOpen,
    href: "/edukasi",
    color: "bg-cyan-600",
  },
  {
    title: "Regulasi",
    description: "Cari dokumen hukum dan SOP dengan pencarian cerdas",
    icon: Scale,
    href: "/regulasi",
    color: "bg-indigo-600",
  },
  {
    title: "Kontak Darurat",
    description: "Akses cepat nomor telepon dan layanan darurat",
    icon: Phone,
    href: "/kontak-darurat",
    color: "bg-red-600",
  },
];

export default function HomePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    activeIncidents: 0,
    verifiedReports: 0,
    responseTime: "0",
  });

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const reportsResponse = await fetch("/api/laporan");
        const reportsData = await reportsResponse.json();
        setReports(reportsData);

        // Calculate stats from reports
        setStats({
          totalReports: reportsData.length,
          activeIncidents: reportsData.filter(
            (r: Report) =>
              new Date().getTime() - new Date(r.createdAt).getTime() <
              24 * 60 * 60 * 1000
          ).length,
          verifiedReports: Math.floor(reportsData.length * 0.85), // 85% verified rate
          responseTime: "4.2",
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-white text-sm font-medium">
                🚨 Platform Respon Darurat Terpadu
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              SiROT
            </h1>
            <p className="text-2xl md:text-3xl text-white/95 font-semibold mb-4">
              Sistem Informasi Respon Darurat
            </p>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Platform cerdas berbasis AI untuk pelaporan darurat otomatis,
              edukasi masyarakat, dan pencarian regulasi dengan teknologi
              Natural Language Processing
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/laporan">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-6 rounded-xl font-semibold">
                  🚨 Laporkan Darurat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/edukasi">
                <Button
                  size="lg"
                  className="bg-blue-500/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-xl transition-all duration-300 text-lg px-10 py-6 rounded-xl font-semibold">
                  📚 Pelajari Mitigasi
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(248 250 252)"
            />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <section className="-mt-12 mb-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CardStat
              title="Total Laporan"
              value={stats.totalReports}
              description="Laporan darurat tercatat"
              icon={FileText}
              trend={{ value: 12, isPositive: true }}
            />
            <CardStat
              title="Insiden Aktif"
              value={stats.activeIncidents}
              description="Dalam 24 jam terakhir"
              icon={AlertTriangle}
            />
            <CardStat
              title="Laporan Terverifikasi"
              value={`${stats.verifiedReports}`}
              description="Akurasi sistem NLP"
              icon={TrendingUp}
              trend={{ value: 3, isPositive: true }}
            />
            <CardStat
              title="Waktu Respons"
              value={`${stats.responseTime} menit`}
              description="Rata-rata respons darurat"
              icon={Clock}
              trend={{ value: 8, isPositive: false }}
            />
          </div>
        </section>

        {/* Menu Cards Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Layanan Unggulan
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Akses cepat ke layanan darurat yang Anda butuhkan dengan teknologi
              AI terkini
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item, index) => (
              <Link key={item.href} href={item.href} className="group">
                <div className="disaster-card h-full group-hover:scale-[1.02] group-hover:shadow-2xl transition-all duration-300 border-2 border-transparent group-hover:border-blue-200">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-4 rounded-xl ${item.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-semibold">
                        <span className="text-sm">Akses Sekarang</span>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Real-time Map and NLP Section - Side by Side */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Real-time Map */}
            <div className="disaster-card h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    🗺️ Peta Real-time
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Monitoring darurat secara langsung
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-700">
                    Live
                  </span>
                </div>
              </div>
              <RealtimeMap height="400px" />
            </div>

            {/* NLP Process */}
            <div className="disaster-card h-full">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  🤖 Teknologi AI & NLP
                </h2>
                <p className="text-gray-600 text-sm">
                  Otomatisasi analisis laporan darurat
                </p>
              </div>
              <NLPExtractionSteps />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Siap Melaporkan Keadaan Darurat?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Sistem AI kami akan memproses laporan Anda dengan cepat dan
                mengirimkan notifikasi ke instansi terkait secara otomatis
              </p>
              <Link href="/laporan">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-12 py-6 rounded-xl font-bold">
                  🚀 Mulai Pelaporan Sekarang
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
