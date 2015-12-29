(function () {
  /**
   * @param {string} name
   * @param {boolean} collapsed
   * @constructor
   */
  BrowserNode = function(name, collapsed) {
    this.name = name;
    this.collapsed = collapsed;
    this.children = [];
    this.path = "/" + name;
  };

  /**
   * @param  {BrowserNode} childNode The node to be added as a child
   * @return {BrowserNode} The child node appended
   */
  BrowserNode.prototype.appendChild = function(childNode) {
    this.children.push(childNode);
    childNode.parent = this;

    childNode.path = this.path + "/" + childNode.name;
    
    return childNode;
  };

  /**
   * @param  {string} name The name to be updated
   * @return {BrowserNode} The updated node
   */
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

    return this;
  };

  /**
   * Traverses the subtree starting from this node, and calls func on each
   * child node encountered
   * @param  {function} func The function to be called on each child node.
   *                         Accepts as an argument a BrowserNode child node.
   * @return {BrowserNode} The root node we start from
   */
  BrowserNode.prototype.mapChildNodes = function(func) {
    func(this);

    if (!this.children) {
      return this;
    }

    for(var i = 0; i < this.children.length; i++) {
      var child = this.children[i];
      child.mapChildNodes(func);
    }

    return this;
  };
}());