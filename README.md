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

For in-code config:

```bash
grep -r -E -i --exclude-dir=node_modules 'password|pass|token|apikey|api_key|aws_key|awskey|credentials|pwd|email|e-mail|login|username|uri' ./src/config-in-code
```
to scan files for credentials, passwords, usernames, logins, emails, secrets and api keys.

For in-env config:

```bash
grep -r -E -i --exclude-dir=node_modules 'password|token|apikey|api_key|aws_key|awskey|credentials|pwd|email|e-mail|login|username|uri' ./src/config-in-env
```

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
./src/config-in-env/config/envService.ts:       async getRabbitMqUri() {
./src/config-in-env/config/envService.ts:               if (this.env?.parsed?.RABBITMQ_URI === undefined)
./src/config-in-env/config/envService.ts:                       throw new Error('RabbitMQ URI not set!');
./src/config-in-env/config/envService.ts:               return this.env.parsed.RABBITMQ_URI;
./src/config-in-env/docker-compose.yml:      DB_URI: ${DB_URI?err}
./src/config-in-env/docker-compose.yml:      POSTGRES_PASSWORD: ${DB_ROOT_PASSWORD?err}
./src/config-in-env/docker-compose.yml:      POSTGRES_USER: ${DB_ROOT_PASSWORD?err}
./src/config-in-env/docker-compose.yml:      RABBITMQ_DEFAULT_PASS: ${RABBITMQ_PASSWORD?err}
./src/config-in-env/rabbit/rabbitConnection.ts:         const uri = await this.envService.getRabbitMqUri();
./src/config-in-env/app.env:RABBITMQ_URI=amqp:qwerty:asdfg@localhost:5672
```

<p>In-code config - all credentials are stored directly the codebase and will be pushed to the repository</p>

```bash
./src/config-in-code/docker-compose.yml:      DB_URI: ''
./src/config-in-code/docker-compose.yml:      POSTGRES_PASSWORD: 'aaaaa'
./src/config-in-code/docker-compose.yml:      RABBITMQ_DEFAULT_PASS: 12345
./src/config-in-code/rabbit/rabbitConnection.ts:                const uri = 'amqp://testing:test@rabbit:6666';
./src/config-in-code/rabbit/rabbitConnection.ts:                this.connection = await client.connect(uri);
```
