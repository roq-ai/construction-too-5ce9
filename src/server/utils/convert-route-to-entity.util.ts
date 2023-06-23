const mapping: Record<string, string> = {
  companies: 'company',
  outlets: 'outlet',
  rentals: 'rental',
  tools: 'tool',
  'tool-availabilities': 'tool_availability',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
