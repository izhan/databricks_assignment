(function () {
  Node = function(name, collapsed) {
    this.name = name;
    this.collapsed = collapsed;
    this.children = [];
    this.path = "/" + name;
  };

  Node.prototype.appendChild = function(childNode) {
    this.children.push(childNode);
    childNode.parent = this;

    childNode.path = this.path + "/" + childNode.name;
    
    return childNode;
  };

  Node.prototype.updateName = function(name) {
    this.name = name;
    if (this.parent) {
      this.path = this.parent.path + "/" + name;
    } else {
      this.path = "/" + name;
    }

    // recursively update the paths of children 
    this.mapChildNodes(function(node){
      node.path = node.parent.path + "/" + node.name;
    });
  };

  // iterates through all nodes and calls func on them
  Node.prototype.mapChildNodes = function(func) {
    if (!this.children) {
      return;
    }

    for(var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      func(child);
      child.mapChildNodes(func);
    }
  };
}());