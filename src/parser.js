var Parser = (function () {
  // private
  function convertToNode(data) {
    
  }

  return {
    initTree: function(data) {
      var rootNode = convertToNode(data);
      return new Tree(rootNode);
    }
  };
}());