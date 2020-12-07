const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const getAllFilesToProcess = dir => {
	let toProcess = [];
	const filenames = fs.readdirSync(dir);
	for (const filename of filenames) {
		if (filename.startsWith(".")) continue;
		const filePath = path.resolve(dir, filename);
		if (fs.statSync(filePath).isDirectory()) {
			toProcess = [...toProcess, ...getAllFilesToProcess(filePath)];
		} else {
			if (/\.(?:jpg|png|svg|json|md|yml)$/i.test(filename)) {
				toProcess.push(filePath);
			}
		}
	}
	return toProcess;
};

const DELETE_ONLY =
	process.argv.length > 2 && process.argv[2] == "cleanup" ? true : false;

const exec = command =>
	new Promise((resolve, reject) => {
		child_process.exec(command, (error, stdout, stderr) => {
			if (error) return reject(error);
			return resolve(stdout, stderr);
		});
	});

const processBrotli = async filePath => {
	if (fs.existsSync(filePath + ".br")) fs.unlinkSync(filePath + ".br");
	if (!DELETE_ONLY) {
		await exec("brotli " + filePath);
	}
	console.log(filePath);
};

for (const filePath of getAllFilesToProcess(__dirname)) {
	processBrotli(filePath);
}
