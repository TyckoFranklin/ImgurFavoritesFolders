


//////////////Chrome Variables///////////////////////
//////////////Chrome Variables///////////////////////
//////////////Chrome Variables///////////////////////



//////////////Chrome Functions///////////////////////
//////////////Chrome Functions///////////////////////
//////////////Chrome Functions///////////////////////

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}




//////////////Page Functions///////////////////////
//////////////Page Functions///////////////////////
//////////////Page Functions///////////////////////



/***********************************************************************************
                                   setUpABC                 					   
 Main function in the website scope. Once loaded, sets everything up.		       
************************************************************************************/
function setUpABC() {
    window.iUserName = document.getElementsByClassName("topbar-icon account-user-name")[0].innerText;
	getPageType();
	if(localStorage.getItem(window.iUserName+'FavoriteCount')==null)
		localStorage.setItem(window.iUserName+'FavoriteCount','0');
	var lSCategories = localStorage.getItem(iUserName+'favoriteCategories');
	if (lSCategories == null)
	    localStorage.setItem(iUserName + 'favoriteCategories', 'unorganized');
	if (window.iPageType == 'favorites')
	    setupFavoritesBar();
	window.favoriteOriginalElementCount = 0;
	window.dateObject = new Date();
	window.iKeepLooping = true;
	iLooper(5000);
}

/***********************************************************************************
				            recursiveAttributeFinder			  		
 Website scope. Finds a dom element node with matching attributes and assigns a   
 new value to an attribute. Accepts a dom element node, tests it, and searches    
 all it's child elements. Adds or changes an supplied attribute of a supplied	   
 type.																  		  	   
************************************************************************************/
function recursiveAttributeFinder(pageElement,attriType,attriValue,newid)
	{
	if (!pageElement)
		return false;
	alert('Type: '+ + '\r\nClass: '+pageElement.getAttribute('class'));
	var max = attriValue.length;
	if(pageElement.attributes && pageElement.getAttribute(attriType))
		{ 
		for(var i = 0;i<max;i++)
			{
			if((pageElement.getAttribute(attriType)+'') == attriValue[i])
				{
				alert("yay");
				pageElement.id = newid;
				return true;
				}
			}
		 }
	var a = pageElement.childNodes.length;
	for(var i = 0;i < a;i++)
 		{
 		if(recursiveAttributeFinder(pageElement.childNodes[i],attriType,attriValue,newid))
 		return true;

 		}
	}

/***********************************************************************************
		 							getPageType				                	   
 Figure out what page is being viewed and store it.	            			   
************************************************************************************/
function getPageType(){
	var locationString = window.location.href;	
	if (locationString == 'http://imgur.com/account/favorites')
	    window.iPageType = 'favorites';
	else if(locationString == 'http://imgur.com/')
	    window.iPageType = 'home';
	else if (locationString == 'http://imgur.com/' + window.iUserName + '/favorites')
	    window.iPageType = 'galleryfavorites';
	else window.iPageType = 'notSet';

	}

/***********************************************************************************
				               cleanFavoritesImageSpace                	  
 Delete all the dom elements in the favorites image space element		           
************************************************************************************/
function cleanFavoritesImageSpace(){

	var tempElement = document.getElementById('imagelist');
	while (tempElement.firstChild){tempElement.removeChild(tempElement.firstChild);}
	tempElement.innerHTML = '<div id="imagesHolder" class="posts sub-gallery br5 first-child"></div>';

}



