import type {
  PropType,
  ExtractPropTypes,
  SetupContext,
  InjectionKey,
} from "vue";
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
// 定义tree组件的props类型
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
  selectedKeys: {
    //选中的节点
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  select: {
    //是否开启节点选择功能
    type: Boolean,
    default: false,
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 是否默认添加勾选框
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
  // 是否显示勾选框
  showCheckbox: {
    type: Boolean,
    default: false,
  },
} as const;

// 定义treeNode组件的props类型
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
  choseList: {
    type: Object as PropType<Set<Key>>,
    default: () => new Set<Key>(),
  },
  // 是否显示勾选框
  showCheckbox: {
    type: Boolean,
    default: false,
  },
  defaultCheckedKeys: {
    type: Array as PropType<Key[]>,
    default: () => [],
  },
} as const;

export const treeNodeContext = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  slot: {
    type: Object as PropType<SetupContext["slots"]>,
    required: true,
  },
} as const;

// 定义treeNode组件的emit事件类型
export const emitEvent = {
  toggle: (node: TreeNode) => node,
  choseHandle: (node: TreeNode) => node,
};
export const treeEvent = {
  "update:selectedKeys": (keys: Key[]) => keys,
};
export type TreeNodeProps = Partial<ExtractPropTypes<typeof treeNodeProps>>;

// ExtractPropTypes 这是vue中提供的类型提取工具函数，用于从组件的props定义中自动推导出类型信息。
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
export type TreeNodeContext = Partial<ExtractPropTypes<typeof treeNodeContext>>;
export interface TreeContext {
  slots: SetupContext["slots"];
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol("tree");
