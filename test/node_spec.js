describe('Node', function(){
  describe('constructor', function(){
    var name = 'foo';
    var collapsed = false;
    var node = new BrowserNode(name, collapsed);

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
    var parentNode = new BrowserNode('foo', false);
    var childNode = new BrowserNode('bar', false);
    var childNode2 = new BrowserNode('data', false);

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

  describe('updateName', function(){
    var node = new BrowserNode('foo', false);
    var childNode = new BrowserNode('data', false);
    node.appendChild(childNode);
    node.updateName('bar');

    it('should update the nodes path', function(){
      expect(node.name).to.be.equal('bar');
      expect(node.path).to.be.equal('/bar');
    });

    it('should update the childrens path as well', function(){
      expect(childNode.path).to.be.equal('/bar/data');

      childNode.updateName('bricks');
      expect(childNode.path).to.be.equal('/bar/bricks');
    });
  });
});
