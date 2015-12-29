var NodeContainer = React.createClass({
  // this data can come from anywhere (ajax, etc)
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

  // TODO this is a hack! Currently, any updates to the tree will not trigger
  // a rerender since ReactJS checks for shallow equalities. We can manually
  // force a trigger by calling this from a node. This will have performance
  // issues if the tree grows large. We can solve this issue by using Reflux
  // or having smarter ways to notify relevant components that need to be
  // updated
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
