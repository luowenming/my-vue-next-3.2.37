import { isObject } from "@vue/shared";
import { mutableHandlers } from "./baseHandlers";

export const reactiveMap = new WeakMap<object, any>()

export function reactive(target: Object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}

function createReactiveObject(target: Object, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<object, any>) {
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  const proxy = new Proxy(target, baseHandlers)

  proxyMap.set(target, proxy)

  return proxy
}

/**
 * 将指定数据变为 reactive 数据
 */
export const toReactive = <T extends unknown>(value: T): T => isObject(value) ? reactive(value as object) : value