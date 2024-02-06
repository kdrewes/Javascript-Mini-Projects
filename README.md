Read Me Document					 

Title: Project 1 -- Can be taken concurrently? 

Author: Kyle Drewes Date: 2/4/2024 
Description:
The purpose of this program to implement three options: 

- List of the prerequisites of each course in key-value pairs. These courses are listed in the follow json files: 

  • CS-BS_course_requisites_v2_pp.json 

  • MATH-BS_course_requisites_pp.json 

When generating the output through the terminal the command to execute: node project1.js -cs -simplify or node project1.js -math -simplify 

- Prompt user to input to courses and determine if both courses can be taken concurrently.  If they cannot be taken concurrently, then that would mean that one course if a prerequisite of the other. You must execute the following command: 

node project1.js -cs -together "Course ID1" "Course ID2" 
or 
node project1.js -math -together "Course ID1" "Course ID2" 

- Prompt user to input a course.  The output will display all prerequisite chains corresponding to that course. In other words, the output will display all the various prerequisites you are required to take for that particular course. The command you must execute: 

node project1.js -cs -chains "Course ID" 
or 
node project1.js -math -chains "MATH 220"

Description of Functions:

Class Package – Used to store the following variables, subject, operation, course1 and course2.  This class was designed to make the program more organized so it’s easier to keep track of all the arguments inputted by the user through the terminal.

Simplify_Prerequisites – Used to execute an algorithm used to output the prerequisites of each course listed in the json files, CS-BS_course_requisites_v2_pp.json and MATH-BS_course_requisites_pp.json.  An example is displayed below:

isConcurrent – Executes an algorithms which determines if two courses are prerequisites of each other or not.  If they are prerequisites of each other then the function returns true, otherwise it will return false.  An example is displayed below:

 

Prerequisite-Chains – Outputs all prerequisite chains for a particular courses.  Therefore, it will provide a list of all the various prerequisites that could be associated with the selected course.  An example is displayed below:

 

Operations – Takes the package object as a parameter and determines which option was originally selected by the user.  The following options contain:

• simplify

• together

• chains

Import_Subject – Used to determine which json file (CS-BS_course_requisites_v2_pp.json pr MATH-BS_course_requisites_pp.json) to upload.  Once the file is successfully identified, the importation will be returned.

Get_Package- The purposes of this function is to return the object of the Package class depending on what the user chooses to input in the terminal.   Because each operation contains a different set of input, the program will need to decipher between what content to insert into the package constructor.  As a result, the main purposes of Get_Package is to determine that.

Get_Subject_Operation- Used to return the subject and operation variable originally inputted by the user through the terminal.  

Print – Used to the display the desired operation inputted by the user.

Main- Generates the package object and then prints the results.
