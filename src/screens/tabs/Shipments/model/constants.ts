import { Shipment } from "@/src/services/api";
import { FilterStatus } from "./type";

export const STATUS_MAP: Record<Shipment["status"], FilterStatus> = {
  pending: "received",
  "in-transit": "putaway",
  delivered: "delivered",
  cancelled: "canceled",
  rejected: "rejected",
  lost: "lost",
  "on-hold": "on-hold",
};

export const STATUS_LABELS: Record<FilterStatus, string> = {
  received: "RECEIVED",
  putaway: "PUTAWAY",
  delivered: "DELIVERED",
  canceled: "CANCELED",
  rejected: "REJECTED",
  lost: "LOST",
  "on-hold": "ON HOLD",
};

export const STATUS_COLORS: Record<string, string> = {
  RECEIVED: "#2196F3",
  PUTAWAY: "#FF9800",
  DELIVERED: "#4CAF50",
  CANCELED: "#9E9E9E",
  REJECTED: "#F44336",
  LOST: "#FF5722",
  "ON HOLD": "#FFC107",
  ERROR: "#F44336",
};
