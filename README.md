This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), and improved with `react-app-rewired`.

The starter project has included `material-ui`, you may not need it for your project. Feel free to use any other UI framework.

You will find a WebAssembly module (uranus-qrcode) under the modules folder, compiled via wasm-pack (rust-wasm-bindgen). This project is meant to demonstrate how to integret wasm modules into your react webpack project with typescript flavor. If you have compiled your WASM module via other compiler or have written them in languages other than Rust, it should still work just fine, but I cannot garantee that at this point.

`@material-ui/core`, `@material-ui/icons` (UI framework) and `uranus-qrcode` (WASM demo module) may not be useful in your actual project, feel free to remove them after learning from the setup.

Now the workerize method works!

I've originally tried workerize-loader + wasm-loader, and it works pretty well in the dev mode but once it is compiled, the prototype will not be added to the worker (suspecting it's a bug in workerize-loader because all workerized modules behave the same). This indeed turns out to be a bug in workerize-loader (see [workerize-loader failed to work after compiling](https://github.com/developit/workerize-loader/issues/89) and [Version 1.2.0 does not export function on worker instance in production mode](https://github.com/developit/workerize-loader/issues/85)). After upgrading to the [workerize-loader 1.2.1](https://github.com/developit/workerize-loader/commit/d586b51aa0f3eda94aa5b3e7d9881c9d9b804cdc), it works in both dev and prod code.

I also tried to work with worker-loader + comlink, but the worker-loader doesn't seem to work with wasm-loader (would not be able to import WASM into the worker). I also tried to load the WASM module into the main thread and then passing it to the Web Worker, but it breaks the browser. You can try to see if you can get this to work somehow...

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

该项目使用[Create React App](https://github.com/facebook/create-react-app)启动，并通过`react-app-rewired`进行了改进。

这个脚手架项目包括了`material-ui`，您的项目可能不需要它。随意使用任何其他UI框架。

您将在modules文件夹下找到一个WebAssembly模块（uranus-qrcode），该模块通过wasm-pack（rust-wasm-bindgen）进行编译。这个项目的目的是演示如何将wasm模块集成到具有打字稿样式的react webpack项目中。如果您通过其他编译器编译了WASM模块，或者用Rust以外的其他语言编写了WASM模块，那么它仍然可以正常工作，但是我目前不能保证这一点。

`@material-ui/core`，`@material-ui/icons`（UI框架）和`uranus-qrcode`（WASM演示模块）在您的实际项目中可能没有用，请自己决定是否在从该项目中学习配置方案后将它们删除。

现在workrize模式可以正常使用了！

我最初尝试了workerize-loader + wasm-loader，它在dev模式下工作得很好，但是一旦编译，就不会将原型添加到worker中（怀疑这是workerize-loader中的错误，因为无论是否有WASM它都有这个问题）。实时证明它确实是workerize的一个缺陷(看[workerize-loader failed to work after compiling](https://github.com/developit/workerize-loader/issues/89)和[Version 1.2.0 does not export function on worker instance in production mode](https://github.com/developit/workerize-loader/issues/85))。在升级到[workerize-loader 1.2.1](https://github.com/developit/workerize-loader/commit/d586b51aa0f3eda94aa5b3e7d9881c9d9b804cdc)以后无论开发还是生成代码都能够正常使用了。

我也尝试使用worker-loader + comlink，但是worker-loader似乎无法与wasm-loader一起使用（将无法将WASM导入到worker中）。 我还尝试将WASM模块加载到主线程中，然后将其传递给Web Worker，但这会导致浏览器报错。你可以试试看有没有办法让它能够正常工作……

### 可用脚本

在项目目录中，可以运行：

### `npm start`

在开发模式下运行应用。<br />
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看。

如果进行编辑，页面将重新加载。<br />
您还可以在控制台中看到语法检查中出现的错误。

### `npm run build`

将要生产的应用程序构建到`build`文件夹中。<br />
它在生产模式下正确捆绑了React，并优化了构建以获得最佳性能。

生成被最小化，文件名包含哈希。<br />
您的应用已准备好进行静态部署！

有关更多信息，请参见关于[deployment](https://facebook.github.io/create-react-app/docs/deployment) 的部分。