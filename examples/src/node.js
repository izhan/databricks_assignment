var Node = React.createClass({
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
    var isNonEmpty = this.state.draft.trim();
    // TODO this knows too much...perhaps the better way is to have the tree
    // throw an exception and to catch it?
    var data = this.props.nodeData;
    var basePath = data.parent ? data.parent.path : data.path;
    var newPath = basePath + "/" + this.state.draft;
    var isInvalid = this.props.tree.pathExists(newPath);

    if (isNonEmpty && !isInvalid) {
      this.props.tree.updateName(this.props.nodeData.path, this.state.draft);
      this.props.forceUpdateTree();
    } else if (isInvalid) {
      alert("Name already exists! Please choose another one.");
    }
    this.toggleEditing();
  },

  onAddChild: function() {
    // TODO this knows too much...perhaps the better way is to have the tree
    // throw an exception and to catch it?
    var data = this.props.nodeData;
    var basePath = data.parent ? data.parent.path : data.path;
    var newPath = basePath + "/" + this.state.addChildName;
    var isInvalid = this.props.tree.pathExists(newPath);
    if (isInvalid) {
      alert("Name already exists! Please choose another one.");
    } else {
      this.props.tree.appendNode(this.props.nodeData.path, this.state.addChildName);
      this.setState({addChildName: "", addVisible: false});
      this.props.forceUpdateTree();
    }
  },

  renderCollapseButton: function() {
    var collapseText = this.props.nodeData.collapsed ? "+" : "-";
    return (
      <div className="collapse-button" onClick={this.onToggleCollapsed}>
        [{collapseText}]
      </div>
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
        <Node
          nodeData={child}
          key={child.path}
          tree={tree}
          forceUpdateTree={forceUpdateTree}
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
    );
  },

  renderNameInput: function() {
    if(this.state.isEditing) {
      return (<input
        ref="editName"
        className="node-edit"
        value={this.state.draft}
        onClick={this.toggleEditing}
        onChange={this.onChangeName}
        onBlur={this.onBlur}
      />);
    } else {
      return (
        <div className="node-name" onClick={this.toggleEditing}>
          {this.props.nodeData.name}
        </div>);
    }
  },

  renderAddButton: function() {
    if (this.props.nodeData.collapsed) {
      return;
    } else if (this.state.addVisible) {
      return (
        <div className="node-add-child">
          <input
            ref="addChild"
            className="add-child-input"
            value={this.state.addChildName}
            onChange={this.onChangeChild}
          />
          <button className="add-input-button" onClick={this.onAddChild}>
            +
          </button>
        </div>
      )
    } else {
      return (
        <div className="node-add-button" onClick={this.toggleAddVisible}>
          +
        </div>
      )
    }
  },

  render: function() {
    return (
      <div className="node-wrapper">
        {this.renderCollapseButton()}
        {this.renderNameInput()}
        <div className="node-path">
          {this.props.nodeData.path}
        </div>
        {this.renderDeleteButton()}

        <div className="node-children">
          {this.renderChildren()}
        </div>
        {this.renderAddButton()}
      </div>
    );
  }
});
