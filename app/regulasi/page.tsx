'use client';

import { useState } from 'react';
import RegulationSearch from '@/components/RegulationSearch';
import { FileText, Scale, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { RegulationDoc } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const featuredRegulations = [
  {
    category: 'Undang-Undang',
    title: 'UU No. 24 Tahun 2007',
    subtitle: 'Penanggulangan kedaruratan',
    description: 'Undang-undang dasar tentang sistem penanggulangan kedaruratan nasional',
    url: '#',
  },
  {
    category: 'SOP',
    title: 'SOP Evakuasi Tsunami',
    subtitle: 'Prosedur Standar Operasional',
    description: 'Panduan lengkap evakuasi dan tanggap darurat tsunami',
    url: '#',
  },
  {
    category: 'Prosedur Laporan',
    title: 'Prosedur Pelaporan kedaruratan',
    subtitle: 'Panduan Pelaporan',
    description: 'Tata cara dan format standar pelaporan kejadian darurat',
    url: '#',
  },
];

export default function RegulasiPage() {
  const [selectedDocument, setSelectedDocument] = useState<RegulationDoc | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDocumentSelect = (doc: RegulationDoc) => {
    setSelectedDocument(doc);
    setIsModalOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Undang-Undang': 'bg-blue-100 text-blue-800 border-blue-200',
      'SOP': 'bg-green-100 text-green-800 border-green-200',
      'Prosedur Laporan': 'bg-orange-100 text-orange-800 border-orange-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Regulasi Kedaruratan
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cari dan akses dokumen regulasi, SOP, dan prosedur Kedaruratan 
            dengan teknologi pencarian cerdas berbasis NLP
          </p>
        </div>

        {/* Featured Regulations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-dark mb-6">
            Regulasi Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRegulations.map((regulation, index) => (
              <div key={index} className="disaster-card group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <Badge className={getCategoryColor(regulation.category)}>
                    {regulation.category}
                  </Badge>
                  <Scale className="h-5 w-5 text-gray-400 group-hover:text-secondary transition-colors duration-200" />
                </div>
                
                <h3 className="font-bold text-dark mb-1 group-hover:text-secondary transition-colors duration-200">
                  {regulation.title}
                </h3>
                <p className="text-sm text-secondary font-medium mb-3">
                  {regulation.subtitle}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  {regulation.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Button variant="outline" size="sm" className="text-secondary border-secondary hover:bg-secondary hover:text-white">
                    <FileText className="h-4 w-4 mr-1" />
                    Baca Lengkap
                  </Button>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Search Section */}
        <section className="mb-16">
          <RegulationSearch onDocumentSelect={handleDocumentSelect} />
        </section>

        {/* Categories Overview */}
        <section className="mb-16">
          <div className="disaster-card">
            <h2 className="text-2xl font-bold text-dark mb-6">
              Kategori Regulasi
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-dark mb-2">Undang-Undang</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Peraturan perundang-undangan tingkat nasional tentang Kedaruratan
                </p>
                <div className="text-2xl font-bold text-blue-600">24</div>
                <p className="text-xs text-gray-500">Dokumen tersedia</p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-dark mb-2">SOP</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Standard Operating Procedure untuk tanggap darurat
                </p>
                <div className="text-2xl font-bold text-green-600">156</div>
                <p className="text-xs text-gray-500">Dokumen tersedia</p>
              </div>

              <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-dark mb-2">Prosedur Laporan</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Panduan pelaporan dan dokumentasi kejadian darurat
                </p>
                <div className="text-2xl font-bold text-orange-600">89</div>
                <p className="text-xs text-gray-500">Dokumen tersedia</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Updates */}
        <section>
          <div className="disaster-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-dark">
                Update Regulasi Terbaru
              </h2>
              <Badge variant="outline" className="bg-secondary/10">
                <Calendar className="h-3 w-3 mr-1" />
                Januari 2024
              </Badge>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  title: 'Pembaruan SOP Mitigasi Gempa Bumi',
                  category: 'SOP',
                  date: '15 Jan 2024',
                  summary: 'Revisi prosedur evakuasi untuk bangunan bertingkat tinggi',
                },
                {
                  title: 'Peraturan Baru Pelaporan Digital',
                  category: 'Prosedur Laporan',
                  date: '12 Jan 2024',
                  summary: 'Implementasi sistem pelaporan berbasis aplikasi mobile',
                },
                {
                  title: 'UU Perubahan Dana Penanggulangan darurat',
                  category: 'Undang-Undang',
                  date: '8 Jan 2024',
                  summary: 'Revisi alokasi dana dan mekanisme pencairan untuk tanggap darurat',
                },
              ].map((update, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="font-semibold text-dark">{update.title}</h4>
                      <Badge variant="outline" className={getCategoryColor(update.category)}>
                        {update.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{update.summary}</p>
                    <p className="text-xs text-gray-500">{update.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-secondary hover:text-secondary/80">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Document Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {selectedDocument && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <DialogTitle className="text-xl font-bold text-dark mb-2">
                      {selectedDocument.title}
                    </DialogTitle>
                    <Badge className={getCategoryColor(selectedDocument.category)}>
                      {selectedDocument.category}
                    </Badge>
                  </div>
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                {selectedDocument.excerpt && (
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Ringkasan</h4>
                    <p className="text-gray-700">{selectedDocument.excerpt}</p>
                  </div>
                )}
                
                {selectedDocument.content && (
                  <div>
                    <h4 className="font-semibold text-dark mb-2">Isi Dokumen</h4>
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-line text-gray-700">
                        {selectedDocument.content}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Dipublikasikan: {selectedDocument.createdAt.toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  {selectedDocument.url && (
                    <Button asChild className="disaster-button-primary">
                      <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Buka Dokumen Asli
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}