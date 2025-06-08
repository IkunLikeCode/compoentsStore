import { defineComponent } from "vue";
import { treeNodeContext } from "./tree";
export default defineComponent({
  name: "treeNodeContext",
  props: treeNodeContext,
  setup(props) {
    const { slot, node } = props;
    return () => (
      <div>{slot.default ? slot.default({ node }) : node.lable}</div>
    );
  },
});
