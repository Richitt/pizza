## Getting Started

In the project directory, you can run  `npm start` to startup the backend (along with connecting to a local mongoDB).
By default this will be on http://localhost:4000/
In addition, on startup of the front end, as nothing will be loaded, the DB will be populated by the data.csv in /defaultFile.

### Prereq
Make sure mongoDB is installed.

### Tests

Run 'npm test' to run a brief test to make sure the endpoint logic for streak/day is working.

### Endpoints:

These endpoints can be hit separately - each endpoint will be http://localhost:4000/pizzas/{endpoint}

### Highest Consumption Day of a Month (GET): 
## Endpoint: 
/pizzaMonth
## Usage: 
Pass in params, as month, any valid month (EX: "2015-05").
## Return: 
One day, in UTC string, that had the most consumption of pizza for the month.


### Creating a new Pizza/Person object (POST):
## Endpoint: 
/createPizza
## Usage: 
Pass in a body of {person: "", "meat-type": "", date: "" }, and you will get a new person/pizza order
added to the existing mongoDB.


### Longest Streak of Increasing Order Across All Consumption (GET):
## Endpoint: 
/pizzaStreak
## Usage: 
Hit this endpoint to obtain a JSON object of list of days in a row with increasing pizza orders, as well as
how many pizzas per day.


### Longest Streak of Increasing Order Across ONE month (GET):
## Endpoint: 
/pizzaMonthStreak
## Usage: 
Pass in params, as month, any valid month (EX: "2015-05").
## Return: 
A JSON object of list of days in a row with increasing pizza orders, as well as
how many pizzas per day, from one month.


### Pizzas from one person (GET):
## Endpoint: 
/pizzaPerson
## Usage: 
Pass in params, as name, any valid month (EX: "sebastian").
## Return: 
A JSON object of list of orders this person has made.

### Updating orders from a person (POST)
* Specifically chose post here, just to give a little more leniency in the future for any updates body might need
* could be put instead
## Endpoint: 
/updatePizza/{name}
## Usage: 
Put the name of the person one wishes to update in the url, then pass in the body {meatType: {meat you want to update}}
in order to update all orders of this person with the meat they wish (such as sausage).

### Deleting orders from a person (DELETE)
## Endpoint: 
/deletePizza/{name}
## Usage: 
Put the name of the person in here, and hit the endpoint to delete all pizza orders of said person from the DB.


