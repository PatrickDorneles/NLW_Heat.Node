# NLW_Heat.Node
A Node Rest API made to the NLW/Heat event

## Configuration and requirements
Here is some configs and requirements to this application, first you're gonna need this:
- Node (mine's 14)
- Any rest api client like Insomnia or Postman (for testing)

Before doing anything be sure to have a *.env* file with these variables:
```
PORT=9090
```
## What was required
- [x]  Create project
- [x]  Install Express, Prisma and Typescript
- [x]  Configure Github OAuth
- [x]  Create route login github
- [ ]  Create route callback
- [ ]  Auth user receiving the code
- [ ]  Register message
- [ ]  Configure websocket
- [ ]  Retorne 3 last messages
- [ ]  Create user profile

## How I did it
This is a document section just to let here how every step above was completed

### Creating project
I just created the NLW_Heat.Node project in my github and cloned it using the github cli like this ```gh repo clone PatrickDorneles/NLW_Heat.Node```, but it could also been cloned using the git with https or ssh like this ```git clone git@github.com:PatrickDorneles/NLW_Heat.Node.git```
After that in project root created the *.gitignore* file and initialized the project with yarn: ```yarn init```

### Installing Express, Prisma and Typescript
Just installed each lib with yarn.
Typescript: ```yarn add -D typescript```
Express: ```yarn add express```
Prisma: ```yarn add -D prisma```

And also needed to install some type definitions:
```yarn add -D @types/node @types/express```

And installed ts-node-dev for watching changes in files while developing:
```yarn add -D ts-node-dev```

#### Typescript configuration
Ran ```yarn tsc --init``` to get *tsconfig.json* default configs, then changed it to the configuration below:
```json
{
  "compilerOptions": {
    "target": "ES2021",           
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": false,
    "skipLibCheck": true
  }
}
```
#### Prisma configuration
Ran ```yarn prisma init``` so it generates the *prisma* folder with the schema in it.
Then changed the schema to this:
```s
datasource db {
  provider = "sqlite"
  url = "file:./dev.db"
}
```

### Configure Github OAuth
I configured a new OAuth App in my github account, it can be done in this page: https://github.com/settings/developers.
Also configured Homepage URL to http://localhost:[myport] and Authorization callback URL to http://localhost:[myport]/signin/callback.

### Creating login route
I started creating the basic folders that I use: *routes*, *services*, *middlewares* and *models*.