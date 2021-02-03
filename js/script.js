//global variables
const itemsPerPage = 9;
const search = document.querySelector(".header");
const studentList = document.querySelector(".student-list");
const inputValue = document.querySelector("#search");
let filterData = [];
//Takes an array of students and page number, then creates the content
// to present nine students per page.
function showPage(list, page) {
	let startIndex = page * itemsPerPage - itemsPerPage;
	let endIndex = page * itemsPerPage;
	//clear the student list
	studentList.innerHTML = "";
	//Loops through list of students to create a list item
	for (let i = 0; i < list.length; i++) {
		if (i >= startIndex && i < endIndex) {
			let studentItem = list[i];
			//creates the content to be added to the ul with class 'student-list'.
			let html = "";
			html += `<li class= 'student-item cf'>
				<div class='student-details'>
					<img class='avatar' src=${studentItem.picture["thumbnail"]}>
					<h3>${studentItem.name["first"]} ${studentItem.name["last"]}</h3>
					<span class='email'>${studentItem.email}</span>
				</div>
				<div class='joined-details'> 
				<span class='date'>Joined ${studentItem.registered["date"]}</span>
				</div>

			</li>`;
			//appends the content to the UL
			studentList.insertAdjacentHTML("beforeend", html);
		}
	}
}
//Adds a search bar to the heading on index html
function createSearchBox() {
	let header = document.querySelector(".header");
	let label = "";
	label += `<label for="search" class="student-search">
  		<input id="search" placeholder="Search by name...">
  	<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
	</label>`;

	header.insertAdjacentHTML("beforeend", label);
}

// This function takes the list of student and creates pagination buttons and adds event listener to the buttons to page through the student list.
function addPagination(list) {
	//creates numbers of pages base on the length of the array of objects.
	let numOfPages = Math.ceil(list.length / itemsPerPage);
	let linkList = document.querySelector(".link-list");
	linkList.innerHTML = "";
	//loops through the numbe of pages and add a pagination button per page.
	for (let i = 1; i <= numOfPages; i++) {
		let button = "";
		button += `
			<li>
				<button type='button'>${i}</button>
			</li>
		`;
		//appends the button to ul with class 'link-list'
		linkList.insertAdjacentHTML("beforeend", button);
	}

	//event listener for the pagination buttons. Calls showPage function
	let firstButton = linkList.firstElementChild;
	// This if statement avoids the app stopping when there is no pagination button because no match found.
	if (firstButton) {
		firstButton.className = "active";
		linkList.addEventListener("click", (e) => {
			const button = event.target;
			if (e.target.tagName === "BUTTON") {
				let li = document.querySelector(".active");
				li.className = "";
				button.className = "active";
				//button text content is the page number
				showPage(data, button.textContent);
			}
		});
	}
}
//creates messege if match is not found.
function nameNotFound() {
	//the li will attach to the ul with class name 'student-list'
	let ulStudent = document.querySelector(".student-list");
	ulStudent.innerHTML = "";
	let html = "";
	html += `
		<li class= 'student-item cf'>
			<h2>No match found, try again.</h2>
		</li>`;
	//appends the content to Ul when a match is not found
	ulStudent.insertAdjacentHTML("beforeend", html);
}
//event listener when click, will search is the input in search bar match a name in the array of object provided. only checks for name.
search.addEventListener("click", (e) => {
	const inputValue = document.querySelector("#search");
	const searchName = inputValue.value.toLowerCase();
	if (e.target.tagName === "IMG" || e.target.tagName === "BUTTON") {
		//stores the filter students
		filterData = [];

		for (let i = 0; i < data.length; i++) {
			const person = data[i];
			const studentName = `${person.name["first"]} ${person.name["last"]}`;
			//check if name of student is in array of objects. if true displays the students else, display messege no match found.
			if (searchName !== 0 && studentName.toLowerCase().includes(searchName)) {
				filterData.push(person);
				showPage(filterData, 1);
				addPagination(filterData);
			} else if (filterData.length === 0) {
				nameNotFound();
				addPagination(filterData);
			}
		}
	}
});
//event listener on keyup. same concept as the one with click event.
search.addEventListener("keyup", (e) => {
	const inputValue = document.querySelector("#search");
	const searchName = inputValue.value.toLowerCase();
	filterData = [];
	for (let i = 0; i < data.length; i++) {
		const person = data[i];
		let studentName = `${person.name["first"]} ${person.name["last"]}`;

		if (searchName !== 0 && studentName.toLowerCase().includes(searchName)) {
			filterData.push(person);
			showPage(filterData, 1);
			addPagination(filterData);
		} else if (filterData.length === 0) {
			nameNotFound();
			addPagination(filterData);
		}
	}
});
showPage(data, 1);
addPagination(data);
createSearchBox();
