import { useProp } from '@vxin/hooks'
import { ComponentSize } from '@/utils'
import { computed } from 'vue'
import { useGlobalConfig } from '@/hooks'
import { useForm } from './use-form'
import { FormLabelAlign } from '../types'

export const useFormSize = () => {
  const size = useProp<ComponentSize>('size')
  const [form, formItem] = useForm()
  const globalSize = useGlobalConfig('size')
  return computed(() => size.value ?? formItem?.size ?? form?.size ?? globalSize.value)
}
export const useFormLabelAlign = () => {
  const labelAlign = useProp<FormLabelAlign>('labelAlign')
  const [form, formItem] = useForm()
  return computed(() => labelAlign.value ?? formItem?.labelAlign ?? form?.labelAlign ?? 'left')
}

export const useFormLabelWidth = () => {
  const labelWidth = useProp<string | number>('labelWidth')
  const [form, formItem] = useForm()
  return computed(() => labelWidth.value ?? formItem?.labelWidth ?? form?.labelWidth)
}

export const useFormDisabled = () => {
  const disabled = useProp<boolean>('disabled')
  const [form, formItem] = useForm()
  return computed(() => disabled.value ?? formItem?.disabled ?? form?.disabled)
}

export const useFormReadonly = () => {
  const readonly = useProp<boolean>('readonly')
  const [form, formItem] = useForm()
  return computed(() => readonly.value ?? formItem?.readonly ?? form?.readonly)
}

export const useFormCommon = () => {
  const size = useFormSize()
  const labelAlign = useFormLabelAlign()
  const labelWidth = useFormLabelWidth()
  const readonly = useFormReadonly()
  const disabled = useFormDisabled()
  return { size, labelAlign, labelWidth, readonly, disabled }
}
