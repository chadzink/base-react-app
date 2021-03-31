
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is an example React App template used to start a new project and provide a foundation for project file structure and design patterns. The opinion of this template is that the following folder should exist in the project src folder:
* api
* components
* context
* layouts
* pages

Each folder above has a readme markdown describing the purpose and intended content.

### `Core Files`

Core files used in the App template are:
* `src/index.tsx`
* `src/routes.tsx`
* `src/api/adapter.tsx`
* `src/api/auth.tsx`*
* `src/api/config.ts`
* `src/api/types.d.ts`
* `src/api/entities/base-entity.ts`
* `src/context/session.tsx`

The `/pages/start.tsx` and applied layout and components is important, but should be configured t match the project needs.

#### `Router, Pages, & Layouts`

This App template uses the idea that everything starts with a routed URL to a Page component. The page has an applied Layout component that defines the overall visual layout (ideally using HTML Layout Elements).

#### `Session`

The App template is designed to use a root level state manager with the session context component. This tracks the logged to start, but can be used to store state that when changed will (in concept) trigger an app state reset. For example, if a user logs out, the App state should reset for a new user to login.

#### `API`

The App template uses API objects that are separate from the context components by design. This allows any context to use the API to load data as needed.

The API uses the `src/api/adapter.ts` file as the primary method to fetch data using the `axios` package. The ideal pattern is to build singleton objects that represent controllers in the API with specific endpoint. In the template there are three examples:
* `src/api/adapter.tsx` is irregular API controller that has functional purpose of authenticating and authorizing a user for the API and App.
* `src/api/entities/role.ts` is a RESTful API with paging and restore features added.
* `src/api/entities/user.ts` is also a RESTful API with paging and restore features added.

The entity singletons are designed to use one or more mixin from the `src/api/entities/base-entity.ts` file. Current mixin is: REST, Paged, and Restore. These mixins provide templated functions for data fetch actions such as add, update, and remove.

### `yarn start`

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

You will also see any lint errors in the console.

  

### `yarn test`

  

Launches the test runner in the interactive watch mode.\

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

### `yarn build`

  

Builds the app for production to the `build` folder.\

It correctly bundles React in production mode and optimizes the build for the best performance.

  

The build is minified and the filenames include the hashes.\

Your app is ready to be deployed!

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  

### `yarn eject`

  

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

  

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

  

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

  

## Learn More

  

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

  

To learn React, check out the [React documentation](https://reactjs.org/).

  

## Link Used to help Build This Project

* https://rapidapi.com/blog/react-context-api/

* https://blog.logrocket.com/a-deep-dive-into-react-context-api/

* https://medium.com/swlh/redux-context-api-for-state-management-in-react-ca9fb8e6a6dd

* https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc/ <--- ***

* https://www.carlrippon.com/building-super-simple-react-form-component-typescript-basics/

* https://www.jmfurlott.com/handling-user-session-react-context/

* https://dev.to/alexander7161/react-context-api-with-typescript-example-j7a

* https://www.valentinog.com/blog/redux/

* https://github.com/erikras/ducks-modular-redux

* https://github.com/ohansemmanuel/fake-medium/tree/master/src

* https://www.telerik.com/blogs/how-to-use-context-api-with-hooks-efficiently-while-avoiding-performance-bottlenecks

* https://leewarrick.com/blog/the-problem-with-context/

* https://www.freecodecamp.org/news/how-to-use-redux-in-your-react-typescript-app/