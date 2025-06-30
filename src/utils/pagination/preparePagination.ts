export function getPaginationStages(page: number, limit: number, allowPagination: boolean) {
  if (isNaN(limit)) limit = 1000;
  if (isNaN(page)) page = 1;
  const skip = limit * (page - 1);

  return {
    allowLimit: {
      ...(allowPagination && { $limit: limit }),
    },
    allowSkip: {
      ...(allowPagination && { $skip: skip }),
    },
    page,
    limit,
    skip,
  };
}
