/************************ Introduction *********************************
 
 Title: Project 1 -- Can be taken concurrently? 
 
 Author: Kyle Drewes
 
 Date: 2/4/2024
 
 Description: The purpose of this program is to implement three options:

 - List of the prerequisites of each course in key-value pairs.
   These courses are listed in the following json files:
        • CS-BS_course_requisites_v2_pp.json
        • MATH-BS_course_requisites_pp.json

   When generating the output through the terminal, you must execute the following command:

   node project1.js -cs -simplify
   or
   node project1.js -math -simplify

- Prompts user to input two courses and determine if both courses can be
  taken concurrently.  If they cannot be taken concurrently, then that
  would mean that one course is a prerequisite of the other.  
  The command to execute would be:

  node project1.js -cs -together "Course ID1" "Course ID2"
  or 
  node project1.js -math -together "Course ID1" "Course ID2"

- Prompts user to input a course.  The output will display
  all prerequisite chains corresponding to that course. In other words,
  the output will display all the various prerequisites you are required 
  to take for that particular course.  
  The command to execute would be:

  node project1.js -cs -chains "Course ID"

  or 

  node project1.js -math -chains "MATH 220" 

*********************************************************************/

//-------------------------- Class -------------------------
// Create class which contains all the necessary properties
class Package {
  constructor(subject, operation, course1, course2) {
    this.subject = subject;
    this.operation = operation;
    this.course1 = course1;
    this.course2 = course2;
  }
}
//-------------------------- Functions -------------------------

// Retreives a list of prerequisites for each individual course
const Simplify_Prerequisites = (jsonData) => {
  // Declares variable which contain course criteria
  const courses = jsonData.courses;

  // Object used to store the prerequisites of each course as a key value pair
  const prerequisites = {};

  // Iterates through course criteria to collect the key and value of each json object
  for (const course in courses) {
    prerequisites[course] = [];
    if (courses[course].course_pre_reqs) {
      for (const prerequisite_list of courses[course].course_pre_reqs) {
        for (const preReq of prerequisite_list.courses) {
          const prerequisite_course = Object.keys(preReq);
          prerequisites[course] =
            prerequisites[course].concat(prerequisite_course);
        }
      }
    }
  }

  // Retrun the key-value pair of course prerequisites
  return prerequisites;
};
//------------------------------------------------------------------
// Determine if two courses can be taken concurrently
const isConcurrent = (course1, course2, jsonData) => {

  // Check if the courses are in the data object
  if (!jsonData[course1] || !jsonData[course2]) {
    console.log(`${course1} or ${course2} not found in file.`);
    return;
  }

  // isPrerequisite determines if one of the course is a prerequite of the other
  let isPrequisite = false,

    /* Holds course1 and course2 which serves as keys
      These keys will be compared to the remaining course criteria */
    collectionList = [course1, course2],

    // Increments the index of collectionList
    incrementer = 0,

    // Decrements the index collectionList
    decrementer = 1;

  /* Iterates through course criteria to determine 
     if there is a prerequisite of course1 or course2 */
  while (incrementer < collectionList.length) {

    // Outer for loop used to traverse through prerequisites of json object
    for (let course of jsonData[collectionList[decrementer]]) {
      if (collectionList[incrementer] == course) {
        isPrequisite = true;
        break;
      }

      // Inner for loop used to traverse through prerequisites of prerequisites within json object
      for (let subCourse of jsonData[course]) {
        if (collectionList[incrementer] == subCourse) {
          isPrequisite = true;

          break;
        }
      }
    }

    // Increments and decrement the index of collectList[]
    incrementer += 1;
    decrementer -= 1;
  }

  return isPrequisite;
};
//------------------------------------------------------------------
// Used to output all prerequisite chains for a particular course
const Prerequisite_Chains = (courseID, prerequisites) => {

  // Used to collect chains
  const chains = [];

  // Used to collect all the dependencies of the selected course id
  const Collect_Chains = (course, chain) => {
    if (!prerequisites[course] || prerequisites[course].length === 0) {
      chains.push(chain.join(" "));
      return;
    }

    // Collects prerequisite courses by storing them in chains array
    for (const prereq of prerequisites[course]) {
      Collect_Chains(prereq, [...chain, prereq]);
    }
  };

  // Used to find dependencies of course id
  Collect_Chains(courseID, [courseID]);

  // Display results
  chains.forEach((chain) => console.log(chain));
};
//------------------------------------------------------------------
// Used to select the three operations: simplify, together and chains
const Operations = (package) => {
  switch (package.operation) {

    case "simplify": {
      return Simplify_Prerequisites(package.subject);
    }
    case "together": {
      const prerequisite_list = Simplify_Prerequisites(package.subject);
      if (isConcurrent(package.course1, package.course2, prerequisite_list)) {
        return `${package.course1} and ${package.course2} cannot be taken concurrently.`;
      } else {
        return `${package.course1} and ${package.course2} can be taken concurrently.`;
      }
    }
    case "chains": {
      const prerequisite_list = Simplify_Prerequisites(package.subject);
      return Prerequisite_Chains(package.course1, prerequisite_list);
    }
    default: {
      console.log("Invalid operation name - please re-enter\n");
    }
  }
};
//------------------------------------------------------------------
// Used to import from cs or math json file and then return result
const Import_Subject = (subject) => {
  switch (subject) {
    case "cs":
      return require("./CS-BS_course_requisites_v2_pp.json");
    case "math":
      return require("./MATH-BS_course_requisites_pp.json");
    default:
      console.log('');
      return "Invalid subject name - please re-enter option\n";
  }
};
//------------------------------------------------------------------
// Return package object which contains all of the course criteria
const Get_Package = (subject, operation, size) => {
  switch (size) {
    case 4: {
      const [subject, operation] = Get_Subject_Operation(
        Import_Subject(process.argv[2].substr(1)),
        process.argv[3].substr(1)
      );
      const package = new Package(subject, operation, "N/A", "N/A");
      return package;
    }
    case 5: {
      const [subject, operation] = Get_Subject_Operation(
        Import_Subject(process.argv[2].substr(1)),
        process.argv[3].substr(1)
      );
      const package = new Package(
        subject,
        operation,
        process.argv[4],
        "N/A"
      );
      return package;
    }
    case 6: {
      const [subject, operation] = Get_Subject_Operation(
        Import_Subject(process.argv[2].substr(1)),
        process.argv[3].substr(1)
      );
      const package = new Package(
        subject,
        operation,
        process.argv[4],
        process.argv[5]
      );
      return package;
    }
    default: {
      console.log("Invalid number of arguments - please re-enter");
      return;
    }
  }
};
//------------------------------------------------------------------
// Return arguments for operation and subject
const Get_Subject_Operation = (subject, operation) => {
  return [subject, operation];
};
//------------------------------------------------------------------
// Print Operations
const Print = (operation) => {
  console.log(operation);
};

//-------------------------- Main Function -------------------------

// Store course criteria in Package class
const package = Get_Package(
  process.argv[2].substr(1),
  process.argv[3].substr(1),
  process.argv.length
);

// Print output
Print(Operations(package));

// ----------------------------------------------------------------------------
