describe('Node', function(){
  var rootNode, childNode1, childNode2, grandChildNode1, grandChildNode2, tree;
  var reactNode;

  var DummyNodeContainer = React.createClass({
    forceUpdateTree: function() {
      this.forceUpdate();
    },

    render: function() {
      return React.createElement(Node, {
        nodeData: this.props.tree.rootNode, 
        tree: this.props.tree, 
        forceUpdateTree: this.forceUpdateTree, 
        isParent: this.props.isParent
      });
    }
  });

  var createNodeWithTree = function(tree, isParent) {
    var props = {
      isParent: isParent,
      tree: tree
    };

    return TestUtils.renderIntoDocument(React.createElement(DummyNodeContainer, props));
  };

  // helper to help with verbosity
  var getElementWithClass = function(elClass) {
    return TestUtils.scryRenderedDOMComponentsWithClass(reactNode, elClass);
  };

  beforeEach(function() {
    // setting up tree
    rootNode = new BrowserNode('foo', false);
    childNode1 = new BrowserNode('child1', false);
    childNode2 = new BrowserNode('child2', false);
    grandChildNode1 = new BrowserNode('grandchild1', false);
    grandChildNode2 = new BrowserNode('grandchild2', false);
    rootNode.appendChild(childNode1);
    rootNode.appendChild(childNode2);
    childNode1.appendChild(grandChildNode1);
    childNode1.appendChild(grandChildNode2);
    tree = new BrowserTree(rootNode);
  });

  describe('root nodes', function() {
    beforeEach(function() {
      var dummyTree = new BrowserTree(new BrowserNode('dummy', false));
      reactNode = createNodeWithTree(dummyTree, true);
    });

    it('should not have a delete button', function() {
      var deleteButton = getElementWithClass("delete-button");
      expect(deleteButton.length).to.be.equal(0);
    });
  });

  describe('clicking delete button', function() {
    beforeEach(function() {
      reactNode = createNodeWithTree(tree, true);
    });

    it('should remove clicked node and all children from dom', function() {
      var deleteButton = getElementWithClass("delete-button");
      var prevNumOfNodes = getElementWithClass("node-wrapper").length;

      // removing the first child node
      TestUtils.Simulate.click(deleteButton[0]);

      var afterNumOfNodes = getElementWithClass("node-wrapper").length;

      // removing parent node and two children
      expect(afterNumOfNodes).to.be.equal(prevNumOfNodes - 3);
    });
  });

  describe('the collapse button', function() {
    var collapseButton;
    beforeEach(function() {
      reactNode = createNodeWithTree(tree, true);
      collapseButton = getElementWithClass("collapse-button");
    });

    it('should default to a - sign, but change to + when clicked', function() {
      expect(collapseButton[0].textContent).to.be.equal("[-]");
      TestUtils.Simulate.click(collapseButton[0]);
      expect(collapseButton[0].textContent).to.be.equal("[+]");
    });

    it('should hide the children nodes when clicked', function() {
      // collapsing the root node
      TestUtils.Simulate.click(collapseButton[0]);

      var numOfNodes = getElementWithClass("node-wrapper").length;
      expect(numOfNodes).to.be.equal(1);
    });

    it('should hide the add button when clicked', function() {
      expect(getElementWithClass("node-add-button").length).to.be.equal(5);
      // collapsing the root node
      TestUtils.Simulate.click(collapseButton[0]);
      expect(getElementWithClass("node-add-button").length).to.be.equal(0);
    });
  });
});
