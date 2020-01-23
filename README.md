# Security Header Chrome Extension

### A Chrome Extension Built to Check the Presence of Embedded Security Headers.

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

## Motivation
This project was created to allow an easy way for developers to check for security header implementation on their websites. These headers provide the website with a basic level of security and are important for any website in which the developer intends to house information which should be protected.

## Tech / Framework used

- [HTML](https://en.wikipedia.org/wiki/HTML)
- [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- [JavaScript](https://www.javascript.com)
- [Google Chrome Extensions](http://www.chromeextensions.org)

## Installation

The extension is not in the Chrome Store yet. Please follow the steps below for installation;

- Go to “[https://github.com/acns-web-team-inc/sl_extension](https://github.com/acns-web-team-inc/sl_extension)” to download a zip copy of the extension.

- Extract the zip file.

- Open Google Chrome

- Type “chrome://extensions” to the address bar

- Turn on “Developer mode” on the top right side of the screen

![Developer Mode Switch](https://lh3.googleusercontent.com/qTifPC6hc8_qcWjT2ZeZ_GLlDXGMiBfBq-2MUoCESkCh5HCE5CvQXMc5YgDE1SAX3hhyULTEaS0B "DevMode")

- A new set of new options will appear at the top left side of the screen under the blue bar

- Click “Load unpacked”

- When you do, you will get a prompt to select the extension directory. Select the folder that you have extracted the extension contents to.

## How to use?

When you first click the extension, you’ll see the window below. Each drop down represents a header that is cheched for by the plugin. Left of the name will be a Red X for not found or a Green Check for found. This is the basis of how the plugin works as the headers will be check for automatically as you open the extension. The drop down arrows will give you more information about each header. Above the headers exists two buttons download and learn more these buttons are explained in full below.

![Basic Info](./resources/images/screen1.PNG "Basic Information")

If you click the "Learn More" button, you will be taken to the [CSU ACNS Cybersecurity webpage](https://www.acns.colostate.edu/security/#1501169241566-a28bf810-517e) about web security headers . This page will include their short description about the headers as well as if they recommend the header or not.

The final feature is the “Download Info” button. When you click this button, you can download a .csv file that holds date and URL information and Security Response Headers settings of the website or the server you are communicating with.

Please feel free to contact us via [ACNS_Cybersecurity_Interns@colostate.edu](mailto:ACNS_Cybersecurity_Interns@colostate.edu) if you have questions about the extension or if you need help with installation and/or usage.
