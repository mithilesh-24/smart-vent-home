export interface TimePoint {
  time: string;
  aqi: number;
  temperature: number;
  humidity: number;
}

export const timeSeries: TimePoint[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0") + ":00";
  return {
    time: hour,
    aqi: Math.round(35 + Math.sin(i / 3) * 20 + Math.random() * 10),
    temperature: Math.round((21 + Math.sin(i / 4) * 3 + Math.random()) * 10) / 10,
    humidity: Math.round(45 + Math.cos(i / 5) * 10 + Math.random() * 5),
  };
});

export interface Device {
  id: string;
  name: string;
  location: string;
  type: string;
  status: "online" | "offline";
  lastSeen: string;
}

export const devices: Device[] = [
  { id: "d1", name: "SmartVent Fan X1", location: "Living Room", type: "Fan", status: "online", lastSeen: "1 min ago" },
  { id: "d2", name: "MQ135 Sensor", location: "Kitchen", type: "AQ Sensor", status: "online", lastSeen: "30 sec ago" },
  { id: "d3", name: "DHT22", location: "Bedroom", type: "Temp/Humidity", status: "online", lastSeen: "2 min ago" },
  { id: "d4", name: "Inline Duct Fan", location: "Bathroom", type: "Fan", status: "offline", lastSeen: "3 hours ago" },
  { id: "d5", name: "CO2 NDIR", location: "Office", type: "CO2 Sensor", status: "online", lastSeen: "1 min ago" },
  { id: "d6", name: "Smart Vent Damper", location: "Hallway", type: "Damper", status: "online", lastSeen: "5 min ago" },
];

export interface Order {
  id: string;
  date: string;
  items: number;
  total: number;
  status: "Delivered" | "Shipped" | "Processing";
}

export const orders: Order[] = [
  { id: "ORD-1042", date: "2025-04-15", items: 2, total: 158, status: "Delivered" },
  { id: "ORD-1041", date: "2025-04-08", items: 1, total: 199, status: "Delivered" },
  { id: "ORD-1037", date: "2025-03-28", items: 4, total: 67, status: "Delivered" },
  { id: "ORD-1051", date: "2025-04-19", items: 3, total: 281, status: "Shipped" },
  { id: "ORD-1053", date: "2025-04-20", items: 1, total: 149, status: "Processing" },
];

export const roomAqi = [
  { room: "Living", aqi: 42 },
  { room: "Kitchen", aqi: 68 },
  { room: "Bedroom", aqi: 35 },
  { room: "Bathroom", aqi: 51 },
  { room: "Office", aqi: 47 },
];
