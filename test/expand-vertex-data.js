var test = require('tape')

var testVertexData = require('./textured-blender-default-cube.json')
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
