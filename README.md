# NLW_Heat.Node

A Node Rest API made to the NLW/Heat event

## Configuration and requirements

Here is some configs and requirements to this application, first you're gonna need this:

- Node (mine's 14)
- Any rest api client like Insomnia or Postman (for testing)

Before doing anything be sure to have a _.env_ file with these variables:

```
PORT=9090
GH_CLIENT_ID=
GH_CLIENT_SECRET=
JWT_SECRET=
```

## What was required

- [x] Create project
- [x] Install Express, Prisma and Typescript
- [x] Configure Github OAuth
- [x] Create route login github
- [x] Create route callback
- [x] Auth user receiving the code
- [x] Register message
- [x] Configure websocket
- [x] Return last 3 messages
- [ ] Create user profile

## How I did it

This is a document section just to let here how every step above was completed

### Creating project

I just created the NLW*Heat.Node project in my github and cloned it using the github cli like this `gh repo clone PatrickDorneles/NLW_Heat.Node`, but it could also been cloned using the git with https or ssh like this `git clone git@github.com:PatrickDorneles/NLW_Heat.Node.git`
After that in project root created the *.gitignore\_ file and initialized the project with yarn: `yarn init`

### Installing Express, Prisma and Typescript

Just installed each lib with yarn.
Typescript: `yarn add -D typescript`
Express: `yarn add express`
Prisma: `yarn add -D prisma`

And also needed to install some type definitions:
`yarn add -D @types/node @types/express`

And installed ts-node-dev for watching changes in files while developing:
`yarn add -D ts-node-dev`

#### Typescript configuration

Ran `yarn tsc --init` to get _tsconfig.json_ default configs, then changed it to the configuration below:

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

Ran `yarn prisma init` so it generates the _prisma_ folder with the schema in it.
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

### Creating login route and callback

I started creating the basic folders that I use: _routes_, _services_, _middlewares_ and _models_.

Then I created both _signin_ and _github_ routes, on _github_ route I made a redirect on get to authenticate with GitHub, and in _signin_ the basic callback just to show the code that I wanted to get for testing purposes.

### Creating user authentication using the code

Then I created the post in the _signin_ route to make the authentication.

Installed the JWT library and the types definitions:
`yarn add jsonwebtoken` and `yarn add @types/jsonwebtoken`

Made the User model in prisma and generate the first migration: Creating User. After that just did the SigninService and added it to the signin route.

### Registering messages

This task was really simple, first created the _authenticated_ middleware to only pass users that was authenticated to certain routes, and created the CreateMessageService and a new route for handling messages.
Also created Message in the prisma models

### Configuring websocket

Installed socket.io using `yarn add socket.io` and its types using `yarn add -D @types/socket.io`, then moved all server content to a new _app.ts_ file and exported the app, http server and a new created io server.

Then I added a emit in the CreateMessageService, sending new messages to all connected sockets, after that for testing created in the _public_ folder a _index.html_ with the socket.io CDN to test the server socket messages.

### Fetching the last 3 messages

The simplest task so far, I just made a new _GetLast3MessagesService_ and added a **get** route to use it
