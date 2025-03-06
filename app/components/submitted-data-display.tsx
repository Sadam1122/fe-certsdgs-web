"use client"

import { useState } from "react"
import type { ApiResponse } from "@/types/paper"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Printer, Download } from "lucide-react"
import { Separator } from "@/app/components/ui/separator"
import Image from "next/image"
import { generateCertificatePDF } from "@/utils/pdf-generator"

interface SubmittedDataDisplayProps {
  submittedData: ApiResponse
}

export default function SubmittedDataDisplay({ submittedData }: SubmittedDataDisplayProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  // Check if submittedData and submittedData.data exist
  if (!submittedData || !submittedData.data) {
    return (
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
          <CardTitle className="text-2xl flex items-center gap-2">
            <span className="inline-block w-3 h-8 bg-primary rounded-sm"></span>
            No Data Available
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Please submit a paper to see the results.</p>
        </CardContent>
      </Card>
    )
  }

  const paper = submittedData.data

  const handlePrintCertificate = async () => {
    setIsGeneratingPDF(true)
    try {
      await generateCertificatePDF(paper)
    } catch (error) {
      console.error("Error generating certificate:", error)
      alert("Failed to generate certificate. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <Card className="border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="inline-block w-3 h-8 bg-primary rounded-sm"></span>
          Submitted Data
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-5">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Judul:
            </h3>
            <p className="mt-1 text-lg font-medium">{paper.Judul}</p>
          </motion.div>

          <Separator />

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="font-semibold text-lg">Penulis:</h3>
            <p className="mt-1">{paper.Penulis}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="font-semibold text-lg">Abstrak:</h3>
            <p className="mt-1 text-sm text-muted-foreground">{paper.Abstrak}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <h3 className="font-semibold text-lg">Tahun:</h3>
              <p className="mt-1">{paper.Tahun}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Source:</h3>
              <p className="mt-1">{paper.Source}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h3 className="font-semibold text-lg mb-2">SDGs:</h3>
            <div className="flex flex-wrap gap-4">
              {paper.Sdgs && paper.Sdgs.length > 0 ? (
                paper.Sdgs.map((sdg, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="relative w-16 h-16 md:w-20 md:h-20"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-primary/20">
                      <Image
                        src={`/images/${sdg}.png`}
                        alt={`${sdg}`}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-muted-foreground">No SDGs available</p>
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
              className="w-full h-12 text-lg font-medium bg-green-600 hover:bg-green-700"
              disabled={isGeneratingPDF}
            >
              {isGeneratingPDF ? (
                <>
                  <Printer className="mr-2 h-5 w-5 animate-pulse" />
                  Generating Certificate...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Print Certificate
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}

