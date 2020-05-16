This is a WebAssembly module written in Rust and compiled via wasm-pack (rust-wasm-bindgen). It can take an URL, width, and height and turn it into a SVG QRcode. You can then inject the svgString as innerHTML into your DOM or use it as the src in an img tag. Note, since Chrome no longer supports the character # in the SVG string, you can no longer use `<img src='data:image/svg+xml;utf8,${svgString}</svg>' />`, instead you must convert it into base64 via btoa first and use it as such `<img src='data:image/svg+xml;base64,${btoa(svgString)}'>`.

You may checkout this starter project and see how you can use this module (with React): [react-typescript-webassembly-starter](https://github.com/aeroxy/react-typescript-webassembly-starter)

这是一个由Rust编写，通过wasm-pack（rust-wasm-bindgen）进行编译的WebAssembly模块。 入参为URL，宽度和高度，并将其转换为SVG QRcode。 然后，您可以将svgString作为innerHTML注入DOM或将其用作img标签中的src。 请注意，由于Chrome不再支持SVG字符串中的字符#，因此您不能再使用`<img src='data:image/svg+xml;utf8,${svgString}</svg>' />`您必须先通过btoa将其转换为base64，比如：`<img src='data:image/svg+xml;base64,${btoa(svgString)}'>`。

您通过这个脚手架项目查看如何使用这个模块（在React内）：[react-typescript-webassembly-starter](https://github.com/aeroxy/react-typescript-webassembly-starter)