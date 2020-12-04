# Tivoli things

Everything is split into 3 categories of **avatars**, **scripts** and **entities**.

Each category has a sub-category which can have any name. There must be an `info.json` file inside with a required `name` and optional `image`.

Inside each category are things. This is where you store their content and an `info.json` file with required `name`, `image` and `url`. Note that the url can start with `http` or `tea` but preferable just the filename ending with `.fst`, `.js`, `.json`.

## Build

Write `index.json` file with `node generate-index.js` to make sure structure is valid.

Gitlab pipeline will fail to push if invalid!
