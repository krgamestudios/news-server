# news-server

An API centric news server. Uses Sequelize and mariaDB by default.

# Setup

1. Run `cp .envdev .env`, then enter the correct information into the new file.
2. Run the SQL script `sql/create_database.sql`. This will set up an empty database called `news`, and a new user called `news`.

# API

```
//NOTE: GET will return null if a specific article can't be found
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

//get the latest titles, up to a default limit, or specify the index "id"
GET /news/titles/:id

//get the titles starting from the beginning, up to a default limit, or specify the index "id"
GET /news/archive/titles/:id

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

//arguments:
{
	"key": key			//the whitelist key, allows access to the POST routes
	"title": title		//title of the article
	"author": author	//author of the article
	"body": body		//body of the article
}

//result:
{
	"ok": ok			//true on success, otherwise false
	"index": index		//new index of the article, or undefined
	"error": error		//error encountered, or undefined
}

//similar to `POST /news`, but allows overwriting an existing article
PATCH /news/:id

//arguments:
{
	"key": key			//the whitelist key, allows access to the PATCH routes
	"title": title		//title of the article
	"author": author	//author of the article
	"body": body		//body of the article
}

//result:
{
	"ok": ok			//true on success, otherwise false
	"error": error		//error encountered, or undefined
}

//remove an article from the news feed
DELETE /news/:id

//arguments:
{
	"key": key			//the whitelist key, allows access to the DELETE routes
}

//result:
{
	"ok": ok			//true on success, otherwise false
	"error": error		//error encountered, or undefined
}
```
