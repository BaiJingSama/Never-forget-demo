import { computed, onMounted, onUnmounted, ref, Ref } from "vue";

type Point = { x: number; y: number };
interface Options {
  beforeStart?: (e: TouchEvent) => void;
  afterStart?: (e: TouchEvent) => void;
  beforeMove?: (e: TouchEvent) => void;
  afterMove?: (e: TouchEvent) => void;
  beforeEnd?: (e: TouchEvent) => void;
  afterEnd?: (e: TouchEvent) => void;
}

export const useSwipe = (
  element: Ref<HTMLElement | undefined>,
  options: Options
) => {
  const start = ref<Point>();
  const end = ref<Point>();
  const swiping = ref(false);
  const distance = computed(() => {
    // 算出移动的距离
    if (!end.value || !start.value) {
      return undefined;
    }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y,
    };
  });
  const direction = computed(() => {
    if (!swiping) {
      return "";
    }
    if (!distance.value) {
      return "";
    }
    const { x, y } = distance.value;
    if (Math.abs(x) > Math.abs(y)) {
      // 比较绝对值，是往左右还是上下，如果x绝对值比y大说明是左右滑动，反之亦然
      return x > 0 ? "right" : "left";
    } else {
      return y > 0 ? "down" : "up";
    }
  });
  const onStart = (e: TouchEvent) => {
    options?.beforeStart?.(e);
    start.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    end.value = undefined;
    swiping.value = true;
    options?.afterStart?.(e);
  };
  const onMove = (e: TouchEvent) => {
    options?.beforeMove?.(e);
    end.value = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    options?.afterMove?.(e);
  };
  const onEnd = (e: TouchEvent) => {
    options?.beforeEnd?.(e);
    swiping.value = false;
    start.value = undefined;
    end.value = undefined;
    options?.afterEnd?.(e);
  };
  onMounted(() => {
    if (!element.value) {
      return;
    }
    element.value?.addEventListener("touchstart", onStart);
    element.value?.addEventListener("touchmove", onMove);
    element.value?.addEventListener("touchend", onEnd);
  });
  //onMounted 是Vue官方的一个钩子 一旦组件被挂载就去监听元素的touchstart事件
  onUnmounted(() => {
    if (!element.value) {
      return;
    }
    element.value?.removeEventListener("touchstart", onStart);
    element.value?.removeEventListener("touchmove", onMove);
    element.value?.removeEventListener("touchend", onEnd);
  });
  // 用onUnmounted把污染的元素恢复
  return {
    swiping,
    distance,
    direction,
    start,
    end,
  };
};
