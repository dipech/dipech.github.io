import {ApiResource} from "../classes/api-resource";

// Top-level resources
export const resumeRes: ApiResource = new ApiResource("resume", "data.json");
export const portfolioRes: ApiResource = new ApiResource("portfolio", "data.json");
export const blogRes: ApiResource = new ApiResource("blog", "data.json");
export const aboutMeRes: ApiResource = new ApiResource("about-me", "data.json");

// AboutMe resources
export const aboutMeTextRes: ApiResource = new ApiResource("about-me", "text.md");
