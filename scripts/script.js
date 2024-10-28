// Function to load the JSON data
async function loadJSON(url) {
    const response = await fetch(url);
    //console.log(response.json());
    return response.json();
}

// Function to create a table from JSON data
function createTableFromJSON(jsonData) {
    // Create table element
    const table = document.createElement('table');
    // order of keys in the table
    const keysOrder = ["bioimage", "first_name", "last_name", "role", "birthday", "username", "email", "grade"];

    // Create table header row of table by extracting the keys from the first object
    const headerRow = document.createElement('tr');
    const keys = Object.keys(jsonData[0]);
    keysOrder.forEach(key => {
        const th = document.createElement('th');
        // makes styles of table headers more readable
        th.textContent = key.replace('_', ' ').toUpperCase();
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

     // Create table rows
     jsonData.forEach(item => {
        const row = document.createElement('tr');
        keysOrder.forEach(key => {
            const td = document.createElement('td');
            if (key === "bioimage") {
                const img = document.createElement('img');
                const randomNum = Math.floor(Math.random() * 10) + 1;
                img.src = `${item[key]}?${randomNum}`;
                img.alt = `${item["first_name"]} ${item["last_name"]}`;
                td.appendChild(img);
            } else {
                td.textContent = item[key];
            }
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    return table;
}

// function to count number of students
function countStudents(jsonData) {
    return parseFloat(jsonData.length);
}

// function to calculate grade average
function averageGrade(jsonData){
    let sum = 0;
    i = 0;
    while (i < jsonData.length){
        sum += jsonData[i]["grade"];
        i++;
    }
    average = sum / jsonData.length;
    return average
}

// function to calculate lowest grade
    function lowestGrade(jsonData){
        i=0;
        let lowest = jsonData[i]["grade"];
        while (i < jsonData.length){
            if (jsonData[i]["grade"] < lowest){
                lowest = jsonData[i]["grade"];
            }
            i++;
        }
        return lowest;
    }
// function to calculate highest grade
function highestGrade(jsonData){
    i=0;
    let highest = jsonData[i]["grade"];
    while (i < jsonData.length){
        if (jsonData[i]["grade"] > highest){
            highest = jsonData[i]["grade"];
        }
        i++;
    }
    return highest;
}
// Load and display the JSON data
loadJSON('class.json')
    .then(data => {
        // Extract keys from first object in JSON data
        const studentKeys = Object.keys(data.students[0]);
        // console.log('Student Keys:', studentKeys);

        // Create and display students table
        const studentsTable = createTableFromJSON(data.students);
        document.getElementById('studentsContainer').appendChild(studentsTable);

        // return number of students, average grade, lowest, & highest scores
        const summaryText = `There are ${countStudents(data.students)} students in the class. The average score is ${averageGrade(data.students)}. The lowest score is ${lowestGrade(data.students)}. The highest score is ${highestGrade(data.students)}.`;
        const summaryElement = document.createElement('p');
        summaryElement.textContent = summaryText;
        document.getElementById('studentsContainer').appendChild(summaryElement);
    })
    .catch(error => console.error('Error loading JSON:', error));

