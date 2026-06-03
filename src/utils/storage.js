const SAVED_COURSES_KEY = 'freecertify_saved_courses';
const COMPARE_COURSES_KEY = 'freecertify_compare_courses';
const RECENTLY_VIEWED_KEY = 'freecertify_recently_viewed';
const MAX_COMPARE = 3;
const MAX_RECENTLY_VIEWED = 10;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getFromStorage(key) {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setToStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable – fail silently
  }
}

function removeFromStorage(key) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch {
    // Fail silently
  }
}

// ---------------------------------------------------------------------------
// Saved Courses
// ---------------------------------------------------------------------------

export function getSavedCourses() {
  return getFromStorage(SAVED_COURSES_KEY);
}

export function saveCourse(courseId) {
  const saved = getSavedCourses();
  if (!saved.includes(courseId)) {
    saved.push(courseId);
    setToStorage(SAVED_COURSES_KEY, saved);
  }
  return getSavedCourses();
}

export function removeSavedCourse(courseId) {
  const saved = getSavedCourses().filter((id) => id !== courseId);
  setToStorage(SAVED_COURSES_KEY, saved);
  return saved;
}

export function isCourseSaved(courseId) {
  return getSavedCourses().includes(courseId);
}

export function clearSavedCourses() {
  removeFromStorage(SAVED_COURSES_KEY);
}

// ---------------------------------------------------------------------------
// Compare Courses
// ---------------------------------------------------------------------------

export function getCompareCourses() {
  return getFromStorage(COMPARE_COURSES_KEY);
}

export function addCompareCourse(courseId) {
  const courses = getCompareCourses();

  if (courses.includes(courseId)) {
    return { success: false, courses, message: 'Course is already in the compare list.' };
  }

  if (courses.length >= MAX_COMPARE) {
    return {
      success: false,
      courses,
      message: `You can compare up to ${MAX_COMPARE} courses at a time. Remove one first.`,
    };
  }

  courses.push(courseId);
  setToStorage(COMPARE_COURSES_KEY, courses);

  return { success: true, courses: getCompareCourses(), message: 'Course added to compare.' };
}

export function removeCompareCourse(courseId) {
  const courses = getCompareCourses().filter((id) => id !== courseId);
  setToStorage(COMPARE_COURSES_KEY, courses);
  return courses;
}

export function isInCompare(courseId) {
  return getCompareCourses().includes(courseId);
}

export function clearCompareCourses() {
  removeFromStorage(COMPARE_COURSES_KEY);
}

// ---------------------------------------------------------------------------
// Recently Viewed
// ---------------------------------------------------------------------------

export function getRecentlyViewed() {
  return getFromStorage(RECENTLY_VIEWED_KEY).slice(0, MAX_RECENTLY_VIEWED);
}

export function addRecentlyViewed(courseId) {
  let viewed = getRecentlyViewed().filter((id) => id !== courseId);
  viewed.unshift(courseId);
  viewed = viewed.slice(0, MAX_RECENTLY_VIEWED);
  setToStorage(RECENTLY_VIEWED_KEY, viewed);
  return viewed;
}

export function clearRecentlyViewed() {
  removeFromStorage(RECENTLY_VIEWED_KEY);
}
