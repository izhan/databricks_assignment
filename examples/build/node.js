var Node = React.createClass({displayName: "Node",
  propTypes: {
    // BrowserNode node this component represents
    nodeData: React.PropTypes.object.isRequired,
    // BrowserTree to make calls to for tree mutations
    tree: React.PropTypes.object.isRequired,
    // called to force an update of the entire tree from the root
    forceUpdateTree: React.PropTypes.func.isRequired,
    isParent: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      isEditing: false,
      editedName: "" // new name of the node when being edited
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    // focus on input field if we toggle its visibility
    if (!prevState.isEditing && this.state.isEditing) {
      var node = ReactDOM.findDOMNode(this.refs.editName);
      node.focus();
    }
  },

  toggleEditing: function() {
    this.setState({isEditing: !this.state.isEditing});
  },

  isValidName: function(name) {
    var isNonEmpty = name.trim();

    // TODO this knows too much about the paths...perhaps the better way is to 
    // have the tree throw an exception and to catch it?
    var data = this.props.nodeData;
    var basePath = data.parent ? data.parent.path : data.path;
    var newPath = basePath + "/" + name;
    var unchanged = name == this.props.nodeData.name;
    return isNonEmpty && (unchanged || !this.props.tree.pathExists(newPath));
  },

  // user clicks on the toggle button
  onToggleCollapsed: function() {
    this.props.tree.toggleCollapsed(this.props.nodeData.path);
    this.props.forceUpdateTree();
  },

  onDelete: function() {
    this.props.tree.deleteNode(this.props.nodeData.path);
    this.props.forceUpdateTree();
  },

  onChangeName: function(event) {
    this.setState({editedName: event.target.value});
  },

  // when a user clicks away from the input field while editing the name
  // will alert the user if the name is invalid
  onBlur: function() {
    var isValid = this.isValidName(this.state.editedName);

    if (isValid) {
      this.props.tree.updateName(this.props.nodeData.path, this.state.editedName);
      this.props.forceUpdateTree();
    } else if (!isValid) {
      alert("Invalid name! Please choose another one.");
    }
    this.toggleEditing();
  },

  renderCollapseButton: function() {
    var collapseText = this.props.nodeData.collapsed ? "+" : "-";
    return (
      React.createElement("div", {className: "collapse-button", onClick: this.onToggleCollapsed}, 
        "[", collapseText, "]"
      )
    )
  },

  renderChildren: function() {
    var children = this.props.nodeData.children;
    var tree = this.props.tree;
    var forceUpdateTree = this.props.forceUpdateTree;

    if (this.props.nodeData.collapsed) {
      return;
    }

    return children.map(function(child) {
      return (
        React.createElement(Node, {
          nodeData: child, 
          key: child.path, 
          tree: tree, 
          forceUpdateTree: forceUpdateTree}
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
    );
  },

  renderNameInput: function() {
    if(this.state.isEditing) {
      return (React.createElement("input", {
        ref: "editName", 
        className: "node-edit", 
        value: this.state.editedName, 
        onClick: this.toggleEditing, 
        onChange: this.onChangeName, 
        onBlur: this.onBlur}
      ));
    } else {
      return (
        React.createElement("div", {className: "node-name", onClick: this.toggleEditing}, 
          this.props.nodeData.name
        ));
    }
  },

  render: function() {
    return (
      React.createElement("div", {className: "node-wrapper"}, 
        this.renderCollapseButton(), 
        this.renderNameInput(), 
        React.createElement("div", {className: "node-path"}, 
          this.props.nodeData.path
        ), 
        this.renderDeleteButton(), 

        React.createElement("div", {className: "node-children"}, 
          this.renderChildren()
        ), 
        
        React.createElement(AddNodeInput, {
          tree: this.props.tree, 
          forceUpdateTree: this.props.forceUpdateTree, 
          path: this.props.nodeData.path, 
          visible: !this.props.nodeData.collapsed}
        )
      )
    );
  }
});
