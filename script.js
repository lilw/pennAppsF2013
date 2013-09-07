
var vis = d3.select("#visualization");

function init() {
	initEventHandlers();
}

function initEventHandlers() {
	var searchButton = document.getElementById("search-button");
	searchButton.addEventListener("click", changeVisualization);
}

function changeVisualization() {
	var keywordBox = document.getElementById("keyword-input");
	var keywordValue = keywordBox.value;
	if(keywordValue){
		console.log(keywordValue);
		PeopleSearch(keywordValue);
	}
	
}


function onLinkedInLoad() {
     // Listen for an auth event to occur
     IN.Event.on(IN, "auth", init);
   
}
 

 
function PeopleSearch(keywords) {
     // Call the PeopleSearch API with the viewer's keywords
     // Ask for 4 fields to be returned: first name, last name, distance, and Profile URL
     // Limit results to 10 and sort by distance
     // On success, call displayPeopleSearch(); On failure, do nothing.
     var div = document.getElementById("peopleSearchForm");
	console.log("people search" + keywords);
     IN.API.PeopleSearch()
         .fields("firstName", "lastName", "distance", "siteStandardProfileRequest", "id")
         .params({"keywords": keywords})
         .result(displayPeopleSearch)
         .error(function error(e) { console.log("there was an error") }
     );
}
function onLinkedInAuth() {
    // After they've signed-in, print a form to enable keyword searching
    var div = document.getElementById("peopleSearchForm");
	var keywordBox = document.getElementById("keyword-input");
	var keywordValue = keywordBox.value;
	if(keywordValue){
		console.log(keywordValue);
		PeopleSearch(keywordValue);
	}	
//    div.innerHTML = '<h2>Find People on LinkedIn</h2>';
//    div.innerHTML += '<form action="javascript:PeopleSearch(this);">'
//		+ 'First name: <input type="text" id="first" name="keywords"><br>'
//		+ '<input id="search" type="submit" value="Search!"/>'
//	+ '</form>';
	
}
 
function displayPeopleSearch(peopleSearch) {
	console.log(peopleSearch);
     var div = document.getElementById("peopleSearchResults");
 
     div.innerHTML = "<ul>";
 
     // Loop through the people returned
     var members = peopleSearch.people.values;
     for (var member in members) {
 
         // Look through result to make name and url.
         var nameText = members[member].firstName + " " + members[member].lastName;
         var url = members[member].siteStandardProfileRequest.url;
 
         // Turn the number into English
         var distance = members[member].distance;
         var distanceText = '';
         switch (distance) {
         case 0:  // The viewer
             distanceText = "you!"
             break;
         case 1: // Within three degrees
         case 2: // Falling through
         case 3: // Keep falling!
             distanceText = "a connection " + distance + " degrees away.";
             break;
         case 100: // Share a group, but nothing else
             distanceText = "a fellow group member.";
             break;
         case -1: // Out of netowrk
         default: // Hope we never get this!
             distanceText = "far, far, away.";
         }
 
         div.innerHTML += "<li><a href=\"" + url + "\">" + nameText + 
         "</a> is " + distanceText + "</li>"
     }
 
     div.innerHTML += "</ul>";
}