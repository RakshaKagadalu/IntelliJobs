# IntelliJobs

## INFO6150 - Web design and User Experience - Final Project

<table>
    <thead>
      <tr>
        <th>Name</th>
        <th>NUID</th>
      </tr>
    </thead>
    <tbody>
         <tr>
            <td>Achintya Singh</td>
            <td>001562820</td>
        </tr>
          <tr>
            <td>Ashish Kumar Ramesh</td>
            <td>001556253</td>
        </tr>
          <tr>
            <td>Raksha Kagadalu Raju</td>
            <td>002920092</td>
        </tr>
         </tr>
          <tr>
            <td>Sanaa Rupani</td>
            <td>001567616</td>
        </tr>
    </tbody>
</table>

### 1. Objective

To create an application that provides job applicants a canvas where they can track the statuses of all their job applications. It will give the user an analytical view of the status of their job applications by displaying the statistics. The applicant will have a search page where he can view all his applications regardless fo the status. The applicant can add a new job that he has applied to by filling out details such as Job position, Company name, Job location etc.
The main aim of building this application is to give them a platform where they can easily update and track their job applications during the job search process.

### 2. User stories

- As a user, I want to register for the application.
- As a user, I want to receive an welcome email after registration.
- As a user, I want to login to the application after authenticating my credentials.
- As a user, I want to land in my dashboard where I can see the statistics of all my job applications.
- As a user, I want to view all the jobs I have applied to.
- As a user, I want to filter the search screen based on the status, type etc.
- As a user, I want to add a new job application by filling out the required details.
- As a user, I want to view/update my profile.
- As a user, I want to edit my job applications.
- As a user, I want to delete my job applications.
- As a user, I want to view a calendar with my interview schedule.

### 3. Domain Diagram

![Domain Diagram](DomainDiagram.png?raw=true "Page view")

### 4.Technology Used

- React
- HTML
- SCSS
- Nodejs
- Express
- JavaScript
- MongoDB Atlas

### 5. Prerequisites

- Node.js
- MongoDB
- npm
- VScode

### 6. Running application locally

- Clone the repository

```
$ git clone git@github.com:neu-mis-info6150-spring-2022/final-project-webdevs.git
```

- Navigate to `webapp` folder to run frontend

```
$ cd webapp
$ npm install
$ npm start
```

- Navigate to `server` folder to run backend

```
$ cd server
$ npm install
$ node server
```

- Add `.env` file inside server folder with below details

```
  PORT
  MONGO_URL
  JWT_ENCKEY
  JWT_EXPIRY
```


