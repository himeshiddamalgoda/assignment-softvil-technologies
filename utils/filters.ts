import { Event } from "@/types";

export function getUniqueHosts(events: Event[]) {
  const uniqueHostIds = new Set(events.map((e) => e.hostId));
  return Array.from(uniqueHostIds).map((hostId) => {
    const event = events.find((e) => e.hostId === hostId);
    return { id: hostId, name: event?.hostName || "Unknown" };
  });
}

export function filterEvents(events: Event[], filters: {
  searchTerm: string;
  hostFilter: string;
  startDateFilter: Date | null;
}) {
  const { searchTerm, hostFilter, startDateFilter } = filters;
  return events.filter((event) => {
    if (
      searchTerm &&
      !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !event.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) return false;

    if (hostFilter && event.hostId !== hostFilter) return false;

    if (startDateFilter && new Date(event.startDate) < startDateFilter) return false;

    return true;
  });
}
