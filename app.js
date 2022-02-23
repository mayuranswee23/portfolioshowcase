const inquirer = require('inquirer')
const { writeFile, copyFile } = require('./utils/generate-page');
const generatePage = require ('./src/page-template')





const promptUser = () => {
 return inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
    validate: nameInput => {
      if (nameInput) {
        return true;
      } else {
        console.log('Please enter your name!');
        return false;
      }
    }
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub Username'
  },
  {
    type: 'input',
    name: 'about',
    message: 'Provide some information about yourself:'
  }
  ])
  
};


  const promptProject = portfolioData => {
    // If there's no 'projects' array property, create one
 
    console.log(`
  =================
  Add a New Project
  =================
  `);
  if (!portfolioData.projects) {
    portfolioData.projects = [];
    }
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ]).then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
  };

//   promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
    
//     const pageHTML = generatePage(portfolioData);

//   fs.writeFile('./dist/index.html', pageHTML, err => {
//   if (err) throw new Error (err);
//   console.log('Portfolio complete! Check out index.html to see the output!');

//   fs.copyFile('./src/style.css', './dist/style.css', err => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('Style sheet copied successfully!');
//   });
// });
// });;

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });