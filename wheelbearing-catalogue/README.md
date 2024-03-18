# Continental Direct - WheelBearing Catalogue - A catalogue Website to help users find the correct wheelbearings for their vehicle

## Table of contents

- [Overview](#overview)
  - [Key Features](#Key-features)
  - [Screenshot](#screenshot)
- [Our process](#process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
- [Authors](#author)
- [Acknowledgments](#acknowledgments)

## Overview

The catalogue can be used both internally and by customers to find the correct wheelbearings for a wide selection of vehicles. Users are prompted to select options from dropdowns, which consist of Manufacturer, model, engine size, mark series, drive type and fitment. Once the users has filled out the required information the catalogue makes a request to the supabase database where the vehicle information provided by Continental Direct is stored. The Database returns the relevant information to the catalogue, which will be layed out in a card format. 

### Key-features

Users are able to:

- Search wheelbearings by all dropdown criteria
- Search wheelbearings by multiple but not at all dropdown criteria
- Search by FAG number
- Search by SKF number 
- View bearing size
- View key bearing information

### Installation/requirements

Requirements

To run the project you will need Node.js v18.0 or higher. You can check your Node version using node --version in your terminal.

Setup

1. Make sure Node.js is installed on your system. If not, you can download it from here:
2. create or fork or clone of the repo - git clone https://github.com/Continental-Direct/wheelbearing-catalogue.git
3. Navigate into the cloned directory - cd wheelbearing-catalogue
4. install the required dependencies - npm install
5. npm run dev in your terminal and the project should be running


## Process

The process to creating catalogues for Continental Direct is as follows:
1. Continental Direct sends the Excel vehicle Data as a CSV file
2. The data should be uploaded to Supabase with the ID being the primary key
3. Role Level security can be disabled during development
4. Once the table has been created on Supabase, the .env file can be populated with the API URL and key
5. Supabase provides extensive documentation to then access the data from the front-end

### Built with

Front-end:

- React
- React-Router
- Typescript


Back-End:
- SupaBase
- Node JS


### Continued development

There are still features and design updates to be completed

- new images for wheelbearings
- functionality to purchase Bearings, payment gate
- alternatively a way to link the the catalogue to a purchasing site
- user registration


## Authors

https://github.com/kevinzehner

## Link to repository
https://github.com/Continental-Direct/wheelbearing-catalogue