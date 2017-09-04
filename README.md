expand-vertex-data [![npm version](https://badge.fury.io/js/expand-vertex-data.svg)](http://badge.fury.io/js/expand-vertex-data) [![Build Status](https://travis-ci.org/chinedufn/expand-vertex-data.svg?branch=master)](https://travis-ci.org/chinedufn/expand-vertex-data)
====================


> Expand vertex, normal and uv indices into vertex normal and uv data that is ready for your WebGL element and array buffers

3d model file formats will typically encoded their position, normal and uv data across three separate position, normal and uv
indices. This is great for maintaining a compact file, but poses a problem when you want to buffer your data onto the GPU.

WebGL supports one ELEMENT_ARRAY_BUFFER, so having three indexes for your vertex data is not an option.

`expand-vertex-data` makes your vertex data accessible using only one index (`vertexPositionIndices`) by creating new indices and
duplicating data into those indices where necessary.

You only need to do this once, before creating your `ARRAY_BUFFER`s and `ELEMENT_ARRAY_BUFFER`.

You'll typically want to do this at runtime to save download time and disk space (at the one time expense of some CPU cycles).

In some cases you may wish to expand this data before runtime via a script to save CPU cycles (at the expense of persisting your larger expanded 3d model data to disk)

## To Install

```
$ npm install --save expand-vertex-data
```

## Usage

```js
var fs = require('fs')

var colladaFile = fs.readFileSync('./some-collada-model.dae').toString()
var wavefrontFile = fs.readFileSync('./some-wavefront-model.obj').toString()

// Note, you can use a different parser, you'll just need to move your
// parsed data around to make sure that it conforms to `expand-vertex-data`'s
// expected format
var parsedCollada = require('collada-dae-parser')(colladaFile)
var parsedWavefront = require('wavefront-obj-parser')(wavefrontFile)

// Pass this data into your ELEMENT_ARRAY_BUFFER and ARRAY_BUFFERS
var expandedCollada = expandVertexData(parsedCollada)
var expandedWavefront = expandVertexData(parsedWavefront)
```

See something broken, confusing or ripe for improvement? Feel free to open an issue or PR!

## API

### `expandVertexData(compressedVertexData, opts)` -> `expandedOutput`

An object containing your model's vertex data. If you're using `collada-dae-parser` or `wavefront-obj-parser`
you can pass their returned data right in.

If you're using your own parser, you're still all good. Just rename your parsed properties accordingly before passing them into `expand-vertex-data`

#### compressedVertexData.vertexPositionIndices

*Required*

Type: `Array`

#### compressedVertexData.vertexPositions

*Required*

type: `Array`

#### compressedVertexData.vertexNormalIndices

*Optional*

type: `Array`

#### compressedVertexData.vertexNormals

*Optional*

type: `Array`

#### compressedVertexData.vertexUVIndices

*Optional*

type: `Array`

#### compressedVertexData.vertexUVs

*Optional*

type: `Array`

#### compressedVertexData.vertexJointsAndWeights

*Optional*

type: `Array`


#### opts.facesToTriangles

*Optional*

type: `Boolean`

Use this when working with JSON that came from `wavefront-obj-parser`

### Returned: expandedOutput

type: `Object`

In the `Array` lengths described below, `n` is the number of vertexPositionIndices that were **returned** after expansion

#### expandedOutput.positionIndices

type: `Array[n]`

Note that `n` will often times be more than the number of indices that you passed in.
This is because more position indices will be created if your data needs to be expanded.

#### expandedOutput.positions

type: `Array[n * 3]`

#### expandedOutput.normals

type: `Array[n * 3]`

#### expandedOutput.uvs

type: `Array[n * 2]`

#### expandedOutput.jointInfuences

type: `Array[n * 4]`

There are four joint influences per vertex, even if there aren't four influencing joints. In cases
where there is no joint there will be a weight of zero. This is because you need
every joint to have the same number of weights when you vertex shader attributes.

#### expandedOutput.jointWeights

type: `Array[n * 4]`

An array of joint weights. A weight is a number between `0` - `1` that signifies how
much the corresponding joint should affect the corresponding vertex.

There are four weights per vertex, even if there aren't four influencing joints. In cases
where there is no joint there will be a weight of zero. This is because you need
every joint to have the same number of weights when you vertex shader attributes.

## TODO:

- [ ] Support 3 weights per bone
- [ ] Are we expanding as minimally as possible? Can our output be smaller?

## To Test:

```sh
$ npm run test
```

## See Also

- [collada-dae-parser](https://github.com/chinedufn/collada-dae-parser)
- [wavefront-obj-parser](https://github.com/chinedufn/wavefront-obj-parser)

## License

MIT
