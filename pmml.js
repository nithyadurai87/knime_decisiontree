const testFolder = './pmml/';
const fs = require('fs');

var DOMParser = require('xmldom').DOMParser;

function getFlare() {

      var flareNode = {};

      var pmml = fs.readFileSync(testFolder + 'outputmodel.pmml')
      var xmlDoc = new DOMParser().parseFromString(pmml.toString(), 'text/xml');
      var flare = pmml2Flare(xmlDoc.getElementsByTagName("TreeModel")[0].getElementsByTagName("Node")[0], flareNode);

       return flare;
}

function pmml2Flare(pmmlNode, flareNode) {

       flareNode["name"] = pmmlNode.getAttribute("id");

       flareNode["scoreDistribution"] = getScoreDistribution(pmmlNode);

       flareNode["score"] = pmmlNode.getAttribute("score");

       flareNode["recordCount"] = pmmlNode.getAttribute("recordCount");

       flareNode["predicateList"] = getPredicates(pmmlNode);

       if (pmmlNode.getElementsByTagName("Node").length === 0) {

              return flareNode;

       }

       flareNode["children"] = [];

       for (var i = 0; i < pmmlNode.getElementsByTagName("Node").length; i++) {

              if (pmmlNode.getElementsByTagName("Node")[i].parentNode === pmmlNode) {

                     var node = {};

                     flareNode.children.push(node);

                     pmml2Flare(pmmlNode.getElementsByTagName("Node")[i], node);
                     console.log(node)

              }

       }

       return flareNode;

}

function getScoreDistribution(node) {

       var scoreList = [];

       var scoreDistribution = node.getElementsByTagName("ScoreDistribution");

       for (var i = 0; i < scoreDistribution.length; i++) {

              if (scoreDistribution[i].parentNode === node) {

                     scoreList.push({

                           value: scoreDistribution[i].getAttribute("value"),

                           recordCount: scoreDistribution[i].getAttribute("recordCount"),

                           confidence: scoreDistribution[i].getAttribute("confidence")

                     });

              }

       }

       return scoreList;

}

function getPredicates(node) {

       var predicateList = {

              predicates: []

       };

       var compound = node.getElementsByTagName("CompoundPredicate")[0];

       if (!compound || compound.parentNode !== node) {

              if (node.getElementsByTagName("SimplePredicate").length === 0) {

                     return;

              }

              predicateList.predicates.push(predicate2Json(node

                     .getElementsByTagName("SimplePredicate")[0]));

       } else {

              for (var j = 0; j < compound.getElementsByTagName("SimplePredicate").length; j++) {

                     predicateList.predicates.push(predicate2Json(compound

                           .getElementsByTagName("SimplePredicate")[j]));

                     predicateList.operator = compound.getAttribute("booleanOperator");

              }

       }

       return predicateList;

}

function predicate2Json(simplePredicate) {

       var predicate = {};

       predicate.field = simplePredicate.getAttribute("field");

       predicate.operator = simplePredicate.getAttribute("operator");

       predicate.value = simplePredicate.getAttribute("value");

       return predicate;

}

fs.writeFileSync("treeData.json", JSON.stringify(getFlare()))

