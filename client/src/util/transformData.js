function formatSeasonId(seasonId) {
  // Convert the seasonId to a string, if it isn't already
  const seasonStr = seasonId.toString();
  
  // Extract the start year and the end year based on the string positions
  const startYear = seasonStr.substring(0, 4);
  const endYear = seasonStr.substring(4);

  // Combine the years with a dash
  return `${startYear}-${endYear}`;
}

export { formatSeasonId };