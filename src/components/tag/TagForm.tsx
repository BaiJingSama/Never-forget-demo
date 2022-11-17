import { defineComponent, onMounted, PropType, reactive, toRaw } from 'vue'
import { Button } from '../../shared/Button'
import { hasError, Rules, validate } from '../../shared/validate'
import { Form, FormItem } from '../../shared/Form'
import s from './Tag.module.scss'
import { useRoute, useRouter } from 'vue-router'
import { http } from '../../shared/HttpClient'
import { onFormError } from '../../shared/onFormError'
import { Toast } from 'vant'
export const TagForm = defineComponent({
  props: {
    id: Number,
  },
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: '',
      sign: '',
      kind: route.query.kind!.toString() as 'expenses' | 'income',
    })
    if (!route.query.kind) {
      return () => <div>可以自定义错误提示</div>
    }
    const errors = reactive<FormErrors<typeof formData>>({})
    const onSubmit = async (e: Event) => {
      e.preventDefault()
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        {
          key: 'name',
          type: 'pattern',
          regex: /^.{1,4}$/,
          message: '只能填 1-4 个字符',
        },
        { key: 'sign', type: 'required', message: '必填' },
      ]
      Object.assign(errors, {
        name: [],
        sign: [],
      })
      Object.assign(errors, validate(formData, rules))
      if (!hasError(errors)) {
        const promise = (await formData.id)
          ? http.patch(`/tags/${formData.id}`, formData, {
              _mock: 'tagEdit',
              _autoLoading: true,
            })
          : http.post('/tags', formData, {
              _mock: 'tagCreate',
              _autoLoading: true,
            })
        promise.catch((error) => onFormError(error, (data) => Object.assign(errors, data.errors)))
        Toast.success('更改标签成功')
        router.back()
      }
    }
    onMounted(async () => {
      if (props.id) {
        const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {}, { _mock: 'tagShow' })
        Object.assign(formData, response.data.resource)
      }
    })
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem label="标签名（最多四个字符）" type="text" v-model={formData.name} error={errors['name']?.[0]} />
        <FormItem
          label={'符号 ' + formData.sign}
          type="emojiSelect"
          v-model={formData.sign}
          error={errors['sign']?.[0]}
        />
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button type="submit" class={[s.button]}>
            确定
          </Button>
        </FormItem>
      </Form>
    )
  },
})
