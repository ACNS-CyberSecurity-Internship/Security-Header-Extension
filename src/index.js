import css from "./main.scss";

window.addEventListener("DOMContentLoaded", main);

export function main()
{
	if(window)
	{
		if(window.chrome && chrome.tabs)
		{
			chrome.tabs.query({active: true, currentWindow: true},

				function(tabs)
				{
					let url = tabs[0].url;
					let numberOfSecurityHeaders = 9;
					let numberOfSettingsDropDowns = 2;
					let data = dataCollection(url, numberOfSecurityHeaders);

					if(document)
					{
						let numberOfTriangles = numberOfSecurityHeaders + numberOfSettingsDropDowns;
						loadDocument(url, numberOfTriangles, data, new Array(numberOfTriangles));
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
		img.src = "../images/index/loading.gif";
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
		im.setAttribute("align", "left")
		im.setAttribute("width", "23px")
		im.setAttribute("height", "23px")
		im.setAttribute("class", "icon")
		if(data[i] == null)
		{
			par.innerHTML = "<b> Your Results: </b>" + "Not Found" ;
			im.setAttribute("src", "../images/index/WarningShield.png");
		}

		else
		{
			par.innerHTML = "<b> Your Results: </b>" + data[i];
			im.setAttribute("src", "../images/index/NotWarningShield.png");
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
			img.src = "../images/index/redX.png";
			img.style.width = "20px";
			img.style.padding = "2px 0px 0px 2px";
		}

		else
		{
			img.src = "../images/index/greenCheck.png";
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

	if(downLoadButton){
		downLoadButton.addEventListener("mouseover", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder.gif"
		);
		downLoadButton.addEventListener("mouseout", () =>
			document.getElementById("downloadIcon").src = "../images/index/download-folder.png"
		);
		downLoadButton.addEventListener("click", () => downloadResults(url, data));
	}
	if(learnMoreButton){
		learnMoreButton.addEventListener("mouseover", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3.gif"
		);
		learnMoreButton.addEventListener("mouseout", () =>
			document.getElementById("lmIcon").src = "../images/index/circles-menu-3.png"
		);
		learnMoreButton.addEventListener("click", learnMore);
	}
	if(settingsButton) {
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

	if(!settingsPage.style.display || settingsPage.style.display === "none")
	{
		settingsPage.style.display = "block";
		mainPage.style.display = "none";
		mainTitle.innerText = "Settings";
	}

	else
	{
		settingsPage.style.display = "none";
		mainPage.style.display = "block";
		mainTitle.innerText = "Security Header Test";
	}
}

export function showRecommended(checkBox)
{
	setDisplayBasedOnChecked(checkBox, document.getElementsByClassName("csuRec"));
}

export function setOptional(checkBox)
{
	setDisplayBasedOnChecked(checkBox, document.getElementsByClassName("optional"));
}

export function validate(checkBox)
{
	setDisplayBasedOnChecked(checkBox, document.getElementsByClassName("validate"));
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

export function setDisplay(items, displayType)
{
	for(let i = 0; i < items.length; i++)
	{
		items[i].style.display = displayType;
	}
}