/***********************************************************************************
                                addSavedFavoritesToImageList	
 Add stored favorites to the favoirtes image space. Pass in the User name, the	   
 favorites category.
************************************************************************************/
function addSavedFavoritesToImageList(categoryLabel,iUserName,categoryId){

	var tempElement = document.createElement('div');
//Don't look for new favorites.
	window.iKeepLooping = false;
	var imageHolder = document.getElementById('imagelist');
/* old	var favoriteCount = parseInt(localStorage.getItem(iUserName+'FavoriteCount'));
	for(var i = 0;i<favoriteCount;i++){
		tempElement.setAttribute('id',localStorage.getItem(iUserName+'favorite'+i));
		tempElement.setAttribute('class','post');
		tempElement.innerHTML = '\r\n<a class="image-list-link" href="/account/favorites/'
					+ localStorage.getItem(iUserName+'favorite'+i)
					+'" data-page="0">\r\n<img alt="" src="//i.imgur.com/'
					+ localStorage.getItem(iUserName+'favoriteThumb'+i)
					+'" original-title="">\r\n</a>\r\n';
		imageHolder.firstChild.appendChild(tempElement);
		tempElement = document.createElement('div');
		}    
*/
	var elements = getArrayOfFavorites(iUserName, categoryId);
	var max = elements.length;
	for(var i = 0;i<max;i++){
		tempElement.setAttribute('id',elements[i].postId);
		tempElement.setAttribute('class','post');
		tempElement.innerHTML = '\r\n<a class="image-list-link" href="/account/favorites/'
					+ elements[i].postId
					+'" data-page="0">\r\n<img alt="" src="//i.imgur.com/'
					+ elements[i].Thumbnail
					+'" original-title="">\r\n</a>\r\n';
		imageHolder.firstChild.appendChild(tempElement);
		tempElement = document.createElement('div');
		}                                       
}

/***********************************************************************************
                                addFavoriteToSaved			               		    										  			               			       
 Store a new favorite locally. Pass in the user name, the post id, the thumbnail, 
 the category, and the time of capture. Updates stored data only if stored data   
 is null.									                                        										                                           
************************************************************************************/
function addFavoriteToSaved(iFavorite, iUserName, iFavoriteThumb,iCategory,iTime){
//console.log(iFavorite+'  '+ iUserName+'  '+iFavoriteThumb);
	iUserName = ''+iUserName;
	iFavorite = ''+iFavorite;
//get current favorite count
	var favoriteCount = parseInt(localStorage.getItem(iUserName+'FavoriteCount'));
	if(localStorage.getItem(iUserName+iFavorite)!=null){
//if already done, do again, so get the count id for favoriteCount
		favoriteCount = parseInt(localStorage.getItem(iUserName+iFavorite));
		}

//set favorite id with stored count id
		localStorage.setItem(iUserName+iFavorite,favoriteCount+'');	
//set stored incremented id with favorite id
	localStorage.setItem(iUserName+'favorite'+favoriteCount,iFavorite);
//set thumbnail id
	localStorage.setItem(iUserName+'favoriteThumb'+favoriteCount,iFavoriteThumb);
//set category
	var tempCat = localStorage.getItem(iUserName+'CatId'+favoriteCount);
	if(tempCat == null)
		localStorage.setItem(iUserName+'CatId'+favoriteCount,iCategory);
//set time, if it hasn't been set.
	var tempTime = localStorage.getItem(iUserName+'Time'+iTime);
	if(tempTime == null)
		localStorage.setItem(iUserName+'Time'+favoriteCount,iTime);
//set new favorite count
		if(favoriteCount == parseInt(localStorage.getItem(iUserName+'FavoriteCount')))
			localStorage.setItem(iUserName+'FavoriteCount',(favoriteCount+1));

}

/***********************************************************************************
                                saveFavoritesFromPage
 Scan page and find favorites, then add them to locally stored favorites	
************************************************************************************/
function saveFavoritesFromPage(classString){
	var favoriteElementList = document.getElementsByClassName(classString);
	var i = 0;
	var max = favoriteElementList.length;
	if(window.favoriteOriginalElementCount == max)
		return;
	window.favoriteOriginalElementCount = max;	
	var iTime = window.dateObject.getTime();
	for(i = 0;i<max;i++){
		if(favoriteElementList[i].getAttribute('id') == null)
			continue;
//		console.log(i + ' ' + favoriteElementList[i].getAttribute('id'));
		addFavoriteToSaved(favoriteElementList[i].getAttribute('id'), window.iUserName, favoriteElementList[i].children[0].children[0].getAttribute('src').replace('//i.imgur.com/',''),'0',iTime);
		iTime -= 1;
		}




	}

/***********************************************************************************
                                      iLooper
 Timer for checking favorites. Used for scrolling through newly loaded post 	   
 panels on the various pages.						 	                           
************************************************************************************/
function iLooper(time){
	if(!window.iKeepLooping){
		setTimeout(function(){iLooper(time);}, time);
		return;
		}
	if(window.iPageType == 'home')
		saveFavoritesFromPage('post green');
	if(window.iPageType == 'favorites')
		saveFavoritesFromPage('post');
	setTimeout(function(){iLooper(time);}, time);
	}

