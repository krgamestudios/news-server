# news-server

An API centric news server. Uses Sequelize and mariaDB by default.

This server is available via docker hub at krgamestudios/news-server.

# Setup

There are multiple ways to run this app - it can run on it's own via `npm start` (for production) or `npm run dev` (for development). it can also run inside docker using `docker-compose up --build` - run `node configure-script.js` to generate docker-compose.yml and startup.sql.

To generate an authorization token, use [auth-server](https://github.com/krgamestudios/auth-server). A public-facing development auth-server is available here (tokens are valid for 10 minutes):

```
POST https://dev-auth.krgamestudios.com/auth/login HTTP/1.1
Content-Type: application/json

{
	"email": "kayneruse@gmail.com",
	"password": "helloworld"
}
```

# API

```
//NOTE: GET will return an empty array if a specific article can't be found
//NOTE: you can add a "limit" query parameter to change the default limit
GET /news?limit=10


###


//DOCS: get latest news, up to a default limit, or specify the index "id"
GET /news/:id


###


//DOCS: get the news starting from the beginning, up to a default limit, or specify the index "id"
GET /news/archive/:id

//DOCS: result (if only a single article is specified, returns just that article rather than an array):
[
	{
		"index": index,			//absolute index of the result
		"title": title,			//title of the article
		"author": author,		//author of the aricle
		"body": body,			//body of the article
		"rendered": rendered	//body rendered as HTML
		"edits": edits			//number of times this article has been edited
		"createdAt": createdAt	//time created
		"updatedAt": updatedAt	//time updated
	},
	...
]


###


//DOCS: get the latest metadata, up to a default limit, or specify the index "id"
GET /news/metadata/:id


###


//DOCS: get the metadata starting from the beginning, up to a default limit, or specify the index "id"
GET /news/archive/metadata/:id

//DOCS: result (if only a single article is specified, returns just that article rather than an array):
[
	{
		"index": index,			//absolute index of the result
		"title": title,			//title of the article
		"author": author		//author of the article
		"edits": edits			//number of times this article has been edited
		"createdAt": createdAt	//time created
		"updatedAt": updatedAt	//time updated
	},
	...
]


###


//DOCS: send a formatted JSON object, returns new index on success, or error on failure
POST /news
Authorization: Bearer XXX

{
	"title": title		//title of the article
	"author": author	//author of the article
	"body": body		//body of the article
}

//DOCS: result (status 200 on success, otherwise an error status):
{
	"index": index		//new index of the article
}


###


//DOCS: similar to `POST /news`, but allows overwriting an existing article
PATCH /news/:id
Authorization: Bearer XXX

{
	"title": title		//title of the article, optional
	"author": author	//author of the article, optional
	"body": body		//body of the article, optional
}

//DOCS: result: status 200 on success, otherwise an error status


###


//DOCS: remove an article from the news feed
DELETE /news/:id
Authorization: Bearer XXX

//DOCS: result: status 200 on success, otherwise an error status


###
```
