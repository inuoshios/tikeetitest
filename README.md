# TIKEETI TEST

A backend API for a ticket booking system.

## Using Docker

Build the image
```sh
docker build tikeeti .
```
```sh
docker compose up
```
```sh
docker compose down
```

## YARN
> This should be used if you have postgres installed on your local machine. If you do, add your local postgres connection to the environment variables. Include a `DATABASE_HOST` in the env variable if you are using this method.
- Install dependencies `yarn install`
- Run the application `yarn run dev`

## MIGRATION
After a successfull connection to the database. You can run your database migration
```sh
yarn run migration:run
```

## ENDPOINTS
> Tickets

- **Book Ticket** (`/ticket/book-ticket`): This endpoint books a new ticket for the user (guest). See postman documentation for request payload.

- **View Tickets** (`/ticket/view-tickets/{email}`): View tickets returns the ticket associated with a user (it only returns tickets that are not expired). See postman for endpoint documentation.

- **Check Ticket Status** (`/ticket/check-ticket-status?uniqueIdentifier=Ism1a2zBUf`): This endpoint is used to check a ticket status using the ticket unique identifier. If the unique identifier is wrong, it throws an error, it also throws an error if the ticket is already expired. See postman for endpoint documentation.

> Payment

- **Process Payment** (`/payment/gateway`): This is the endpoint for the payment gateway. If the ticket is expired, it throws an error, it also checks if the user has already purchased a ticket. If the amount is also less or equals to zero, it throws an error. See postman documentation for request payload.

- **Confirm Payment** (`/payment?reference=QyRcjooLN1l8CN1BrhY6M9rXbDcMg4s3hrEqIPIM`): Every payment generates a 40-digit long reference number. This is used to pull a particular payment details from the database. See postman for endpoint documentation.

## Features
- Rate Limiting: A rate limiter was setup to prevent abuse of the booking endpoint. A (guest) can make 100 request in a 10 minutes duration.
- Dockerization: You can run your application via Docker. See [here](#using-docker) for installation and usage.
- Tickets expiration after 15 minutes if no payment is made. The `node-cron` module was used to achieve this.
- Tests.
