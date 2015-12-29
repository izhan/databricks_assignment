var Node = React.createClass({displayName: "Node",
  render: function() {
    return (React.createElement("div", null, this.props.data.name));
  }
});
