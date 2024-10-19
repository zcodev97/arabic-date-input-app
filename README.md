# Arabic Date Input Component

## Introduction

This document provides comprehensive information about the Arabic Date Input component, which allows users to input dates in Arabic format.  
For more information

[live demo](https://arabic-date-input-app.netlify.app/).

[GitHub repository](https://github.com/zcodev97/arabic-date-input-app).

### Overview

The Arabic Date Input component is designed to enhance user experience by providing a user-friendly interface for date input in Arabic. It utilizes React and is styled for easy integration into your projects.

### Features

- **Arabic Language Support**: The component is specifically designed to handle date input in Arabic.
- **Customizable Styles**: Users can customize the appearance of the input field to match their application's design.
- **Icon Support**: The component allows for the inclusion of icons to enhance user interaction.
- **Autocompletion and Suggestions**: The component provides autocompletion features and suggestions for date input.
  {{ edit_1 }}
- **Date Picker Integration**: Users can select dates from a calendar interface for easier input.
  {{ edit_2 }}

## Demo of the Arabic Date Input Component

Here’s a quick demo showing how the Arabic Date Input component works:

[Demo of the Arabic Date Input Component](https://youtu.be/f76cTmnRdUI)

### How to Use

1. **Installation**:

   - Ensure that the required libraries are installed. Use the following command to install the Arabic Date Input library:
     ```bash
     npm install arabic-date-input-app
     ```

2. **Setup**:

   - Import the component into your React application:

     ```javascript
     import { ArabicDateInput } from "arabic-date-input-app";
     import { FaAddressBook } from "react-icons/fa";
     import { useState } from "react";
     import "react-datepicker/dist/react-datepicker.css";
     import "arabic-date-input-app/dist/index.css";
     ```

3. **Usage**:

   - Here’s an example of how to use the Arabic Date Input component in your application:

     ```javascript
     function App() {
       return (
         <div
           style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             height: "100vh",
           }}
         >
           <ArabicDateInput
             placeholder="سنة - شهر - يوم"
             inputStyle={{
               width: "150px",
               paddingRight: "50px",
               border: "3px solid #000",
               borderRadius: "30px",
               fontWeight: "bold",
               fontSize: "16px",
             }}
             field={{
               value: "",
               onChange: () => {},
             }}
             form={{}}
             debounceMilliseconds={1500}
           />
         </div>
       );
     }
     export default App;
     ```

### Contribution

If you would like to contribute to improving the component, please open pull requests or report issues.

### Conclusion

We hope this document helps you understand how to use the Arabic Date Input component. If you have any inquiries, feel free to reach out to us.

---

- **Autocompletion**: The component automatically converts various date formats into the standard format (e.g., `2024` to `2024-01-01`, `202411` to `2024-01-01`, `2024.1.1` to `2024-01-01`, `2024/1/1` to `2024-01-01`, and `20240101` to `2024-01-01`).
- **Suggestions**: If the input is ambiguous (e.g., `2024112`), the user can choose between possible interpretations (e.g., `2024-01-12` or `2024-11-02`).

- **Calendar Integration**: Users can pick dates from a calendar displayed in Arabic format.
- **Dynamic Updates**: Users can type dates directly, and the input will update accordingly.
- **Debouncing**: The component allows for configurable speed in converting typed dates (e.g., typing `202411` will convert to `2024-01-01`).
- **Coming Soon Features**:
  - Support for both English and Arabic formats.
  - Additional date formats.
  - More features to enhance usability.

### Contribution

If you would like to contribute to improving the component, please open pull requests or report issues.

### Conclusion

We hope this document helps you understand how to use the Arabic Date Input component. If you have any inquiries, feel free to reach out to us.

---
