// Numéro au format international, sans « + » ni espaces.
export const WHATSAPP_NUMBER = "2290154069454";
export const PHONE_DISPLAY = "+229 01 54 06 94 54";

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
