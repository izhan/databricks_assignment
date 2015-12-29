var NodeContainer = React.createClass({displayName: "NodeContainer",
  statics: {
    sampleData: {
      name: 'root',
      collapsed: false,
      children: [
        {
          name: 'child1',
          collapsed: true
        },
        {
          name: 'child2',
          collapsed: true
        },
        {
          name: 'child3',
          collapsed: false,
          children: [
            {
              name: 'grandchild1',
              collapsed: true
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
  
  getInitialState: function() {
    return {
      tree: Parser.initTree(NodeContainer.sampleData)
    };
  },
  render: function() {
    return (React.createElement(Node, {nodeData: this.state.tree.rootNode}));
  }
});
