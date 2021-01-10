# Zipcodes backend API

This small API is to serve ZIP code information about various zones in Managua.

# Installation

Assuming you have NodeJS install on your machine, clone this repo, navigate to the directory where the cloned repo exists and type into a shell:

    $ npm install
    
# Running

This app runs locally on port 8000. To start the application after you've install all dependencies, type into a shell:

    $ npm start

Then just type http://localhost:8000/ into the address bar of your browser.

# Endpoints

| Endpoint                   | Description                                   |
|----------------------------|-----------------------------------------------|
| /                          | Just the root of the application              |
| /zipcodes/:zip             | Retrieves information in JSON format for :zip |
| /zipcodes/suggestions/:zip | Retrives at most 5 suggestions for :zip.      |

For the /zipcodes/suggestions/:zip route, if :zip is 111, for example, this route will return an array with [11101,11102,11103,11104,11105].
If :zip is a full match, it will just return that value. If there are no matches for :zip (if no zipcodes start with the digits that make up :zip),
this route will return an empty array.