// Function to load the JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    console.log(response);
    return response.json();
}

// Function to create a list item for each object
function createListItem(item) {
    const li = document.createElement('li');
    li.textContent = JSON.stringify(item, null, 2); // Display object as JSON string
    return li;
    
}
//function to create html text for each object
function createHTMLDisplay(item) {
    const displayData = document.createElement('li');
    //displayData.textContent = item.first_name + " " + item.last_name + " " + item.email + " " + item.role;
    console.log(displayData);
    return displayData;
    
}

// Function to display data in the HTML lists
function displayData(data) {
    console.log(data);
    const studentsList = document.getElementById('students-list');
    const instructorsList = document.getElementById('instructors-list');

    // Populate students list
    data.students.forEach(student => {
        const listItem = createListItem(student);
        //const displayData = createHTMLDisplay(student);
        studentsList.appendChild(displayData);
    });

    // Populate instructors list
    data.instructors.forEach(instructor => {
        const listItem = createListItem(instructor);
        instructorsList.appendChild(listItem);
    });
}

// Load and display the JSON data
loadJSON('class.json') // Adjust path if necessary
    .then(data => displayData(data))
    .catch(error => console.error('Error loading JSON:', error));