var Node = React.createClass({displayName: "Node",
  renderChildren: function() {
    var children = this.props.nodeData.children;

    return children.map(function(child) {
      return (
        React.createElement(Node, {nodeData: child, key: child.path})
      );
    });
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("input", {
          ref: "editField", 
          className: "edit", 
          value: this.props.nodeData.name, 
          onChange: this.props.onChange}
        ), 
        this.props.nodeData.name, 
        this.props.nodeData.path, 
        this.renderChildren()
      )
    );
  }
});
