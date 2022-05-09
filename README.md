## Admin Creation
After all the installation process, open any REST api client like Postman, Insomonia and send a `POST` request to the route `/create-admin` with follwing json data.
```
{
	"username" : "your admin username here",
	"password" : "your admin password here",
	"App_Secret_Key" : "your application secret key here"
}
```
