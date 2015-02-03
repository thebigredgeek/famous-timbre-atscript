System.config({
  "paths": {
    "*": "lib/*.js",
    "famous-timbre-atscript/*": "lib/*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "famous": "github:Famous/famous@0.3.4",
    "github:Famous/famous@0.3.4": {
      "css": "github:systemjs/plugin-css@0.1.0"
    }
  }
});

