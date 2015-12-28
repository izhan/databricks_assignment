(function () {
  Node = function(name, collapsed) {
    this.name = name;
    this.collapsed = collapsed;
    this.children = [];
    this.path = "/";
  };

  Node.prototype.addChild = function(name, collapsed) {
    var childNode = new Node(name, collapsed);
    this.children.push(childNode);
    childNode.parent = this;

    if (this.path == "/") {
      childNode.path = this.path + name;
    } else {
      childNode.path = this.path + "/" + name;
    }
    
    return childNode;
  };
}());