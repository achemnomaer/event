export interface Office {
  id: number;
  title: string;
  phone: string;
  email: string;
  mapImage: string;
  mapUrl: string;
}

export const offices: Office[] = [
  {
    id: 1,
    title: "Antgec Portugal",
    phone: "+351 920 509 347",
    email: "portugal@antgec.com",
    mapImage: "/placeholder.svg?height=200&width=400",
    mapUrl:
      "https://maps.google.com/?q=Rua+Antero+de+Quental+15+Lisbon+Portugal",
  },
];
