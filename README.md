# news-server

An API centric news server. Uses Sequelize and mariaDB by default.

# Setup

There are multiple ways to run this app - it can run on it's own via `npm start` (for production) or `npm run dev` (for development). it can also run inside docker using `docker-compose up --build` - run `node configure-script.js` to generate docker-compose.yml.

To generate an authorization token, use [auth-server](https://github.com/krgamestudios/auth-server). A public-facing development auth-server is available here (tokens are 10 minutes):

```
POST https://dev-auth.eggtrainer.com/auth/login HTTP/1.1
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

//get latest news, up to a default limit, or specify the index "id"
GET /news/:id

//get the news starting from the beginning, up to a default limit, or specify the index "id"
GET /news/archive/:id

//result (if only a single article is specified, returns just that article rather than an array):
[
	{
		"index": index,			//absolute index of the result
		"title": title,			//title of the article
		"author": author,		//author of the aricle
		"body": body,			//body of the article
		"edits": edits			//number of times this article has been edited
		"createdAt": createdAt	//time created
		"updatedAt": updatedAt	//time updated
	},
	...
]

//get the latest metadata, up to a default limit, or specify the index "id"
GET /news/metadata/:id

//get the metadata starting from the beginning, up to a default limit, or specify the index "id"
GET /news/archive/metadata/:id

//result (if only a single article is specified, returns just that article rather than an array):
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

//send a formatted JSON object, returns new index on success, or error on failure
POST /news
Authorization: Bearer XXX

//arguments:
{
	"title": title		//title of the article
	"author": author	//author of the article
	"body": body		//body of the article
}

//result (status 200 on success, otherwise an error status):
{
	"index": index		//new index of the article
}

//similar to `POST /news`, but allows overwriting an existing article
PATCH /news/:id
Authorization: Bearer XXX

//arguments:
{
	"title": title		//title of the article, optional
	"author": author	//author of the article, optional
	"body": body		//body of the article, optional
}

status 200 on success, otherwise an error status

//remove an article from the news feed
DELETE /news/:id
Authorization: Bearer XXX

status 200 on success, otherwise an error status
```
