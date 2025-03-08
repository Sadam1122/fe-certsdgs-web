"use client"

import { useState } from "react"
import type { ApiResponse } from "@/types/paper"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Printer, Download, Book, Users, CalendarClock, Database, FileBarChart2 } from "lucide-react"
import { Separator } from "@/app/components/ui/separator"
import { Badge } from "@/app/components/ui/badge"
import Image from "next/image"
import { generateCertificatePDF } from "@/utils/pdf-generator"
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"

interface SubmittedDataDisplayProps {
  submittedData: ApiResponse
}

// SDG colors mapping for visual distinction
const sdgColors: Record<string, { bg: string, text: string, border: string }> = {
  "SDGS1": { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
  "SDGS2": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
  "SDGS3": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  "SDGS4": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  "SDGS5": { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-200" },
  "SDGS6": { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-200" },
  "SDGS7": { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
  "SDGS8": { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
  "SDGS9": { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  "SDGS10": { bg: "bg-pink-100", text: "text-pink-800", border: "border-pink-200" },
  "SDGS11": { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
  "SDGS12": { bg: "bg-teal-100", text: "text-teal-800", border: "border-teal-200" },
  "SDGS13": { bg: "bg-lime-100", text: "text-lime-800", border: "border-lime-200" },
  "SDGS14": { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-200" },
  "SDGS15": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  "SDGS16": { bg: "bg-violet-100", text: "text-violet-800", border: "border-violet-200" },
  "SDGS17": { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
};

// SDG names mapping for tooltips
const sdgNames: Record<string, string> = {
  "SDGS1": "No Poverty",
  "SDGS2": "Zero Hunger",
  "SDGS3": "Good Health and Well-being",
  "SDGS4": "Quality Education",
  "SDGS5": "Gender Equality",
  "SDGS6": "Clean Water and Sanitation",
  "SDGS7": "Affordable and Clean Energy",
  "SDGS8": "Decent Work and Economic Growth",
  "SDGS9": "Industry, Innovation and Infrastructure",
  "SDGS10": "Reduced Inequality",
  "SDGS11": "Sustainable Cities and Communities",
  "SDGS12": "Responsible Consumption and Production",
  "SDGS13": "Climate Action",
  "SDGS14": "Life Below Water",
  "SDGS15": "Life on Land",
  "SDGS16": "Peace, Justice and Strong Institutions",
  "SDGS17": "Partnerships for the Goals",
};

export default function SubmittedDataDisplay({ submittedData }: SubmittedDataDisplayProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [showFullAbstract, setShowFullAbstract] = useState(false)

  // Check if submittedData and submittedData.data exist
  if (!submittedData || !submittedData.data) {
    return (
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
          <CardTitle className="text-2xl flex items-center gap-2">
            <span className="inline-block w-3 h-8 bg-primary rounded-sm"></span>
            Data Belum Tersedia
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center py-10 space-y-4"
          >
            <FileBarChart2 className="h-16 w-16 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground text-center max-w-md">
              Silakan kirimkan paper untuk melihat hasilnya. Form pengisian data paper tersedia di samping.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  const paper = submittedData.data

  // Function to truncate abstract for initial view
  const truncateAbstract = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  const handlePrintCertificate = async () => {
    setIsGeneratingPDF(true)
    try {
      await generateCertificatePDF(paper)
      toast("Sertifikat Berhasil Dibuat", {
        description: "Sertifikat telah berhasil diunduh ke perangkat Anda.",
      })
    } catch (error) {
      console.error("Error generating certificate:", error)
      toast("Gagal Membuat Sertifikat", {
        description: "Terjadi kesalahan saat membuat sertifikat. Silakan coba lagi.",
        style: { backgroundColor: "red", color: "white" }, // Sesuai kebutuhan
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const toggleAbstract = () => {
    setShowFullAbstract(!showFullAbstract)
  }

  return (
    <Card className="border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="inline-block w-3 h-8 bg-primary rounded-sm"></span>
          Data Paper
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary/5 p-4 rounded-lg border border-primary/10"
          >
            <h3 className="font-semibold text-lg flex items-center gap-2 text-primary/80 mb-2">
              <Book className="h-5 w-5 text-primary" />
              Judul Paper
            </h3>
            <p className="mt-1 text-lg font-medium">{paper.Judul}</p>
          </motion.div>

          <Separator className="bg-primary/10" />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Penulis
            </h3>
            <p className="mt-1 text-base">{paper.Penulis}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Abstrak
            </h3>
            <div className="mt-1 text-sm text-muted-foreground bg-slate-50 p-3 rounded-md border border-slate-100">
              <AnimatePresence mode="wait">
                <motion.p
                  key={showFullAbstract ? "full" : "truncated"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {showFullAbstract ? paper.Abstrak : truncateAbstract(paper.Abstrak)}
                </motion.p>
              </AnimatePresence>
              
              {paper.Abstrak.length > 200 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleAbstract} 
                  className="mt-2 text-primary hover:text-primary/80"
                >
                  {showFullAbstract ? "Lihat Lebih Sedikit" : "Lihat Selengkapnya"}
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-primary" />
                Tahun
              </h3>
              <p className="mt-1 font-medium text-lg">{paper.Tahun}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-md border border-slate-100">
              <h3 className="font-semibold text-base flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                Source
              </h3>
              <p className="mt-1 font-medium text-lg">{paper.Source}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg border border-primary/10"
          >
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FileBarChart2 className="h-5 w-5 text-primary" />
              Kontribusi SDGs
            </h3>
            <div className="flex flex-wrap gap-4">
              {paper.Sdgs && paper.Sdgs.length > 0 ? (
                <TooltipProvider>
                  {paper.Sdgs.map((sdg, index) => {
                    const colors = sdgColors[sdg] || { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" };
                    return (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex flex-col items-center gap-2"
                      >
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform hover:scale-110">
                              <div className={`w-full h-full rounded-full overflow-hidden border-2 ${colors.border} hover:shadow-md transition-all duration-300`}>
                                <Image
                                  src={`/images/${sdg}.png`}
                                  alt={`${sdg}`}
                                  width={80}
                                  height={80}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black shadow-lg p-2">
                            <p>{sdgNames[sdg] || sdg}</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Badge variant="outline" className={`${colors.bg} ${colors.text} ${colors.border} font-medium`}>
                          {sdg}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </TooltipProvider>
              ) : (
                <div className="w-full text-center py-4">
                  <p className="text-muted-foreground">Belum ada SDGs terdeteksi</p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handlePrintCertificate}
              className="w-full h-12 text-lg font-medium bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <Printer className="mr-2 h-5 w-5 animate-pulse" />
                  Membuat Sertifikat...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Unduh Sertifikat
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}