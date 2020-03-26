## My own calculator of calories
Idea - create my own calculator with Django and React

Used python 3.7, postgres 11

#### Preparation

1. Create and activate virtual environment:

```sh 
$ virualenv -p python3 venv
$ source venv/bin/activate
```

2. Install requirements:
```
(venv)$ pip install  -r requirements.txt
```

3. Create database and database user:

```
$ psql -U postgres -h localhost
> CREATE DATABASE <DB_NAME_HERE>;
> CREATE USER <USERNAME_HERE> WITH PASSWORD 'password_here';
> GRANT ALL PRIVILEGES ON DATABASE < DB_NAME_HERE > TO <USERNAME_HERE>;

```

The same for test database.