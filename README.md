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
	"email": "example@example.com",
	"password": "helloworld"
}
```

# API

### `GET /news/:id?`

Get either an array of articles (newest first), or a specified article if the optional "id" parameter is given.

#### Response Body

```jsonc
[{
	// [Number] index of the article
	"index": index,

	// [String] author of the article
	"author": author,

	// [String] raw body of the article
	"body": body,

	// [Number] number of times this article has been edited
	"edits": edits,

	// [String] body of the article rendered as HTML
	"rendered": rendered,

	// [String] title of the article
	"title": title,

	// [Date] time article was created
	"createdAt": createdAt,

	// [Date] time article was updated
	"updatedAt": updatedAt,
}]
```

#### Available Query Parameters

- `fields`
	- TYPE: `string`
		A comma separated list of the field names you want returning, (index will always be returned)
- `page`
	- TYPE: `number`
		The current page you want returning
- `page_size`
	- TYPE: `number`
		The number of results to return. This superseeds the `PAGE_SIZE` environment variable for the query

> **NOTE**
> If a specific article is requested, then just that article is returned rather than an array

### `GET /news/archive/:id?`

Get either an array of articles (oldest first), or a specified article if the optional "id" parameter is given.

#### Response Body

```jsonc
[{
	// [Number] index of the article
	"index": index,

	// [String] author of the article
	"author": author,

	// [String] raw body of the article
	"body": body,

	// [Number] number of times this article has been edited
	"edits": edits,

	// [String] body of the article rendered as HTML
	"rendered": rendered,

	// [String] title of the article
	"title": title,

	// [Date] time article was created
	"createdAt": createdAt,

	// [Date] time article was updated
	"updatedAt": updatedAt,
}]
```

#### Available Query Parameters

- `fields`
	- TYPE: `string`
		A comma separated list of the field names you want returning, (index will always be returned)
- `page`
	- TYPE: `number`
		The current page you want returning
- `page_size`
	- TYPE: `number`
		The number of results to return. This superseeds the `PAGE_SIZE` environment variable for the query

> **NOTE**
> If a specific article is requested, then just that article is returned rather than an array

### `GET /news/metadata/:id?`

Get either an array of metadata (newest first), or a specified article's metadata if the optional "id" parameter is given.

#### Response Body

```jsonc
[{
	// [Number] index of the article
	"index": index,

	// [String] author of the article
	"author": author,

	// [Number] number of times this article has been edited
	"edits": edits,

	// [String] title of the article
	"title": title,

	// [Date] time article was created
	"createdAt": createdAt,

	// [Date] time article was updated
	"updatedAt": updatedAt,
}]
```

#### Available Query Parameters

- `fields`
	- TYPE: `string`
		A comma separated list of the field names you want returning, (index will always be returned)
- `page`
	- TYPE: `number`
		The current page you want returning
- `page_size`
	- TYPE: `number`
		The number of results to return. This superseeds the `PAGE_SIZE` environment variable for the query

> **NOTE**
> If a specific article is requested, then just that article is returned rather than an array

### `GET /news/archive/metadata/:id?`

Get either an array of metadata (oldest first), or a specified article's metadata if the optional "id" parameter is given.

#### Response Body

```jsonc
[{
	// [Number] index of the article
	"index": index,

	// [String] author of the article
	"author": author,

	// [Number] number of times this article has been edited
	"edits": edits,

	// [String] title of the article
	"title": title,

	// [Date] time article was created
	"createdAt": createdAt,

	// [Date] time article was updated
	"updatedAt": updatedAt,
}]
```

#### Available Query Parameters

- `fields`
	- TYPE: `string`
		A comma separated list of the field names you want returning, (index will always be returned)
- `page`
	- TYPE: `number`
		The current page you want returning
- `page_size`
	- TYPE: `number`
		The number of results to return. This supersedes the `PAGE_SIZE` environment variable for the query

> **NOTE**
> If a specific article is requested, then just that article is returned rather than an array

---

### `POST /news`

> **IMPORTANT**
> Requires valid JWT Authorization header (Authorization: Bearer XXX)

Create a new article resource, returns either the new article's index on success, or an error on failure.

#### Request Body

```jsonc
{
	// [String] OPTIONAL: title of the article
	"title": title,

	// [String] OPTIONAL: author of the article
	"author": author,

	// [String] OPTIONAL: body of the article
	"body": body,
}
```

#### Response Body

```jsonc
{
	// [Number]: new index of the article
	"index": index,
}
```

### `PATCH /news/:id`

> **IMPORTANT**
> Requires valid JWT Authorization header (Authorization: Bearer XXX)

Update an existing article resource, returns either status code 200 on success, or an error status on failure.

#### Request Body

```jsonc
{
	// [String] OPTIONAL: title of the article
	"title": title,

	// [String] OPTIONAL: author of the article
	"author": author,

	// [String] OPTIONAL: body of the article
	"body": body,
}
```

### `DELETE /news/:id`

> **IMPORTANT**
> Requires valid JWT Authorization header (Authorization: Bearer XXX)

Remove an existing article resource from the news feed, returns either status code 200 on success, or an error status on failure.