(function () {
  /**
   * @param {BrowserNode} rootNode The root of the entire tree
   * @constructor
   */
  BrowserTree = function(rootNode) {
    this.rootNode = rootNode;

    this.pathToNodeMap = {};
    _updateMapPaths(this.pathToNodeMap, rootNode);
  };

  /**
   * @param  {string} path The directory path to the node to be appended to
   * @param  {string} name The name of the new node to be appended
   * @return {BrowserNode} The new node created
   */
  BrowserTree.prototype.appendNode = function(path, name) {
    var parentNode = this.pathToNodeMap[path];
    var escapedName = _escapeName(name);
    var childNode = new BrowserNode(escapedName, false);
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

    _removeMapPaths(this.pathToNodeMap, childNode);
    return childNode;
  };

  /**
   * @param  {string} path The directory path to the node to be updated
   * @param  {string} name The name to update the node with
   * @return {BrowserNode} The updated node
   */
  BrowserTree.prototype.updateName = function(path, name) {
    var node = this.pathToNodeMap[path];

    _removeMapPaths(this.pathToNodeMap, node);
    var escapedName = _escapeName(name);
    node.updateName(escapedName);
    _updateMapPaths(this.pathToNodeMap, node);

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
   * @param  {string} path The path of the node we want to check
   * @return {boolean} Does the given path exist in the tree already?
   */
  BrowserTree.prototype.pathExists = function(path) {
    return this.pathToNodeMap[path] != null;
  };

  /**
   * Traverses subtree and updates the map with the new path
   * @param  {Object} map The dictionary to update
   * @param  {BrowserNode} The root of the subtree to update
   * @return {Object}
   * @private
   */
  var _updateMapPaths = function(map, parentNode) {
    parentNode.mapNodes(function(node){
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
  var _removeMapPaths = function(map, parentNode) {
    parentNode.mapNodes(function(node){
      map[node.path] = null;
    });
    return map;
  };

  /**
   * Escapes any occurences of slashes or backslashes in the name of the node
   * by using backslashes
   * @param  {string} name
   * @return {string} the escaped name
   * @private
   */
  var _escapeName = function(name) {
    return name.replace(/\\/, "\\\\").replace(/\//, "\\\/");
  };
}());