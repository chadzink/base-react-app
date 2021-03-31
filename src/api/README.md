
# App API

The App template uses API objects that are separate from the context components by design. This allows any context to use the API to load data as needed.

The API uses the `src/api/adapter.ts` file as the primary method to fetch data using the `axios` package. The ideal pattern is to build singleton objects that represent controllers in the API with specific endpoint. In the template there are three examples:
* `src/api/adapter.tsx` is irregular API controller that has functional purpose of authenticating and authorizing a user for the API and App.
* `src/api/entities/role.ts` is a RESTful API with paging and restore features added.
* `src/api/entities/user.ts` is also a RESTful API with paging and restore features added.

The entity singletons are designed to use one or more mixin from the `src/api/entities/base-entity.ts` file. Current mixin is: REST, Paged, and Restore. These mixins provide templated functions for data fetch actions such as add, update, and remove.

## `Adding API Contoller`

In the starter template there are two primary API controller interfaces. Custom and Entity.

### `Custom Interfaces`

Custom interfaces would ideally be either files in the `src/api` folder or have a sub folder for a functional group of interfaces. For example a `src/api/reports` folder could contain multiple custom interfaces for API controllers that are used to fetch report data. Likewise, there could be a `src/api/graphs` folder that is used to fetch data from the API for multiple graph visualizations in the App.

### `Entity Interfaces`

Entity interfaces are simply a functional group of API controller interfaces, but they are intended to match the API database context entities and implement at least the REST mixin for CRUD operations. The base entity file is intended to be a starter for storing shared entity codebase. Ideally repeat code patters and be identified and consolidated into a single location. However, each entity interfaces doe not need to use the base entity code and can have customized functions for implementing CRUD or partial CRUD operations. For example, if we wanted a read only interface to an API database entity, we could implement custom functions for reading the date or implement the paged mixin without the REST mixin.

---
Once you know the type of API interface you want to build, you can make a new file and use on of the examples as a template.

## `API Adapter`

The `ApiAdapter` singleton's primary function is `fetch`. This function consumes an `IFetchRequest` object and returns promise for the type `IFetchResult<TEntity>`. `<TEntity>` should match with the type of object the specific API interface is using as a result type (i.e. IUser, IRole, IGraph).

The `IFetchResult<TEntity>` is defined in the `src/api/types.d.ts` file and needs to map tp the expected JSON result from and API endpoint request. If your API does not follow a common JSON format, you will need to create a type (interface) for each JSON format and adjust the `ApiAdpter.fetch` function to handle those types, or add additional functions to the `ApiAdapter` to handle those JSON formats individually.

The `IFetchRequest` type is a common configuration for an API endpoint request and can be used for `GET`, `POST`, `PUT`, and `DELETE`.

In the App template example the `ApiAdapater` uses a JSON Web Toke (JWT) for authentication to the API. There are three helper functions that map API config  to `localStorage` and handle `setTokens`, `getTokens`, and `clearTokens`. If your API is not using JWT, you will need to adjust the App template.