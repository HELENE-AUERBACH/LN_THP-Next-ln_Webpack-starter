import '../sass/style.scss';

import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

console.log("Hello!");

// Babel Input: ES2015 arrow function
console.log(`${[1, 2, 3].map(n => n + 1)}`);

import { myFunction } from './file2'; // Pas besoin de mettre le '.js' à la fin !
import { myObject, anotherFunction } from './file3';
import myFunctionRenamed from './file4';

myFunction();
anotherFunction(myObject.message);
myFunctionRenamed();

import dayjs from 'dayjs';

console.log(dayjs().format('MMMM DD YYYY')); // July 26 2021
console.log(dayjs().subtract(10, 'days').format('DD/MM/YYYY')); // 16/07/2021

console.log("TEST:", process.env.DB_HOST);
