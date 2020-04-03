# In Harmony

#### A color palette generator with accessibility features.

Find a palette for everyone.

Hosted at: https://www.inharmony.app/

### What was this website built with?
I made this website with JavaScript, React, and Redux. I'm also utilizing the Javascript packages iro.js, get-pixels, chroma.js, react-card-flip, and react-alert. The back-end is built with Rails, postgresql, and complete with JWT Auth and B-Crypt password protection.

Link to back-end repo: https://github.com/Rizz0S/in-harmony-backend

### What is In Harmony?
In Harmony is a tool to help web developers, designers, creators and whoever may need it create color palettes that are accessible to everyone - including the visually impaired. The color palette generator can take in an uploaded image, analyze its color data, and produce a palette that represents the image. Alternatively, you are free to create your own palette from scratch by clicking on one of the swatches and using the color picker tool. You can also use the color picker to tweak a palette that has been generated from an image. Additionally, your palette can range from 4-6 colors. Adding or subtracting a color will run the quantize algorithim on the image again to produce a new palette.

### How are accessbility metrics determined?
For the contrast ratios, I'm using the WCAG standards for text readability. The baseline contrast ratio for readable text is a minimum of 4.5:1. The contrast ratios for colorblindess vulnerabilities use the WCAG standard for graphical user interfaces, which is 3.1:1.

Colorblind vulnerabilities were trickier. I am using a custom method to determine those - currently, I'm using a mixture of hue and contrast to determine possibly problematic pairings. I did a lot of research from various sources online to try to come up with something that would close to accurate. Admittedly, it is not perfect. I am open to any suggestions you may have to improve it! I would recommend double checking everything with the application Color Oracle, or the Chrome extension No Coffee.

### How are the palettes generated from an image?
For color quantization, I'm using the median cut algorithim as a base. I'm also using the JavaScript library get-pixels to read the pixel infomation from the uploaded image. From there, I extract a portion of the colors recieved from median cut to produce the final palette.


Created by Summer Rizzo <3
