## PRM.web

[![Build Status](https://travis-ci.org/Nebo15/prm.web.svg?branch=master)](https://travis-ci.org/Nebo15/prm.web)

Medical Information System reference front-end for demonstration-only purposes.

Docker: https://hub.docker.com/r/nebo15/prm.web/   
Demo: https://prm-web.herokuapp.com/

## Technologies

- React
- Redux
- Webpack
- Enzyme
- Karma
- Nightwatch

## Workflow

### Git flow

Every task should start a new branch. Branch should be named as task number what its corresponding.
After finish work on a task, you need to create PR.

### Testing

To contribute to the repository be ready to write some tests.

- Unit tests for business logic (we use Mocha)
- Integration tests for UI components (we use Enzyme)
- Acceptance tests for user stories (we use Nightwatch)

### PR

Every task finishes with PR. Eslint, Stylelint, and tests are blocking PRs. To simplify PR review, we deploy every PR's branch automatically on Heroku.
