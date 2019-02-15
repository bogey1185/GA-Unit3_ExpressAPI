# LeaseGuard

## LeaseGuard API 

The LeaseGuard API has three primary endpoints that provide access to all of the database's information. Each of the endpoints should be appended onto the primary server URL.

Primary server URL: https://leaseguard-express-server.herokuapp.com/api/v1

Endpoints:
  * /properties
  * /submissions
  * /users

The users endpoint contains specialized pathing for service to the LeaseGuard website. However, the submissions endpoint supports RESTful POST and DELETE requests for the purpose of posting and deleting property user submissions. The properties endpoint is the most robust, supporting many RESTful actions, including GET and POST actions. However, the established routes only support requests that are accompanied with the use of a specified database ID. By design, the routes do not support bulk retreival of data.

