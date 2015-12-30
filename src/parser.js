var Parser = (function () {
  /**
   * Recursively converts the entire data into a tree rooted at the return node
   * @param  {Object} data The JSON representation of the node.
   * @return {BrowserNode} The BrowserNode object represented by the JSON
   * @private
   */
  var convertToRootNode = function(inputData) {
    var rootNode = new BrowserNode(inputData.name, inputData.collapsed);

    // needs to actually be BFS to have proper path inheritance
    var queue = [[rootNode, inputData]];

    while (queue.length !== 0) {
      var next = queue.shift();
      var node = next[0];
      var data = next[1];
      for (var i = 0; data.children && i < data.children.length; i++) {
        var child = new BrowserNode(data.children[i].name, data.children[i].collapsed);
        node.appendChild(child);
        queue.push([child, data.children[i]]);
      }
    }

    return rootNode;
  };

  return {
    /**
     * @param  {Object} data The JSON representation of the tree
     * @return {BrowserTree} The BrowserTree object represented by the JSON
     */
    initTree: function(data) {
      var rootNode = convertToRootNode(data);
      return new BrowserTree(rootNode);
    }
  };
}());