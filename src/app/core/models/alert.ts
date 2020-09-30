export interface Alerts {
  [component: string]: Alert;
}

export interface Alert {
  info?: string[];
  warn?: string[];
}
