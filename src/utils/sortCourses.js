const DIFFICULTY_ORDER = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

export function sortCourses(courses, sortBy) {
  if (!Array.isArray(courses)) return [];

  const sorted = [...courses];

  switch (sortBy) {
    case 'highest-rated':
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;

    case 'shortest-duration':
      sorted.sort((a, b) => (a.durationHours ?? 0) - (b.durationHours ?? 0));
      break;

    case 'beginner-friendly':
      sorted.sort((a, b) => {
        const orderA = DIFFICULTY_ORDER[a.difficulty] ?? 999;
        const orderB = DIFFICULTY_ORDER[b.difficulty] ?? 999;
        return orderA - orderB;
      });
      break;

    case 'platform-az':
      sorted.sort((a, b) =>
        (a.platform ?? '').localeCompare(b.platform ?? '')
      );
      break;

    default:
      // Return a shallow copy in original order
      break;
  }

  return sorted;
}
