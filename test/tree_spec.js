describe('BrowserTree', function(){
  var rootNode, childNode1, childNode2, grandChildNode1, grandChildNode2, tree;

  beforeEach(function() {
    rootNode = new BrowserNode('foo', false);
    childNode1 = new BrowserNode('child1', false);
    childNode2 = new BrowserNode('child2', false);
    grandChildNode1 = new BrowserNode('grandchild1', false);
    grandChildNode2 = new BrowserNode('grandchild2', false);
    rootNode.appendChild(childNode1);
    rootNode.appendChild(childNode2);
    childNode1.appendChild(grandChildNode1);
    childNode1.appendChild(grandChildNode2);
    tree = new BrowserTree(rootNode);
  });

  describe('constructor', function(){
    it('should keep track of the root node', function(){
      expect(tree.rootNode).to.be.equal(rootNode);
    });

    it('should have a map of path to nodes', function() {
      var map = tree.pathToNodeMap;
      expect(map[rootNode.path]).to.be.equal(rootNode);
      expect(map[childNode1.path]).to.be.equal(childNode1);
      expect(map[grandChildNode1.path]).to.be.equal(grandChildNode1);
    });
  });

  describe('appendNode', function() {
    beforeEach(function() {
      tree.appendNode(childNode2.path, "dummy");
    });

    it('should append node to specified path as a child', function() {
      expect(childNode2.children.length).to.be.equal(1);
      expect(childNode2.children[0].name).to.be.equal("dummy");
    });

    it('should update the map with the new node', function() {
      var dummyNode = childNode2.children[0];
      expect(tree.pathToNodeMap[dummyNode.path]).to.be.equal(dummyNode);
    });

    it('should default to uncollapsed', function() {
      // unfortunately, jshint doesn't like it when I use .to.be.equal.false
      expect(childNode2.children[0].collapsed).to.be.equal(false);
    });
  });

  describe('deleteNode', function() {
    beforeEach(function() {
      tree.deleteNode(childNode1.path);
    });

    it('should remove specified node', function() {
      expect(rootNode.children.length).to.be.equal(1);
    });

    it('should remove the node and its descendents from map', function() {
      var map = tree.pathToNodeMap;
      expect(map[childNode1.path]).to.be.equal(null);
      expect(map[grandChildNode1.path]).to.be.equal(null);
      expect(map[grandChildNode2.path]).to.be.equal(null);
    });
  });

  describe('updateName', function() {
    beforeEach(function() {
      tree.updateName(childNode1.path, "newchild1");
    });

    it('should update the name correctly', function() {
      expect(childNode1.name).to.be.equal("newchild1");
    });

    it('should use the new path in the map for node and children', function() {
      var map = tree.pathToNodeMap;
      expect(map[childNode1.path]).to.be.equal(childNode1);
      expect(map[childNode1.children[0].path]).to.be.equal(childNode1.children[0]);
    });

    it('should remove old path in the map for node', function() {
      var map = tree.pathToNodeMap;
      expect(map['/foo/child1']).to.be.equal(null);
    });
  });

  describe('toggleCollapsed', function() {
    beforeEach(function() {
      tree.toggleCollapsed(childNode2.path);
    });

    it('should toggle the collapsed property', function() {
      expect(childNode2.collapsed).to.be.equal(true);
    });
  });

  describe('with special names', function() {
    it('should escape backslashes', function() {
      var newNode = tree.appendNode(childNode1.path, "data\\bricks");
      expect(newNode.name).to.be.equal("data\\\\bricks");
      tree.updateName(newNode.path, "bricks\\data");
      expect(newNode.name).to.be.equal("bricks\\\\data");
    });

    it('should escape slashes', function() {
      var newNode = tree.appendNode(childNode1.path, "data/bricks");
      expect(newNode.name).to.be.equal("data\\/bricks");
      tree.updateName(newNode.path, "bricks/data");
      expect(newNode.name).to.be.equal("bricks\\/data");
    });
  });
});