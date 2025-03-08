"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SdgsHeader() {
  return (
    <div className="relative  text-black overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-repeat opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo SDGs */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Image 
                src="/images/sdgs.png" 
                alt="SDGs Logo" 
                width={80} 
                height={80} 
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-5xl font-bold mb-2 text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Sustainable Development Goals (SDGs)
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Pemetaan 17 Bidang Tujuan Pembangunan Berkelanjutan (SDGs)
          </motion.p>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
}