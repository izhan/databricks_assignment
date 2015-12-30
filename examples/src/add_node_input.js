var AddNodeInput = React.createClass({
  propTypes: {
    path: React.PropTypes.string.isRequired,
    // BrowserTree to make calls to for tree mutations
    tree: React.PropTypes.object.isRequired,
    // called to force an update of the entire tree from the root
    forceUpdateTree: React.PropTypes.func.isRequired,
  },

  getInitialState: function() {
    return {
      isAdding: false, // showing/hiding the edit input field
      newChildName: "", // name of a child node to add
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    // focus on input field if we toggle its visibility
    if (!prevState.isAdding && this.state.isAdding) {
      var node = ReactDOM.findDOMNode(this.refs.addChild);
      node.focus();
    }
  },

  getWrapperClassName: function() {
    return this.props.visible ? "node-add-wrapper" : "node-add-wrapper hidden";
  },

  isValidName: function(name) {
    var isNonEmpty = name.trim();

    // TODO this knows too much about the paths...perhaps the better way is to 
    // have the tree throw an exception and to catch it?
    var newPath = this.props.path + "/" + name;
    return isNonEmpty && !this.props.tree.pathExists(newPath);
  },

  toggleIsAdding: function() {
    this.setState({isAdding: !this.state.isAdding});
  },

  onChange: function(event) {
    this.setState({newChildName: event.target.value});
  },

  // when user clicks on the add button to add the node
  // will alert the user if the name is invalid
  onSubmit: function() {
    var isValid = this.isValidName(this.state.newChildName);
    if (isValid) {
      this.props.tree.appendNode(this.props.path, this.state.newChildName);
      this.setState({newChildName: "", isAdding: false});
      this.props.forceUpdateTree();
    } else {
      alert("Invalid name! Please choose another one.");
    }
  },

  render: function() {
    if (this.state.isAdding) {
      return (
        <div className={this.getWrapperClassName()}>
          <div className="node-add-child">
            <input
              ref="addChild"
              className="add-child-input"
              value={this.state.newChildName}
              onChange={this.onChange}
            />
            <button className="add-input-button" onClick={this.onSubmit}>
              +
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className={this.getWrapperClassName()}>
          <div className="node-add-button" onClick={this.toggleIsAdding}>
            +
          </div>
        </div>
      )
    }
  },
});