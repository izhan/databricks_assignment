var Counter = React.createClass({displayName: "Counter",
  getInitialState: function () {
    return { clickCount: 0 };
  },
  handleClick: function () {
    this.setState(function(state) {
      return {clickCount: state.clickCount + 1};
    });
  },
  render: function () {
    return (React.createElement("h2", {onClick: this.handleClick}, "Click me! Number of clicks: ", this.state.clickCount));
  }
});
ReactDOM.render(
  React.createElement(Counter, null),
  document.getElementById('message')
);