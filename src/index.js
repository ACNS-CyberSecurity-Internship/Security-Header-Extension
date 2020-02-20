import css from "./main.scss";

window.addEventListener("DOMContentLoaded", main);

let mode = 0;
let recommendations = 0;
let optimizations = 0;
let optHeaders = 1;

export function main()
{
	if(window)
	{
		if(window.chrome && chrome.tabs)
		{
			chrome.tabs.query({active: true, currentWindow: true},

				function(tabs)
				{
					getLocalSettings();
					let url = tabs[0].url;
					let numberOfSecurityHeaders = 9;
					let numberOfSettingsDropDowns = 3;
					let data = dataCollection(url, numberOfSecurityHeaders);
					darkModeCSS();

					if(document)
					{
						let numberOfTriangles = numberOfSecurityHeaders + numberOfSettingsDropDowns;
						loadDocument(url, numberOfTriangles, data, new Array(numberOfTriangles));
						let showRecButton = document.getElementById("showRec");
						let showRecOptButton = document.getElementById("showRecOpt");
						let validateButton = document.getElementById("showGoodVal");
						let modeButton = document.getElementById("showDarkMode");

						if(recommendations == 1) {
							showRecButton.checked = true;
						} else {
							showRecButton.checked = false;
						}

						if(optimizations == 1) {
							validateButton.checked = true;
						} else {
							validateButton.checked = false;
						}

						if(optHeaders == 1) {
							showRecOptButton.checked = true;
						} else {
							showRecOptButton.checked = false;
						}

						if(mode == 1) {
							modeButton.checked = true;
						} else {
							modeButton.checked = false;
						}

					}
				});
		}
	}
}

export function dataCollection(url, numberOfSecurityHeaders)
{
	let data = new Array(numberOfSecurityHeaders);

	let get = new XMLHttpRequest();

	get.onreadystatechange = function()
	{
		if(get.readyState === XMLHttpRequest.DONE)
		{
			data[0] = get.getResponseHeader("Strict-Transport-Security");
			data[1] = get.getResponseHeader("Content-Security-Policy");
			data[2] = get.getResponseHeader("x-frame-options");
			data[3] = get.getResponseHeader("x-xss-protection");
			data[4] = get.getResponseHeader("x-content-type-options");
			data[5] = get.getResponseHeader("Referrer-Policy");
			data[6] = get.getResponseHeader("Feature-Policy");
			data[7] = get.getResponseHeader("X-Download-Options");
			data[8] = get.getResponseHeader("Public-Key-Pins");

			createDropDowns(data);
			setImages(numberOfSecurityHeaders, data);
			sendData(url, data);
		}
	};

	get.open("GET", url);
	get.send(null);

	if(data[0] == null)
	{
		setLoading(numberOfSecurityHeaders);
	}

	return data;
}

export function setLoading(numberOfSecurityHeaders)
{
	let images = document.getElementsByClassName("image");

	for(let i = 0; i < numberOfSecurityHeaders; i++)
	{
		let img = document.createElement("IMG");
		img.setAttribute("id", ("img" + i));
		img.setAttribute("class", "headerVisual");
		if (mode == 1) {
			img.setAttribute("src", "../images/index/loading_Dark.gif");
		} else if(mode == 0){
			img.setAttribute("src", "../images/index/loading.gif");
		} else {
			img.setAttribute("src", "../images/index/loading.gif");
		}
		img.style.width = "25px";
		img.style.padding = "0px 0px 5px 0px";
		images[i].appendChild(img);
	}
}

export function createDropDowns(data)
{
	let drops = document.getElementsByClassName("dropDown");

	for(let i = 0; i < drops.length; i++)
	{
		let div = document.createElement("div");
		let par = document.createElement("P");
		let im = document.createElement("img");
		im.setAttribute("align", "left");
		im.setAttribute("width", "23px");
		im.setAttribute("height", "23px");
		im.setAttribute("class", "icon");
		im.setAttribute("id", "shieldIco");
		if(data[i] == null)
		{
			par.innerHTML = "<b> Your Results: </b>" + "Not Found" ;
			if(mode == 0){
				im.setAttribute("src", "../images/index/WarningShield.png");
			} else if(mode == 1){
				im.setAttribute("src", "../images/index/WarningShield_Dark.png");
			} else {
				im.setAttribute("src", "../images/index/WarningShield.png");
			}

		}

		else
		{
			par.innerHTML = "<b> Your Results: </b>" + data[i];
			if(mode == 0) {
				im.setAttribute("src", "../images/index/NotWarningShield.png");
			} else if(mode == 1){
				im.setAttribute("src", "../images/index/NotWarningShield_Dark.png");
			} else {
				im.setAttribute("src", "../images/index/NotWarningShield.png");
			}

		}
		drops[i].appendChild(div);
		div.appendChild(im);
		div.appendChild(par);

	}
}

