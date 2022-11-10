import { defineComponent, onMounted, onUpdated, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { http } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { useTags } from "../../shared/useTags";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
import { Tags } from "./Tags";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    const refTagId = ref<number>(0);
    const refHappenAt = ref<string>(new Date().toISOString());
    const refAmount = ref<number>();
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs
                  v-model:selected={refKind.value}
                  // selected={refKind.value}
                  // onUpdate:selected={() => console.log(1)}
                  // 二选一
                  class={s.tabs}
                >
                  <Tab name="支出">
                    {refAmount.value}
                    <Tags kind="expenses" v-model:selected={refTagId.value} />
                  </Tab>
                  <Tab name="收入">
                    <Tags kind="income" v-model:selected={refTagId.value} />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={refHappenAt.value}
                    v-model:amount={refAmount.value}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
