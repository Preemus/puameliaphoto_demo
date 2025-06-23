export interface PricingOption { //For type safe
    name: string;
    href: string;
  }
  
  export const pricingOptions: PricingOption[] = [
    { name: "Portrait", href: "/pricing/portrait" },
    { name: "Ocean", href: "/pricing/ocean" },
    { name: "Drone", href: "/pricing/drone" },
    { name: "Product", href: "/pricing/product" },
    { name: "Event", href: "/pricing/event" },
    { name: "Wedding", href: "/pricing/wedding" },
    { name: "Canyoning", href: "/pricing/canyoning" },
    { name: "Photo Tour", href: "/pricing/tour" }
  ];

// Not using interface (less type safe)
//   export const pricingOptions = [
//     { name: "Portrait", href: "/pricing/portrait" },
//     { name: "Canyoning", href: "/pricing/canyoning" },
//     { name: "Wedding", href: "/pricing/wedding" },
//     { name: "Ocean", href: "/pricing/ocean" },
//     { name: "Event", href: "/pricing/event" },
//     { name: "Product", href: "/pricing/product" },
//     { name: "Drone", href: "/pricing/drone" },
//     { name: "Photo Tours", href: "/pricing/photo-tours" }
//   ];