export function setImages(numberOfSecurityHeaders, data)
{
	for(let i = 0; i < numberOfSecurityHeaders; i++)
	{
		let img = document.getElementById("img" + i);

		if(data[i] === null)
		{
			if(mode == 0) {
				img.src = "../images/index/redX.png";
			} else if(mode == 1) {
				img.src = "../images/index/redX_Dark.png";
			} else {
				img.src = "../images/index/redX.png";
			}
			img.style.width = "20px";
			img.style.padding = "2px 0px 0px 2px";
		}

		else
		{
			if(mode == 0) {
				img.src = "../images/index/greenCheck.png";
			} else if(mode == 1) {
				img.src = "../images/index/greenCheck_Dark.png";
			} else {
				img.src = "../images/index/greenCheck.png";
			}
			img.style.padding = "0px 0px 0px 0px";
		}
	}
}

// Sends data to local server. This function will only succeed on the CSU network.

export function sendData(url, data)
{
	let variables = {
		"URL": url,
		"strict-transport-security": data[0],
		"Content-Security-Policy": data[1],
		"x-frame-options": data[2],
		"x-xss-protection": data[3],
		"x-content-type-options": data[4],
		"referrerpolicy": data[5],
		"Feature-Policy": data[6],
		"X-Download-Options": data[7],
		"Public-Key-Pins": data[8]
	};

	let post = new XMLHttpRequest();
	post.open("POST", "http://129.82.174.202:1025/");
	post.setRequestHeader("Content-type", "application/json");
	post.send(JSON.stringify(variables));
}

export function loadDocument(url, numberOfSecurityHeaders, data, triangleInfo)
{
	let downLoadButton = document.getElementById("download");
	let learnMoreButton = document.getElementById("acns");
	let settingsButton = document.getElementById("settings");
	let showRecButton = document.getElementById("showRec");
	let showRecOptButton = document.getElementById("showRecOpt");
    let validateButton = document.getElementById("showGoodVal");
    let modeButton = document.getElementById("showDarkMode");

	if(downLoadButton && mode == 0){
		downLoadButton.addEventListener("mouseover", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder.gif"
		);
		downLoadButton.addEventListener("mouseout", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder.png"
		);
		downLoadButton.addEventListener("click", () => downloadResults(url, data));
	} else if(downLoadButton && mode != 0) {
		downLoadButton.addEventListener("mouseover", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder_Dark.gif"
		);
		downLoadButton.addEventListener("mouseout", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder_Dark.png"
		);
		downLoadButton.addEventListener("click", () => downloadResults(url, data));
	} else {
		downLoadButton.addEventListener("mouseover", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder.gif"
		);
		downLoadButton.addEventListener("mouseout", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder.png"
		);
		downLoadButton.addEventListener("click", () => downloadResults(url, data));
	}


	if(learnMoreButton && mode == 0){
		learnMoreButton.addEventListener("mouseover", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3.gif"
		);
		learnMoreButton.addEventListener("mouseout", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3.png"
		);
		learnMoreButton.addEventListener("click", learnMore);
	} else if (learnMoreButton && mode != 0) {
		learnMoreButton.addEventListener("mouseover", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3_Dark.gif"
		);
		learnMoreButton.addEventListener("mouseout", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3_Dark.png"
		);
		learnMoreButton.addEventListener("click", learnMore);
	} else {
		learnMoreButton.addEventListener("mouseover", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3.gif"
		);
		learnMoreButton.addEventListener("mouseout", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3.png"
		);
		learnMoreButton.addEventListener("click", learnMore);
	}


	if(settingsButton && mode == 0) {
		settingsButton.addEventListener("mouseover", () =>
			document.getElementById("settingsIcon").src = "../images/index/settings.gif"
		);
		settingsButton.addEventListener("mouseout", () =>
			document.getElementById("settingsIcon").src = "../images/index/settings.png"
		);
		settingsButton.addEventListener("click", settings);
	} else if(settingsButton && mode != 0) {
		settingsButton.addEventListener("mouseover", () =>
			document.getElementById("settingsIcon").src = "../images/index/settings_Dark.gif"
		);
		settingsButton.addEventListener("mouseout", () =>
			document.getElementById("settingsIcon").src = "../images/index/settings_Dark.png"
		);
		settingsButton.addEventListener("click", settings);
	} else {
		settingsButton.addEventListener("mouseover", () =>
			document.getElementById("settingsIcon").src = "../images/index/settings.gif"
		);
		settingsButton.addEventListener("mouseout", () =>
			document.getElementById("settingsIcon").src = "../images/index/settings.png"
		);
		settingsButton.addEventListener("click", settings);
	}

	if(showRecButton) showRecButton.addEventListener("click", () => showRecommended(showRecButton));
	if(showRecOptButton) showRecOptButton.addEventListener("click", () => setOptional(showRecOptButton));
	if(validateButton) validateButton.addEventListener("click", () => validate(validateButton));
	if(modeButton) modeButton.addEventListener("click", () => darkMode(modeButton));

	setDisplayBasedOnVal(recommendations, document.getElementsByClassName("csuRec"));
	setDisplayBasedOnVal(optimizations, document.getElementsByClassName("validate"));
	setDisplayBasedOnVal(optHeaders, document.getElementsByClassName("optional"));

	createAnimations(numberOfSecurityHeaders, data, triangleInfo);
}

