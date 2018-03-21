# LINKapp

LINKapp is my Stackthon (full stack hackthon) project. The inspiration of this project is from the inconvenience I experienced in personal financial management. LINKapp is a fintech app for personal financial management. It allows users to track balances and transactions for bank, credit card and investment accounts through a single user interface.

## Demo
Please visit https://amazing-linkapp.herokuapp.com to view the platform. Note that it is a work in progress and will change from time to time

## Setup
To set up LINKapp locally, you'll need to take the following steps:

Fork or clone our repository
npm install
Set up webpack - check out the sample file in my root directory.

This project currently relies on a secrets.js file that must be located in you project root. The secrets.js must have the following structure:

process.env.GOOGLE_CLIENT_ID = 'CLIENT_ID';
process.env.GOOGLE_CLIENT_SECRET = 'SECRET';
process.env.GOOGLE_CALLBACK = 'CALLBACK_URL_FOR_AUTH';

process.env.PLAID_CLIENT_ID = 'CLIENT_ID';
process.env.PLAID_SECRET = 'SECRET';
process.env.PLAID_PUBLIC_KEY = 'CALLBACK_URL_FOR_AUTH';

LINKapp relies on Plaid.com api for data aggregation from financial institutions. The current (default) environment of the app is in sandbox mode.  You can retrieve the sandbox api key from Plaid.com website. In the sandbox mode you can experience the functionality of cross-platform access to various financial institutions for sandbox accounts.
If you plan to run this app in development or production mode, which will allow you to access user personal accounts, you will need to set up a Plaid development or production account.  After you set up development or production accounts, update the above default credential with the "development" or "production" credential you receive.  Please note monthly fees will be charged to production accounts and development accounts (above certain data usage.)

## Run app
npm run start-dev

to allow webpack to run once, and after that you can run it in production mode.

## Contribute
I would be more than happy to share my project with you, so feel free to reach out to me and I welcome any and all contributions.

