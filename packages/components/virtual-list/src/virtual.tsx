import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  ref,
  TransitionGroup,
  useTemplateRef,
  watch,
} from "vue";
import { createNamespace } from "@zi-shui/utils/create";
import { transform } from "typescript";
export default defineComponent({
  name: "virtual",
  props: {
    itemDatas: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    size: {
      type: Number,
      default: 46,
    },
    remain: {
      type: Number,
      default: 8,
    },
  },
  setup(props, { slots }) {
    const ben = createNamespace("virtual-list");
    // 滚动条
    const scrollBar = useTemplateRef<HTMLDivElement>("scrollBar");
    // 滚动列表容器
    const NodeContainer = useTemplateRef<HTMLDivElement>("NodeContainer");
    const initState = reactive({
      start: 0,
      end: props.remain,
    });
    const virtualList = computed(() => {
      return props.itemDatas.slice(initState.start, initState.end);
    });
    // 偏移量
    const offset = ref(0);
    // 滚动事件处理函数
    function handleScroll() {
      const { scrollTop } = NodeContainer.value!;
      initState.start = Math.floor(scrollTop / props.size); //划过去了多少个item
      initState.end = initState.start + props.remain; //划过去之后的下一个item的开始位置
      offset.value = initState.start * props.size; //偏移量
    }
    // 监听数据变化，重新初始化列表的高度和滚轮的高度
    watch(
      () => props.itemDatas,
      () => init()
    );
    function init() {
      scrollBar.value!.style.height = `${
        props.itemDatas.length * props.size
      }px`;
      NodeContainer.value!.style.height = `${props.remain * props.size - 12}px`;
    }
    onMounted(() => {
      init();
    });
    return () => (
      <div class={ben.b()} ref="NodeContainer" onScroll={handleScroll}>
        <div class={ben.e("scroll-bar")} ref="scrollBar"></div>
        <div
          class={ben.e("scroll-list")}
          style={{
            transform: `translate3d(0,${offset.value}px,0)`,
          }}>
          <TransitionGroup name="treeList">
            {virtualList.value.map((node: any) => {
              return <div key={node.key}>{slots.default!({ node })}</div>;
            })}
          </TransitionGroup>
        </div>
      </div>
    );
  },
});
