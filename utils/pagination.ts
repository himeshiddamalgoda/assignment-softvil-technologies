export function paginate<T>(items: T[], page: number, perPage: number): T[] {
    return items.slice((page - 1) * perPage, page * perPage);
  }
  
  export function getTotalPages(totalItems: number, perPage: number): number {
    return Math.ceil(totalItems / perPage);
  }
  