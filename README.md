# mini-webgl

Mini toy WebGL library

For educational purposes. **Do not use this library.**
This is a barebones, unoptimized abstraction around WebGL. API ideas inspired by THREE.js.

![mini-webgl](https://jsantell.github.io/mini-webgl/assets/screenshot.gif);

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
