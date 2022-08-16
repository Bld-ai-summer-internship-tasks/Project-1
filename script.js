const DATA_URL = 'http://localhost:3000/courses';
let currentCoursesJsonData;

/**
 * @description fetch courses data from server in json format
 * @returns {Promise} Course data in JSON format
 */
function fetchCourses() {
	return new Promise((resolve, reject) => {
		fetch(DATA_URL)
			.then((response) => response.json())
			.then((jsonData) => resolve(jsonData))
			.catch((error) => reject(error));
	});
}

/**
 * @description render courses cards in courses section
 * @param {JSON} coursesJsonData
 */
function renderCoursesSection(coursesJsonData) {
	const COURSES_CARDS_LIST_ELEMENT = document.getElementById('courses-list');
	COURSES_CARDS_LIST_ELEMENT.innerHTML = ''; // clear old courses cards
	coursesJsonData.forEach((course) => {
		const COURSE_CARD_ELEMENT = createCourseCardElement(course);
		COURSES_CARDS_LIST_ELEMENT.appendChild(COURSE_CARD_ELEMENT);
	});
}

/**
 * @description create course card element
 * @param {JSON} courseJsonData
 * @returns {HTMLElement} Course card element
 */
function createCourseCardElement(courseJsonData) {
	const COURSE_IMG = courseJsonData.image;
	const COURSE_TITLE = courseJsonData.title;
	const COURSE_AUTHOR = courseJsonData.author;
	const COURSE_CARD_ELEMENT = document.createElement('div');
	COURSE_CARD_ELEMENT.classList.add('course-card');
	COURSE_CARD_ELEMENT.innerHTML = `
      <img class="course-img" src="${COURSE_IMG}" />
      <span class="course-title">${COURSE_TITLE}</span>
      <span class="course-subtitle">${COURSE_AUTHOR}</span>
  `;
	return COURSE_CARD_ELEMENT;
}

/**
 * @description handle search click event
 */
function onSearchClickedHandler() {
	const SEARCH_TERM = document.getElementById('search-box').value;
	const FILTERED_COURSES_JSON_DATA = filterCoursesJsonData(currentCoursesJsonData, SEARCH_TERM);
	renderCoursesSection(FILTERED_COURSES_JSON_DATA);
}

/**
 * @description filter courses json data using search term
 * @param {JSON} coursesJsonData
 * @param {String} searchTerm
 * @returns {JSON} filtered courses json data
 */
function filterCoursesJsonData(coursesJsonData, searchTerm) {
	return coursesJsonData.filter((course) => {
		return course.title.toLowerCase().includes(searchTerm.toLowerCase());
	});
}

// search on enter key pressed
document.getElementById('search-box').addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		onSearchClickedHandler();
	}
});

fetchCourses().then((fetchedCoursesJsonData) => {
	currentCoursesJsonData = fetchedCoursesJsonData;
	renderCoursesSection(currentCoursesJsonData);
});
