// {
// 	entities: {
// 		key: "als;dka"
// 		name: "askdlasd",
// 		image?: "",
// 		items: [

// 			{
// 				key: ""
// 				name: "asdkasd",
// 				image?: "",
// 				url: "",
// 				path: ""
// 			}

// 		]
// 	}

// }

const fs = require("fs");
const path = require("path");

const TTY_RESET = "\u001b[0m";
const TTY_BOLD = "\u001b[1m";
const TTY_UNDERLINE = "\u001b[4m";

const exclaim = message => TTY_BOLD + TTY_UNDERLINE + message + TTY_RESET;

let isInvalid = false;
const invalidInfoJson = (type, location) => {
	isInvalid = true;
	console.log(
		`${exclaim(type)} info.json for ${exclaim(location)}${TTY_RESET}`
	);
};

const getDirsInDir = dir => {
	return fs
		.readdirSync(dir)
		.filter(filename =>
			fs.statSync(path.resolve(dir, filename)).isDirectory()
		);
};

const index = {};

const categories = ["entities", "scripts", "avatars"];

let thingsNotHostedHere = 0;

for (const category of categories) {
	const categoryPath = path.resolve(__dirname, category);
	if (!fs.existsSync(categoryPath)) continue;

	index[category] = [];

	const subCategories = getDirsInDir(categoryPath);

	for (const subCategory of subCategories) {
		const subCategoryPath = path.resolve(categoryPath, subCategory);
		const location = category + "/" + subCategory;

		let subCategoryInfo = { things: [] };

		// check if info.json exists
		const subCategoryInfoPath = path.resolve(subCategoryPath, "info.json");
		if (!fs.existsSync(subCategoryInfoPath)) {
			invalidInfoJson("Missing", location);
		} else {
			// parse info.json and validate
			try {
				subCategoryInfo = {
					key: subCategory,
					...JSON.parse(fs.readFileSync(subCategoryInfoPath, "utf8")),
					things: []
				};
			} catch (err) {
				invalidInfoJson("Invalid", location);
				continue;
			}

			// name
			if (subCategoryInfo.name == null) {
				invalidInfoJson("No name in", location);
			}

			// image
			if (
				subCategoryInfo.image != null &&
				!fs.existsSync(
					path.resolve(subCategoryPath, subCategoryInfo.image)
				)
			) {
				invalidInfoJson("Image not found in", location);
			}
		}

		// iterate through things inside
		const things = getDirsInDir(subCategoryPath);
		for (const thing of things) {
			const thingPath = path.resolve(subCategoryPath, thing);
			const location = category + "/" + subCategory + "/" + thing;

			let thingInfo;

			// check if info.json exists
			const thingInfoPath = path.resolve(thingPath, "info.json");
			if (!fs.existsSync(thingInfoPath)) {
				invalidInfoJson("Missing", location);
			} else {
				// parse info.json and validate
				try {
					thingInfo = {
						key: thing,
						...JSON.parse(fs.readFileSync(thingInfoPath, "utf8"))
					};
				} catch (err) {
					invalidInfoJson("Invalid", location);
					continue;
				}

				// name
				if (thingInfo.name == null) {
					invalidInfoJson("No name in", location);
				}

				// image
				if (thingInfo.image == null) {
					invalidInfoJson("No image in", location);
				} else {
					if (
						!fs.existsSync(path.resolve(thingPath, thingInfo.image))
					) {
						invalidInfoJson("Image not found in", location);
					}
				}

				// url
				if (thingInfo.url == null) {
					invalidInfoJson("No url in", location);
				} else {
					const checkUrl = url => {
						if (url.startsWith("http") || url.startsWith("tea")) {
							thingsNotHostedHere++;
						} else if (
							!fs.existsSync(path.resolve(thingPath, url))
						) {
							invalidInfoJson("Url not found in", location);
						}
					};

					if (Array.isArray(thingInfo.url)) {
						for (const subThing of thingInfo.url) {
							// name
							if (subThing.name == null) {
								invalidInfoJson("No name in", location);
							}

							// image
							if (subThing.image == null) {
								invalidInfoJson("No image in", location);
							} else {
								if (
									!fs.existsSync(
										path.resolve(thingPath, subThing.image)
									)
								) {
									invalidInfoJson(
										"Image not found in",
										location
									);
								}
							}

							// url
							if (subThing.url == null) {
								invalidInfoJson("No url in", location);
							} else {
								checkUrl(subThing.url);
							}
						}
					} else {
						checkUrl(thingInfo.url);
					}
				}

				subCategoryInfo.things.push(thingInfo);
			}
		}

		// sorting things things
		subCategoryInfo.things = subCategoryInfo.things.sort(
			(a, b) =>
				(a.sort == null ? 9999 : a.sort) -
				(b.sort == null ? 9999 : b.sort)
		);

		index[category].push(subCategoryInfo);
	}

	// sorting sub categories
	index[category] = index[category].sort(
		(a, b) =>
			(a.sort == null ? 9999 : a.sort) - (b.sort == null ? 9999 : b.sort)
	);
}

if (isInvalid) {
	process.exit(1);
} else {
	fs.writeFileSync(
		path.join(__dirname, "index.json"),
		// JSON.stringify(index, null, 4)
		JSON.stringify(index)
	);
	console.log("Successfully written " + exclaim("index.json"));
	console.log(
		exclaim(thingsNotHostedHere + " things") + " are not hosted here"
	);
}
