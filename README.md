# Movie-Seats-Booking

*SoftUni VueJS Course Project - March 2021*

## Project Description

This is an application for online movie seats booking. Admin users can add new movies and edit or delete existing ones, guest users can browse through the existing movies, while registered users can also view the movie details, choose their desired one, pick their seat from the available ones and place their order.
VueJS is used for the client-side, backend - NodeJS, Express JS and MongoDB.

## Installation and Prerequisites

After code is downloaded, all dependecies should be installed (`npm install`). After that project can be started by running `npm start` for the backend and `npm run serve` for the frontend. Frontend (in folder *frontend*) is running on http://localhost:8080/, backend API - on http://localhost:9999/. The API is in the same repository in folder *api*. You would need to have NodeJS and MongoDB preinstalled.

## Routes and User Roles (Accessibility)

| Page               | Functionality                                             | Route         | Guest            | User             | Admin            |
| -----              | --------------                                            |-------        | -------------    |------            |-------           |
| Home               | View Home Page                                            |/              |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| All Movies/Search  | View all movies and search through them                   |/all           |:heavy_check_mark:|:heavy_check_mark:|:heavy_check_mark:|
| Register           | New user registration                                     |/register      |:heavy_check_mark:|       :x:        |         :x:      |
| Login              | Sign in for existing user                                 |/login         |:heavy_check_mark:|       :x:        |         :x:      |
| Movie Details      | View movie details                                        |/details/:id   |:x:               |:heavy_check_mark:|:heavy_check_mark:|
| Movie Details      | Delete movie (after confirmation)                         |/details/:id   |       :x:        |       :x:        |:heavy_check_mark:|
| Movie Details      | Book movie seats (after confirmation of details)          |/details/:id   |       :x:        |:heavy_check_mark:|       :x:        |
| Movie Details      | Rate movie                                                |/details/:id   |       :x:        |:heavy_check_mark:|       :x:        |
| Create Movie       | Create new trip                                           |/movie/create  |:x:               |:x:               |:heavy_check_mark:|
| Edit Movie         | Edit existing trip                                        |/movie/edit/:id|:x:               |:x:               |:heavy_check_mark:|
| User Profile       | View All Orders (created by that user)                    |/user/profile  |:x:               |:heavy_check_mark:|:x:               |
| Admin Panel        | View All Users and make selected user admin               |/user/profile  |:x:               |:x:               |:heavy_check_mark:|
| Edit User Order    | Edit selected order (change status)                       |/user/profile  |:x:               |:x:               |:heavy_check_mark:|