/***********************************************************************************
                                removeFavorite					   		
 Remove favorite from locally stored favorites
************************************************************************************/
function removeFavorite(iFavorite, iUserName){
	var i;
	var tempId;
	var tempCatId;
	var tempThumb;
	var tempTime;
	var favoriteCount = parseInt(localStorage.getItem(iUserName+'FavoriteCount'))-1;
	localStorage.setItem(iUserName+'FavoriteCount',favoriteCount);
	var deleteId = parseInt(localStorage.getItem(iUserName+iFavorite));
	localStorage.removeItem(iUserName+iFavorite);
	for(i = deleteId;i<favoriteCount;i++){
		tempId = localStorage.getItem(iUserName+'favorite'+(i+1));
		tempThumb = localStorage.getItem(iUserName+'favoriteThumb'+(i+1));
		tempCatId = localStorage.getItem(iUserName+'CatId'+(i+1));
		tempTime = localStorage.getItem(iUserName+'Time'+(i+1));
//Post Id
		localStorage.setItem(iUserName+'favorite'+i,tempId);
//Thumbnail
		localStorage.setItem(iUserName+'favoriteThumb'+i,tempThumb);
//Entry Id		
		localStorage.setItem(iUserName+tempId,i);
//Category
		localStorage.setItem(iUserName+'CatId'+i,tempCatId);
//Timestamp
		localStorage.setItem(iUserName+'Time'+i,tempTime);
		}
	localStorage.removeItem(iUserName+'favorite'+ favoriteCount);
	localStorage.removeItem(iUserName+'favoriteThumb'+ favoriteCount);
	localStorage.removeItem(iUserName+'CatId'+favoriteCount);
	localStorage.removeItem(iUserName+'Time'+favoriteCount);
	}

/***********************************************************************************
                                getExportList					                   
 Export all locally stored info for a user
************************************************************************************/
function getExportList(iUserName){
	var stringToReturn = 'u|'+iUserName+'|u\r\n';
	var favoriteCount = parseInt(getLSRow(iUserName , 'FavoriteCount'));
	var tempId;
	var i;
	var categories = getLSRow(iUserName , 'favoriteCategories').split('|');
	var max = categories.length;
	stringToReturn += 'c|'+categories[0];
	for(i = 1;i<max;i++)
		stringToReturn += ','+categories[i];
	stringToReturn +='|c\r\n';
	for(i = 0;i<favoriteCount;i++){
	    tempId = getLSRow(iUserName ,'favorite' + i);
		stringToReturn += 'f|'+ i +':';
		stringToReturn += tempId +':';
		stringToReturn += getLSRow(iUserName , 'CatId' + i) + ':';
		stringToReturn += getLSRow(iUserName , 'Time' + i) + ':';
		stringToReturn += getLSRow(iUserName , 'favoriteThumb' + i) + '|f\r\n';
		}
	return stringToReturn;

	}

/***********************************************************************************
                                addFavoriteCategory
 Add a new favorites category for a user.
************************************************************************************/
function addFavoriteCategory(iUserName,category){
	var categories = '';
	var lSCategories = getLSRow(iUserName, 'favoriteCategories');
    //var lSCategories = localStorage.getItem(iUserName+'favoriteCategories');
	if (lSCategories != null)
		categories += lSCategories;
	else 
	category.replace('|','');
	var splitCat = categories.split('|');
	var maxL = splitCat.length;
	for(var i = 0;i<maxL;i++)
		if(splitCat[i] == category)
			return;
	categories += '|' + category;
	setLSRow(iUserName, 'favoriteCategories', categories)
	//localStorage.setItem(iUserName+'favoriteCategories',categories);
	}

