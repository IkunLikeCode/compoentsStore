<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { TreeNode, treeProps, TreeOptions } from "./tree";
import { createNamespace } from "@zi-shui/utils/create";
import treeNodeElement from "./treeNode.vue";
const bem = createNamespace("tree");
const props = defineProps(treeProps);
// 存储格式化后的数据
const tree = ref<TreeNode[]>([]);

// 定义树的结构名称
function createTreeOption(key: string, lable: string, children: string) {
  return {
    getKey(node: TreeOptions) {
      return node[key] as string;
    },
    getLabel(node: TreeOptions) {
      return node[lable] as string;
    },
    getChildren(node: TreeOptions) {
      return node[children] as TreeOptions[];
    },
  };
}
const { getKey, getLabel, getChildren } = createTreeOption(
  props.keyFild,
  props.lableFild,
  props.childrenFild
);
// 创建树结构的方法
function createTree(data: TreeOptions[]) {
  function traversal(data: TreeOptions[], parent: TreeNode | null = null) {
    return data.map((item) => {
      // 这里将 当前children获取到
      let children = getChildren(item);
      const treeNode: TreeNode = {
        key: getKey(item),
        lable: getLabel(item),
        children: [], //这里先不赋值，后面会用到递归赋值
        levle: parent ? parent.levle + 1 : 0,
        rawNode: item,
        isLeaf: item.isLeaf ?? children.length === 0,
      };
      // 如果当前节点有子节点，则递归赋值给children字段
      if (children.length > 0) {
        // 把当前父节点传递 然后会记录当前是第几层
        treeNode.children = traversal(children, treeNode);
      }
      return treeNode;
    });
  }
  const result: TreeNode[] = traversal(data);
  return result;
}

// 使用监听的方式监听数据变化，重新格式化数据
// TreeOptions 是传入的数据类型，TreeNode 是格式化后的数据类型
watch(
  () => props.data,
  (newData: TreeOptions[]) => {
    tree.value = createTree(newData);
  },
  {
    immediate: true,
  }
);

//  根据用户传递进来的 expandedKeys 进行默认展开
const expandedKeysSet = ref(new Set(props.defaultExpandedKeys));
// 拍平树结构的计算属性
const flatTree = computed(() => {
  const expandedKeys = expandedKeysSet.value;
  console.log(expandedKeys);
  const flattenNodes: TreeNode[] = [];
  // 这里使用了树的深度遍历 拍平树结构
  function traversal(nodes: TreeNode[]) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      flattenNodes.push(node);
      if (expandedKeys.has(node.key!)) {
        if (node.children && node.children.length! > 0) {
          traversal(nodes[i].children!);
        }
      }
    }
  }
  traversal(tree.value);
  return flattenNodes;
});

// 展开
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key!);
}
// 折叠
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key!);
}
// toggle
function toggle(node: TreeNode) {
  // 如果当前节点在展开的集合中，则折叠；否则展开。
  if (expandedKeysSet.value.has(node.key!)) {
    collapse(node);
  } else {
    expand(node);
  }
}

defineOptions({ name: "z-tree" });
</script>
<template>
  <div :class="bem.b()">
    <TransitionGroup name="treeList">
      <treeNodeElement
        v-for="node in flatTree"
        :node="node"
        @toggle="toggle"
        :key="node.key"
        :expended="expandedKeysSet.has(node.key!)"></treeNodeElement>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.treeList-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.treeList-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.treeList-enter-active {
  transition: all 0.3s ease;
}
.treeList-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.treeList-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
.treeList-leave-active {
  transition: all 0.3s ease;
}
</style>
