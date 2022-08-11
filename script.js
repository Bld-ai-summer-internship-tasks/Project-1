const DATA_URL = 'http://localhost:3000/courses';

fetchCourses().then((coursesJsonData) => {
	const COURSES_CARDS_LIST_ELEMENT = document.getElementById('courses-list');
	coursesJsonData.forEach((course) => {
		const COURSE_CARD_ELEMENT = createCourseCardElement(course);
		COURSES_CARDS_LIST_ELEMENT.appendChild(COURSE_CARD_ELEMENT);
	});
});

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

// dismiss search results on click outside of the search results
document.addEventListener('click', function (event) {
	const NAVBAR_ELEMENT = document.getElementsByClassName('navbar')[0];
	if (!NAVBAR_ELEMENT.contains(event.target)) {
		document.getElementById('search-results').style.display = 'none';
	}
});

// search on enter key pressed
document.getElementById('search-box').addEventListener('keyup', function (event) {
	if (event.keyCode === 13) {
		onSearchClickedHandler();
	}
});

/**
 * @description handle search click event
 */
function onSearchClickedHandler() {
	const SEARCH_TERM = document.getElementById('search-box').value;

	fetchCourses().then((coursesJsonData) => {
		const FILTERED_COURSES_JSON_DATA = filterCoursesJsonData(coursesJsonData, SEARCH_TERM);

		const SEARCH_RESULTS_LIST_ELEMENT = document.getElementById('results-list');
		SEARCH_RESULTS_LIST_ELEMENT.innerHTML = ''; // clear old search results

		FILTERED_COURSES_JSON_DATA.forEach((course) => {
			const SEARCH_RESULT_ELEMENT = createSearchResultElement(course);
			SEARCH_RESULTS_LIST_ELEMENT.appendChild(SEARCH_RESULT_ELEMENT);
		});
		const SEARCH_RESULTS_CONTAINER_ELEMENT = document.getElementById('search-results');
		SEARCH_RESULTS_CONTAINER_ELEMENT.style.display = 'block';
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

/**
 * @description create search result element
 * @param {JSON} courseJsonData
 * @returns {HTMLElement} Search result element
 */
function createSearchResultElement(courseJsonData) {
	const COURSE_TITLE = courseJsonData.title;
	const SEARCH_RESULT_ELEMENT = document.createElement('li');
	SEARCH_RESULT_ELEMENT.classList.add('result-item');
	SEARCH_RESULT_ELEMENT.innerHTML = `${COURSE_TITLE}`;
	return SEARCH_RESULT_ELEMENT;
}
