import { Dialog } from 'vant'
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { routerKey, RouterLink, useRoute, useRouter } from 'vue-router'
import { useMeStore } from '../stores/useMeStore'
import { Icon } from './Icon'
import s from './Overlay.module.scss'

export const Overlay = defineComponent({
  // props如果不用就别写，会出问题
  props: {
    onClose: {
      type: Function as PropType<() => void>,
    },
  },
  setup: (props, context) => {
    const meStore = useMeStore()
    const router = useRouter()
    const route = useRoute()
    const close = () => {
      props.onClose?.()
    }
    const me = ref<User>()
    onMounted(async () => {
      const response = await meStore.mePromise
      me.value = response?.data.resource
    })
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '确认',
        message: '真的要退出登录吗？',
      })
      localStorage.removeItem('jwt')
      router.go(0)
    }
    return () => (
      <>
        <div class={s.mask} onClick={close}></div>
        <div class={s.overlay}>
          <section class={s.currentUser}>
            {me.value ? (
              <div>
                <h2 class={s.email}>{me.value.email}</h2>
                <p onClick={onSignOut}>点击退出登录</p>
              </div>
            ) : (
              <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
                <h2>未登录用户</h2>
                <p>点击这里登录</p>
              </RouterLink>
            )}
          </section>
          <nav>
            <ul class={s.action_list}>
              <li>
                <RouterLink to="/statistics" class={s.action}>
                  <Icon name="statistics" class={s.icon} />
                  <span>统计图表</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/export" class={s.action}>
                  <Icon name="export" class={s.icon} />
                  <span>导出数据</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/notify" class={s.action}>
                  <Icon name="notify" class={s.icon} />
                  <span>记账提醒</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </>
    )
  },
})

export const OverlayIcon = defineComponent({
  setup: (props, context) => {
    const overlayVisible = ref(false)
    const onClickMenu = () => {
      overlayVisible.value = !overlayVisible.value
    }
    return () => (
      <>
        <Icon name="menu" class={s.Icon} onClick={onClickMenu} />
        {overlayVisible.value && <Overlay onClose={() => (overlayVisible.value = false)} />}
      </>
    )
  },
})
