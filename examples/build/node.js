var Node = React.createClass({displayName: "Node",
  getInitialState: function() {
    return {
      isEditing: false
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

  onChange: function(event) {
    this.setState({draft: event.target.value});
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

  renderChildren: function() {
    var children = this.props.nodeData.children;
    var tree = this.props.tree;
    var forceUpdateTree = this.props.forceUpdateTree;

    return children.map(function(child) {
      return (
        React.createElement(Node, {
          nodeData: child, 
          key: child.path, 
          tree: tree, 
          forceUpdateTree: forceUpdateTree, 
          className: "browser-node"}
        )
      ); 
    });
  },

  renderDeleteButton: function() {
    if(this.props.isParent) {
      return;
    }
    return (
      React.createElement("div", {className: "delete-button", onClick: this.onDelete}, "x")
    )
  },

  renderNameInput: function() {
    if(this.state.isEditing) {
      return (React.createElement("input", {
        ref: "editName", 
        className: "browser-edit", 
        value: this.state.draft, 
        onClick: this.toggleEditing, 
        onChange: this.onChange, 
        onBlur: this.onBlur}
      ));
    } else {
      return (
        React.createElement("div", {className: "browser-name", onClick: this.toggleEditing}, 
          this.props.nodeData.name
        ));
    }
  },

  render: function() {
    return (
      React.createElement("div", null, 
        this.renderNameInput(), 
        this.props.nodeData.name, 
        this.props.nodeData.path, 
        this.renderDeleteButton(), 

        React.createElement("div", {className: "browser-children"}, 
          this.renderChildren()
        )
      )
    );
  }
});
