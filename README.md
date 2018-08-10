# knime_decisiontree

Using the following [article](https://blogs.sap.com/2015/08/21/visualizing-a-decision-tree-from-hana-pal-using-d3js/) a PMML (XML) parser was made in Node.js to convert the output of a decision tree model in KNIME (PMML file) to a JSON file.
The JSON file can be used to visualize the decision tree using D3.js. A demo can be found [here](https://arvidlb.github.io/knime_decisiontree/index.html)

# Contents

The pmml.js file converts a .pmml file to a JSON file that can be used in combination with D3.js. It is written in Node.js and uses the package [xmldom](https://www.npmjs.com/package/xmldom) to parse the .pmml file.

The treeData.json file contains the output from the pmml parser. It holds the most important values from the output of a decision tree model such as the split variable, the split counts and the record counts. It has the correct structure to use with D3.js.

The index.html file contains a basical HTML structure for visualizing the decision tree. It contains a reference to minified D3 V4 and inline javascript for visualizing the JSON data.

# Functionality

The demo linked above is an up-to-date reflection of functionality. It supports basic panning and zooming for easy navigation of the decision tree model (needs improvement). Collapsing the tree model is also supported. The tree structure provides info on the split variable and also shows relevant split data such as split counts and split percentages.

# To do

* Improve panning and zooming
  * Remove panning
  * Add more subtle zooming
* Fix link bug
  * Prevent links from not showing correctly when not opening first child node
