# Bookstore Application

## Overview

This is a multi-page React application for managing a bookstore. It allows users to browse books, authors, and manage a shopping cart. The application features navigation, a home page, book listing, author listing, book details, and a shopping cart.

## Key Features

1. **Navigation:**
   - The navigation bar provides links to different pages of the application (Home, Books, Authors).

2. **Home Page:**
   - Welcomes users to the bookstore.
   - Displays a featured book section with book cover, title, and a brief description.

3. **Books Page:**
   - Lists all available books.
   - Includes filters to sort books by genre, relevance and newest.

4. **Authors Page:**
   - Lists all authors associated with the bookstore.
   - Clicking on an author's name displays a list of books written by that author.

5. **Book Details:**
   - Allows users to view details of a specific book.
   - Displays information such as title, author, price, genre, description, and cover image.

6. **Shopping Cart:**
   - Lets users add books to their cart.
   - Displays the cart's contents, including book titles and total price.
   - Allows adding/removing items from the cart.

## API

Google Books API is used to fetch the books data.


## Local Setup

To run this ReactJS application locally, follow these steps:

### Prerequisites

- Node.js and npm (Node Package Manager) should be installed on your computer. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the GitHub repository to your local machine using the following command:

```
git clone https://github.com/kgsantosh770/kluster-bookstore.git
```

2. Navigate to the project directory:

```
cd bookstore-application
```

3. Install the project dependencies:

```
npm install
```

### Running the Application

4. Start the development server:

```
npm start
```

This command will start the development server, and your application will be available at [http://localhost:3000](http://localhost:3000) in your web browser.

### Using the Application

5. You can now explore the application by navigating through the various pages using the navigation bar.

6. Feel free to browse books, authors, view book details, and manage the shopping cart as described in the Key Features section.

## Additional Notes

- Authentication and context API will be added in future.

By following these steps, you should be able to set up and run the ReactJS bookstore application locally on your computer.
