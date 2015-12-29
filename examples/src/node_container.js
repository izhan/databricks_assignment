var NodeContainer = React.createClass({
  getInitialState: function () {
    return {
      data: {
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
    };
  },
  render: function() {
    return (<Node data={this.state.data} />);
  }
});
