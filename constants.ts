export const CONTACT_INFO = {
  phone: '(51) 99689-7870',
  whatsappNumber: '5551996897870', // For wa.me link
  email: 'gauchaindenizacoes@gmail.com',
  address: 'Av. Otávio Rocha, 115 - Sala 1505, Centro Histórico, Porto Alegre - RS',
  instagram: 'https://instagram.com/gauchaindenizacoes',
  facebook: 'https://facebook.com/thmseguros',
  youtube: 'https://youtube.com',
};

export const generateWhatsAppLink = (text: string) => {
  return `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
};
