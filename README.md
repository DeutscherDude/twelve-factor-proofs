# Proofs of concept

<p><b>Number 3, Config </b>- <em>Store config in the environment</em> <p>

> Why?

- Environmental variables allow for granular level of control, platform agnosticism and grouping
- Storing configs in the code as constants is a violation of twelve-factor, which requires strict separation from the code
- A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials
- The twelve-factor stores config in environmental variables

> Test

As mentioned above, the limus test can easily determine, whether the app is created in compliance with the Twelve App rules.
To that end, we will use a simple grep command:
```bash
"grep -r -E -i --exclude-dir=node_modules 'password|token|apikey|api_key|aws_key|awskey|credentials|pwd|email|e-mail|login|username' ."
```
to scan files for credentials, passwords, usernames, logins, emails, secrets and api keys.

> Software and OS used in this implementation:
- OS: Linux alpine in a docker container
- Backing service, Database: PostgreSQL
- Backing service, messaging/queueing system: RabbitMQ
    
> Comparison to in-code credentials, api-keys & secrets

|  | Config in environment      | In-code config |
| ----------- | ----------- | ----------- |
| Ease of making changes      |Simple due to centrailzation        | Scattered credentials and secrets\\ make it difficult to manage |
| Testing in several deployments   | Mocking return value of envProvider allows to use in any deployment        | Mocking the entirety of tested function necessary due to hardcoded values |
| Limus test passed? | Yes, as per the below results of the GREP command | No, credentials simple to extract from the codebase  |

<p>Config in environment - sensitive data is stored in an .env file, which will not be pushed to the repository</p>
```bash
./yarn.lock:    js-tokens "^4.0.0"
./yarn.lock:js-tokens@^4.0.0:
./yarn.lock:  resolved "https://registry.yarnpkg.com/js-tokens/-/js-tokens-4.0.0.tgz#19203fb59991df98e3a287050d4647cdeaf32499"
./yarn.lock:  integrity sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==
./.env:DB_ROOT_USERNAME=test
./.env:DB_ROOT_PASSWORD=test
./.env:RABBITMQ_PASSWORD=asdfg
./.env:apiKey=cmon
./.env:awsKey=jefreeeey
./.env:aws_key=you
./.env:token=can
./.env:credentials=do
./.env:pwd=it
./docker-compose.yml:      POSTGRES_PASSWORD: ${DB_ROOT_PASSWORD?err}
./docker-compose.yml:      POSTGRES_USER: ${DB_ROOT_PASSWORD?err}
./docker-compose.yml:      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD?err}
````
<p>In-code config - all credentials are stored directly the codebase and will be pushed to the repository</p>
```bash
./yarn.lock:    js-tokens "^4.0.0"
./yarn.lock:js-tokens@^4.0.0:
./yarn.lock:  resolved "https://registry.yarnpkg.com/js-tokens/-/js-tokens-4.0.0.tgz#19203fb59991df98e3a287050d4647cdeaf32499"
./yarn.lock:  integrity sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==
./docker-compose.dummy.yml:      POSTGRES_PASSWORD: 'aaaaa'
./docker-compose.dummy.yml:      RABBITMQ_DEFAULT_PASS: 12345
```
