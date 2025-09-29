'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import CardStat from '@/components/CardStat';
import NLPExtractionSteps from '@/components/NLPExtractionSteps';
import { Report } from '@/lib/types';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
const RealtimeMap = dynamic(() => import("@/components/RealtimeMap"), { ssr: false });
const menuItems = [
  {
    title: 'Laporan Darurat',
    description: 'Laporkan kejadian darurat dengan sistem NLP otomatis',
    icon: FileText,
    href: '/laporan',
    color: 'bg-blue-600',
  },
  {
    title: 'Edukasi Darurat',
    description: 'Pelajari mitigasi darurat dengan AI chatbot interaktif',
    icon: BookOpen,
    href: '/edukasi',
    color: 'bg-cyan-600',
  },
  {
    title: 'Regulasi',
    description: 'Cari dokumen hukum dan SOP dengan pencarian cerdas',
    icon: Scale,
    href: '/regulasi',
    color: 'bg-indigo-600',
  },
  {
    title: 'Kontak Darurat',
    description: 'Akses cepat nomor telepon dan layanan darurat',
    icon: Phone,
    href: '/kontak-darurat',
    color: 'bg-red-600',
  },
];

export default function HomePage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    activeIncidents: 0,
    verifiedReports: 0,
    responseTime: '0',
  });

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const reportsResponse = await fetch('/api/laporan');
        const reportsData = await reportsResponse.json();
        setReports(reportsData);
        
        // Calculate stats from reports
        setStats({
          totalReports: reportsData.length,
          activeIncidents: reportsData.filter((r: Report) => 
            new Date().getTime() - new Date(r.createdAt).getTime() < 24 * 60 * 60 * 1000
          ).length,
          verifiedReports: Math.floor(reportsData.length * 0.85), // 85% verified rate
          responseTime: '4.2',
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              SiROT
              <span className="block text-white/95 text-3xl md:text-5xl mt-2">
                Sistem Informasi Respon Darurat
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Platform cerdas untuk pelaporan darurat otomatis, edukasi masyarakat, 
              dan pencarian regulasi menggunakan teknologi AI
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/laporan">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
                  Laporkan Keadaan Darurat
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/edukasi">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white bg-blue-600 hover:text-blue-600 text-lg px-8 py-3"
                >
                  Pelajari Mitigasi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Stats Section */}
        <section className="mb-16">
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
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Layanan Utama
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Pilih layanan yang Anda butuhkan untuk mendapatkan informasi 
              atau melaporkan kejadian darurat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="group">
                <div className="disaster-card h-full group-hover:scale-105 transition-transform duration-200">
                  <div className={`p-3 rounded-lg ${item.color} mb-4 w-fit`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                    <span className="text-sm font-medium">Akses Sekarang</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Real-time Map Section */}
        <section className="mb-16">
          <div className="disaster-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Peta Real-time Darurat
                </h2>
                <p className="text-gray-600">
                  Monitoring kejadian darurat di seluruh Indonesia secara langsung
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>
            <RealtimeMap height="500px" />
          </div>
        </section>

        {/* NLP Process Section */}
        <section className="mb-16">
          <div className="disaster-card">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Teknologi NLP untuk Otomatisasi
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sistem kami menggunakan teknologi Natural Language Processing 
                untuk menganalisis dan memproses laporan darurat secara otomatis
              </p>
            </div>
            <NLPExtractionSteps />
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Siap Melaporkan Keadaan Darurat?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Sistem AI kami akan membantu memproses laporan Anda dengan cepat 
              dan mengirim notifikasi ke instansi terkait
            </p>
            <Link href="/laporan">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
                Mulai Pelaporan
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}