/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  // Helper function for sumValues
  sumValuesHelper(node) {
    if (node === null) return 0;

    let sum = node.val;

    for (const child of node.children) {
      sum += this.sumValuesHelper(child);
    }

    return sum;
  }
  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    return this.sumValuesHelper(this.root);
  }

  countEvensHelper(node) {
    if (node === null) return 0;

    let count = node.val % 2 === 0 ? 1 : 0;

    for (const child of node.children) {
      count += this.countEvensHelper(child);
    }

    return count;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    return this.countEvensHelper(this.root);
  }

  numGreaterHelper(node, x) {
    if (node === null) return 0;

    let count = node.val > x ? 1 : 0;

    for (const child of node.children) {
      count += this.numGreaterHelper(child, x);
    }

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    return this.numGreaterHelper(this.root, lowerBound);
  }
}

module.exports = { Tree, TreeNode };