export function createAnimations(numberOfSecurityHeaders, data, triangleInfo)
{
	for(let i = 0; i < numberOfSecurityHeaders; i++)
	{
		triangleInfo[i] = {};
		triangleInfo[i].theta = 0;
		triangleInfo[i].scroll = 0;
		animateTriangles(triangleInfo, data, i);
	}
}

export function animateTriangles(triangleInfo, data, i)
{
	let triangleID = "triangle" + i;
	let currentTriangle = document.getElementById(triangleID);

	if(currentTriangle)
	{
		currentTriangle.addEventListener("click", function()
		{
			if(triangleInfo[i].theta !== 0 && triangleInfo[i].theta !== 90)
			{
				return;
			}

			let dropDown = document.getElementById("drop" + i);
			let numLinesNeeded = 2;

			if(i < data.length && data[i] != null)
			{
				numLinesNeeded += data[i].length / 200;
			}

			if(currentTriangle.style.transform === "rotate(90deg)")
			{
				doAnimation(triangleInfo, false, i, currentTriangle, dropDown, numLinesNeeded);
			}

			else
			{
				doAnimation(triangleInfo, true, i, currentTriangle, dropDown, numLinesNeeded);
			}
		});
	}
}

// Plus is True, Minus is False

export function doAnimation(triangleInfo, plusMinus, i, currentTriangle, dropDown, numLinesNeeded)
{
	let id = setInterval(frame, 2.5);

	function frame()
	{
		currentTriangle.style.transform = "rotate(" + triangleInfo[i].theta + "deg)";
		dropDown.style.maxHeight = triangleInfo[i].scroll + "px";

		let negativeFlipper = 1;
		let angle = 0;

		if(plusMinus)
		{
			negativeFlipper = -1;
			angle = 90;
		}

		doAFrame(triangleInfo, i, numLinesNeeded, id, negativeFlipper, angle);
	}
}

export function doAFrame(triangleInfo, i, numLinesNeeded, id, negativeFlipper, angle)
{
	if(triangleInfo[i].theta === angle)
	{
		clearInterval(id);
		return;
	}

	triangleInfo[i].theta -= 1 * negativeFlipper;
	triangleInfo[i].scroll -= numLinesNeeded * negativeFlipper;
}

export function downloadResults(url, data)
{
	let csvData = [date(), url, data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]];

	for(let i = 0; i < csvData.length; i++)
	{
		if(csvData[i] == null)
		{
			csvData[i] = "Not Found";
		}
	}

	let element = document.createElement("a");

	const csvOutput = ["Date", "URL",
		"strict-transport-security",
		"Content-Security-Policy",
		"x-frame-options",
		"x-xss-protection",
		"x-content-type-options",
		"referrerpolicy",
		"Feature-Policy",
		"X-Download-Options",
		"Public-Key-Pins"];


	element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csvOutput + "\n" + csvData));
	element.setAttribute("download", "securityHeaderData.csv");

	element.style.display = "none";
	document.body.appendChild(element);

	element.click();
	document.body.removeChild(element);
}

export function date()
{
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, "0");
	let mm = String(today.getMonth() + 1).padStart(2, "0");
	let yyyy = today.getFullYear();

	today = mm + "/" + dd + "/" + yyyy;
	return today;
}

export function learnMore()
{
	window.open("https://www.acns.colostate.edu/security/#1501169241566-a28bf810-517e");
}

export function settings()
{
	let settingsPage = document.getElementById("settingsPage");
	let mainPage = document.getElementById("allHeaders");
	let mainTitle = document.getElementById("mainTitle");
	let modeTester = document.getElementById("modeTester");

	if(!settingsPage.style.display || settingsPage.style.display === "none")
	{
		settingsPage.style.display = "block";
		mainPage.style.display = "none";
		mainTitle.innerText = "Settings";
		modeTester.style.display = "block";

	}

	else
	{
		settingsPage.style.display = "none";
		mainPage.style.display = "block";
		mainTitle.innerText = "Security Header Test";
		modeTester.style.display = "none";
	}
}

