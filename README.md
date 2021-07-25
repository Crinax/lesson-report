# lesson-report

## Installation

### Creating Database
In the root directory there is a file test.sql. Using **PostgreSQL**, import this database using the following command:
```sh
    psql <database> < test.sql
```
Where <database> your database name

### Set environment variables
Create in root directory file **.env** with the following contents:
```env
    PORT=3000               # Port for server
                            # # Database block
    DB_DIALECT="postgres"   # Database dialect
    DB_NAME=""              # Database name (use your database name)
    DB_PASS=""              # Database password (use your datebase password)
    DB_USER=""              # Database username (use your database username)
    DB_PORT=5432            # Database port (this is default value, use other value, if necessary)
    DB_HOST=""              # Database host (use your database host)
```

### Run server
After importing the database, use one of the following commands to start the server:

#### npm
```sh
    npm run serve
```

#### yarn
```sh
    yarn serve
```

### Test server methods
For testing server use on of the following commands

#### npm
```sh
    npm run test
```

#### yarn
```sh
    yarn test
```