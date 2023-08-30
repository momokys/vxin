import { computed, defineComponent, h, ref } from 'vue'
import { Close } from '@vxin/icons'
import { isEmpty, isFunction, isNumber } from '@vxin/utils'
import { useNamespace, useGlobalConfig } from '@/hooks'
import { VBtn } from '@/components'
import { inputProps } from './props'

export default defineComponent({
  name: 'VInput',
  props: inputProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('input')
    const inputRef = ref<HTMLInputElement>()
    const globalConfigSize = useGlobalConfig('size')
    const size = computed(() => props.size ?? globalConfigSize.value)
    const inputLen = computed(() => strLen(props.modelValue, props.wordLen))
    const isError = computed(
      () => props.error || (isNumber(props.maxLen) && props.allowOver && inputLen.value > props.maxLen),
    )
    const showSuffix = computed(() => props.showWordLimit || isFunction(slots.suffix))

    // 处理聚焦
    let isClick = false
    const isFocus = ref(false)
    const onMousedown = () => {
      isClick = true
      inputRef.value!.focus()
    }
    const onMouseup = () => {
      if (isClick) {
        isClick = false
        inputRef.value!.focus()
      }
    }
    const onMouseleave = () => {
      if (isClick) {
        isClick = false
        inputRef.value!.focus()
      }
    }

    // 输入
    let composition = false
    const update = () => {
      let input: string | undefined = inputRef.value!.value
      if (!props.allowOver && isNumber(props.maxLen)) {
        input = strLen(input, props.wordLen) <= props.maxLen ? input : props.modelValue ?? ''
      }
      emit('update:modelValue', input)
      inputRef.value!.value = input
    }
    const onInput = () => {
      if (composition) return
      update()
    }
    const onChange = (ev: Event) => {
      if (composition) return
      emit('change', ev)
    }
    const onClear = () => {
      if (props.readonly || props.disabled) return
      emit('update:modelValue', '')
    }

    const ClearBtn = () => (
      <VBtn
        type={'default'}
        icon={Close}
        size={'small'}
        shape={'circle'}
        disabled={isEmpty(props.modelValue)}
        class={[ns.e('clear-btn')]}
        onClick={onClear}
      />
    )
    const WordLimit = () => (
      <span class={ns.e('word-limit')}>
        {inputLen.value}/{props.maxLen}
      </span>
    )
    return () => (
      <span
        class={[
          ns.b('wrap'),
          ns.is('focus', isFocus.value),
          ns.is('readonly', props.readonly),
          ns.is('disabled', props.disabled),
          ns.is('error', isError.value),
          ns.is('full', props.full),
          ns.is('empty', isEmpty(props.modelValue)),
        ]}
        onMousedown={onMousedown}
        onMouseup={onMouseup}
        onMouseleave={onMouseleave}
      >
        {isFunction(slots.prefix) ? <span class={ns.e('prefix')}>{slots.prefix()}</span> : ''}
        <input
          ref={inputRef}
          type={props.type ?? 'text'}
          value={props.modelValue}
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
          onFocus={() => {
            isFocus.value = true
          }}
          onBlur={() => {
            if (isClick) return
            isFocus.value = false
          }}
        />
        {props.clearable ? <ClearBtn /> : ''}
        {showSuffix.value ? (
          <span class={ns.e('suffix')}>
            {props.showWordLimit && isNumber(props.maxLen) ? <WordLimit /> : ''}
            {isFunction(slots.suffix) ? slots.suffix() : ''}
          </span>
        ) : (
          ''
        )}
      </span>
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

// const fixInput = (
//   input?: string,
//   opts: {
//     maxLen?: number
//     wordLen?: (word: string) => number
//   },
// ) => {
//
// }