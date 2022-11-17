import { AxiosError } from 'axios'
import { Dialog, Toast } from 'vant'
import { defineComponent, PropType, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { http } from '../../shared/HttpClient'
import { Icon } from '../../shared/Icon'
import { Tab, Tabs } from '../../shared/Tabs'
import { hasError, validate } from '../../shared/validate'
import { InputPad } from './InputPad'
import s from './ItemCreate.module.scss'
import { Tags } from './Tags'

export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive<Partial<Item>>({
      kind: 'expenses',
      tag_ids: [],
      amount: 0,
      happen_at: new Date().toISOString(),
    })
    const errors = reactive<FormErrors<typeof formData>>({
      kind: [],
      tag_ids: [],
      amount: [],
      happen_at: [],
    })
    const router = useRouter()
    const onError = (error: AxiosError<ResourceError>) => {
      if (error.response?.status === 422) {
        Dialog.alert({
          title: '错误',
          message: Object.values(error.response.data.errors).join('\n'),
        })
      }
      throw error
    }
    const onSubmit = async () => {
      Object.assign(errors, { kind: [], tag_ids: [], amount: [], happen_at: [] })
      Object.assign(
        errors,
        validate(formData, [
          { key: 'kind', type: 'required', message: '必须选择支出或收入' },
          { key: 'tag_ids', type: 'required', message: '必须选择一个标签' },
          { key: 'amount', type: 'required', message: '必须填一个金额' },
          { key: 'amount', type: 'notEqual', value: 0, message: '金额不能为0' },
          { key: 'happen_at', type: 'required', message: '必须填一个日期' },
        ]),
      )
      if (!hasError(errors)) {
        Dialog.alert({
          title: '错误',
          message: Object.values(errors)
            .filter((i) => i.length > 0)
            .join('\n'),
        })
        return
      }
      await http
        .post<Resource<Item>>('/items', formData, {
          _mock: 'itemCreate',
          _autoLoading: true,
        })
        .catch(onError)
      Toast.success('记账成功')
      router.push('/items')
    }
    return () => (
      <MainLayout class={s.layout}>
        {{
          title: () => '记一笔',
          icon: () => <BackIcon class={s.navIcon} />,
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
                  <Tab name="支出" value="expenses">
                    <Tags kind="expenses" v-model:selected={formData.tag_ids![0]} />
                  </Tab>
                  <Tab name="收入" value="income">
                    <Tags kind="income" v-model:selected={formData.tag_ids![0]} />
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
    )
  },
})
