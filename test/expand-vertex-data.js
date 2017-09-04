var test = require('tape')

var testVertexData = require('./textured-blender-default-cube.json')
var cubeVertexData = require('./cube-wavefront.json')
var expandVertexData = require('../')

/**
 * TODO: Write better tests if/when things break...
 * pulled this module out of some working code so didn't put
 * much effort into testing it.
 */
test('Expand position, normal and uv data', function (t) {
  var expandedVertexData = expandVertexData(testVertexData)

  t.equal(expandedVertexData.positionIndices.length, 36)
  t.equal(expandedVertexData.positions.length, 108)
  t.equal(expandedVertexData.uvs.length, 72)
  t.equal(expandedVertexData.normals.length, 108)

  t.end()
})

/**
 * TODO: Write better tests if/when things break...
 * pulled this module out of some working code so didn't put
 * much effort into testing it.
 */
test('Expand wavefront faces into triangles', function (t) {
  var expandedVertexData = expandVertexData(cubeVertexData, {facesToTriangles: true})

  // Expanded the 6 face lines into two triangles per line (6 vertices per line)
  t.equal(expandedVertexData.positionIndices.length, 36)
  t.end()
})
