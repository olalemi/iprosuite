# iprouite

A SPA application to manipulate data from a remote API

## Running the application

npm i to install

After installing the packages you can run the application with


npm run start


# All Technical Requirements met:

UI fully Implemented
Application build using React.js
Context API and useState Hook used for state management
React router implemented
Tailwind CSS used for styling



# Functionality and Design choices:

1. Chose Context API over Redux because Redux is more suited for larger applications, for this use case context API is sufficient

2. Context API was used to manage application-wide state like Launch data, loading status, and user settings (like filters and pagination),

3. Pagination was used to efficiently manage the data from the getAllLauches endpoint into subsets of data for scalability, reduced loading time and Improved UX

4. React router used for the dynamic routing of the individual launch page, RootLayout and  for Managing the nested routes





```
