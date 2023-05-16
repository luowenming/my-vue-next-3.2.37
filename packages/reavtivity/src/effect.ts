type KeyToDepMap = Map<any, ReactiveEffect>
const targetMap = new WeakMap<object, KeyToDepMap>()

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)

  // 完成第一次fn函数的执行
  _effect.run()
}

export let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {

  }

  run() {
    activeEffect = this
    return this.fn()
  }
}

/**
 * 依赖收集
 */

export function track(target: Object, key: unknown) {
  if(!activeEffect) return

  let depsMap = targetMap.get(target)
  if(!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  depsMap.set(key, activeEffect)
  
}

export function trigger(target: Object, key: unknown, newValue: unknown) {
  const depsMap = targetMap.get(target)
  if(!depsMap) return

  const effect = depsMap.get(key) as ReactiveEffect

  if(!effect) return

  effect.fn()
}