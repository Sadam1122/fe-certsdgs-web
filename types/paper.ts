export interface Paper {
  Judul: string
  Penulis: string
  Tahun: string | number
  Source: string
  Abstrak: string
  Sdgs?: string[]
}

export interface ApiResponse {
  data: Paper
  // Add any other fields that might be in the API response
  status?: string
  message?: string
}

