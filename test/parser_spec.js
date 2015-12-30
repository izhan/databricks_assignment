describe('Parser', function(){
  var normalTree = {
    name: 'root',
    collapsed: false,
    children: [
      {
        name: 'child1',
        collapsed: true
      },
      {
        name: 'child2',
        collapsed: true
      },
      {
        name: 'child3',
        collapsed: false,
        children: [
          {
            name: 'grandchild1',
            collapsed: true
          },
          {
            name: 'grandchild2',
            collapsed: false
          }
        ]
      }
    ]
  };

  describe('initTree', function(){
    var tree = Parser.initTree(normalTree);

    it('should set root as first node', function(){
      expect(tree.rootNode.name).to.be.equal("root");
    });

    it('should traverse the data and create the children', function() {
      var firstLevelNodes = tree.rootNode.children;
      expect(firstLevelNodes.length).to.be.equal(3);
      // first and second nodes have no children
      expect(firstLevelNodes[0].children.length).to.be.equal(0);
      expect(firstLevelNodes[1].children.length).to.be.equal(0);

      // we have two grandchildren
      expect(firstLevelNodes[2].children.length).to.be.equal(2);
    });
  });

  describe('paths', function() {
    var tree = Parser.initTree(normalTree);

    it('should inherit the paths from parent', function() {
      expect(tree.rootNode.path).to.be.equal("/root");
      expect(tree.rootNode.children[2].path).to.be.equal("/root/child3");
      expect(tree.rootNode.children[2].children[0].path).to.be.equal("/root/child3/grandchild1");
    });
  });
});
