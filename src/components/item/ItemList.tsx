import { defineComponent, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import s from "./ItemList.module.scss";
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refSelected = ref("本月");
    return () => (
      <MainLayout>
        {{
          title: () => "星空记账",
          icon: () => <Icon name="menu" />,
          default: () => (
            <Tabs
              v-model:selected={refSelected.value}
              classPrefix={"customTabs"}
            >
              <Tab name="本月">本月list</Tab>
              <Tab name="上月">上月list</Tab>
              <Tab name="今年">今年list</Tab>
              <Tab name="自定义">自定义list</Tab>
            </Tabs>
          ),
        }}
      </MainLayout>
    );
  },
});
