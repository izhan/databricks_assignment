(function () {
  Node = function(name, collapsed) {
    this.name = name;
    this.collapsed = collapsed;
    this.children = [];
    this.path = "/";
  };

  Node.prototype.appendChild = function(childNode) {
    this.children.push(childNode);
    childNode.parent = this;

    if (this.path == "/") {
      childNode.path = this.path + childNode.name;
    } else {
      childNode.path = this.path + "/" + childNode.name;
    }
    
    return childNode;
  };
}());