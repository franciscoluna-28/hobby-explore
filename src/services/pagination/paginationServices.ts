type PaginationSetup = {
    from: number;
    to: number;
  };

export function handlePaginationGetFromAndTo(page: number, limit: number): PaginationSetup {
    page = Math.max(page, 1);
    limit = Math.max(limit, 1);
    page = page - 1;
  
    const from = page * limit;
    const to = from + limit - 1;
  
    return { from, to };
  }
  