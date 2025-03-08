import { jsPDF } from "jspdf"
import type { Paper } from "@/types/paper"
import { addFonts } from "./pdf-fonts"

export const generateCertificatePDF = async (paper: Paper) => {
  // Buat dokumen PDF baru dengan ukuran A3 landscape
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a3", // Diubah dari "a4" menjadi "a3"
  })

  // Lebar dan tinggi halaman (dalam mm) berdasarkan format di atas
  const pageWidth = doc.internal.pageSize.getWidth()  // seharusnya 420 mm
  const pageHeight = doc.internal.pageSize.getHeight() // seharusnya 297 mm

  // Titik tengah halaman secara horizontal
  const centerX = pageWidth / 2

  // Tambah custom fonts (sesuaikan jika perlu)
  addFonts(doc)

  // Set background warna terang
  doc.setFillColor(248, 250, 252)
  doc.rect(0, 0, pageWidth, pageHeight, "F")

  // Warna border diambil dari SDGs
  const borderColors = [
    [229, 36, 59],  // SDG 1
    [221, 166, 58], // SDG 2
    [76, 159, 56],  // SDG 3
    [197, 25, 45],  // SDG 4
    [255, 58, 33],  // SDG 5
    [38, 189, 226], // SDG 6
  ]

  // Buat border warna-warni
  const borderWidth = 5
  const segmentWidth = pageWidth / borderColors.length
  for (let i = 0; i < borderColors.length; i++) {
    const color = borderColors[i]
    doc.setFillColor(color[0], color[1], color[2])

    // Top border
    doc.rect(i * segmentWidth, 0, segmentWidth, borderWidth, "F")

    // Bottom border
    doc.rect(i * segmentWidth, pageHeight - borderWidth, segmentWidth, borderWidth, "F")

    // Left border
    const leftIndex = (i + 2) % borderColors.length
    const leftColor = borderColors[leftIndex]
    const leftSegmentHeight = pageHeight / borderColors.length
    doc.setFillColor(leftColor[0], leftColor[1], leftColor[2])
    doc.rect(0, i * leftSegmentHeight, borderWidth, leftSegmentHeight, "F")

    // Right border
    const rightIndex = (i + 4) % borderColors.length
    const rightColor = borderColors[rightIndex]
    doc.setFillColor(rightColor[0], rightColor[1], rightColor[2])
    doc.rect(pageWidth - borderWidth, i * leftSegmentHeight, borderWidth, leftSegmentHeight, "F")
  }

  // Border bagian dalam
  doc.setDrawColor(0, 102, 204, 0.5)
  doc.setLineWidth(0.5)
  // Sisakan margin 20 mm di setiap sisi (boleh diatur sesuai selera)
  doc.roundedRect(20, 20, pageWidth - 40, pageHeight - 40, 3, 3, "S")
  try {
    // Muat gambar TELU (kiri atas)
    const teluImg = await loadImage("/images/telu.png");
  
    // Ambil ukuran asli gambar TELU
    const originalTeluWidth = teluImg.width;
    const originalTeluHeight = teluImg.height;
  
    // Tentukan lebar tampilan, hitung tinggi agar proporsional
    const teluMaxWidth = 50; // Lebar maksimum yang diizinkan
    const teluScale = teluMaxWidth / originalTeluWidth;
    const teluDisplayWidth = originalTeluWidth * teluScale;
    const teluDisplayHeight = originalTeluHeight * teluScale;
  
    // Tambah gambar TELU di kiri atas
    doc.addImage(teluImg, "PNG", 30, 20, teluDisplayWidth, teluDisplayHeight);
  
    // Muat gambar SDGs (kanan atas)
    const sdgsImg = await loadImage("/images/sdgs.png");
  
    // Ambil ukuran asli gambar SDGs
    const originalSdgsWidth = sdgsImg.width;
    const originalSdgsHeight = sdgsImg.height;
  
    // Tentukan lebar tampilan, hitung tinggi agar proporsional
    const sdgsMaxWidth = 50;
    const sdgsScale = sdgsMaxWidth / originalSdgsWidth;
    const sdgsDisplayWidth = originalSdgsWidth * sdgsScale;
    const sdgsDisplayHeight = originalSdgsHeight * sdgsScale;
  
    // Tambah gambar SDGs di kanan atas, sejajar dengan gambar TELU
    doc.addImage(sdgsImg, "PNG", pageWidth - sdgsDisplayWidth - 30, 22, sdgsDisplayWidth, sdgsDisplayHeight);
  } catch (error) {
    console.error("Error loading logos:", error);
  }
  
  // Judul sertifikat
  doc.setTextColor(0, 102, 204)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(36) // perbesar font untuk A3
  doc.text("CERTIFICATE OF ACHIEVEMENT", centerX, 50, { align: "center" })

  // Garis dekoratif di bawah judul
  doc.setDrawColor(0, 102, 204)
  doc.setLineWidth(1)
  // Panjang garis kira-kira 200 mm, silakan sesuaikan
  doc.line(centerX - 100, 55, centerX + 100, 55)

  // Teks pengantar
  doc.setTextColor(60, 60, 60)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(16)
  doc.text("This is to certify that", centerX, 70, { align: "center" })

  // Nama Penulis
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(28)
  doc.text(paper.Penulis, centerX, 85, { align: "center" })

  // Garis di bawah nama
  doc.setDrawColor(0, 102, 204, 0.5)
  doc.setLineWidth(0.5)
  const nameWidth = doc.getTextWidth(paper.Penulis)
  doc.line(centerX - nameWidth / 2 - 10, 88, centerX + nameWidth / 2 + 10, 88)

  // Teks keterangan kontribusi
  doc.setTextColor(60, 60, 60)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(14)
  doc.text(
    "has contributed to sustainable development through the research paper titled:",
    centerX,
    100,
    { align: "center" }
  )

  // Judul paper
  doc.setTextColor(0, 0, 0)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  const titleLines = doc.splitTextToSize(paper.Judul, 280) // lebar teks diperbesar
  doc.text(titleLines, centerX, 110, { align: "center" })

  // Posisi Y setelah judul
  let yPosition = 110 + titleLines.length * 8

  // SDGs Info
  doc.setTextColor(60, 60, 60)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(14)
  doc.text(
    "This research contributes to the following Sustainable Development Goals:",
    centerX,
    yPosition + 10,
    { align: "center" }
  )

  yPosition += 20

  // Tambah ikon SDGs
  if (paper.Sdgs && paper.Sdgs.length > 0) {
    try {
      const sdgIconSize = 30 // perbesar ikon SDGs
      const totalWidth = paper.Sdgs.length * (sdgIconSize + 5)
      const startX = centerX - totalWidth / 2

      for (let i = 0; i < paper.Sdgs.length; i++) {
        const sdg = paper.Sdgs[i]
        const sdgImg = await loadImage(`/images/${sdg}.png`)
        const x = startX + i * (sdgIconSize + 5)
        doc.addImage(sdgImg, "PNG", x, yPosition, sdgIconSize, sdgIconSize)
      }
    } catch (error) {
      console.error("Error loading SDG icons:", error)
      doc.text("SDGs: " + paper.Sdgs.join(", "), centerX, yPosition + 15, { align: "center" })
    }
  } else {
    doc.text("No specific SDGs identified for this research.", centerX, yPosition + 15, { align: "center" })
  }

  // Tambah tanggal
  yPosition += 50
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.setFontSize(12)
  doc.setTextColor(60, 60, 60)
  doc.text(`Issued on: ${formattedDate}`, centerX, yPosition, { align: "center" })

  // Ruang untuk tanda tangan
  yPosition += 20
  try {
    // Gambar tanda tangan
    const signatureImg = await loadImage("/images/ttd.png")
    // Letakkan di tengah, lebar 50 mm, tinggi 25 mm
    doc.addImage(signatureImg, "PNG", centerX - 25, yPosition, 50, 25)
  } catch (error) {
    console.error("Error loading signature:", error)
    // Jika gagal, buat garis
    doc.line(centerX - 25, yPosition + 10, centerX + 25, yPosition + 10)
  }

  // Nama & jabatan penandatangan
  yPosition += 35
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(0, 0, 0)
  doc.text("Dr. Runik Machfiroh.", centerX, yPosition, { align: "center" })

  yPosition += 5
  doc.setFontSize(12)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(60, 60, 60)
  doc.text("Ketua SDGs Center Telkom University", centerX, yPosition, { align: "center" })

  // Nomor sertifikat & info verifikasi di bagian bawah
  const certNumber = generateCertificateNumber()
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Certificate No: ${certNumber}`, centerX, pageHeight - 15, { align: "center" })
  doc.text("This certificate can be verified at cert.sdgstelkomuniversity.my.id", centerX, pageHeight - 10, {
    align: "center",
  })

  // Simpan PDF
  doc.save(`${paper.Penulis}_SDGs_Certificate.pdf`)
}

// Helper untuk load image
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
    img.crossOrigin = "Anonymous"
  })
}

// Generate nomor sertifikat acak
const generateCertificateNumber = (): string => {
  const timestamp = new Date().getTime().toString().slice(-8)
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")
  return `SDG-${timestamp}-${random}`
}