/***********************************************************************************
                                getArrayOfFavorites
 Get locally stored favorites that belong to a category
************************************************************************************/
function getArrayOfFavorites(iUserName, categoryId){
	var favoriteArray = [];
	var favoriteCount = parseInt(localStorage.getItem(iUserName+'FavoriteCount'));
	var i;
	var fIndex;
	var fCat;
	var fCatL;
	var x;
	var addToArray = false;
	if(categoryId != -1){
		for(i = 0;i<favoriteCount;i++){
			fCat = localStorage.getItem(iUserName+'CatId'+i).split('|');
			fCatL = fCat.length;
			for(x = 0;x<fCatL;x++)
				if(parseInt(fCat[x]) == categoryId)
						addToArray = true;
			if(addToArray == false)
				continue;
			fIndex = favoriteArray.length;
			favoriteArray[fIndex] = {};
			favoriteArray[fIndex].postId = localStorage.getItem(iUserName+'favorite'+i);
			favoriteArray[fIndex].timeStamp = localStorage.getItem(iUserName+'Time'+i);
			favoriteArray[fIndex].Thumbnail = localStorage.getItem(iUserName+'favoriteThumb'+i);
			favoriteArray[fIndex].categories = fCat;
			favoriteArray[fIndex].entryId = i;
			addToArray = false;
			}
		}
	else{
		for(i = 0;i<favoriteCount;i++){
			fCat = localStorage.getItem(iUserName+'CatId'+i).split('|');
			fIndex = favoriteArray.length;
			favoriteArray[fIndex] = {};
			favoriteArray[fIndex].postId = localStorage.getItem(iUserName+'favorite'+i);
			favoriteArray[fIndex].timeStamp = localStorage.getItem(iUserName+'Time'+i);
			favoriteArray[fIndex].Thumbnail = localStorage.getItem(iUserName+'favoriteThumb'+i);
			favoriteArray[fIndex].categories = fCat;
			favoriteArray[fIndex].entryId = i;
			}
		}

	return favoriteArray;

}

/***********************************************************************************
                                setLSRow
 Insert or update a table stored in local storage
************************************************************************************/
function setLSRow(userName, table, entry)
{
    localStorage.setItem(userName + table, entry);
}

/***********************************************************************************
                                getLSRow
 get a table row stored in local storage
************************************************************************************/
function getLSRow(userName, table)
{
    return localStorage.getItem(userName + table);
}

/***********************************************************************************
                                setupFavoritesBar
 get the favorites bar setup with the categories.
************************************************************************************/
function setupFavoritesBar() {
    var favoritesBar = document.getElementsByClassName('sentence-sorting'); //keep as array so that it gets assigned by reference
    if (favoritesBar[0] == null)
        return;
    var tempElement = document.createElement('span');
    //create label text
    tempElement.innerHTML = 'from the category: ';
    tempElement.setAttribute('class', 'middle-text sorting-text-align');
    favoritesBar[0].appendChild(tempElement);
    //create categoriesToolBarToggle
    tempElement = document.createElement('div');
    tempElement.textContent = 'Sorting Tools';
    tempElement.setAttribute('id', 'categoriesToolBarToggle');
    document.body.appendChild(tempElement);
    //create the category selection
    tempElement = document.createElement('div');
    tempElement.setAttribute('class', 'combobox sorting-text-align');
    tempElement.setAttribute('id', 'categorySelector')
    

    //currently selected
    var currentlySelected = document.createElement('div');
    currentlySelected.setAttribute('class', 'selection');


    //currentSelectedCategoryDisplay
    var currentSelectedCategoryDisplay = document.createElement('span');
    currentSelectedCategoryDisplay.setAttribute('id', 'currentSelectedCategoryDisplay');
    currentSelectedCategoryDisplay.setAttribute('class', 'name');
    currentSelectedCategoryDisplay.innerHTML = 'Imgur';
    //setup a click event with a timeout so that the native jquery doesn't mess with the function trying to change the class name.
    // this was such a pain to figure out!
    currentSelectedCategoryDisplay.onclick = function () { setTimeout(function () { document.getElementById('categorySelector').setAttribute('class', 'combobox sorting-text-align opened'); }, 100); };
    currentlySelected.appendChild(currentSelectedCategoryDisplay);    

    //selection list
    var categoryTableHolder = document.createElement('div');
    categoryTableHolder.setAttribute('class', 'options');

    //currentlySelectedInList
    var currentlySelectedInList = document.createElement('div');
    currentlySelectedInList.setAttribute('class', 'combobox-header-current bold');
    currentlySelectedInList.innerHTML = 'current:';

    //CurrentlySelectedInListTitle
    var currentlySelectedInListTitle = document.createElement('div');
    currentlySelectedInListTitle.setAttribute('class', 'combobox-current green');
    currentlySelectedInListTitle.setAttribute('id', 'currentSelectedCategory');
    currentlySelectedInListTitle.innerHTML = '\r\n\t\t\tImgur\r\n';

    currentlySelectedInList.appendChild(currentlySelectedInListTitle);
    categoryTableHolder.appendChild(currentlySelectedInList);

    //get categories
    var categories = getLSRow(window.iUserName, 'favoriteCategories').split('|');
    var numCat = categories.length;

    //create the toolbar
    categoriesToolBar = document.createElement('div');
    categoriesToolBar.setAttribute('id', 'categoriesToolBar');

    var tempDiv;
    for (var i = 0; i < numCat; i++) {
        tempDiv = document.createElement('div');
        tempDiv.setAttribute('id', 'CatToolBar' + i);
        tempDiv.textContent = categories[i];
        categoriesToolBar.appendChild(tempDiv)
        //do a closure for the onclick to capture i
        //div.firstChild.onclick = function (i) { return function () { cleanFavoritesImageSpace(); addSavedFavoritesToImageList('NotImplemented', window.iUserName, i); } }(i);
    }
    document.body.appendChild(categoriesToolBar);

    //Setup the table
    var categoryTable = document.createElement('ul');
    categoryTable.setAttribute('id', 'CategoriesTable');

    var liTemp;
    for (var i = 0; i < numCat; i++)
    {
        //create table menu for categories
        liTemp = document.createElement('li');
        liTemp.setAttribute('class', 'item');
        liTemp.appendChild(document.createElement('a'));
        liTemp.firstChild.innerHTML = categories[i];
        liTemp.firstChild.setAttribute('class', 'name');
        //do a closure for the onclick to capture i
        liTemp.firstChild.onclick = function (i) { return function () { cleanFavoritesImageSpace(); addSavedFavoritesToImageList('NotImplemented', window.iUserName, i); } }(i);
        categoryTable.appendChild(liTemp);
    }

    categoryTableHolder.appendChild(categoryTable);
    currentlySelected.appendChild(categoryTableHolder);
    tempElement.appendChild(currentlySelected);
    favoritesBar[0].appendChild(tempElement);


}




