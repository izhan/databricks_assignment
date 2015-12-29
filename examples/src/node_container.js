var NodeContainer = React.createClass({
  statics: {
    sampleData: {
      name: 'root',
      collapsed: false,
      children: [
        {
          name: 'child1',
          collapsed: false
        },
        {
          name: 'child2',
          collapsed: false
        },
        {
          name: 'child3',
          collapsed: false,
          children: [
            {
              name: 'grandchild1',
              collapsed: false
            },
            {
              name: 'grandchild2',
              collapsed: false
            }
          ]
        }
      ]
    }
  },

  // TODO this is a hack!
  forceUpdateTree: function() {
    this.forceUpdate();
  },

  getInitialState: function() {
    return {
      tree: Parser.initTree(NodeContainer.sampleData)
    };
  },
  render: function() {
    return (
      <Node
        nodeData={this.state.tree.rootNode}
        tree={this.state.tree}
        forceUpdateTree={this.forceUpdateTree}
        isParent={true}
      />);
  }
});
