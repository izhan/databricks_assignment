(function () {
  // for now just keeping track of rootNode. later may expand it to bigger
  // things
  BrowserTree = function(rootNode) {
    this.rootNode = rootNode;

    var pathToNodeMap = {};
    rootNode.mapChildNodes(function(node){
      pathToNodeMap[node.path] = node;
    });
    this.pathToNodeMap = pathToNodeMap;
  };


}());