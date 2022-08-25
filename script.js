const DATA_URL = 'http://localhost:3000/courses';

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
	const COURSES_CARDS_LIST_ELEMENT = document.getElementById('courses-slider');
	COURSES_CARDS_LIST_ELEMENT.innerHTML = ''; // clear old courses cards

	const NUM_OF_CARDS_PER_ROW = getNumOfCardsPerRow();
	const COURSES_PER_ROW = spliceIntoChunks(coursesJsonData, NUM_OF_CARDS_PER_ROW);

	COURSES_PER_ROW.forEach((coursesRow) => {
		const CROUSAL_ITEM_ELEMENT = createCourseCardsRow(coursesRow);
		COURSES_CARDS_LIST_ELEMENT.appendChild(CROUSAL_ITEM_ELEMENT);
	});
	COURSES_CARDS_LIST_ELEMENT.childNodes[0].classList.add('active');
}

/**
 * @description get the suitable number of cards per row
 * @returns {Number} number of cards per row
 */
function getNumOfCardsPerRow() {
	const WIDTH = window.innerWidth;
	if (WIDTH < 645) {
		return 1;
	}
	if (WIDTH < 908) {
		return 2;
	}
	if (WIDTH < 1152) {
		return 3;
	}
	if (WIDTH < 1409) {
		return 4;
	}
	return 5;
}

/**
 *
 * @param {list} arr
 * @param {number} chunkSize
 * @returns {list} splitted array
 */
function spliceIntoChunks(arr, chunkSize) {
	const res = [];
	while (arr.length > 0) {
		const chunk = arr.splice(0, chunkSize);
		res.push(chunk);
	}
	return res;
}

function createCourseCardsRow(coursesArr) {
	const COURSES_ROW_ELEMENT = document.createElement('div');
	COURSES_ROW_ELEMENT.classList.add('courses-list');
	coursesArr.forEach((course) => {
		const COURSE_CARD_ELEMENT = createCourseCardElement(course);
		COURSES_ROW_ELEMENT.appendChild(COURSE_CARD_ELEMENT);
	});
	const CROUSAL_ITEM_ELEMENT = document.createElement('div');
	CROUSAL_ITEM_ELEMENT.classList.add('carousel-item');
	CROUSAL_ITEM_ELEMENT.appendChild(COURSES_ROW_ELEMENT);
	return CROUSAL_ITEM_ELEMENT;
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
	fetchCourses().then((coursesJsonData) => {
		const FILTERED_COURSES_JSON_DATA = filterCoursesJsonData(coursesJsonData, SEARCH_TERM);
		renderCoursesSection(FILTERED_COURSES_JSON_DATA);
	});
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

window.addEventListener('resize', function (event) {
	fetchCourses().then((fetchedCoursesJsonData) => {
		renderCoursesSection(fetchedCoursesJsonData);
	});
});

fetchCourses().then((fetchedCoursesJsonData) => {
	renderCoursesSection(fetchedCoursesJsonData);
});
