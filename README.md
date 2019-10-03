How to create migrations :

```
npx db-migrate create nameOfMigration
```

How to execute migrations :

```
npx db-migrate up
```

Don't forget to create a .env file to connect to your DB like below:

```
DATABASE_URL = postgres://YOUR_DATABASE_USERNAME:YOUR_DATABASE_PASSWORD@localhost:5432/YOUR_DATABASE_NAME
```
