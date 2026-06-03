export function filterCourses(courses, filters = {}) {
  if (!Array.isArray(courses)) return [];

  const {
    search,
    category,
    platform,
    difficulty,
    duration,
    careerGoal,
    certificateType,
  } = filters;

  return courses.filter((course) => {
    // --- Free-text search (case-insensitive, partial match) ---
    if (search) {
      const term = search.toLowerCase();
      const haystack = [
        course.title,
        course.platform,
        course.category,
        course.description,
        course.careerGoal,
        ...(Array.isArray(course.skills) ? course.skills : []),
      ]
        .filter(Boolean)
        .map((s) => s.toLowerCase())
        .join(' ');

      if (!haystack.includes(term)) return false;
    }

    // --- Exact-match filters ---
    if (category && course.category !== category) return false;
    if (platform && course.platform !== platform) return false;
    if (difficulty && course.difficulty !== difficulty) return false;
    if (careerGoal && course.careerGoal !== careerGoal) return false;
    if (certificateType && course.certificateType !== certificateType) return false;

    // --- Duration range ---
    if (duration) {
      const hours = course.durationHours;
      if (duration.min != null && hours < duration.min) return false;
      if (duration.max != null && hours > duration.max) return false;
    }

    return true;
  });
}
