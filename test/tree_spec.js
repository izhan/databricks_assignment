describe('Tree', function(){
  var rootNode = new BrowserNode('foo', false);
  var childNode1 = new BrowserNode('child1', false);
  var childNode2 = new BrowserNode('child2', false);
  var grandChildNode1 = new BrowserNode('grandchild1', false);
  var grandChildNode2 = new BrowserNode('grandchild2', false);
  var tree;

  beforeEach(function() {
    rootNode.appendChild(childNode1);
    rootNode.appendChild(childNode2);
    childNode1.appendChild(grandChildNode1);
    childNode1.appendChild(grandChildNode2);
    tree = new BrowserTree(rootNode)
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
    before(function() {
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
    before(function() {
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
    before(function() {
      tree.updateName(childNode2.path, "newchild2");
    });

    it('should update the name correctly', function() {
      expect(childNode2.name).to.be.equal("newchild2");
    });
  });

  describe('toggleCollapsed', function() {
    before(function() {
      tree.toggleCollapsed(childNode2.path);
    });

    it('should toggle the collapsed property', function() {
      expect(childNode2.collapsed).to.be.true();
    });
  });
});