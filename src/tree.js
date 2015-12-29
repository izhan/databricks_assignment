(function () {
  // for now just keeping track of rootNode. later may expand it to bigger
  // things
  BrowserTree = function(rootNode) {
    this.rootNode = rootNode;

    this.pathToNodeMap = {};
    updateMapPaths(this.pathToNodeMap, rootNode);
  };

  BrowserTree.prototype.appendNode = function(path, name) {
    var parentNode = this.pathToNodeMap[path];
    var childNode = new BrowserNode(name, false);
    parentNode.appendChild(childNode);

    this.pathToNodeMap[childNode.path] = childNode;
  };

  BrowserTree.prototype.deleteNode = function(path) {
    var map = this.pathToNodeMap;
    var childNode = map[path];
    // assuming you cannot delete root node
    var parentNode = childNode.parent;

    var siblings = parentNode.children;
    siblings.splice(siblings.indexOf(childNode), 1);

    removeMapPaths(this.pathToNodeMap, childNode);
  };

  BrowserTree.prototype.updateName = function(path, name) {
    var node = this.pathToNodeMap[path];

    removeMapPaths(this.pathToNodeMap, node);
    node.updateName(name);
    updateMapPaths(this.pathToNodeMap, node);
  };

  BrowserTree.prototype.toggleCollapsed = function(path) {
    this.pathToNodeMap[path].collapsed = !this.pathToNodeMap[path].collapsed;
  };

  // private functions
  var updateMapPaths = function(map, parentNode) {
    parentNode.mapChildNodes(function(node){
      map[node.path] = node;
    });
  };

  var removeMapPaths = function(map, parentNode) {
    parentNode.mapChildNodes(function(node){
      map[node.path] = null;
    });
  };

}());