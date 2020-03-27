import React from 'react';

const About = () => {
  return (
    <div className="about">
      <h2>Together, we can browse the web in harmony.</h2>

      <h4>What is In Harmony?</h4>
      <p>In Harmony is a tool to help web developers, designers, creators and whoever may need it create color palettes that are accessible to everyone - including the visually impaired. The color palette generator can take in an uploaded image, analyze its color data, and produce a palette that represents the image. Alternatively, you are free to create your own palette from scratch by clicking on one of the swatches and using the color picker tool. You can also use the color picker to tweak a palette that has been generated from an image. Additionally, your palette can range from 4-6 colors. Adding or subtracting a color will run the quantize algorithim on the image again to produce a new palette.</p>
      
      <h4>Why is accessibility important?</h4>
      <p>In our current technological climate, the Internet is more of a utility than a luxury. Many of our in-place systems rely on the Internet as its primary means of communication and use. So, now more than ever, the web needs to be accessible for everyone. As developers and designers, it is our responsibility to create accessible websites; In Harmony can help make that process easier.</p>
      
      <h4>How are accessbility metrics determined?</h4>
      <p>For the contrast ratios, I'm using the <a href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html" target="blank">WCAG standards</a> for text readability. The baseline contrast ratio for readable text is a minimum of 4.5:1. The contrast ratios for colorblindess vulnerabilities use the WCAG standard for graphical user interfaces, which is 3.1:1.</p>

      <p>Colorblind vulnerabilities were trickier. I am using a custom method to determine those - currently, I'm using a mixture of hue and contrast to determine possibly problematic pairings. I did a lot of research from various sources online to try to come up with something that would close to accurate. Admittedly, it is not perfect. I am open to any suggestions you may have to improve it! I would recommend double checking everything with the application <a href="https://colororacle.org/" target="blank">Color Oracle</a>, or the Chrome extension <a href="https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl?hl=en-US" target="blank"> No Coffee</a>.</p>
      

      <h4>How are the palettes generated from an image?</h4>
      <p>For color quantization, I'm using the <a href="https://en.wikipedia.org/wiki/Median_cut" target="blank">median cut</a> algorithim as a base. I'm also using the JavaScript library get-pixels to read the pixel infomation from the uploaded image. From there, I extract a portion of the colors recieved from median cut to produce the final palette.</p>

      <h4>What was this website built with?</h4>
      <p>I made this website with JavaScript, React, and Redux. I'm also utilizing the Javascript packages <a href=" https://iro.js.org/" target="blank">iro.js</a>, <a href="https://www.npmjs.com/package/get-pixels" target="blank">get-pixels</a>, <a href="https://www.npmjs.com/package/chroma-jschroma.js" target="blank">chroma.js</a>, <a href="https://www.npmjs.com/package/react-card-flip" target="blank">react-flip</a>, and <a href="https://www.npmjs.com/package/react-alert" target="blank">react-alert</a>. The back-end is built with Rails, postgresql, and complete with JWT Auth and B-Crypt password protection.
      <br/>
      The source code can be found <a href="https://github.com/Rizz0S/in-harmony-frontend" target="blank">here</a>.
      </p>

      <h4>This website was built to be accessible. Notice any problems? Contact me at srainrizzo@gmail.com and let me know.</h4>
    </div>
  )
}

export default About;