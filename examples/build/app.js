var App = React.createClass({displayName: "App",
  render: function() {
    return (React.createElement(NodeContainer, null));
  } 
});

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('main')
);