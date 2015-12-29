var Parser = (function () {
  /**
   * @param  {Object} data The JSON representation of the node.
   * @return {BrowserNode} The BrowserNode object represented by the JSON
   * @private
   */
  var convertToNode = function(data) {
    var currentNode = new BrowserNode(data.name, data.collapsed);

    if (!data.children) {
      return currentNode;
    }

    for(var i = 0; i < data.children.length; i++) {
      var child = convertToNode(data.children[i]);
      currentNode.appendChild(child);
    }

    return currentNode;
  };

  return {
    /**
     * @param  {Object} data The JSON representation of the tree
     * @return {BrowserTree} The BrowserTree object represented by the JSON
     */
    initTree: function(data) {
      var rootNode = convertToNode(data);
      return new BrowserTree(rootNode);
    }
  };
}());