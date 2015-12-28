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
      this.path = this.parent + "/" + name;
    } else {
      this.path = "/" + name;
    }
  };
}());