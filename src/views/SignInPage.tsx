import axios from "axios";
import { defineComponent, PropType, reactive, ref } from "vue";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../shared/Button";
import { Form, FormItem } from "../shared/Form";
import { http } from "../shared/HttpClient";
import { Icon } from "../shared/Icon";
import { validate } from "../shared/validate";
import s from "./SignInPage.module.scss";
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formData = reactive({
      email: "1303802862@qq.com",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const refValidationCode = ref<any>();
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(
        errors,
        validate(formData, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "邮箱地址不合法",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );
    };
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors);
        console.log([errors]);
      }
      throw error;
    };
    const onClickSendValidationCode = async () => {
      const response = await http
        .post("/validation_codes", {
          email: formData.email,
        })
        .catch((error) => {
          //失败
          onError(error);
        });
      //成功
      refValidationCode.value?.startCount();
    };
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
          default: () => (
            <div class={s.wrapper}>
              <div class={s.logo}>
                <Icon class={s.icon} name="logo" />
                <h1 class={s.appName}>星空记账本</h1>
              </div>
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  v-model={formData.email}
                  error={errors.email?.[0]}
                  placeholder="请输入邮箱，然后点击发送验证码"
                />
                <FormItem
                  label="验证码"
                  type="validationCode"
                  v-model={formData.code}
                  error={errors.code?.[0]}
                  placeholder="输入六位数字"
                  onClick={onClickSendValidationCode}
                  ref={refValidationCode}
                  countFrom={1}
                />
                <FormItem style={{ paddingTop: 64 + "px" }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
