'use strict';

function requireAll(r) { r.keys().forEach(r); }

require("./index.js");
require("./index.css");
requireAll(require.context('./static/fonts/', true, /\.(ttf)$/));
requireAll(require.context('./static/images/', true, /\.(png)$/));
requireAll(require.context('./blocks/', true, /\.(js)$/));
requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));