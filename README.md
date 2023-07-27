# Cloudflare Country Codes API
A simple API that uses the `CF-IPCountry` header in a Cloudflare worker to determine the requests
country and then return a list of information about said country.

Uses [Cloudflare Workers](https://workers.cloudflare.com/) and [Hono](https://honojs.dev/).

[Try Me!](https://api.countryin.fo/me?pretty)

## Commands

Running locally:

```bash
npm run dev
```

Testing:

```bash
# run all tests
npm run tests

# run test coverage
npm run tests:coverage

# run test coverage summary
npm run tests:summary
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

Deploy to Cloudflare:

```bash
npm run deploy:dev
npm run deploy:prod
```

## License

[MIT](LICENSE)
