import { defineComponent, PropType } from 'vue'
import { Icon, IconName } from './Icon'
import s from './FloatButton.module.scss'
import { RouterLink } from 'vue-router'

export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String as PropType<IconName>,
      required: true,
    },
  },
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name={props.iconName} class={s.icon} />
      </div>
    )
  },
})
