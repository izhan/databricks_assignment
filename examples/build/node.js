var Node = React.createClass({displayName: "Node",
  getInitialState: function() {
    return {
      isEditing: false,
      addChildName: "",
      draft: "",
      addVisible: false
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    // focus on input field if we toggle its visibility
    if (!prevState.isEditing && this.state.isEditing) {
      var node = ReactDOM.findDOMNode(this.refs.editName);
      node.focus();
    }
    if (!prevState.addVisible && this.state.addVisible) {
      var node = ReactDOM.findDOMNode(this.refs.addChild);
      node.focus();
    }
  },

  toggleEditing: function() {
    this.setState({isEditing: !this.state.isEditing});
  },

  toggleAddVisible: function() {
    this.setState({addVisible: !this.state.addVisible});
  },

  onChangeName: function(event) {
    this.setState({draft: event.target.value});
  },

  onChangeChild: function(event) {
    this.setState({addChildName: event.target.value});
  },

  onToggleCollapsed: function() {
    this.props.tree.toggleCollapsed(this.props.nodeData.path);
    this.props.forceUpdateTree();
  },

  onDelete: function() {
    this.props.tree.deleteNode(this.props.nodeData.path);
    this.props.forceUpdateTree();
  },

  onBlur: function() {
    var updatedName = this.state.draft.trim();
    if (updatedName) {
      this.props.tree.updateName(this.props.nodeData.path, this.state.draft);
      this.props.forceUpdateTree();
    }
    this.toggleEditing();
  },

  onAddChild: function() {
    this.props.tree.appendNode(this.props.nodeData.path, this.state.addChildName);
    this.setState({addChildName: "", addVisible: false});
    this.props.forceUpdateTree();
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
        value: this.state.draft, 
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

  renderAddButton: function() {
    if (this.props.nodeData.collapsed) {
      return;
    } else if (this.state.addVisible) {
      return (
        React.createElement("div", {className: "node-add-child"}, 
          React.createElement("input", {
            ref: "addChild", 
            className: "add-child-input", 
            value: this.state.addChildName, 
            onChange: this.onChangeChild}
          ), 
          React.createElement("button", {className: "add-input-button", onClick: this.onAddChild}, 
            "+"
          )
        )
      )
    } else {
      return (
        React.createElement("div", {className: "node-add-button", onClick: this.toggleAddVisible}, 
          "+"
        )
      )
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
        this.renderAddButton()
      )
    );
  }
});
