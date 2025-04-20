'use client';

import { useEffect } from 'react';

/**
 * Komponen ini menangani kelas body yang mungkin ditambahkan oleh ekstensi browser
 * untuk mencegah error hydration.
 */
export function BodyClassHandler() {
  useEffect(() => {
    // Kode ini hanya berjalan di client
    // Kita tidak perlu melakukan apa-apa karena suppressHydrationWarning
    // sudah ditambahkan pada elemen body
    
    // Jika perlu, kita bisa menambahkan logika tambahan di sini
    // untuk menangani kelas body yang ditambahkan oleh ekstensi
  }, []);
  
  return null;
}
