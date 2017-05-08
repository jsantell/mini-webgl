# mini-webgl

Mini toy WebGL library

For educational purposes. **Do not use this library.**
This is a barebones, unoptimized abstraction around WebGL. API ideas inspired by THREE.js.

![mini-webgl](https://jsantell.github.io/mini-webgl/assets/screenshot.gif)

## What and How it Works

* Basic rendering of a [scene](src/scene.js) graph with [perspective camera](src/camera.js).
* [Models](src/model.js) are represented by a geometry and material, updating position/rotation/scale when local coordinates change.
* Barebones [Math](src/math.js) library for managing Vector and Matrix types and track if dirty to minimize rebuilding matrices. Mostly a wrapper around [glMatrix](http://glmatrix.net/).
* [Geometries](src/geometries) have a vertex buffer, and optionally an indices buffer.
  * Implemented: [Triangle](src/geometries/triangle.js), [Cube](src/geometries/cube.js)
* [Materials](src/materials) take a vertex and fragment shader and define `uniforms` and `attributes` properties that can be updated and pushed to the GPU. Uniforms/attribs are initialized by readingInstances have their own uniform/attribute values, but reuse the same program if it can (based on vertex/fragment shader source), so for example, all instances of `BasicMaterial` use the same underlying WebGLProgram.
  * Implemented: [BasicMaterial](src/materials/basic-material.js)
* The scene's [renderer](src/renderer.js) queues up the scene graph's nodes and passes it to the [GLWrapper](src/webgl/index.js) which manages all the WebGL calls, so all the API abstractions of models and materials are in [src/](src/), and translating that abstraction to WebGL lives in [src/webgl/](src/webgl/).

## Example

* [triangle animations](https://jsantell.github.io/mini-webgl/examples/complex.html)

### Example Code

```js
  var scene = new MiniWebGL.Scene(canvas);
  var camera = new MiniWebGL.Camera();
  var cube = new MiniWebGL.Model(
    new MiniWebGL.Cube(),
    new MiniWebGL.BasicMaterial()
  );

  scene.useCamera(camera);
  cube.position = new Float32Array([0, 0.5, -3]);
  cube.scale = new Float32Array([0.5, 0.5, 0.5]);
  cube.updateMatrix();
  scene.add(cube);

  var t;
  function tick () {
    t = performance.now();
    cube.rotation[0] = Math.cos(t * 0.001) + Math.PI;
    cube.rotation[1] = Math.sin(t * 0.001) + Math.PI;
    cube.updateMatrix();
    scene.render();
    requestAnimationFrame(tick);
  }
  tick();
```

## License

MIT License, Copyright (c) 2017 Jordan Santell