//delete categories (relink favorites that are in them)
//



//////////////Inject the plugin functions into the DOM///////////////////////
//////////////Inject the plugin functions into the DOM///////////////////////
//////////////Inject the plugin functions into the DOM///////////////////////


/***********************************************************************************
                                loadFunctionsIntoPage
 Pack and load all functions into a script element, then add to the webpage.
************************************************************************************/

//
function loadFunctionsIntoPage()
	{
	var tempElement = document.createElement('script');
	tempElement.setAttribute("type", "application/javascript");
	tempElement.setAttribute("id", "AoFtI");
	var tempPassString = '';

	//var setUpABCPass = setUpABC;
	//tempPassString += setUpABCPass;

	//var recursiveAttributeFinderPass = recursiveAttributeFinder;
	//tempPassString += '\r\n'+ recursiveAttributeFinderPass;

	//var getPageTypePass = getPageType;
	//tempPassString += '\r\n'+ getPageTypePass;

	//var cleanFavoritesImageSpacePass = cleanFavoritesImageSpace;
	//tempPassString += '\r\n'+ cleanFavoritesImageSpacePass;

	//var addSavedFavoritesToImageListPass = addSavedFavoritesToImageList;
	//tempPassString += '\r\n'+ addSavedFavoritesToImageList;

	//var addFavoriteToSavedPass = addFavoriteToSaved;
	//tempPassString += '\r\n'+ addFavoriteToSavedPass;

	//var saveFavoritesFromPagePass = saveFavoritesFromPage;
	//tempPassString += '\r\n'+ saveFavoritesFromPagePass;

	//var iLooperPass = iLooper;
	//tempPassString += '\r\n'+ iLooperPass;

	//var removeFavoritePass = removeFavorite;
	//tempPassString += '\r\n'+ removeFavoritePass;

	//tempElement.textContent = tempPassString;
	//document.body.appendChild(tempElement);

    ////new script tag.
	//var tempElement1 = document.createElement('script');
	//tempElement1.setAttribute("type", "application/javascript");
	//tempElement1.setAttribute("id", "AoFtI1");
	//tempPassString = '';

	//var getExportListPass = getExportList;
	//tempPassString += '\r\n'+ getExportListPass;

	//var addFavoriteCategoryPass = addFavoriteCategory;
	//tempPassString += '\r\n'+ addFavoriteCategoryPass;

	//var getArrayOfFavoritesPass = getArrayOfFavorites;
	//tempPassString += '\r\n' + getArrayOfFavoritesPass;

	//var setLSRowPass = setLSRow;
	//tempPassString += '\r\n' + setLSRowPass;

	//var getLSRowPass = getLSRow;
	//tempPassString += '\r\n' + getLSRowPass;

	//var setupFavoritesBarPass = setupFavoritesBar;
	//tempPassString += '\r\n' + setupFavoritesBarPass;	

    //tempElement1.textContent = tempPassString;


    tempElement.textContent = setUpABC;
	tempElement.textContent += '\r\n' + recursiveAttributeFinder;
	tempElement.textContent += '\r\n' + getPageType;
	tempElement.textContent += '\r\n' + cleanFavoritesImageSpace;
	tempElement.textContent += '\r\n' + addSavedFavoritesToImageList;
	tempElement.textContent += '\r\n' + addFavoriteToSaved;
	tempElement.textContent += '\r\n' + saveFavoritesFromPage;
	tempElement.textContent += '\r\n' + iLooper;
	tempElement.textContent += '\r\n' + removeFavorite;
	document.head.appendChild(tempElement);

    //new script tag.
    var tempElement1 = document.createElement('script');
    tempElement1.setAttribute("type", "application/javascript");
    tempElement1.setAttribute("id", "AoFtI1");

	tempElement1.textContent = '\r\n' + getExportList;
	tempElement1.textContent += '\r\n' + addFavoriteCategory;
	tempElement1.textContent += '\r\n' + getArrayOfFavorites;
	tempElement1.textContent += '\r\n' + setLSRow;
	tempElement1.textContent += '\r\n' + getLSRow;
	tempElement1.textContent += '\r\n' + setupFavoritesBar;

	document.head.appendChild(tempElement1);
    /************************************************************/
    //CSS Element for the document
	var tempElementCSS = document.createElement('style');
	tempElementCSS.setAttribute("id", "AoFtICSS");
	tempElementCSS.textContent = '#categoriesToolBar { \r\n';
	tempElementCSS.textContent += 'position: fixed; \r\n';
	tempElementCSS.textContent += 'width: 15%; \r\n';
	tempElementCSS.textContent += 'height: 400px; \r\n';
	tempElementCSS.textContent += 'background-color: #2C2F34; \r\n';
	tempElementCSS.textContent += 'border-color: #f2f2f2; \r\n';
	tempElementCSS.textContent += 'border-radius: 5px; \r\n';
	tempElementCSS.textContent += 'left: 2%; \r\n';
	tempElementCSS.textContent += 'top: 132px; \r\n';
	tempElementCSS.textContent += 'display: block; \r\n';
	tempElementCSS.textContent += 'z-index: 1; \r\n';
	tempElementCSS.textContent += '} \r\n';
    //sorting options
	tempElementCSS.textContent += '#categoriesToolBarToggle { \r\n';
	tempElementCSS.textContent += 'left: 2%; \r\n';
	tempElementCSS.textContent += 'position: fixed; \r\n';
	tempElementCSS.textContent += 'top: 132px; \r\n';
	tempElementCSS.textContent += 'padding: 5px; \r\n';
	tempElementCSS.textContent += 'text-align: center; \r\n';
	tempElementCSS.textContent += 'vertical-align: middle; \r\n';
    tempElementCSS.textContent += 'border-radius: 5px; \r\n';
	tempElementCSS.textContent += 'background-color: #1BB76E; \r\n';
	tempElementCSS.textContent += 'display: block; \r\n';
	tempElementCSS.textContent += 'z-index: 2; \r\n';
	tempElementCSS.textContent += 'cursor: pointer; \r\n';
	tempElementCSS.textContent += '}';



	document.head.appendChild(tempElementCSS);
	}

//////////////Free Floating Code///////////////////////
//////////////Free Floating Code///////////////////////
//////////////Free Floating Code///////////////////////

loadFunctionsIntoPage();
contentEval("setUpABC();");

