import type { PropType, ExtractPropTypes } from "vue";
export type Key = string | number;

export interface TreeOptions {
  lable?: Key;
  key?: Key;
  children?: TreeOptions[];
  isLeaf?: boolean;
  [key: string]: unknown;
}
// 用户传递过来的数据 需要格式化 不管用户传递什么数据 我都把它格式化为 lable key children 这些字段
export interface TreeNode extends Readonly<TreeOptions> {
  levle: number; //格式化后的层级
  rawNode: TreeOptions; //原始节点数据
  children?: TreeNode[];
  isLeaf: boolean;
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOptions[]>,
    default: () => [],
  },
  lableFild: {
    type: String,
    default: "label",
  },
  keyFild: {
    type: String,
    default: "key",
  },
  childrenFild: {
    type: String,
    default: "children",
  },
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  onLoad: {
    type: Function as PropType<(node: TreeOptions) => Promise<TreeOptions[]>>,
    default: () => {},
  },
} as const;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  expended: {
    type: Boolean,
    required: true,
  },
  isLoding: {
    type: Object as PropType<Set<Key>>,
    default: false,
  },
} as const;

export const emitEvent = {
  toggle: (node: TreeNode) => node,
};
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;

// ExtractPropTypes 这是vue中提供的类型提取工具函数，用于从组件的props定义中自动推导出类型信息。
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
