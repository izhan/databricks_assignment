(function () {
  BrowserNode = function(name, collapsed) {
    this.name = name;
    this.collapsed = collapsed;
    this.children = [];
    this.path = "/" + name;
  };

  BrowserNode.prototype.appendChild = function(childNode) {
    this.children.push(childNode);
    childNode.parent = this;

    childNode.path = this.path + "/" + childNode.name;
    
    return childNode;
  };

  BrowserNode.prototype.updateName = function(name) {
    this.name = name;
    
    // recursively update the paths of children 
    this.mapChildNodes(function(node){
      if (node.parent) {
        node.path = node.parent.path + "/" + node.name;
      } else {
        node.path = "/" + node.name;
      }
    });
  };

  // iterates through parent node and all child nodes and calls func on them
  BrowserNode.prototype.mapChildNodes = function(func) {
    func(this);

    if (!this.children) {
      return;
    }

    for(var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      child.mapChildNodes(func);
    }
  };
}());