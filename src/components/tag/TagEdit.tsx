import { Dialog, Toast } from 'vant'
import { defineComponent, reactive } from 'vue'
import { routerKey, useRoute, useRouter } from 'vue-router'
import { MainLayout } from '../../layouts/MainLayout'
import { BackIcon } from '../../shared/BackIcon'
import { Button } from '../../shared/Button'
import { EmojiSelect } from '../../shared/EmojiSelect'
import { http } from '../../shared/HttpClient'
import { Icon } from '../../shared/Icon'
import { Rules, validate } from '../../shared/validate'
import s from './Tag.module.scss'
import { TagForm } from './TagForm'
export const TagEdit = defineComponent({
  props: {},
  setup: (props, context) => {
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => {
        ;<div>id 不存在</div>
      }
    }
    const router = useRouter()
    const onError = () => {
      Toast.success('删除失败')
    }
    const onDelete = async (options?: { withItems?: boolean }) => {
      await Dialog.confirm({
        title: '确认',
        message: '确定要删除标签吗',
      })
      await http
        .delete(
          `/tags/${numberId}`,
          {
            withItems: options?.withItems ? 'true' : 'false',
          },
          { _autoLoading: true },
        )
        .then(() => {
          Toast.success('删除成功')
        })
        .catch(() => {})
      router.back()
    }
    return () => (
      <MainLayout>
        {{
          title: () => '编辑标签',
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm id={numberId} />
              <div class={s.actions}>
                <Button level="danger" class={s.removeTags} onClick={() => onDelete()}>
                  删除
                </Button>
                <Button level="danger" class={s.removeTagsAndItem} onClick={() => onDelete({ withItems: true })}>
                  删除标签和记账
                </Button>
              </div>
            </>
          ),
        }}
      </MainLayout>
    )
  },
})
