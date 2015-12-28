// tests.js
describe("Node", function(){
  describe("constructor", function(){
    var name = "foo";
    var collapsed = false;
    var node = new Node(name, collapsed);

    it("should properly assign name and collapsed properties", function() {
      expect(node.name).to.be.equal(name);
      expect(node.collapsed).to.be.equal(collapsed);
    });

    it("should have the path of the root node", function() {
      expect(node.path).to.be.equal("/");
    });

    it("should have no children", function() {
      expect(node.children.length).to.be.equal(0);
    });
  });

  describe("addChild", function() {
    var parentNode = new Node("foo", false);
    var childNode = parentNode.addChild("bar", false);
    var childNode2 = childNode.addChild("data", false);

    it("should link parent and child", function() {
      expect(childNode.parent).to.be.equal(parentNode);
      expect(parentNode.children.length).to.be.equal(1);
      expect(parentNode.children[0]).to.be.equal(childNode);
    });

    it("should inherit path from parent", function() {
      expect(childNode.path).to.be.equal("/bar");
      expect(childNode2.path).to.be.equal("/bar/data");
    });
  });
});
