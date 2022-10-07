import { defineComponent } from "vue";
import s from "./First.module.scss";
import chart from "../../assets/svg/chart.svg";
import { RouterLink } from "vue-router";
import { WelcomeLayout } from "./WelcomeLayout";

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img class={s.pig} src={chart} />,
          title: () => (
            <h2>
              每日提醒
              <br />
              不遗漏每一笔账单
            </h2>
          ),
          buttons: () => (
            <>
              <RouterLink class={s.fake} to="/start">
                跳过
              </RouterLink>
              <RouterLink to="/welcome/4">下一页</RouterLink>
              <RouterLink to="/start">跳过</RouterLink>
            </>
          ),
        }}
      </WelcomeLayout>
    );
  },
});
// <div class={s.wrapper}>
//     <div class={s.card}>
//
//       <h2>
//         每日提醒
//         <br />
//         不遗漏每一笔账单
//       </h2>
//     </div>
//     <div class={s.actions}>
//       <RouterLink class={s.fake} to="/start">
//         跳过
//       </RouterLink>
//       <RouterLink to="/welcome/4">下一页</RouterLink>
//       <RouterLink to="/start">跳过</RouterLink>
//     </div>
//   </div>
