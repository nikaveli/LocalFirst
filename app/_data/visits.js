// Single source of truth for the First Impressions gallery + homepage On Location.
// `file` is the raw filename (with spaces / unicode) inside /public/assets/First_Impressions/.
// Use srcFor(visit) to get a properly URL-encoded src.

export const VISITS = [
  { business: 'Sheesh Salon',                       file: 'Sheesh Salon.mp4',                            location: 'Denver, CO',  date: 'May 2026', hue: 200 },
  { business: 'Conrad’s Hot Dog Company',      file: 'Conrad’s Hot Dog Company.mp4',           location: 'Denver, CO',  date: 'May 2026', hue: 22  },
  { business: 'Cafe Chubascos',                     file: 'Cafe Chubascos.mp4',                          location: 'Aurora, CO',  date: 'May 2026', hue: 36  },
  { business: 'Onyx Wax and Skin',                  file: 'Onyx Wax and Skin.mp4',                       location: 'Denver, CO',  date: 'May 2026', hue: 280 },
  { business: 'Mile High Pupusas',                  file: 'Mile High Pupusas.mp4',                       location: 'Denver, CO',  date: 'May 2026', hue: 140 },
  { business: 'Cornejo Jewelers',                   file: 'Cornejo Jewelers.mp4',                        location: 'Aurora, CO',  date: 'May 2026', hue: 48  },

  { business: 'Amazon Fresh',                       file: 'Amazon_Fresh.mp4',                            location: 'Aurora, CO',  date: 'May 2026', hue: 28  },
  { business: 'Blaze Smoke & Vape Shop',            file: 'Blaze smoke & vape shop.mp4',                 location: 'Denver, CO',  date: 'May 2026', hue: 12  },
  { business: 'EZ Auto Clinic',                     file: 'EZ Auto Clinic.mp4',                          location: 'Aurora, CO',  date: 'May 2026', hue: 210 },
  { business: 'Goyos Grill',                        file: 'Goyos Grill.mp4',                             location: 'Denver, CO',  date: 'May 2026', hue: 14  },
  { business: 'Just My Imagination Tattoo Studio',  file: 'Just My Imagination Tattoo Studio_.mp4',      location: 'Denver, CO',  date: 'May 2026', hue: 300 },
  { business: 'Kristy Michelle Aesthetics',         file: 'Kristy Michelle Aesthetics.mp4',              location: 'Denver, CO',  date: 'May 2026', hue: 340 },
  { business: 'La Vecindad De La Chilanga',         file: 'La Vecindad De La Chilanga.mp4',              location: 'Aurora, CO',  date: 'May 2026', hue: 6   },
  { business: 'Tacos Don Jose’s',              file: 'Tacos Don Joses.mp4',                         location: 'Aurora, CO',  date: 'May 2026', hue: 18  },
  { business: 'Tacos y Tortas El Mollo y Rifle',    file: 'Tacos y Tortas El Mollo y Rifle.mp4',         location: 'Aurora, CO',  date: 'May 2026', hue: 4   },
];

export function srcFor(visit) {
  return encodeURI(`/assets/First_Impressions/${visit.file}`);
}

export function posterFor(visit) {
  // Posters live alongside the videos in /posters/, same filename, .jpg.
  const base = visit.file.replace(/\.mp4$/i, '.jpg');
  return encodeURI(`/assets/First_Impressions/posters/${base}`);
}
