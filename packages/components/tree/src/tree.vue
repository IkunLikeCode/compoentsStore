<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { TreeNode, treeProps, TreeOptions, Key, treeEvent } from "./tree";
import { createNamespace } from "@zi-shui/utils/create";
import treeNodeElement from "./treeNode.vue";
const bem = createNamespace("tree");
const props = defineProps(treeProps);
// 存储格式化后的数据
const tree = ref<TreeNode[]>([]);
const emit = defineEmits(treeEvent);
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
function createTree(data: TreeOptions[], parent: TreeNode | null = null) {
  function traversal(data: TreeOptions[], parent: TreeNode | null = null) {
    return data.map((item) => {
      // 这里将 当前children获取到
      let children = getChildren(item) || [];
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
  const result: TreeNode[] = traversal(data, parent);
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

// 加载中节点的集合
const loadingKeysRef = ref(new Set<Key>());
// 触发异步加载
function triggerLoading(node: TreeNode) {
  // 如果我当前节点没有孩子，并且她还是不是叶子节点 那么我就需要触发加载
  if (!node.children?.length && !node.isLeaf) {
    const loadingKeys = loadingKeysRef.value;
    // 如果我当前节点不在加载中的集合中，那么我就需要触发加载
    if (!loadingKeys.has(node.key!)) {
      loadingKeys.add(node.key!);
      const onLoad = props.onLoad;
      // 如果我有加载方法，那么我就调用加载方法，并把当前节点加入到加载中的集合中
      if (onLoad) {
        onLoad(node.rawNode).then((res) => {
          node.children = createTree(res, node);
          loadingKeys.delete(node.key!);
        });
      }
    }
  }
}
// 展开
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key!);
  triggerLoading(node);
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
const chosenKeysSet = ref(new Set<Key>());

// 一上来就监听选择的key，如果有变化就更新集合
watch(
  () => props.selectedKeys,
  (newValue) => {
    chosenKeysSet.value = new Set(newValue);
  },
  {
    immediate: true,
  }
);

// 是否选中节点的集合
function choseHandle(node: TreeNode) {
  // 如果没有开启选择模式，则直接返回。
  if (!props.select) return;
  const chosenKeys = chosenKeysSet.value;
  // 如果开启了多选模式，则需要进行额外的处理。
  if (props.multiple) {
    if (chosenKeys.has(node.key!)) {
      chosenKeys.delete(node.key!);
    } else {
      chosenKeys.add(node.key!);
    }
  } else {
    if (chosenKeys.has(node.key!)) {
      chosenKeys.delete(node.key!);
    } else {
      chosenKeys.clear();
      chosenKeys.add(node.key!);
    }
  }
  emit("update:selectedKeys", Array.from(chosenKeys));
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
        :isLoding="loadingKeysRef"
        @choseHandle="choseHandle"
        :choseList="chosenKeysSet"
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
