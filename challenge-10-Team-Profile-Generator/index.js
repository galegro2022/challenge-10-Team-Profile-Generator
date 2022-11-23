

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require('./src/page-template.js');

const teamMembers = [];
const idArray = [];

// Inform user of usage
console.log(
  '\nWelcome to the team generator!\nUse `npm run reset` to reset the dist/ folder\n'
);

function appMenu() {
  function createManager() {
    console.log('Please build your team 👥');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'managerName',
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        
        {
          type: 'input',
          name: 'managerId',
          message: "What is the team manager's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'managerEmail',
          message: "What is the team manager's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'managerOfficeNumber',
          message: "What is the team manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    //code goes here
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'memberChoice',
          message: 'Which type of team member would you like to add?',
          choices: [
            'Engineer',
            'Intern',
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberchoice){
          case 'Engineer':
            addEngineer();
            break;
          case 'Intern':
            addIntern();
            break;
          default:
            createTeam();
  
        }
       //code goes here
      });
    }

  function addEngineer() {
    
    console.log('Please add your Engineer 👥');
    inquirer
      .prompt([
        {
         type: 'input',
         name: 'engineerName',
          message: "What is the Engineer's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
         },
        },
      ])

      {
        type: 'input';
        name: 'engineerId';
        message: "What is the Engineer's id?";
        validate = (answer) => {
          const pass = answer.match(/^[1-9]\d*$/);
          if (pass) {
            return true;
          }
          return 'Please enter a positive number greater than zero.';
        };
      };
      {
        type: 'input';
        name: 'engineerEmail';
        message: "What is the Engineer's email?";
        validate = (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return 'Please enter a valid email address.';
        };
      };
      {
        type: 'input';
        name: 'engineerGithub';
        message: "What is the Engineer's Github?",
        validate = (answer) => {
          const pass = answer.match(/\S+@\S+\.\S+/);
          if (pass) {
            return true;
          }
          return 'Please enter a valid github.';
        };
      };

  

      then((answers) => {
      const manager = new Engineer(
        answers.engineerName,
        answers.engineerId,
        answers.engineerEmail,
        answers.engineerGithub,
      );
  })

  function addIntern() {
    //code goes here
    console.log('Please add your Intern 👥');
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'internName',
          message: "What is the Intern's name?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter at least one character.';
          },
        },
        {
          type: 'input',
          name: 'internId',
          message: "What is the Intern's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return 'Please enter a positive number greater than zero.';
          },
        },
        {
          type: 'input',
          name: 'internEmail',
          message: "What is the Intern's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return 'Please enter a valid email address.';
          },
        },
        {
          type: 'input',
          name: 'engineerGithub',
          message: "What is your intern's University?",
          validate: (answer) => {
            if (answer !== '') {
              return true;
            }
            return 'Please enter a valid github.';
          },
        },
      ])
      .then((answers) => {
        const manager = new Engineer(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internGithub
        );
  });
  


  function buildTeam() {
    // Create the output directory if the dist path doesn't exist
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR);
    }
    fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
  }

  createManager();
}
  
appMenu(); }}