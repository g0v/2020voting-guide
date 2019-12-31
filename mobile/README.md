This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### Quick start by vscode + docker

detailed steps in the [official documentation](https://code.visualstudio.com/remote-tutorials/containers/getting-started)

1. download and install docker, and sign up if required - [download link](https://www.docker.com/products/developer-tools)
2. download and install vscode - [download link](https://code.visualstudio.com/download)
3. double-click to run docker desktop application, and sign in if required
4. double-click to run vscode, and install Remote Development extension pack - [download link](https://aka.ms/vscode-remote/download/extension)
5. in vscode, click the '><' at the bottom-left corner![](https://code.visualstudio.com/assets/remote-tutorials/containers/remote-status-bar.png)
6. click "Open Folder...", and choose the "mobile" folder ![](https://code.visualstudio.com/assets/remote-tutorials/containers/remote-containers-commands.png)
7. wait for the container to build ![](https://code.visualstudio.com/assets/remote-tutorials/containers/building-image.png)
8. after the container is built, you should see some text start with "Dev Container"(but may not be the same as text, "Node.js Sample") ![](https://code.visualstudio.com/assets/remote-tutorials/containers/connected.png)
9. in vscode, press "Ctrl + J or Command + J" to open the terminal panel [more inforamtion about the terminal in vscode](https://code.visualstudio.com/docs/editor/integrated-terminal)
10. press "+" to add new terminal window, enter in terminal `npm install && npm start`
11. may take a few minutes to wait for it to install packages, compile, and start up the server
12. open browser, go to "http://localhost:3000", and you should see the website page with something like the following on it ![](https://vote.ly.g0v.tw/img/home/kv-calendar.svg)
13. and then happy coding :)

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

[microsoft/TypeScript-React-Starter](https://github.com/microsoft/TypeScript-React-Starter)
[bestpratice of typescript](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680)
