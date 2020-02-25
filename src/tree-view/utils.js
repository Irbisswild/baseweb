/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TreeNodeT, TreeNodeIdT} from './types.js';

export const getPrevId = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  parentId: TreeNodeIdT | null,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (i === 0) {
        return parentId;
      } else {
        return nodes[i - 1].id;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getPrevId(nodes[i].children, nodeId, nodes[i].id);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getNextId = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  closestOmmer: TreeNodeIdT | null,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodes[i].children[0].id;
      } else if (nodes[i + 1]) {
        return nodes[i + 1].id;
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? nodes[i + 1].id : closestOmmer,
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};