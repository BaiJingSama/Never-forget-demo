import { defineComponent, PropType } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { TagForm } from "./TagForm";
import { BackIcon } from "../../shared/BackIcon";
export const TagCreate = defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <BackIcon />,
          default: () => (
            <>
              <TagForm />
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
