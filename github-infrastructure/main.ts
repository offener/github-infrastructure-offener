/// <reference types="node" />

import * as dotenv from "dotenv";
dotenv.config();

import { App } from "cdktf";
import { GithubInfrastructure } from "./stacks/github-infrastructure";

const app = new App();
new GithubInfrastructure(app, "github-infrastructure");
app.synth();
