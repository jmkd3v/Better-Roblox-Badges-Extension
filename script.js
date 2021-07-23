function generateBadgeElement(name, description, href, image) {
	// this should be using React, but whatever
	let baseElement = document.createElement("li"); // the list item that everything is contained in
	baseElement.classList.add("list-item", "asset-item");

	let innerElement = document.createElement("a"); // makes it "clickable"
	innerElement.title = description;
	innerElement.href = href;

	let imageElement = document.createElement("span"); // the image
	imageElement.classList.add("border", "asset-thumb-container", "jmk-badge");
	imageElement.title = name;
	imageElement.style.backgroundImage = "url('" + image + "')";

	let nameElement = document.createElement("span"); // the name
	nameElement.classList.add("font-header-2", "text-overflow", "item-name");
	nameElement.innerHTML = name;

	// add the image and name to the inner element
	innerElement.appendChild(imageElement);
	innerElement.appendChild(nameElement);

	// add the inner element to the base element
	baseElement.appendChild(innerElement);

	return baseElement;
}

// fetched from https://devforum.roblox.com/t/open-ugc-catalog-applications-now-open/798186 - may not be complete
let ugcList = [
	77554513, 96554028, 8132835, 1580739387, 30653871, 34485319, 1775060430,
	36897775, 1414801789, 142028241, 329424041, 8256234, 46997221, 133805584,
	573010593, 35227929, 7177677, 2431203181, 968948, 2539808676, 2654365144,
	84872528, 2398773364, 1195018220, 7659381, 65035247, 10402080, 105835676,
	1745885765, 381259634, 634449478, 26690888, 125026259, 115792575, 340337026,
	2252503015, 80877763, 252574978, 58238421, 50149457, 52968820, 7781164,
	350504593, 7858636, 1930073979, 39678533, 35814207, 103999578, 1020490017,
	66808226, 50138143, 215042084, 4983547, 164638398, 1244016, 4900333,
	438930461, 25461577, 125753905, 513415862, 6652514, 7198521, 69612307,
	1882767190, 31822522, 180524806, 155179916, 153604099, 83855370, 273586245,
	2040318, 32839980, 451471882, 20264954, 13461533, 97707058, 8707132, 75398267,
	95773772, 1200831649, 123597957, 29562872, 4090655, 1761716413, 138957456,
	43977205, 3405539, 19619414, 16983447, 35601765, 126959593, 4040663,
	154007453, 210231230, 1528189706, 509715560, 5711308, 101009624, 312647891,
	180242189, 4317782, 24390851, 412616677, 15125423, 61491604, 28276317,
	1744203206, 189529155, 85429145, 112370430, 64706414, 259499138, 14607853,
	104112300,
];

(async () => {
	let badgeContainer = document.querySelector(
		"#roblox-badges-container > .section-content > ul"
	);
	// let dataContainer = document.querySelector("div[data-profileuserid]");
	if (badgeContainer) {
		console.log("Found badge container");

		// for testing use Roblox.CurrentUser.userId;
		// let userId = dataContainer["data-profileuserid"]
		let userId = parseInt(
			location.pathname.substring(7, location.pathname.length - 8)
		);

		console.log(userId);

		let rolesUrl =
			"https://groups.roblox.com/v2/users/" + userId + "/groups/roles";
		console.log(rolesUrl);

		let rolesRequest = await fetch(rolesUrl, {
			method: "GET",
		});
		let rolesData = await rolesRequest.json();
		console.log(rolesData);
		rolesData = rolesData.data;
		rolesData = Object.assign(
			{},
			...rolesData.map((x) => ({ [x.group.id]: x }))
		);
		console.log(rolesData);

		if (ugcList.includes(userId)) {
			badgeContainer.appendChild(
				generateBadgeElement(
					"UGC Creator",
					"This badge is awarded to users who are part of the Roblox User Generated Content program.",
					"https://devforum.roblox.com/t/ugc-catalog-is-now-live/331405",
					"https://cdn.glitch.com/c9aca3ea-4558-456b-8206-a8f36b94cd20%2FUGC.svg"
				)
			);
		}

		if (
			(rolesData[2868472] && rolesData[2868472].role.rank == 106) ||
			rolesData[2868472].role.name == "Accelerator"
		) {
			badgeContainer.appendChild(
				generateBadgeElement(
					"Accelerator",
					"This badge is awarded to users who are part of the Roblox Accelerator program.",
					"https://devforum.roblox.com/t/roblox-2021-the-accelerator-program/997573",
					"https://cdn.glitch.com/c9aca3ea-4558-456b-8206-a8f36b94cd20%2FAccelerator.svg"
				)
			);
		}
	}
})();
