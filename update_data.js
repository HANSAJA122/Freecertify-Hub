const fs = require('fs');
const path = require('path');

const coursesDataPath = path.join(__dirname, 'src/data/coursesData.js');
const platformsDataPath = path.join(__dirname, 'src/data/platformsData.js');

// 1. Process coursesData.js
let coursesRaw = fs.readFileSync(coursesDataPath, 'utf8');

// We will use regex to inject properties before `courseUrl` to keep the file clean.
// Or even better, evaluate it, modify it, and stringify it back.
// Since it's a JS file with `export const courses = [...]`, we can extract the array.
// But we want to preserve formatting. So let's just do a regex replace on the courseUrl.

const categoryImages = {
  "Artificial Intelligence": "/course-images/ai-course.jpg",
  "Cybersecurity": "/course-images/cybersecurity-course.jpg",
  "Web Development": "/course-images/web-development-course.jpg",
  "Data Science": "/course-images/data-science-course.jpg",
  "Business": "/course-images/business-course.jpg",
  "Project Management": "/course-images/project-management-course.jpg",
  "Networking": "/course-images/networking-course.jpg",
  "Cloud Computing": "/course-images/cloud-course.jpg",
  "Digital Marketing": "/course-images/digital-marketing-course.jpg",
  "Soft Skills": "/course-images/soft-skills-course.jpg",
};

const platformLogos = {
  "Coursera": "/platform-logos/coursera.png",
  "IBM SkillsBuild": "/platform-logos/ibm.png",
  "Google Digital Garage": "/platform-logos/google.png",
  "HP LIFE": "/platform-logos/hp-life.png",
  "Great Learning": "/platform-logos/great-learning.png",
  "Cisco Networking Academy": "/platform-logos/cisco.png",
  "Fortinet Training": "/platform-logos/fortinet.png",
  "Microsoft Learn": "/platform-logos/microsoft.png",
  "Alison": "/platform-logos/alison.png",
  "OpenLearn": "/platform-logos/openlearn.png",
  "Simplilearn SkillUp": "/platform-logos/simplilearn.png",
  "LinkedIn Learning Free Resources": "/platform-logos/linkedin.png",
};

const platformUrls = {
  "Coursera": "https://www.coursera.org",
  "IBM SkillsBuild": "https://skillsbuild.org",
  "HP LIFE": "https://www.life-global.org",
  "Great Learning": "https://www.mygreatlearning.com/academy",
  "Google Digital Garage": "https://learndigital.withgoogle.com/digitalgarage",
  "Cisco Networking Academy": "https://www.netacad.com",
  "Fortinet Training": "https://training.fortinet.com",
  "Microsoft Learn": "https://learn.microsoft.com",
  "Alison": "https://alison.com",
  "OpenLearn": "https://www.open.edu/openlearn",
  "Simplilearn SkillUp": "https://www.simplilearn.com/skillup-free-online-courses",
  "LinkedIn Learning Free Resources": "https://www.linkedin.com/learning",
};

// Evaluate the arrays to modify and re-export them cleanly
// Since they might not have external dependencies, we can require them by transpiling or just doing string manipulation.
// But it's easier to just recreate the file since we have all data.

// Let's create a temporary module to load them
const tempLoader = `
${coursesRaw.replace('export const courses =', 'module.exports.courses =')}
`;
fs.writeFileSync(path.join(__dirname, 'temp_courses.js'), tempLoader);

const { courses } = require('./temp_courses.js');

const updatedCourses = courses.map(course => {
  return {
    ...course,
    image: categoryImages[course.category] || "/course-images/default-course.jpg",
    providerLogo: platformLogos[course.platform] || "/platform-logos/default.png",
    courseUrl: platformUrls[course.platform] || "https://example.com",
    isFree: true,
    ctaText: "Start Free Certificate"
  };
});

const newCoursesRaw = `export const courses = ${JSON.stringify(updatedCourses, null, 2)};\n`;
fs.writeFileSync(coursesDataPath, newCoursesRaw);
fs.unlinkSync(path.join(__dirname, 'temp_courses.js'));

// 2. Process platformsData.js
let platformsRaw = fs.readFileSync(platformsDataPath, 'utf8');
const tempLoaderPlatforms = `
${platformsRaw.replace('export const platformsInfo =', 'module.exports.platformsInfo =')}
`;
fs.writeFileSync(path.join(__dirname, 'temp_platforms.js'), tempLoaderPlatforms);

const { platformsInfo } = require('./temp_platforms.js');

const updatedPlatforms = platformsInfo.map(platform => {
  return {
    ...platform,
    logo: platformLogos[platform.name] || "/platform-logos/default.png"
  };
});

const newPlatformsRaw = `export const platformsInfo = ${JSON.stringify(updatedPlatforms, null, 2)};\n`;
fs.writeFileSync(platformsDataPath, newPlatformsRaw);
fs.unlinkSync(path.join(__dirname, 'temp_platforms.js'));

console.log("Data files updated successfully.");
