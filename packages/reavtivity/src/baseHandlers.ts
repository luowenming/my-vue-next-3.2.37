import { track, trigger } from "./effect"

const get = createGetter()

function createGetter() {
  return function get(target: Object, key: string | symbol, receiver: object) {
    const res = Reflect.get(target, key, receiver)
    
    // 依赖收集
    track(target, key)

    return res
  }
}

const set = createSetter()

function createSetter() {
  return function set(target: Object, key: string | symbol, value: unknown, receiver: Object) {
    const resule = Reflect.set(target, key, value, receiver)

    // 依赖触发
    trigger(target, key, value)

    return resule
  }
}

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
}