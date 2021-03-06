module.exports = (name, moduleName, description, unstable, public) => `
{
  "name": "${moduleName}",
  "version": "0.0.0",
  "description": "${description}",
  "author": "Workday, Inc. (https://www.workday.com)",
  "license": "Apache-2.0",
  "main": "dist/commonjs/index.js",
  "module": "dist/es6/index.js",
  "sideEffects": false,
  "types": "dist/es6/index.d.ts",
  "repository": {
    "type": "git",
    "url": "https://github.com/Workday/canvas-kit/tree/master/modules/${
      unstable ? '_labs/' : ''
    }${name}/react"
  },
  "files": [
    "dist/",
    "lib/",
    "index.ts",
    "ts3.5/**/*"
  ],
  "typesVersions": {
    "<=3.5": {
      "*": [
        "ts3.5/*"
      ]
    }
  },
  "scripts": {
    "watch": "yarn build:es6 -w",
    "clean": "rimraf dist && rimraf ts3.5 && rimraf .build-info && mkdirp dist && mkdirp ts3.5/dist",
    "build:cjs": "tsc -p tsconfig.cjs.json",
    "build:es6": "tsc -p tsconfig.es6.json",
    "build:rebuild": "npm-run-all clean build",
    "build:downlevel-dts": "yarn run downlevel-dts dist ts3.5/dist",
    "build": "npm-run-all --parallel build:cjs build:es6 --sequential build:downlevel-dts",
    "depcheck": "node ../../../${unstable ? '../' : ''}utils/check-dependencies-exist.js"
  }, ${
    public
      ? `
  "publishConfig": {
    "access": "public"
  },`
      : ``
  }
  "keywords": [
    "canvas",
    "canvas-kit",
    "react",
    "components",
    "workday",
    "${name}"
  ],
  "peerDependencies": {
    "react": "^16.8 || ^17.0"
  }
}
`;
