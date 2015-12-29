var Node = React.createClass({
  renderChildren: function() {
    var children = this.props.nodeData.children;

    return children.map(function(child) {
      return (
        <Node nodeData={child} key={child.path} />
      );
    });
  },

  render: function() {
    return (
      <div>
        <input
          ref="editField"
          className="edit"
          value={this.props.nodeData.name}
          onChange={this.props.onChange}
        />
        {this.props.nodeData.name}
        {this.props.nodeData.path}
        {this.renderChildren()}
      </div>
    );
  }
});
