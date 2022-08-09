# Proofs of concept

<p><b>Number 3, Config </b>- <em>Store config in the environment</em> <p>

> Why?

- Environmental variables allow for granular level of control, platform agnosticism and grouping
- Storing configs in the code as constants is a violation of twelve-factor, which requires strict separation from the code
- A litmus test for whether an app has all config correctly factored out of the code is whether the codebase could be made open source at any moment, without compromising any credentials
- The twelve-factor stores config in environmental variables

> Test

As mentioned above, the limus test can easily determine, whether the app is created in compliance with the Twelve App rules.
To that end, the file "something.sh" scans files for credentials, secrets and api keys.

> Software and OS used in this implementation:
- OS: Linux alpine in a docker container
- Backing service, Database: PostgreSQL
- Backing service, messaging/queueing system: RabbitMQ
    
> Comparison to in-code credentials, api-keys & secrets

|  | Config in environment      | In-code config |
| ----------- | ----------- | ----------- |
| Ease of making changes      | Title       | asd |
| Testing in several deployments   | Text        | zxc |
| Something | 123 | 345 |

## Conclusions

Something to add later