export function showRecommended(checkBox)
{
	if(recommendations == 0) {
		recommendations = 1;
	} else {
		recommendations = 0;
	}
	try {
		localStorage = window.localStorage;
	} catch(e) {
		// Access denied :-(
	}
	localStorage.setItem("recs", recommendations);
	setDisplayBasedOnVal(recommendations, document.getElementsByClassName("csuRec"));
}

export function setOptional(checkBox)
{
	if(optHeaders == 0) {
		optHeaders = 1;
	} else {
		optHeaders = 0;
	}
	try {
		localStorage = window.localStorage;
	} catch(e) {
		// Access denied :-(
	}
	localStorage.setItem("optHead", optHeaders);
	setDisplayBasedOnVal(optHeaders, document.getElementsByClassName("optional"));
}

export function validate(checkBox)
{
	if(optimizations == 0) {
		optimizations = 1;
	} else {
		optimizations = 0;
	}
	try {
		localStorage = window.localStorage;
	} catch(e) {
		// Access denied :-(
	}
	localStorage.setItem("opts", optimizations);
	setDisplayBasedOnVal(optimizations, document.getElementsByClassName("validate"));
}

export function darkMode() {
	if(mode == 1) {
		mode = 0;
	} else {
		mode = 1
	}
	try {
		localStorage = window.localStorage;
	} catch(e) {
		// Access denied :-(
	}
	localStorage.setItem("modeVal", mode);
	location.reload();
}


export function darkModeCSS() {
	let titles = document.querySelectorAll(".title");
	let buttons = document.querySelectorAll(".button");
	let bodys = document.querySelectorAll("body");
	let triangles = document.querySelectorAll(".triangle");
	let icons = document.querySelectorAll(".icon");
	let buttonImages = document.querySelectorAll(".buttonImage");
	let checkmarks = document.querySelectorAll(".checkmark");
	let containers = document.querySelectorAll(".container");

	if(mode == 1) {
		for (let i = 0; i < titles.length; i++) {
			titles[i].className = "title_Dark"
		}

		for (let i = 0; i < buttons.length; i++) {
			buttons[i].className = "button_Dark";
		}

		for (let i = 0; i < bodys.length; i++) {
			bodys[i].style.color = "white";
			bodys[i].style.backgroundColor = "black";
		}

		for (let i = 0; i < triangles.length; i++) {
			triangles[i].src = "../images/index/triangle_Dark.png"
		}

		for (let i = 0; i < icons.length; i++) {
			if (icons[i].src.indexOf("images/index/icky.png") !== -1) {
				icons[i].src = "../images/index/icky_Dark.png";
			} else if (icons[i].src.indexOf("images/index/Certified.png") !== -1) {
				icons[i].src = "../images/index/Certified_Dark.png";
			} else if (icons[i].src.indexOf("images/index/Optimal.png") !== -1) {
				icons[i].src = "../images/index/Optimal_Dark.png";
			}
		}

		for (let i = 0; i < buttonImages.length; i++) {
			if (buttonImages[i].src.indexOf("images/index/download-folder.png") !== -1) {
				buttonImages[i].src = "../images/index/download-folder_Dark.png";
			} else if (buttonImages[i].src.indexOf("images/index/circles-menu-3.png") !== -1) {
				buttonImages[i].src = "../images/index/circles-menu-3_Dark.png";
			} else if (buttonImages[i].src.indexOf("images/index/settings.png") !== -1) {
				buttonImages[i].src = "../images/index/settings_Dark.png";
			}
		}

		for (let i = 0; i < containers.length; i++) {
			containers[i].className = "container_Dark";
		}

		for (let i = 0; i < checkmarks.length; i++) {
			checkmarks[i].className = "checkmark_Dark";
		}
	}
}


export function setDisplayBasedOnChecked(checkBox, items)
{
	if (checkBox.checked)
	{
		setDisplay(items, "block");
	}

	else
	{
		setDisplay(items, "none");
	}
}

export function setDisplayBasedOnVal(val, items)
{
	if (val == 1)
	{
		setDisplay(items, "block");
	}

	else
	{
		setDisplay(items, "none");
	}
}

export function setDisplay(items, displayType)
{
	for(let i = 0; i < items.length; i++)
	{
		items[i].style.display = displayType;
	}
}

export function getLocalSettings() {
	try {
		localStorage = window.localStorage;
	} catch(e) {
		// Access denied :-(
	}
	mode = localStorage.getItem("modeVal");
	recommendations = localStorage.getItem("recs");
	optimizations = localStorage.getItem("opts");
	optHeaders = localStorage.getItem("optHead");
}