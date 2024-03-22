<h1 align="center">
    INTELLITAX
</h1>

<br>

# About
Introducing IntelliTax, your all-in-one solution for tax management and financial planning. With advanced calculation capabilities, personalized tax-saving suggestions, timely reminders, and a responsive chatbot for expert guidance, IntelliTax streamlines the tax process. Plus, visualize your finances effortlessly with intuitive charts. Say goodbye to tax-related stress and hello to seamless financial management with IntelliTax.

## Features

- **User Role:**  IntelliTax is designed for taxpayers, providing them with comprehensive tools and resources to facilitate seamless tax filing.

- **Admin Dashboard:**  Administrators oversee system operations and configurations, ensuring smooth functioning of IntelliTax.

- **Tax Calculations:**  Taxpayers input financial data, and IntelliTax automatically performs accurate tax calculations, offering detailed breakdowns and summaries.

- **Personalized Tax Suggestions:** IntelliTax offers tailored suggestions to optimize tax liabilities based on user data and financial profiles.

- **Interactive Chatbots:** IntelliTax features two chatbots: A resource-based Chatbot for querying tax-related resources and a Personalized Tax Chatbot for addressing tax-filing inquiries and providing personalized assistance to taxpayers.

- **Yearly Tax Details:** IntelliTax provides taxpayers with detailed records of their tax filings for each year, allowing them to access and review their financial information conveniently.

- **Graphical Representation:** IntelliTax enhances user experience by offering graphical representations of tax data over multiple years. Users can visualize their tax trends and patterns more effectively through interactive graphs, aiding in better understanding and analysis of their financial situation over time.

- **Deadline Reminders:**  Users receive timely notifications about upcoming tax deadlines, ensuring timely submission and penalty avoidance.

- **Data Security:**  IntelliTax prioritizes data security, employing robust encryption protocols to safeguard sensitive financial information.


- **Educational Resources:**  Users have access to a wealth of educational materials, including articles and guides, to enhance their understanding of tax laws and regulations.

## Technologies Used

- Frontend: HTML, CSS, Javascript, Handlebars
- Backend: Node.js, Express.js, Chart.js, langchain, OpenAi-api, os library, Streamlit, dotenv
- Database: MongoDB

<br>

## Screenshots
![img1](https://github.com/monisha-max/group6_Intellitax/assets/124153277/74fec379-cad9-40d5-a3df-c0823424377d)
![img2](https://github.com/monisha-max/group6_Intellitax/assets/124153277/4aae02c5-bf43-4402-a746-96473e08cc57)
![login](https://github.com/monisha-max/group6_Intellitax/assets/124153277/59bfa230-d3d7-4c85-a822-c017f6010836)
![ratings](https://github.com/monisha-max/group6_Intellitax/assets/124153277/ecb58726-5d68-4a5a-92e9-73adcda5f374)
![taxyear](https://github.com/monisha-max/group6_Intellitax/assets/124153277/36d67c1b-bc82-4594-924c-04f8a97b74ad)![form](https://github.com/monisha-max/group6_Intellitax/assets/124153277/e55584fb-6265-46e6-9694-7ee80b3d98d6)
![analytics](https://github.com/monisha-max/group6_Intellitax/assets/124153277/40168302-abf5-4eec-9c83-ec39be23f27d)
![charts2](https://github.com/monisha-max/group6_Intellitax/assets/124153277/cbc38152-36e5-45e9-aebe-232ebc6df817)
![WhatsApp Image 2024-03-22 at 2 07 17 PM](https://github.com/monisha-max/group6_Intellitax/assets/124153277/18a2be9f-9258-4f67-a4f3-71cc5d337bc6)
![deadline](https://github.com/monisha-max/group6_Intellitax/assets/124153277/bfe25675-26cf-4ddd-9182-f1919e890785)![suggestions](https://github.com/monisha-max/group6_Intellitax/assets/124153277/36314fef-935a-40c3-ac95-4c78197292d3)
![WhatsApp Image 2024-03-22 at 5 31 05 PM (1)](https://github.com/monisha-max/group6_Intellitax/assets/124153277/9b74be68-a20b-4d81-987b-47b4ce2158f3)
![WhatsApp Image 2024-03-22 at 5 31 05 PM](https://github.com/monisha-max/group6_Intellitax/assets/124153277/f77d9604-0001-4ee9-b2fb-e8e40f7b102c)


<br>

# Installation

```sh
git clone https://github.com/monisha-max/INTELLITAX_GROUP6
```
<br>
Connect to your Mongodb URL to set up the databases<br>
open .auth>MONGO_URI
Remove the existing URL and set your MONGO_URI<be>
    
For creating the MongoDB URL:<br>
Follow the below steps

Sign in to MongoDB Atlas and navigate to your cluster.<br>
Click the "Connect" button, then choose "Connect your application."<br>
Copy the provided connection string, replacing <password> with your database user's password.<br>

# Running the application

### Open three terminals in your code editor

Terminal 1: Setting up main functionalities—Before running the below-mentioned commands on terminal-1, install nodejs from the official website of nodejs.

```sh
npm uninstall bcrypt
npm install bcrypt
npm rebuild bcrypt
node app.js
```

Terminal 2: Setting up Query resolution chatbot

```sh
pip install openai
pip install gradio
python3 chatbot.py or python chatbot.py
```
Terminal 3: Setting up ResearchTool chatbot

```sh
pip install -r requirements.txt
streamlit run researchtool.py
```


<br>
