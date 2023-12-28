/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(node = this.root) {
    if (node === null) return 0;
    
    if (node.left === null && node.right === null) return 1;

    if (node.left === null) return 1 + this.minDepth(node.right);

    if (node.right === null) return 1 + this.minDepth(node.left);

    return 1 + Math.min(this.minDepth(node.left), this.minDepth(node.right));
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node = this.root) {
    if (node === null) return 0;
    
    return 1 + Math.max(this.maxDepth(node.left), this.maxDepth(node.right));
  }
  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSumHelper(node) {
    if (node === null) return { maxPathSum: -Infinity, maxPathThroughRoot: -Infinity };

    const left = this.maxSumHelper(node.left);
    const right = this.maxSumHelper(node.right);

    const maxPathThroughRoot = Math.max(
      node.val,
      node.val + left.maxPathThroughRoot,
      node.val + right.maxPathThroughRoot
    );

    const maxPathSum = Math.max(
      left.maxPathSum,
      right.maxPathSum,
      maxPathThroughRoot,
      node.val + left.maxPathThroughRoot + right.maxPathThroughRoot
    );

    return { maxPathSum, maxPathThroughRoot };
  }
  maxSum() {
    const { maxPathSum } = this.maxSumHelper(this.root);
    return maxPathSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLargerHelper(node, x) {
    if (node === null) return null;

    if (node.val <= x) {
      return this.nextLargerHelper(node.right, x);
    } else {
      const leftResult = this.nextLargerHelper(node.left, x);
      return leftResult !== null ? leftResult : node.val;
    }
  }

  nextLarger(lowerBound) {
    return this.nextLargerHelper(this.root, lowerBound);
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const depthAndParent = {};

    const dfs = (node, parent, depth) => {
      if (!node) return;

      depthAndParent[node.val] = { parent, depth };

      dfs(node.left, node, depth + 1);
      dfs(node.right, node, depth + 1);
    };

    dfs(this.root, null, 0);

    const { depth: depth1, parent: parent1 } = depthAndParent[node1] || {};
    const { depth: depth2, parent: parent2 } = depthAndParent[node2] || {};

    return depth1 === depth2 && parent1 !== parent2;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const serializeHelper = (node) => {
      if (!node) return 'null,';

      const leftSerialized = serializeHelper(node.left);
      const rightSerialized = serializeHelper(node.right);

      return `${node.val},${leftSerialized}${rightSerialized}`;
    };

    return serializeHelper(tree.root);
  }


  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(data) {
    const values = data.split(',');
    const deserializeHelper = () => {
      const val = values.shift();
      if (val === 'null') return null;

      const node = new BinaryTreeNode(parseInt(val));
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    };

    return new BinaryTree(deserializeHelper());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(root, p, q) {
    if (!root) return null;

    if (root.val === p.val || root.val === q.val) {
      return root;
    }

    const leftLCA = this.lowestCommonAncestor(root.left, p, q);
    const rightLCA = this.lowestCommonAncestor(root.right, p, q);

    if (leftLCA && rightLCA) {
      return root;
    }

    return leftLCA || rightLCA;
  }
}


module.exports = { BinaryTree, BinaryTreeNode };
