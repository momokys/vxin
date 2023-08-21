import { computed, defineComponent, h, ref } from 'vue'
import { Close } from '@vxin/icons'
import { isEmpty, isFunction, isNumber } from '@vxin/utils'
import { useNamespace, useGlobalConfig } from '@/hooks'
import { VIcon } from '@/components'
import { inputProps } from './props'

export default defineComponent({
  name: 'VInput',
  props: inputProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const ns = useNamespace('input')
    const inputRef = ref<HTMLInputElement>()
    const globalConfigSize = useGlobalConfig('size')
    const size = computed(() => props.size ?? globalConfigSize.value)
    let composition = false
    const update = () => {
      const content = inputRef.value!.value
      if (isNumber(props.maxLen) && strLen(content, props.wordLen) <= props.maxLen) {
        emit('update:modelValue', content)
      } else {
        emit('update:modelValue', props.modelValue ?? '')
        inputRef.value!.value = (props.modelValue ?? '') as any
      }
    }
    const onInput = () => {
      if (composition) return
      update()
    }
    const onChange = (ev: Event) => {
      emit('change', ev)
    }
    const onClear = () => {
      if (props.readonly || props.disabled) return
      emit('update:modelValue', '')
      inputRef.value!.focus()
    }
    return () => (
      <div
        class={[
          ns.b('wrap'),
          ns.is('readonly', props.readonly),
          ns.is('disabled', props.disabled),
          ns.is('error', props.error),
          ns.is('full', props.full ?? true),
        ]}
      >
        <input
          ref={inputRef}
          value={props.modelValue ?? ''}
          placeholder={props.placeholder}
          disabled={props.disabled}
          readonly={props.readonly}
          class={[ns.b(), ns.m(size.value)]}
          onInput={onInput}
          onChange={onChange}
          onCompositionstart={() => {
            composition = true
          }}
          onCompositionend={() => {
            composition = false
            update()
          }}
        />
        {props.clearable ? (
          <span class={[ns.e('clear-btn'), ns.is('empty', isEmpty(props.modelValue))]} onClick={onClear}>
            <VIcon icon={Close} size={12} />
          </span>
        ) : (
          ''
        )}
      </div>
    )
  },
})

const strLen = (target?: string, wordLen?: (word: string) => number) => {
  if (isEmpty(target)) {
    return 0
  } else if (isFunction(wordLen)) {
    const str = target!.toString()
    let len = 0
    for (let i = 0; i < str.length; i++) {
      len += wordLen(str.charAt(i))
    }
    return len
  } else {
    return target!.toString().length
  }
}
