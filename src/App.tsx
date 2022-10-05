import { defineComponent, ref } from "vue";

export const App = defineComponent({
  setup() {
    const refCount = ref(0);
    const onClick = () => {
      refCount.value += 1;
      // React不能写这一行，它必须要setState，Vue可以直接赋值
    };
    return () => (
      <>
        <div>
          <div>{refCount.value}</div>
        </div>
        <div>
          <button onClick={onClick}>+1</button>
        </div>
      </>
    );
  },
});
