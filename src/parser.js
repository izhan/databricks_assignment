var Parser = (function () {
  // private
  function convertToNode(data) {
    var currentNode = new BrowserNode(data.name, data.collapsed);

    if (!data.children) {
      return currentNode;
    }

    for(var i = 0; i < data.children.length; i++) {
      var child = convertToNode(data.children[i]);
      currentNode.appendChild(child);
    }

    return currentNode;
  }

  return {
    initTree: function(data) {
      var rootNode = convertToNode(data);
      return new BrowserTree(rootNode);
    }
  };
}());