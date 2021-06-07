# Sky Betting and Gaming - JavaScript Tech Test Submission

## Choices Made

* I've been unable to establish a websocket connection through Docker that was fit for purpose in this build. Instead I have used the Sportsbook API to tackle the tasks within.

* The biggest limitation this has caused is the need to repeatly fetch from the API for different levels of data such as

1. Finding live events through one fetch
2. Mapping the feature market IDs to an array and then creating a function to fetch the results of a concatentated address
3. Mapping the outcome Ids of these feature markets to an array and then creating a similar function to fetch results.

## App Description

The application shows the currently live Football events; with two collapsing tables showing both the feature markets and the first outcome associated with this featured market.

Clicking the feature markets table will expand/collapse the view of both markets and outcomes; outcomes cannot be opened without markets being open so if a user clicks this box when collapsed it is expected to have no effect.

Clicking the feature outcome table will toggle between Fractional and Decimal odds for the user.

All of the code I have written is within .src/posts

## Tasks Completed
Task One

1. Build an application which displays the currently live Football events. An example of making this request is shown below.
2. Add an option to show the primary market for each of the events
   1. The primary market should also result in the odds showing for any outcomes linked to the market*
3. Add a feature to toggle the odds display between fractional and decimal (this should apply globally to any place in the app where odds are shown)

-* This currently only shows the first outcome linked to each market

The submission uses the Sportsbook API JSON file

## Requirements

* Docker - required for connection to the JSON image listed below

```bash
# running the basic image
docker run -it --rm --name sbg-tech-test-api -p 8888-8890:8888-8890 sbgtechtest/api:2.0.0
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


