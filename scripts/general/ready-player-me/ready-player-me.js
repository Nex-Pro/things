var tablet = Tablet.getTablet("com.highfidelity.interface.tablet.system");

var button = tablet.addButton({
	text: "Ready Pl...",
	icon: Script.resolvePath("wolf3d.jpg"),
	iconPadding: 0
});

var overlayWebWindow = new OverlayWebWindow({
	title: "Ready Player Me",
	source: "about:blank",
	width: 1280,
	height: 720,
	visible: false
});

var uuid = "com.tivolicloud.readyPlayerMe";

function emitEvent(key, value) {
	overlayWebWindow.emitScriptEvent(
		JSON.stringify({ uuid: uuid, key: key, value: value })
	);
}

function onUpload(name, avatarUrl) {
	var response = Metaverse.readyPlayerMe(name, avatarUrl);
	MyAvatar.useFullAvatarURL(
		response.avatarUrl,
		response.avatarUrl.split("/").pop()
	);
	setActive(false);
}

overlayWebWindow.webEventReceived.connect(function (jsonStr) {
	var data = null;
	try {
		data = JSON.parse(jsonStr);
	} catch (err) {
		return;
	}
	if (!data.uuid && !data.key) return;
	if (data.uuid.indexOf(uuid) == -1) return;

	switch (data.key) {
		case "username":
			emitEvent("username", AccountServices.username);
			break;
		case "upload":
			onUpload(data.value.name, data.value.avatarUrl);
			break;
	}
});

function setActive(active) {
	button.editProperties({ isActive: active });
	overlayWebWindow.setURL(Script.resolvePath("ready-player-me.html"));
	overlayWebWindow.setVisible(active);
}

button.clicked.connect(function () {
	setActive(!button.getProperties().isActive);
});

overlayWebWindow.closed.connect(function () {
	setActive(false);
});

Script.scriptEnding.connect(function () {
	tablet.removeButton(button);
});
