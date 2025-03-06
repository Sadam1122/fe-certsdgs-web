"use client"

import type React from "react"

import { useState } from "react"
import type { ApiResponse } from "@/types/paper"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"

interface PaperSubmissionFormProps {
  onPaperSubmitted: (response: ApiResponse) => void
}

// Mock data for when the API is not available
const MOCK_RESPONSE: ApiResponse = {
  data: {
    Judul:
      "Adaptasi Interaksi Lintas Budaya (Studi Kasus Pada Mahasiswa Indonesia Yang Menempuh Pendidikan Tinggi Di Prancis)",
    Penulis: "Bagaskara Ade Prasetyo, Arie Prasetio",
    Tahun: "2018",
    Abstrak:
      "seseorang yang menjalani pendidikan tinggi diluar negara asalnya kemungkinan besar akan menghadapi kebudayaan yang berbeda beragam ataupun bisa saja bertolak belakang dari kebudayaan negara asalnya penelitian ini bertujuan untuk mengetahui bagaimana strategi adaptasi interaksi strategi adaptasi budaya dan strategi yang dilakukan dalam menghadapi permasalahan saat berinteraksi maupun saat sedang beradaptasi dengan perbedaan budaya pada mahasiswa asal indonesia yang menempuh pendidikan tinggi di prancis penelitian ini menggunakan metode penelitian kualitatif dan pendekatan studi kasus yang berdasarkan paradigma konstruktivisme teknik pengumpulan data yang digunakan adalah wawancara mendalam observasi dan studi pustaka hasil penelitian ini mengungkapkan bahwa strategi adaptasi budaya strategi adaptasi interaksi dan strategi mengatasi permasalahan yang ada dalam adaptasi dan interaksi lintas budaya pada mahasiswa indonesia yang menempuh pendidikan tinggi di prancis beragam dan berbeda satu sama lain dan mahasiswa asal indonesia di prancis dapat menghadapi berbagai permasalahan dengan strategi mereka masing masing untuk tetap bertahan dalam menjalani kehidupan dan pendidikan tingginya di prancis",
    Source: "Oplib",
    Sdgs: ["SDGS3", "SDGS4"],
  },
}

export default function PaperSubmissionForm({ onPaperSubmitted }: PaperSubmissionFormProps) {
  const [formData, setFormData] = useState({
    Judul: "",
    Penulis: "",
    Tahun: "",
    Source: "",
    Abstrak: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing again
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Try to fetch from the API
      let response: ApiResponse

      try {
        const apiResponse = await fetch("http://localhost:3900/model/paper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!apiResponse.ok) {
          throw new Error(`API responded with status: ${apiResponse.status}`)
        }

        response = await apiResponse.json()
        console.log("API response:", response) // Log the actual API response
      } catch (fetchError) {
        console.warn("API fetch failed, using mock data:", fetchError)

        // Use mock data if the API is not available
        response = MOCK_RESPONSE
        console.log("Using mock data:", response) // Log the mock data
      }

      setSuccess(true)
      onPaperSubmitted(response)
    } catch (error) {
      console.error("Error submitting paper:", error)
      setError("Failed to submit paper. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="inline-block w-3 h-8 bg-primary rounded-sm"></span>
          Submit Paper Data
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">Your paper has been successfully submitted!</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="Judul" className="text-base">
              Judul
            </Label>
            <motion.div whileFocus={{ scale: 1.02 }} className="transition-all duration-200">
              <Input
                id="Judul"
                name="Judul"
                value={formData.Judul}
                onChange={handleChange}
                required
                className="border-primary/20 focus:border-primary transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="Penulis" className="text-base">
              Penulis
            </Label>
            <motion.div whileFocus={{ scale: 1.02 }} className="transition-all duration-200">
              <Input
                id="Penulis"
                name="Penulis"
                value={formData.Penulis}
                onChange={handleChange}
                required
                className="border-primary/20 focus:border-primary transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="Tahun" className="text-base">
              Tahun
            </Label>
            <motion.div whileFocus={{ scale: 1.02 }} className="transition-all duration-200">
              <Input
                id="Tahun"
                name="Tahun"
                value={formData.Tahun}
                onChange={handleChange}
                required
                className="border-primary/20 focus:border-primary transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="Source" className="text-base">
              Source
            </Label>
            <motion.div whileFocus={{ scale: 1.02 }} className="transition-all duration-200">
              <Input
                id="Source"
                name="Source"
                value={formData.Source}
                onChange={handleChange}
                required
                className="border-primary/20 focus:border-primary transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Label htmlFor="Abstrak" className="text-base">
              Abstrak
            </Label>
            <motion.div whileFocus={{ scale: 1.02 }} className="transition-all duration-200">
              <Textarea
                id="Abstrak"
                name="Abstrak"
                value={formData.Abstrak}
                onChange={handleChange}
                rows={5}
                required
                className="border-primary/20 focus:border-primary transition-all duration-300 resize-none"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button type="submit" className="w-full h-12 text-lg font-medium" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

