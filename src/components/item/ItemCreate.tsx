import { AxiosError } from "axios";
import { Dialog, Toast } from "vant";
import { defineComponent, PropType, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { MainLayout } from "../../layouts/MainLayout";
import { http } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
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
    const formData = reactive({
      kind: "支出",
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    });
    const router = useRouter();
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: "错误",
          message: Object.values(error.response.data.errors).join("\n"),
        });
      }
      throw error;
    };
    const onSubmit = async () => {
      const response = await http
        .post<Resource<Item>>("/items", formData, {
          params: { _mock: "itemCreate" },
        })
        .catch(onError);
      Toast.success("记账成功");
      router.push("/items");
    };
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs
                  v-model:selected={formData.kind}
                  // selected={refKind.value}
                  // onUpdate:selected={() => console.log(1)}
                  // 二选一
                  class={s.tabs}
                >
                  <Tab name="支出">
                    <div>{JSON.stringify(formData)}</div>
                    <Tags kind="expenses" v-model:selected={formData.tags_id} />
                  </Tab>
                  <Tab name="收入">
                    <Tags kind="income" v-model:selected={formData.tags_id} />
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad
                    v-model:happenAt={formData.happen_at}
                    v-model:amount={formData.amount}
                    onSubmit={onSubmit}
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
