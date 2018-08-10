# knime_decisiontree

Using the following [article](https://blogs.sap.com/2015/08/21/visualizing-a-decision-tree-from-hana-pal-using-d3js/) a PMML (XML) parser was made in Node.js to convert the output of a decision tree model in KNIME (PMML file) to a JSON file.
The JSON file can be used to visualize the decision tree using D3.js. A demo can be found [here](https://arvidlb.github.io/knime_decisiontree/index.html)

# Contents

The pmml.js file converts a .pmml file to a JSON file that can be used in combination with D3.js. It is written in Node.js and uses the package [xmldom](https://www.npmjs.com/package/xmldom) to parse the .pmml file.

The treeData.json file contains the output from the pmml parser. It holds the most important values from the output of a decision tree model such as the split variable, the split counts and the record counts. It has the correct structure to use with D3.js.

The index.html file contains a basical HTML structure for visualizing the decision tree. It contains a reference to minified D3 V4 and inline javascript for visualizing the JSON data.

# Functionality

The demo linked above is an up-to-date reflection of functionality. It supports basic panning and zooming for easy navigation of the decision tree model (needs improvement). Collapsing the tree model is also supported. The tree structure provides info on the split variable and also shows relevant split data such as split counts and split percentages.

# How to Run in Ubuntu ?

1. In Knime Analytics Platform, Add Decision Tree Learner and PMML Writer Nodes.
2. Right click the PMML Writer node, Configure -> set output path as /tmp/outputmodel.pmml.
3. Run that node and get the PMML file in /tmp/outputmodel.pmml
4. Clone this repo in home folder - `git clone https://github.com/arvidlb/knime_decisiontree`
5. Inside the folder knime_decisiontree, create a folder named "pmml"
6. copy the /tmp/outputmodel.pmml to knime_decisiontree/pmml - `cp /tmp/outputmodel.pmml knime_decisiontree/pmml`
7. Install nodejs and npm - `sudo apt-get install nodejs npm`
8. Install xmldom module - `sudo npm install xmldom` 
9. Now, run the command - `node pmml.js` 
10. Rename the existing treeData.json to treeData.json-orig - `mv treeData.json treeData.json-orig`
11. It will give the json file treeData.json
12. Open the Index.html using Firefox and explore the decision tree.


# To do

* Improve panning and zooming
  * Remove panning
  * Add more subtle zooming
* Fix link bug
  * Prevent links from not showing correctly when not opening first child node
