# Simple Nginx Proxy <!-- omit in toc -->
- [The Problem](#the-problem)
- [The Solution](#the-solution)
  - [Install Nginx](#install-nginx)
  - [Choose a Domain Name](#choose-a-domain-name)
  - [Deploy the Back](#deploy-the-back)
  - [Build the Front](#build-the-front)
  - [Web Folder](#web-folder)
  - [Copy the Builded Front](#copy-the-builded-front)
  - [Configure Nginx](#configure-nginx)
- [Nginx Service](#nginx-service)
  - [Start The Service](#start-the-service)
  - [Stop The Service](#stop-the-service)
  - [Start The Service When The Server Start](#start-the-service-when-the-server-start)
- [Test](#test)
  - [Add a Record to `hosts`](#add-a-record-to-hosts)

## The Problem

Lets say you have one or more fronts and backs to deploy but you don't deploy them in the same port or in the same URL. But, you want to put them under the same URL (to avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), or other reason). That is the problem.


## The Solution

I will use **Nginx** to resolve the problem


### Install Nginx

> Note: this guide is based in Ubuntu 18.04
> 
> Some steps can differ, in your OS


First check for updates

```bash
sudo apt update
```

Second, install `nginx`

```bash
sudo apt install nginx
```


### Choose a Domain Name

I choosed this domain: `web.example.com`.


### Deploy the Back

Just as the title say, but remember in what port is deployed. 

If you want you can use the back provided by this repository, go to the folder `back` and execute:

```bash
npm i # Install dependencies
# You have more options listend in the README of the back
npm start
```


### Build the Front

Build your front and remember in what folder is the build located.

If you want you can use the front provided by this repository, go to the folder `front` and execute:

```bash
npm i # Install dependencies
# You have more options listend in the README of the front
npm run build
# the builded front it's located in the dist folder
```


### Web Folder

Let's make a folder where to store all the files of the front, Execute:

```bash
cd /var/www
sudo mkdir ${DOMAIN_NAME} # In my case is web.example.com
```


### Copy the Builded Front

Now copy the content of the build folder to the Web Folder, Execute:

```bash
sudo cp -r /path/to/front/build/* /var/www/${DOMAIN_NAME}
# For security let's set the correct permissions over the files
sudo chmod -R 750 /var/www/${DOMAIN_NAME}/
```


### Configure Nginx

To configurate Nginx you need to go to the folder `/etc/nginx/sites-available`:

```bash
cd /etc/nginx/sites-available
```

Copy the default config with the domain name

```bash
sudo cp default ${DOMAIN_NAME}
```

Open the file for edition

```bash
sudo nano ${DOMAIN_NAME}
```

Replace this port configuration:

```nginx
listen 80 default_server;
listen [::]:80 default_server;
```

By this: 

```nginx
listen 80;
```

Replace the server folder configuration:

```nginx
root /var/www/html;
```

By this:

```nginx
root /var/www/${DOMAIN_NAME};
```

Replace the server name configuration:

```nginx
server_name _;
```

By this:

```nginx
server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};
```

And last, add the location to the back:

```nginx
# In this case I use /api/ but you can choose other or none.
location /api/ {
        # All the request the front make to /api/whatever will be redirected to the proxy pass
        # as http://localhost:3000/whatever
        # Replace the URL by the one you want
        proxy_pass http://localhost:3000/;
}
```

## Nginx Service

### Start The Service

Execute:

```bash
sudo systemctl start nginx.service
```

### Stop The Service

Execute:

```bash
sudo systemctl stop nginx.service
```

### Start The Service When The Server Start

Execute:

```bash
sudo systemctl enable nginx.service
```


## Test

If you want to test this configuration you browser has to understand than when you type the choosed domain name it has go to localhost (Or other location if you are testing this outside the server).

How to test:

- Run the back
- The front has to be builded and located in `/var/html/${DOMAIN_NAME}`
- **Nginx** has to be running
- Open the browser, type the `${DOMAIN_NAME}` in the bar
- If the front doesn't load or the calls to the back aren't reaching this means there is a problem with the configuration

### Add a Record to `hosts`

If you don't want to test this configuration without going to the DNS Server to point to the choosed domain name, you can add a new line to the dile `host`. Example:

```bash
cd /etc
sudo nano hosts
# Add a line like this "127.0.0.1       ${DOMAIN_NAME}"
```

