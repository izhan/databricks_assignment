// tests.js
describe('Tree', function(){
  describe('constructor', function(){
    var rootNode = new Node("foo", false);
    var tree = new Tree(rootNode);

    it('should simply keep track of the root node', function(){
      expect(tree.rootNode).to.be.equal(rootNode);
    });
  });
});