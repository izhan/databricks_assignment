var AddNodeInput = React.createClass({
  propTypes: {
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

  toggleIsAdding: function() {
    this.setState({isAdding: !this.state.isAdding});
  },

  onChange: function(event) {
    this.setState({newChildName: event.target.value});
  },

  onSubmit: function() {
    var isValid = this.props.isValidName(this.state.newChildName);
    if (isValid) {
      this.props.tree.appendNode(this.props.nodeData.path, this.state.newChildName);
      this.setState({newChildName: "", isAdding: false});
      this.props.forceUpdateTree();
    } else {
      alert("Invalid name! Please choose another one.");
    }
  },

  render: function() {
    if (this.state.isAdding) {
      return (
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
      )
    } else {
      return (
        <div className="node-add-button" onClick={this.toggleIsAdding}>
          +
        </div>
      )
    }
  },
});