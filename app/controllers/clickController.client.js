'use strict';

/*NB: Everything is wrapped in an 
immediately invoked function expression (IIFE)
to prevent conflicts with other client-side JavaScript being used
*/

//Find DOM elements in HTML and stores for use
(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = 'http://localhost:3000/api/clicks';
   

// Function to fire a specific function once the DOM is loaded 
 function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   } 


//basic AJAX request function: use GET/POST/Whatever, 
// when JSON response comes, use CB function with that data
   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }

// Display the click count using received data 
  function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }

//When the page loads, update #click-nbr to current clicks
ready(ajaxRequest('GET', apiUrl, updateClickCount));

//Makes a POST request to the API, which increments click count
addButton.addEventListener('click', function () {

      ajaxRequest('POST', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount)
      });

   }, false); 

//makes a DELETE post request to the API, which resets click count
deleteButton.addEventListener('click', function () {

      ajaxRequest('DELETE', apiUrl, function () {
         ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false); 

})();


