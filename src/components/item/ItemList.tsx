import { defineComponent } from "vue";
import { ItemSummary } from "./ItemSummary";
import { TimeTabLayout } from "../../layouts/TimeTabLayout";
export const ItemList = defineComponent({
  setup: (props, context) => {
    return () => <TimeTabLayout component={ItemSummary} />;
  },
});
