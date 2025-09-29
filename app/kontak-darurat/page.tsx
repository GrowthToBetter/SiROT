'use client';

import { useState } from 'react';
import { Phone, Copy, MapPin, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface EmergencyContact {
  id: string;
  name: string;
  organization: string;
  phone: string;
  description: string;
  category: 'national' | 'regional' | 'local';
  availability: '24/7' | 'business' | 'emergency';
  region?: string;
  specialties: string[];
}

const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Pusat Komando Nasional',
    organization: 'BNPB',
    phone: '119',
    description: 'Pusat koordinasi darurat nasional yang melayani 24 jam',
    category: 'national',
    availability: '24/7',
    specialties: ['Koordinasi Nasional', 'Mobilisasi Sumber Daya', 'Informasi kedaruratan'],
  },
  {
    id: '2',
    name: 'Pemadam Kebakaran',
    organization: 'Dinas Pemadam Kebakaran',
    phone: '113',
    description: 'Layanan pemadaman kebakaran dan penyelamatan darurat',
    category: 'regional',
    availability: '24/7',
    specialties: ['Pemadaman Kebakaran', 'Penyelamatan', 'Evakuasi Medis'],
  },
  {
    id: '3',
    name: 'Tim SAR Nasional',
    organization: 'Basarnas',
    phone: '115',
    description: 'Search and Rescue untuk operasi pencarian dan penyelamatan',
    category: 'national',
    availability: '24/7',
    specialties: ['Pencarian Korban', 'Penyelamatan Laut', 'Evakuasi Udara'],
  },
  {
    id: '4',
    name: 'Ambulans Darurat',
    organization: 'PMI / RS Terdekat',
    phone: '118',
    description: 'Layanan ambulans dan pertolongan medis darurat',
    category: 'regional',
    availability: '24/7',
    specialties: ['Pertolongan Medis', 'Transportasi Pasien', 'First Aid'],
  },
  {
    id: '5',
    name: 'BPBD DKI Jakarta',
    organization: 'Badan Penanggulangan kedaruratan Daerah',
    phone: '(021) 2305-0119',
    description: 'Koordinasi kedaruratan tingkat provinsi DKI Jakarta',
    category: 'regional',
    availability: '24/7',
    region: 'DKI Jakarta',
    specialties: ['Koordinasi Regional', 'Manajemen kedaruratan', 'Logistik'],
  },
  {
    id: '6',
    name: 'BPBD Jawa Barat',
    organization: 'Badan Penanggulangan kedaruratan Daerah',
    phone: '(022) 2534-4119',
    description: 'Koordinasi kedaruratan tingkat provinsi Jawa Barat',
    category: 'regional',
    availability: '24/7',
    region: 'Jawa Barat',
    specialties: ['Koordinasi Regional', 'Manajemen kedaruratan', 'Logistik'],
  },
];

const quickActions = [
  { title: 'Laporkan kedaruratan', href: '/laporan', color: 'bg-secondary' },
  { title: 'Pelajari Mitigasi', href: '/edukasi', color: 'bg-blue-600' },
  { title: 'Cari SOP', href: '/regulasi', color: 'bg-green-600' },
];

export default function KontakDaruratPage() {
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const copyToClipboard = (phone: string, name: string) => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedPhone(phone);
      toast.success(`Nomor ${name} disalin!`);
      setTimeout(() => setCopiedPhone(null), 2000);
    });
  };

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case '24/7':
        return <Badge className="bg-success/10 text-success border-success/20">24/7</Badge>;
      case 'business':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Jam Kerja</Badge>;
      case 'emergency':
        return <Badge className="bg-error/10 text-error border-error/20">Darurat Only</Badge>;
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'national':
        return <AlertTriangle className="h-4 w-4 text-error" />;
      case 'regional':
        return <MapPin className="h-4 w-4 text-warning" />;
      case 'local':
        return <Users className="h-4 w-4 text-blue-600" />;
      default:
        return <Phone className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Kontak Darurat
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Akses cepat ke nomor telepon darurat, instansi penanggulangan kedaruratan, 
            dan layanan penyelamatan di seluruh Indonesia
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-error text-white rounded-xl p-6 mb-12 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-xl font-bold">SITUASI DARURAT</span>
          </div>
          <p className="text-lg mb-6">
            Untuk keadaan darurat yang mengancam jiwa, segera hubungi:
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:119" 
              className="bg-white text-error px-8 py-4 rounded-lg font-bold text-2xl hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <Phone className="h-6 w-6" />
              <span>119</span>
            </a>
            <div className="text-white/90">
              <p className="font-medium">Pusat Komando Nasional</p>
              <p className="text-sm">Tersedia 24 jam setiap hari</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark mb-6">
            Aksi Cepat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className={`${action.color} text-white p-6 rounded-lg hover:opacity-90 transition-opacity duration-200 text-center group`}
              >
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <div className="text-white/80 group-hover:text-white transition-colors duration-200">
                  →
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section>
          <h2 className="text-2xl font-bold text-dark mb-6">
            Daftar Kontak Darurat
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="disaster-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(contact.category)}
                    <div>
                      <h3 className="font-bold text-dark">{contact.name}</h3>
                      <p className="text-sm text-gray-600">{contact.organization}</p>
                      {contact.region && (
                        <p className="text-xs text-secondary font-medium">{contact.region}</p>
                      )}
                    </div>
                  </div>
                  {getAvailabilityBadge(contact.availability)}
                </div>

                <p className="text-sm text-gray-700 mb-4">{contact.description}</p>

                {/* Phone Number */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-secondary" />
                    <span className="font-mono text-lg font-semibold text-dark">
                      {contact.phone}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(contact.phone, contact.name)}
                      className={`${
                        copiedPhone === contact.phone
                          ? 'bg-success text-white border-success'
                          : 'text-secondary border-secondary hover:bg-secondary hover:text-white'
                      } transition-colors duration-200`}
                    >
                      {copiedPhone === contact.phone ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button asChild size="sm" className="disaster-button-primary">
                      <a href={`tel:${contact.phone}`}>
                        <Phone className="h-4 w-4 mr-1" />
                        Panggil
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="text-sm font-medium text-dark mb-2">Spesialisasi:</h4>
                  <div className="flex flex-wrap gap-2">
                    {contact.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Notes */}
        <section className="mt-16">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-warning mt-1" />
              <div>
                <h3 className="font-semibold text-dark mb-2">Penting untuk Diingat</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Nomor 119 adalah prioritas utama untuk semua jenis darurat</li>
                  <li>• Berikan informasi lokasi yang jelas dan akurat saat menelepon</li>
                  <li>• Tetap tenang dan ikuti instruksi dari operator darurat</li>
                  <li>• Jangan tutup telepon hingga operator mengizinkan</li>
                  <li>• Simpan nomor-nomor ini di kontak darurat HP Anda</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}