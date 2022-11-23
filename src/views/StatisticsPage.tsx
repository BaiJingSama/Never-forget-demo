import { defineComponent, PropType, reactive, ref } from 'vue'
import { Charts } from '../components/statistics/Charts'
import { TimeTabLayout } from '../layouts/TimeTabLayout'
import s from './StatisticsPage.module.scss'
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => <TimeTabLayout rerenderOnSwitchTab={true} component={Charts} hideThisYear={true} />
  },
})

export default StatisticsPage
