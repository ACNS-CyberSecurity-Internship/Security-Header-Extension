# Security Header Chrome Extension

A Chrome Extension Built to Check the Presence of Embedded Security Headers. Developed by the ACNS Cybersecurity 
Internship Web team using modern web tools.

The extension can be found at [this]() link on the Chrome Web Store. 

## Security Headers Checked

| Security Header           | Description |
| ------------------------- | ----------- |
| Strict-Transport-Security | Used to ensure that the browser is using a secure connection. |
| Content-Security-Policy   | Controls what scripts can be loaded on the page. |
| X-Frame-Options           | Utilized to prevent UI Redressing attacks that stem from clickjacking. |
| X-XSS-Protection          | Utilized to detect malicious HTML input and stop sites from loading these dangerous scripts. |
| X-Content-Type-Options    | A MIME-sniffing utility that tells browsers what to do with recognized and unrecognized file types. |
| Referrer-Policy           | Allows users to track where they came from. |
| Feature-Policy            | Used to enable or disable certain features on the browser. |
| X-Download-Options        | Prevents html files running as a part of the site and forces users to download them and open them manually. |
| Public-Key-Pins           | Allows HTTPS websites to resist impersonation by attackers using mis-issued or otherwise fraudulent digital certificates. |

# About The Project

## Motivation

This project was developed to show web developers simple, quick information about the security header information of 
their websites prior to production. We decided to use a simple easy to read interface so that the extension would be 
primarily used for developers who want information at a glance.

## Tech / Framework Used

- [HTML](https://en.wikipedia.org/wiki/HTML) / [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- [Node.js](https://www.javascript.com) / [Webpack](https://www.javascript.com) / [Mocha](https://www.javascript.com)
- [Google Chrome Extensions](http://www.chromeextensions.org)

## Installation

The extension can be found at [this]() link on the Chrome Web Store. 

If you wish to contribute to this project, installation is simple. After cloning the repository, you can build the 
extension by running the command

`npm run build`

in your terminal. If you use Webstorm for web development, configuration files have been provided for you. Simply click 
the run button and the extension will build.

After a successful build, the extension files will exist in a new dist directory. In Chrome, navigate to 
[your extensions directory](chrome://extensions/). Slide the developer switch in the top right of the screen if you 
haven't already. Load the dist folder through the unpacked loader. The extension will load.

After making changes, you will need to click the reload button on the extension to view your changes.

## Issues and Pull Requests

Feel free to submit issues and pull requests as you feel fit to the project. We will do our best to respond to the 
contributions in a timely manner. Adding labels to issues helps our team organize and prioritize issues, and therefore 
labeled issues will be prioritized over others.
