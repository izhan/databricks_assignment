describe('Node', function(){
  describe('constructor', function(){
    var name = 'foo';
    var collapsed = false;
    var node = new Node(name, collapsed);

    it('should properly assign name and collapsed properties', function(){
      expect(node.name).to.be.equal(name);
      expect(node.collapsed).to.be.equal(collapsed);
    });

    it('should have its name as its path', function(){
      expect(node.path).to.be.equal('/foo');
    });

    it('should have no children', function(){
      expect(node.children.length).to.be.equal(0);
    });
  });

  describe('appendChild', function(){
    var parentNode = new Node('foo', false);
    var childNode = new Node('bar', false);
    var childNode2 = new Node('data', false);

    parentNode.appendChild(childNode);
    childNode.appendChild(childNode2);

    it('should link parent and child', function(){
      expect(childNode.parent).to.be.equal(parentNode);
      expect(parentNode.children.length).to.be.equal(1);
      expect(parentNode.children[0]).to.be.equal(childNode);
    });

    it('should inherit path from parent', function(){
      expect(childNode.path).to.be.equal('/foo/bar');
      expect(childNode2.path).to.be.equal('/foo/bar/data');
    });
  });

  // describe('updateName', function(){
  //   var node = new Node('foo', false);
  //   var childNode = new Node('data', false);
  //   node.appendChild(childNode);
  //   node.updateName('bar');
  //   childNode.updateName(childNode);

  //   it('should also update the nodes path as well', function(){
  //     expect(node.name).to.be.equal('bar');
  //     expect(node.path).to.be.equal('/bar');
  //   });
  // });
});
