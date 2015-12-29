var Node = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false,
      addChildName: ""
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (!prevState.isEditing && this.state.isEditing) {
      var node = ReactDOM.findDOMNode(this.refs.editName);
      node.focus();
    }
  },

  toggleEditing: function() {
    this.setState({isEditing: !this.state.isEditing});
  },

  onChangeName: function(event) {
    this.setState({draft: event.target.value});
  },

  onChangeChild: function(event) {
    this.setState({addChildName: event.target.value});
  },

  onDelete: function() {
    this.props.tree.deleteNode(this.props.nodeData.path);
    this.props.forceUpdateTree();
  },

  onBlur: function() {
    this.props.tree.updateName(this.props.nodeData.path, this.state.draft);
    this.toggleEditing();
    this.props.forceUpdateTree();
  },

  onAddChild: function() {
    this.props.tree.appendNode(this.props.nodeData.path, this.state.addChildName);
    this.setState({addChildName: ""});
    this.props.forceUpdateTree();
  },

  renderChildren: function() {
    var children = this.props.nodeData.children;
    var tree = this.props.tree;
    var forceUpdateTree = this.props.forceUpdateTree;

    return children.map(function(child) {
      return (
        <Node
          nodeData={child}
          key={child.path}
          tree={tree}
          forceUpdateTree={forceUpdateTree}
          className="browser-node"
        />
      ); 
    });
  },

  renderDeleteButton: function() {
    if(this.props.isParent) {
      return;
    }
    return (
      <div className="delete-button" onClick={this.onDelete}>x</div>
    )
  },

  renderNameInput: function() {
    if(this.state.isEditing) {
      return (<input
        ref="editName"
        className="browser-edit"
        value={this.state.draft}
        onClick={this.toggleEditing}
        onChange={this.onChangeName}
        onBlur={this.onBlur}
      />);
    } else {
      return (
        <div className="browser-name" onClick={this.toggleEditing}>
          {this.props.nodeData.name}
        </div>);
    }
  },

  renderAddChild: function() {
    return (
      <div className="browser-add-child">
        <input
          ref="addChild"
          className="add-child-input"
          value={this.state.addChildName}
          onChange={this.onChangeChild}
        />
        <div className="add-child-button" onClick={this.onAddChild}>
          +
        </div>
      </div>
    )
  },

  render: function() {
    return (
      <div>
        {this.renderNameInput()}
        {this.props.nodeData.name}
        {this.props.nodeData.path}
        {this.renderDeleteButton()}

        <div className="browser-children">
          {this.renderChildren()}
        </div>
        {this.renderAddChild()}
      </div>
    );
  }
});
