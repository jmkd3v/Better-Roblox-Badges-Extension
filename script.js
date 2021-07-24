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

		let badgesRequest = await fetch("https://api.jmk.gg/badges/user/" + userId);
		let badges = await badgesRequest.json();
		badges = badges.badges;

		for (let badge of badges) {
			console.log(badge);
			badgeContainer.appendChild(
				generateBadgeElement(
					badge.name,
					badge.description,
					badge.link,
					badge.image
				)
			);
		}
	}
})();
