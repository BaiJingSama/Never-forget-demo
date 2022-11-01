import { defineComponent, PropType } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import s from "./TagCreate.module.scss";
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: "新建标签",
          icon: <Icon name="left" onClick={() => {}} />,
          default: () => (
            <from>
              <div>
                <label>
                  <span>标签名</span>
                  <input type="text" />
                </label>
              </div>

              <div>
                <label>
                  <span>符号</span>
                  <div>
                    <nav>
                      <span>表情</span>
                      <span>首饰</span>
                      <span>职业</span>
                      <span>衣服</span>
                      <span>动物</span>
                      <span>自然</span>
                      <span>食物</span>
                      <span>运动</span>
                    </nav>
                    <ol>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>6</li>
                      <li>7</li>
                      <li>8</li>
                      <li>9</li>
                      <li>10</li>
                    </ol>
                  </div>
                </label>
              </div>

              <div>
                <p>记账时长按标签即可进行编辑</p>
              </div>
              <div>
                <button>确定</button>
              </div>
            </from>
          ),
        }}
      </MainLayout>
    );
  },
});
