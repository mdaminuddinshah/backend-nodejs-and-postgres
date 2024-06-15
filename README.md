npm i cors
- ni utk return response dari database ke frontend 


here for DATABASE_URL
    - postgres://username:password@hostname:port/database
    - POSTGRES://PGUSER:PGPASSWORD@PGHOST:PGPORT/PGDATABASE

<!-- how to deploy backend nodejs and postgres with render -->
1. go to dashboard in render
2. go to web services
3. build and deply from git
    - name: create name project
    - build command: npm install
    - start command: npm start
    - runtime: node

4. environemnt varibale     
    - name_of_variable = value
    - DATABASE_URL = postgres://user:password@localhost:port/database
    - e.g.
        - PGHOST='127.0.0.1'
        - PGUSER='postgres'
        - PGDATABASE='mencubaTest3'
        - PGPASSWORD='postgresql'
        - postgres:postgres:postgresql@127.0.0.1:5432/mencubaTest3
        
5. create web service
