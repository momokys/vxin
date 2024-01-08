import { getCurrentInstance, Ref, watch } from 'vue'
import { isEmpty, isFunction } from '@vxin/utils'
import { useForm } from './use-form'
import { useVModel } from '@vxin/hooks'

export function useModel<T extends object, K extends keyof T>(props: T, name: K): Ref<T[K]> {
  const modelValue = useVModel(props, name, true)
  const [, formItem] = useForm()
  const ins = getCurrentInstance()
  if (formItem?.isVModel && !isEmpty(formItem.name) && !isFunction(ins?.proxy?.$attrs['onUpdate:modelValue'])) {
    watch(
      () => formItem.data[formItem.name!],
      () => {
        modelValue.value = formItem.data[formItem.name!]
      },
    )
    watch(
      () => modelValue.value,
      () => {
        formItem.data[formItem.name!] = modelValue.value
      },
    )
  }
  return modelValue
}
