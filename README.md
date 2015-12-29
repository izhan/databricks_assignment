# Overview
The library is located in the `src` folder, and is divided into three files: `tree.js`, `node.js`, and `parser.js`. There is a simple ReactJS application located at `/examples/index.html`. You can change the name of files, collapse/uncollapse files, remove files and their children, and add new ones.

# JSON
I assume that input JSON was of the form
```
{
  name: ...
  collapsed: ...
  children: [
    {
      name: ...
      collapsed: ...
      children: ...
    }...
  ]
}
```

# Development
Run `grunt watch` to automatically check your code using JSHint, and to run the Mocha tests. 

Run `jsx --watch src/ build/` to compile the JSX into Javascript.

# Tests
I followed TDD while building the library. You can view the Mocha/Chai tests by visiting `/test/testrunner.html`

# Design
I had designed my library to handle mutations to the tree coming from any arbitrary source. In other words, the tree may be modified by a user changing a file's name from the UI, by an AJAX response from a server, etc. Thus, you'll see that each node of the tree has a unique key (its path) so that as long as the client of the library has a particular node's path, it may modify that node. Thus, a server may for instance send a json of the form:
```
{
  type: "updateNode",
  path: "foo/bar",
  name: "data"
}
```
which can update the name of a particular node. Note that `node_container.js` is where the AJAX call would reside. It is simply a wrapper containing the data for the entire tree.

Because I had anticipated mutations to the tree coming from a variety of sources, I felt that the best way to reason about the ReactJS code was to use the tree as one big ol' property. You'll notice that when you change a file's name or delete a file, I do not change the component's state, but rather modify the tree data itself and wait for the prop changes to bubble down to that component. This way, the view will always be consistent with the data, regardless of where the change is coming from. Furthermore, any updates to the tree can simply be called by anyone with the tree object.

This of course has performance issues (see `forceUpdateTree`) as every update to the tree forces a rerender. I did have a plan to tackle this if I had more time. On every change to the tree, only the ReactJS component corresponding to either the node itself or its parent node has to be rerendered. Thus, if we maintain a map of BrowserNode to ReactJS Components (one-to-one if there is only one tree rendered in the web app), on every change in data, we can simply notify the components that need to be rerendered. I'm a big fan of Reflux and had using that in mind as a way to manage this.
