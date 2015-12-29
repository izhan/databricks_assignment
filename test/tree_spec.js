describe('Tree', function(){
  var rootNode = new BrowserNode('foo', false);
  var childNode1 = new BrowserNode('child1', false);
  var childNode2 = new BrowserNode('child2', false);
  var grandChildNode1 = new BrowserNode('grandchild1', false);
  var grandChildNode2 = new BrowserNode('grandchild2', false);

  rootNode.appendChild(childNode1);
  rootNode.appendChild(childNode2);
  childNode1.appendChild(grandChildNode1);
  childNode1.appendChild(grandChildNode2);
  var tree = new BrowserTree(rootNode);

  describe('constructor', function(){
    it('should keep track of the root node', function(){
      expect(tree.rootNode).to.be.equal(rootNode);
    });

    it('should have an index of path to nodes', function() {
      var map = tree.pathToNodeMap;
      expect(map[rootNode.path]).to.be.equal(rootNode);
      expect(map[childNode1.path]).to.be.equal(childNode1);
      expect(map[grandChildNode1.path]).to.be.equal(grandChildNode1);
    });
  });

});