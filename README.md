#
# Software Documentation

I intend on developing a web application that features information on a bakery business. Below is information on the software requirements and architecture I will use when developing this web application.
#
#
## System Architecture

I will be using the MERN stack to develop my application. I will be using `Heroku` to deploy my application. And because I plan on deploying to `Heroku` I will use "`Create React App`" to develop the front end of my application. This is because I have experience deploying full stack `React` applications to `Heroku` and to my knowledge `Vercel` is more suited to static serverless `Next.js` applications. 
#
#
## System Requirements Specifications
#
### Functional Requirements
 - The system must allow the user to sign up and/or login with an email.
 - The system must allow any user to view information about the business on the home page.
 - The system must allow any user to view products on offer in the Menu page.
 - The system must allow any user to view the location and other information about the business on the About page.
 - The system must allow a logged in user to view the contact page and make enquiries about the business.
 - The system must allow a logged in user to be able to recommend a product not on offer but could be.
 - The system must allow a logged in user to be able to view the products they recommended.
 - The system must allow an admin user to add, edit, or remove products from the Menu page.
#
### Non-Functional Requirements
 - The web app will use React and make use of BrowserRouter dependency that will allow the user to switch between pages within the web app without needing the browser to constantly load a new page.
 - The application will make use of MongoDB Atlas as a secure database.
 - The application will make use of JWT to ensure security for user accounts
 - The application will make use of a clean and clear UI to allow for the user to easily navigate the application.
#
### User Stories
 - As a user, I should be able to navigate between the different pages the site has to offer.
 - As a user I should be able to sign up or login to the site.
 - As a user I should be able to add product recommendations on the Menu page.
 - As a user I should be able to view the contact information of the business when logged in. 
  - As a user I should be able to provide my own contact information when logged in.
 - As an admin user I should be able to add, edit, or remove products from the Menu page
 
#
This webapp will have a simple and easy to use UI. The architecture of the backend will not delay the user from accessing the different parts of the site. This webapp will allow a user to add product recommendations, thus allowing the business to cater more specifically to consumer needs.
#

# Usage

### Home Page
This is the landing page of the web app. A user will be able to view pictures of somme the products on offer and the ability to navigate to an Instagram link of the business.
#
### Menu Page
Here the user can view all the products on offer. If a user logs in, they can recommend products to the business to sell. If the user is an admin, they can add, edit, or delete products and product recommendations.
#
### About Page
Here the user can learn more about the business, like its delivery policy, location and other FAQ.
#
### Contact Page
Here the user can enter their information as well as some additional information to contact the business.
#
### Sign In/Sign Up Page
Here the user can log in with their email and password, or sign up with that information if they haven't already.
### Header and Footer
The tabs in the header and footer can be used to navigate to the different pages of the website. The tabs in the footer all navigate to the About Page for now.
#
## Running this application locally
To run this application locally, first remove the `NODE_ENV` value from the `.env` file. Then in the `backend/package.json` change the `start` value to `"start": "nodemon app"`. Run `npm install` then `npm start` from the backend directory, thereafter run `npm install` then `npm start` from the frontend directory. No API keys are needed.
#
## Security
No API keys were needed for the usage of this application. User passwords are salted and hashed when storing them in the database so we don't save any plain text passwords.
#
## Deployment
This application is deployed on Heroku as a full stack application. I have experience with deploying a full stack application so I have done that again.
#
## Link to Site
https://confessionsofabakerholic.herokuapp.com/