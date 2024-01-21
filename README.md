# Product Viewer App

#### This App allows you upload a JSON data file and see, sort and filter a list of products, as well as paginate through them.

#### Developed using React, Typescript, Sass and JEST

#### Check the app: https://bmigueldev.github.io/product-viewer

## Instructions to run application in development mode:
- Open command line and navigate to project's folder: "product-viewer"
- Run command "npm install"
- Run command "npm start" to start application in the browser
###### Note: The unit tests can be run with the command "npm run test"

## Usage instructions:
- Click "Load Test Data" to instantly load a local dummy data file onto the app
- Alternatively, click "Upload" to search and load a json file from the file system (Note: All products in a file must have the same characteristics)
- After loading data onto the app:
    - Click any column to sort it. Click it again to sort it in descending order. Click it again to go back to unsorted
    - Click the "X" next to a column to hide that column. That column's name will apear above the table; click it again to bring it back
    - Use the side bar to filter the products list based on several characteristics
    - Use the page numbers below the table to navigate through product pages

## App functionalities:
- Load and see a list of products (either test data or imported from local machine)
- Sort, filter and hide the list of products
- Paginate through list of products

## Aspects shown in this project:
- React, Typescript, Sass
- Gitflow Workflow
- Unit Testing (JEST and RTL) (used only in the implementation of list of products)
- Test Driven Development (TDD) (used only in the implementation of list of products)
- Responsive Design (basic)
