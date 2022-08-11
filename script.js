const coursesJson = {
	courses: [
		{
			id: 1,
			title: 'python from zero to hero',
			author: 'maximlian',
			image: 'https://s.udemycdn.com/premium-clp/567828/CourseImage-2x.jpg',
		},
		{
			id: 2,
			title: 'javascript from zero to hero',
			author: 'stephen',
			image: 'https://www.pragimtech.com/wp-content/uploads/2019/03/java-script.jpg',
		},
		{
			id: 3,
			title: 'Learn Python: Python for Beginners',
			author: 'Abrar Hussain',
			image: 'https://img-c.udemycdn.com/course/240x135/426570_1b91_3.jpg',
		},
		{
			id: 4,
			title: 'Learn Python for Data Analysis and Visualization',
			author: 'Jose Portila',
			image: 'https://img-c.udemycdn.com/course/240x135/396876_cc92_7.jpg',
		},
		{
			id: 5,
			title: 'Python for Beginners - Learn Programming from scratch',
			author: 'Edwin Diaz, Coding Faculty Solutions',
			image: 'https://img-c.udemycdn.com/course/240x135/405878_e5a0_3.jpg',
		},
	],
};

const coursesListElement = document.getElementById('courses-list');

coursesJson.courses.forEach((course) => {
	const courseCardElement = createCourseCardElement(course);
	coursesListElement.appendChild(courseCardElement);
});

function createCourseCardElement(course) {
	const courseImg = course.image;
	const courseTitle = course.title;
	const courseAuthor = course.author;
	const courseItem = document.createElement('div');
	courseItem.classList.add('course-card');
	courseItem.innerHTML = `
      <img class="course-img" src="${courseImg}" />
      <span class="course-title">${courseTitle}</span>
      <span class="course-subtitle">${courseAuthor}</span>
  `;
	return courseItem;
}