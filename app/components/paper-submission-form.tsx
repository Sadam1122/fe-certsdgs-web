"use client"

import type React from "react"
import { useState } from "react"
import type { ApiResponse } from "@/types/paper"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Textarea } from "@/app/components/ui/textarea"
import { 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  BookText, 
  Users, 
  Calendar, 
  Database, 
  Send,
  FileText 
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/app/components/ui/select"

interface PaperSubmissionFormProps {
  onPaperSubmitted: (response: ApiResponse) => void
}

// Generate years for dropdown (last 30 years)
const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 30; i++) {
    years.push(currentYear - i);
  }
  return years;
};

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
  const [errorType, setErrorType] = useState<"general" | "duplicate" | null>(null)
  
  const yearOptions = generateYearOptions();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing again
    if (error) {
      setError(null)
      setErrorType(null)
    }
  }

  const handleYearChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      Tahun: value,
    }))
    
    // Clear error when user makes a selection
    if (error) {
      setError(null)
      setErrorType(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setErrorType(null)
    setSuccess(false)


    
      try {
        // Try to fetch from the API
        const apiResponse = await fetch("http://127.0.0.1:3900/model/paper", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
    
        const responseData = await apiResponse.json()
        console.log("API Response:", responseData)
        
        if (!apiResponse.ok) {
          if (responseData.error && responseData.error.includes("already exists")) {
            setErrorType("duplicate")
            throw new Error("Paper dengan judul ini sudah ada dalam database")
          } else {
            setErrorType("general")
            throw new Error(`Gagal mengirim data: ${responseData.error || "Terjadi kesalahan"}`)
          }
        }
    
        // Periksa format aktual API yang memiliki data dan message
        if (responseData.data && responseData.message === "Data added successfully") {
          setSuccess(true)
          
          // Panggil callback dengan data yang sudah sesuai format
          onPaperSubmitted(responseData);
          
          // Optional: Reset form
          setFormData({
            Judul: "",
            Penulis: "",
            Tahun: "",
            Source: "",
            Abstrak: "",
          })
        } else {
          // Format respons tidak sesuai yang diharapkan
          console.error("Unexpected API response format:", responseData)
          setErrorType("general")
          throw new Error("Respons API tidak sesuai format yang diharapkan")
        }
      } catch (error: unknown) { 
        console.error("Error submitting paper:", error)
        // Pastikan error adalah instance dari Error sebelum mengakses message
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("Gagal mengirim paper. Silakan coba lagi.")
        }
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <Card className="border-primary/20 shadow-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-primary/10">
        <CardTitle className="text-2xl flex items-center gap-2">
          <span className="inline-block w-3 h-8 bg-primary rounded-sm"></span>
          Submit Paper Data
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {errorType === "duplicate" && (
          <Alert variant="destructive" className="mb-6 bg-amber-50 border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <AlertTitle className="text-amber-800">Duplikat Terdeteksi</AlertTitle>
            <AlertDescription className="text-amber-700">{error}</AlertDescription>
          </Alert>
        )}

        {errorType === "general" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Berhasil</AlertTitle>
            <AlertDescription className="text-green-700">
              Paper berhasil dikirim dan diproses oleh sistem!
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="Judul" className="text-base flex items-center gap-2">
              <BookText className="h-4 w-4 text-primary" />
              Judul Paper
            </Label>
            <Input
              id="Judul"
              name="Judul"
              value={formData.Judul}
              onChange={handleChange}
              required
              placeholder="Masukkan judul paper penelitian"
              className="border-primary/20 focus:border-primary focus:ring-primary/30 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Penulis" className="text-base flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Penulis
            </Label>
            <Input
              id="Penulis"
              name="Penulis"
              value={formData.Penulis}
              onChange={handleChange}
              required
              placeholder="Nama penulis (pisahkan dengan koma jika lebih dari satu)"
              className="border-primary/20 focus:border-primary focus:ring-primary/30 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Tahun" className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Tahun Publikasi
            </Label>
            <Select
              onValueChange={handleYearChange}
              value={formData.Tahun}
            >
              <SelectTrigger 
                className="border-primary/20 focus:border-primary focus:ring-primary/30 transition-colors"
              >
                <SelectValue placeholder="Pilih tahun publikasi" />
                </SelectTrigger>
                <SelectContent 
                  className="max-h-72 bg-gradient-to-b from-gray-100 to-gray-300 text-black border border-gray-400 shadow-xl rounded-lg"
                  position="popper"
                >
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="Source" className="text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Source
            </Label>
            <Input
              id="Source"
              name="Source"
              value={formData.Source}
              onChange={handleChange}
              required
              placeholder="Sumber publikasi (jurnal, konferensi, dll)"
              className="border-primary/20 focus:border-primary focus:ring-primary/30 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Abstrak" className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Abstrak
            </Label>
            <Textarea
              id="Abstrak"
              name="Abstrak"
              value={formData.Abstrak}
              onChange={handleChange}
              rows={5}
              required
              placeholder="Masukkan abstrak paper penelitian"
              className="border-primary/20 focus:border-primary focus:ring-primary/30 transition-colors"
            />
          </div>

          <div className="pt-4">
          <Button 
  type="submit" 
  className="w-full h-12 text-base font-medium bg-green-500 hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <Loader2 className="h-5 w-5 animate-spin" />
      Memproses Data...
    </>
  ) : (
    <>
      <Send className="h-5 w-5" />
      Kirim Paper
    </>
  )}
</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}