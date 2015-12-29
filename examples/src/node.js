var Node = React.createClass({
  renderChildren: function() {
    var children = this.props.nodeData.children;
    var tree = this.props.tree;
    var forceUpdateTree = this.props.forceUpdateTree;

    return children.map(function(child) {
      return (
        <Node nodeData={child} key={child.path} tree={tree} forceUpdateTree={forceUpdateTree}/>
      ); 
    });
  },

  onChange: function(event) {
    this.props.tree.updateName(this.props.nodeData.path, event.target.value);
    this.props.forceUpdateTree();
  },

  render: function() {
    return (
      <div>
        <input
          ref="editField"
          className="edit"
          value={this.props.nodeData.name}
          onChange={this.onChange}
        />
        {this.props.nodeData.name}
        {this.props.nodeData.path}
        {this.renderChildren()}
      </div>
    );
  }
});
