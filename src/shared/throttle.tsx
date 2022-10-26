export const throttle = (fn: Function, time: number) => {
  let timer: number | undefined = undefined;
  return (...args: any[]) => {
    if (timer) {
      return;
    } else {
      fn(...args);
      timer = setTimeout(() => {
        timer = undefined;
      }, time);
    }
  };
  //返回一个函数
};

// 节流函数
// 需要传一个函数和一个时间（数字）
// 声明一个timer变量用来记录该函数是否被调用过，默认为undefined
// 返回一个函数，函数里执行判断语句，如果timer存在则直接返回不往后执行
// 如果不存在则执行传进来的函数，执行完后timer等于setTimeout计时器
// 计时器的时间等于传进来的时间（数字），在这个时间过后timer就等于undefined
// 这样在计时器运行结束前，timer始终有值，就不会执行传进来的函数，必须等到一定时间后才能执行下一次
