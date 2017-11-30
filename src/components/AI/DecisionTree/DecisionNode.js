const { CHECK_METHOD, ACTION_METHOD } = require('./options');

/**
 * Decision node used in traversing a Decision Tree. This tree is strictly binary for the purposes
 * of simple decision making, but can be expanded to include multi-node branching decisions. Each node
 * stores some test function that parses whether its true or false node should be returned.
 */
class DecisionNode {	
  /**
	 * Constructor. Each decision node maintains a testMethod for determining the next
	 * node to visit. This method may either represent a decision to make or an action
	 * to execute.
     * @param testMethod the test method for deciding which node to visit
	 */
  constructor(testMethod){
    this.trueNode = null; // true node action
    this.falseNode = null; // false node action
    this.testMethod = testMethod; // {type: type of node, action: function to execute}
  }
    
  /**
	 * Sets the true node for this decision node.
	 * @param trueNode the true node to set
	 */
  setTrueNode(trueNode){
    this.trueNode = trueNode;
  }
	
  /**
	 * Sets the false node for this decision node.
	 * @param falseNode the false node to set
	 */
  setFalseNode(falseNode){
    this.falseNode = falseNode;
  }
	
  /**
	 * Sets the testValue for this decision node
	 * @param testValue the test value to set
	 */
  setTestMethod(testMethod){
    this.testMethod = testMethod; // test method for deciding the next node to visit
  }
	
  /**
	 * Decides which node to execute based upon the results of the test function.
	 */
  makeDecision(){
    // Check for a decision action
    if(this.testMethod.type == CHECK_METHOD){
      if(this.testMethod.action){
        // Call true child
        this.trueNode.makeDecision();
      } else {
        // Call false child
        this.falseNode.makeDecision();
      }
    } else if(this.testMethod.type == ACTION_METHOD){
      // execute the action
      this.testMethod.action;
    }
  }
	
  toString(){
    // Loop through each node and print out its children recursively
    let disp = 'NodeAttribute with children:\n';
    // Check for null children, which will be actions
    if(this.trueNode == null && this.falseNode == null){
      return disp + ' leftChild: null\nrightChild: null\n';
    } else if(this.falseNode == null){
      return disp + ' leftChild: ' + this.trueNode.toString() + '\nrightChild: null\n';
    } else if(this.trueNode == null){
      return disp + ' leftChild: null' + '\nrightChild: ' + this.falseNode.toString() + '\n';
    }
    // Otherwise, get the children
    return disp + ' leftChild: ' + this.trueNode.toString() + '\nrightChild: ' + this.falseNode.toString() + '\n';
  }
}

module.exports = DecisionNode;
