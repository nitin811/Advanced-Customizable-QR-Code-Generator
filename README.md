## Advanced Customizable QR Code Generator

**Project Summary:** A modern, feature-rich web application built to generate dynamically customized QR codes using a third-party API. The project demonstrates strong proficiency in vanilla JavaScript for state management, API parameter serialization, and advanced UI/UX controls.

## 🔗 Live Demo

You can try the live version of the project here:

🌐 **Live URL:**  
[Click Me!!](https://advanced-customizable-qr-code-gener.vercel.app/)

This demo showcases:
- Adjustable QR Code Size  
- Custom Foreground & Background Colors  
- Instant QR Preview  
- PNG / JPG Download Support  


* **Complex API Parameterization:** Implemented logic to serialize **four dynamic user-defined parameters** (data, size, foreground color, and background color) into a single API request URL, showcasing control over complex data structures.
* **Asynchronous State Management (Loaders & Error Handling):** Developed a comprehensive `updateUIState` function to manage the application's visual state (`initial`, `loading`, `success`, `error`), providing animated feedback (CSS loading spinner) and graceful failure messages.
* **Customizable Output:** Allows users to configure size and **select custom foreground and background colors** via native color pickers, adding layers of user control and input validation.
* **Dynamic Client-Side File Manipulation:** Engineered the download functionality to dynamically adjust the API URL and the downloaded file's extension (`.png` or `.jpg`) based on user selection, demonstrating control over file formats and MIME types.
* **Modern, Responsive Dark Theme:** Utilized advanced CSS features (Flexbox, custom properties, and animations) to deliver a professional, accessible, and responsive user interface.

**Technologies:** HTML5, CSS3 (Advanced Layouts), Vanilla JavaScript (ES6+), Third-Party REST API Integration.
