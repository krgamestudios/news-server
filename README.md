# news-server

An API centric news server. Uses Sequelize and mariaDB by default.

# API

```
//NOTE: you can add a "limit" query parameter to change the default limit
/news?limit=10

//GET get latest news, up to a default limit, or specify the index "id"
/news/:id

//GET get the news starting from the beginning, up to a default limit, or specify the index "id"
/news/archive/:id

//result:
[
	{
		"index": index,		//absolute index of the result
		"title": title,		//title of the article
		"author": author,	//author of the aricle
		"body": body,		//body of the article
		"edits": edits		//number of times this article has been edited
	},
	...
]

//GET get the latest titles, up to a default limit, or specify the index "id"
/news/titles/:id

//GET get the titles starting from the beginning, up to a default limit, or specify the index "id"
/news/archive/titles/:id

//result:
[
	{
		"index": index,		//absolute index of the result
		"title": title,		//title of the article
		"author": author	//author of the article
	},
	...
]

//POST send a formatted JSON object, returns new index on success, or error on failure
/news/publish

//arguments:
{
	"key": key			//the whitelist key, allows access to the POST routes
	"title": title		//title of the article
	"author": author	//author of the article
	"body": body		//body of the article
}

//result
{
	"ok": ok			//true on success, otherwise false
	"index": index		//new index of the article, or undefined
	"error": error		//error encountered, or undefined
}

//PATCH similar to `/news/publish`, but allows overwriting an existing post
/news/edit/:id

//arguments:
{
	"key": key			//the whitelist key, allows access to the POST routes
	"title": title		//title of the article
	"author": author	//author of the article
	"body": body		//body of the article
}

//result
{
	"ok": ok			//true on success, otherwise false
	"error": error		//error encountered, or undefined
}

```
