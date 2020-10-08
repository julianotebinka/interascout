# Project Title

Intera SCOUT

## Getting Started

This project was built using [Serverless](https://www.serverless.com/) framework and targeting AWS.
It's a quite simple code with no persistence, just a mocked PoC of a scraper validating some aspects of the architecture.

### Prerequisites

- [NodeJS](https://nodejs.org/en/) v14 or later
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/)
- An AWS account for serverless deployment (IAM role configured, etc.).

### Installing

This one is simple :).
Clone this repository to your local machine.
Run npm install in the downloaded folder.

And that's it.

## Local running

Serverless Framework allows you to invoke functions locally. I included a sample.json file mocking a path parameter to replicate the scenario when invoking this service via API calls. To run locally:

List available scrapers:
serverless invoke local --function getScrapers

Scraper service (that will scrape Flamengo's website):
serverless invoke local --function scrape --path .\sample.json

## Deployment

Just hit:
serverless deploy

And there you go. Naturally you will have to setup AWS environment and credentials to make it work.

## Authors

- **Juliano Tebinka** - _Initial work_

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
