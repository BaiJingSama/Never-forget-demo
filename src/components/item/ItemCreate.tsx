import { defineComponent, onMounted, PropType, ref } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Button } from "../../shared/Button";
import { http } from "../../shared/HttpClient";
import { Icon } from "../../shared/Icon";
import { Tab, Tabs } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import s from "./ItemCreate.module.scss";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    const refPage = ref(0);
    const refHasMore = ref(false);
    onMounted(async () => {
      const response = await http.get<Resources<Tag>>("/tags", {
        kind: "expenses",
        _mock: "tagIndex",
      });
      const { resources, pager } = response.data;
      refExpensesTags.value = resources;
      refHasMore.value =
        (pager.page - 1) * pager.per_page + resources.length < pager.count;
    });
    const refExpensesTags = ref<Tag[]>([]);
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>("/tags", {
        kind: "income",
        _mock: "tagIndex",
      });
      refIncomeTags.value = response.data.resources;
    });
    const refIncomeTags = ref<Tag[]>([]);
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => (
            <>
              {/* <Tabs
                selected={refKind.value}
                onUpdateSelected={(name: string) => (refKind.value = name)}
              > */}
              <div class={s.wrapper}>
                <Tabs
                  v-model:selected={refKind.value}
                  // selected={refKind.value}
                  // onUpdate:selected={() => console.log(1)}
                  // 二选一
                  class={s.tabs}
                >
                  <Tab name="支出">
                    <div class={s.tags_wrapper}>
                      <div class={s.tag}>
                        <div class={s.sign}>
                          <Icon name="add" class={s.createTag} />
                        </div>
                        <div class={s.name}>新增</div>
                      </div>
                      {refExpensesTags.value.map((tag) => (
                        <div class={[s.tag, s.selected]}>
                          <div class={s.sign}>{tag.sign}</div>
                          <div class={s.name}>{tag.name}</div>
                        </div>
                      ))}
                    </div>
                    <div class={s.more}>
                      {refHasMore.value ? (
                        <Button class={s.loadMore}>加载更多</Button>
                      ) : (
                        <span class={s.noMore}>没有更多</span>
                      )}
                    </div>
                  </Tab>
                  <Tab name="收入" class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>新增</div>
                    </div>
                    {refIncomeTags.value.map((tag) => (
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>{tag.sign}</div>
                        <div class={s.name}>{tag.name}</div>
                      </div>
                    ))}
                  </Tab>
                </Tabs>
                <div class={s.inputPad_wrapper}>
                  <InputPad />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
