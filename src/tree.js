(function () {
  /**
   * @param {BrowserNode} rootNode The root of the entire tree
   * @constructor
   */
  BrowserTree = function(rootNode) {
    this.rootNode = rootNode;

    this.pathToNodeMap = {};
    updateMapPaths(this.pathToNodeMap, rootNode);
  };

  /**
   * @param  {string} path The directory path to the node to be appended to
   * @param  {string} name The name of the new node to be appended
   * @return {BrowserNode} The new node created
   */
  BrowserTree.prototype.appendNode = function(path, name) {
    var parentNode = this.pathToNodeMap[path];
    var childNode = new BrowserNode(name, false);
    parentNode.appendChild(childNode);

    this.pathToNodeMap[childNode.path] = childNode;
    return childNode;
  };

  /** 
   * @param  {string} path The directory path to the node to be deleted
   * @return {BrowserNode} The deleted node
   */
  BrowserTree.prototype.deleteNode = function(path) {
    var map = this.pathToNodeMap;
    var childNode = map[path];
    // assuming you cannot delete root node
    var parentNode = childNode.parent;

    var siblings = parentNode.children;
    siblings.splice(siblings.indexOf(childNode), 1);

    removeMapPaths(this.pathToNodeMap, childNode);
    return childNode;
  };

  /**
   * @param  {string} path The directory path to the node to be updated
   * @param  {string} name The name to update the node with
   * @return {BrowserNode} The updated node
   */
  BrowserTree.prototype.updateName = function(path, name) {
    var node = this.pathToNodeMap[path];

    removeMapPaths(this.pathToNodeMap, node);
    node.updateName(name);
    updateMapPaths(this.pathToNodeMap, node);

    return node;
  };

  /**
   * @param  {string} path The directory path to the node to be updated
   * @return {BrowserNode} The updated node
   */
  BrowserTree.prototype.toggleCollapsed = function(path) {
    var node = this.pathToNodeMap[path];
    node.collapsed = !this.pathToNodeMap[path].collapsed;

    return node;
  };

  /**
   * Traverses subtree and updates the map with the new path
   * @param  {Object} map The dictionary to update
   * @param  {BrowserNode} The root of the subtree to update
   * @return {Object}
   * @private
   */
  var updateMapPaths = function(map, parentNode) {
    parentNode.mapChildNodes(function(node){
      map[node.path] = node;
    });
    return map;
  };

  /**
   * Traverses subtree and removes each node from the map
   * @param  {Object} map The dictionary to update
   * @param  {BrowserNode} The root of the subtree to update
   * @return {Object}
   * @private
   */
  var removeMapPaths = function(map, parentNode) {
    parentNode.mapChildNodes(function(node){
      map[node.path] = null;
    });
    return map;
  };
}());