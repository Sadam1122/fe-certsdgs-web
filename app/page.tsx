"use client"

import { useState } from "react"
import Image from "next/image"
import PaperSubmissionForm from "@/app/components/paper-submission-form"
import SubmittedDataDisplay from "@/app/components/submitted-data-display"
import type { ApiResponse } from "@/types/paper"
import { motion, AnimatePresence } from "framer-motion"
import SdgsHeader from "@/app/components/sdgs-header"

export default function Home() {
  const [submittedData, setSubmittedData] = useState<ApiResponse | null>(null)
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePaperSubmitted = (response: ApiResponse) => {
    setSubmittedData(response)
    setIsPrinting(true)
    console.log("Submitted data:", response)
    
    // Simulate printing animation for 3 seconds
    setTimeout(() => {
      setIsPrinting(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-blue-50 text-slate-800">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-blue-500 to-green-500 opacity-10 z-0"></div>
      <SdgsHeader />

      <div className="container mx-auto px-4 sm:px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-block p-1 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 mb-6">
            <div className="bg-white rounded-lg px-6 py-3">
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                SDGs Research Certification
              </h1>
            </div>
          </div>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Submit your research paper and discover how your work contributes to the 
            United Nations Sustainable Development Goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl transform rotate-1 opacity-20"></div>
            <div className="bg-white rounded-2xl shadow-lg p-8 relative">
              <h2 className="text-2xl font-semibold mb-6 text-slate-700 border-b pb-3 border-slate-100">Submit Your Paper</h2>
              <PaperSubmissionForm onPaperSubmitted={handlePaperSubmitted} />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {isPrinting ? (
                <motion.div 
                  key="printing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center z-20"
                >
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-green-600 mb-4"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-medium text-slate-800 mb-2">Generating SDG Certificate</h3>
                  <p className="text-slate-600">Please wait while we analyze your paper...</p>
                  
                  <div className="mt-6 relative w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              ) : submittedData ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full transform translate-x-16 -translate-y-16 opacity-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-full transform -translate-x-16 translate-y-16 opacity-10"></div>
                  <div className="p-8 relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-semibold text-slate-800">Certificate Generated</h2>
                    </div>
                    <SubmittedDataDisplay submittedData={submittedData} />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="info"
                  className="bg-white rounded-2xl shadow-lg p-8 h-full"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-3 border-slate-100">Your Impact on Global Goals</h3>
                  <p className="text-slate-700 mb-6 leading-relaxed">
                    Fill out the form to generate your SDGs certificate. Your research contribution 
                    to sustainable development goals can help shape a better future for our planet.
                  </p>
                  
                  <div className="relative py-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-sm text-slate-500">Supported SDGs</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <motion.div
                        key={num}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="aspect-square rounded-lg overflow-hidden shadow-md bg-white transition-all"
                      >
                        <div className="relative h-full group">
                          <Image
                            src={getSdgImagePath(num)}
                            alt={`SDG ${num}`}
                            width={120}
                            height={120}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-25 transition-all duration-300"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="shrink-0 text-blue-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-700">
                      Join over 5,000 researchers who have certified their contribution to UN sustainable development goals
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-md p-6 border border-slate-100">
          <h2 className="text-xl font-semibold mb-6 text-slate-800">Why Get SDG Certified?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex">
              <div className="shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Increase Impact</h3>
                <p className="text-sm text-slate-600">Demonstrate how your work contributes to global sustainability challenges</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Verified Credentials</h3>
                <p className="text-sm text-slate-600">Receive an official certificate to showcase with your publication</p>
              </div>
            </div>
            
            <div className="flex">
              <div className="shrink-0 mr-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-slate-800 mb-1">Global Network</h3>
                <p className="text-sm text-slate-600">Connect with other researchers working on similar sustainability goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-slate-200">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Sustainable Development Goals</h3>
                <p className="text-white/80 mb-6">
                  The SDGs are a universal call to action to end poverty, protect the planet, and ensure that by 2030 all people enjoy peace and prosperity.
                </p>
                <div className="flex items-center">
                  <a href="#" className="text-white hover:text-white/80 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-white/80 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <div className="flex items-start mb-4">
                  <div className="shrink-0 mt-1 mr-3 text-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/80">support@sdgcertification.org</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="shrink-0 mt-1 mr-3 text-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/80">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-6 text-center">
              <p className="text-white/60 text-sm">
                © 2025 SDG Certification Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

function getSdgImagePath(num: number): string {
  const images = [
    "/images/SDGS1.png", // SDG 1 - No Poverty
    "/images/SDGS2.png", // SDG 2 - Zero Hunger
    "/images/SDGS3.png", // SDG 3 - Good Health and Well-being
    "/images/SDGS4.png", // SDG 4 - Quality Education
    "/images/SDGS5.png", // SDG 5 - Gender Equality
    "/images/SDGS6.png", // SDG 6 - Clean Water and Sanitation
  ]
  return images[(num - 1) % images.length]
}