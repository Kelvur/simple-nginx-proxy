# Simple Nginx Proxy


## The Problem

Lets say you have one or more fronts and backs to deploy but you don't deploy them in the same port or in the same URL. But, you want to put them under the same URL. That is the problem. Example:

```
Inventory:

- A front ready to be build.
- A back attached to a port in the localhost, let's say localhost:9000
```

## What I Want

**Front:** Make the front point the calls to some objetive URL or make them relative of where the front is deployed. Example:

```bash
# The first option is commonly accomplished doing something like this:
BASE_URL="www.example.com/api/" npm run build

# Now when the front make a call, for example to get the users, will be something like this:
# GET www.example.com/api/users
```

```js
// The second option is when the calls of the front don't point to any domain, just to some path
fetch('/api/users', { method: 'GET' })

// The fetch will be relative to the domain, if for example the front is deployed in www.wikiexample.com
// the call will be to www.wikiexample.com/api/users
```

**Back:** Deploy the back to any port, all the traffic under the path `/api` will be redirected to the correct port.


## The Solution

I will use Nginx to resolve the problem

### Install Nginx

First check for updates

```bash
sudo apt update
```

Second, install `nginx`

```bash
sudo apt install nginx
```

### Choose a Domain Name

I choosed a subdomain name for this example, `web.example.com`.

### Deploy the Back

Just as the title say, but remember what the domain and the port is. For this example I will use `localhost:3000`.

### Build the Front


