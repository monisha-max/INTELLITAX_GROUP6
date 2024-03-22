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

- **Interactive Chatbots:**  IntelliTax features two chatbots: Resource-based Chatbot for querying tax-related resources and Personalized Tax Chatbot for addressing tax-filing inquiries, providing personalized assistance to taxpayers.

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

## Work flow
![img1](https://github.com/monisha-max/group6_Intellitax/assets/124153277/74fec379-cad9-40d5-a3df-c0823424377d)
![img2](https://github.com/monisha-max/group6_Intellitax/assets/124153277/4aae02c5-bf43-4402-a746-96473e08cc57)
![login](https://github.com/monisha-max/group6_Intellitax/assets/124153277/59bfa230-d3d7-4c85-a822-c017f6010836)
![taxyear](https://github.com/monisha-max/group6_Intellitax/assets/124153277/36d67c1b-bc82-4594-924c-04f8a97b74ad)![form](https://github.com/monisha-max/group6_Intellitax/assets/124153277/e55584fb-6265-46e6-9694-7ee80b3d98d6)
![analytics](https://github.com/monisha-max/group6_Intellitax/assets/124153277/40168302-abf5-4eec-9c83-ec39be23f27d)
![charts2](https://github.com/monisha-max/group6_Intellitax/assets/124153277/cbc38152-36e5-45e9-aebe-232ebc6df817)
![WhatsApp Image 2024-03-22 at 2 07 17 PM](https://github.com/monisha-max/group6_Intellitax/assets/124153277/18a2be9f-9258-4f67-a4f3-71cc5d337bc6)
![deadline](https://github.com/monisha-max/group6_Intellitax/assets/124153277/bfe25675-26cf-4ddd-9182-f1919e890785)![suggestions](https://github.com/monisha-max/group6_Intellitax/assets/124153277/36314fef-935a-40c3-ac95-4c78197292d3)
![WhatsApp Image 2024-03-22 at 5 31 05 PM (1)](https://github.com/monisha-max/group6_Intellitax/assets/124153277/9b74be68-a20b-4d81-987b-47b4ce2158f3)
![WhatsApp Image 2024-03-22 at 5 31 05 PM](https://github.com/monisha-max/group6_Intellitax/assets/124153277/f77d9604-0001-4ee9-b2fb-e8e40f7b102c)
![ratings](https://github.com/monisha-max/group6_Intellitax/assets/124153277/ecb58726-5d68-4a5a-92e9-73adcda5f374)


<br>

# Installation

```sh
git clone https://github.com/monisha-max/INTELLITAX_GROUP6
```
<br>
connect to your mongodb url to set up the databases<br>
open db>db.js:<br>
remove the existing url and setup ur mongodb url<br>

# Steps to create a mongodb url:
<br>
# Sign in or Sign up for MongoDB Atlas:
<br>

If you already have an account, sign in to MongoDB Atlas. If not, sign up for a new account at MongoDB Atlas.<br>
# Create a New Cluster:
<br>

Once you're logged in, create a new cluster by clicking the "Build a Cluster" button or "Create a Cluster" option. Follow the prompts to choose the cloud provider, region, and cluster configuration. You can choose the free tier or select a paid tier based on your requirements.<br>
# Cluster Configuration:
<br>

Configure your cluster settings, including cluster tier, region, provider settings, etc. You can also customize additional settings like backup options, disk size, etc.<br>
# Deploy Your Cluster:
<br>

After configuring your cluster, click the "Create Cluster" button to deploy it. This process may take a few minutes, so please be patient.<br>
# Whitelist Your IP Address:
<br>

Once your cluster is deployed, you need to whitelist your IP address to allow access to your MongoDB cluster. Go to the "Network Access" tab in your MongoDB Atlas dashboard and click "Add IP Address". You can whitelist your current IP address or specify a range of IP addresses.<br>
# Create a Database User:
<br>

Next, you need to create a database user with appropriate privileges. Go to the "Database Access" tab in your MongoDB Atlas dashboard and click "Add New Database User". Enter a username and password for the new user and set the desired privileges (e.g., read and write access to specific databases).
# Connect to Your Cluster:
<br>

Once your cluster is deployed, navigate to the "Clusters" tab in your MongoDB Atlas dashboard. Click the "Connect" button next to your cluster. MongoDB Atlas provides a connection string that you can use to connect to your cluster from your application code.
# Connect Your Application:
<br>

Use the connection string provided by MongoDB Atlas to connect your application to your MongoDB cluster. You can use the official MongoDB drivers or libraries available for your programming language.<br>
# Create a Database:
<br>

Once your application is connected to your MongoDB cluster, you can create a new database by sending appropriate commands or queries from your application code. You can also create collections and insert documents into your database as needed.
<br>
That's it! You've successfully created a database on MongoDB Atlas and connected your application to it. You can now start storing and retrieving data from your MongoDB database.

# Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend

```sh
cd backend
npm install
npm start
```

Terminal 2: Setting Up Frontend

```sh
cd frontend
npm install
npm start
```

Now, navigate to `localhost:3000` in your browser.
The Backend API will be running at `localhost:5000`.

<br>
