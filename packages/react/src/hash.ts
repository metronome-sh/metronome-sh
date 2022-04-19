import Hashids from "hashids";

const { version } = require("../package.json");

export const hash = new Hashids().encode(version.replace(/\./g, ""));
