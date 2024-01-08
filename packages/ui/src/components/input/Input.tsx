import { computed, defineComponent, h, ref } from 'vue'
import { Close } from '@vxin/icons'
import { isEmpty, isFunction, isNil, isNumber } from '@vxin/utils'
import { useNamespace } from '@/hooks'
import { useFormSize, useFormDisabled, useFormReadonly, VBtn, useForm, useModel } from '@/components'
import { inputProps } from './props'

export default defineComponent({
  name: 'VInput',
  props: inputProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('input')
    const inputRef = ref<HTMLInputElement>()
    const modelValue = useModel(props, 'modelValue')
    const size = useFormSize()
    const readonly = useFormReadonly()
    const disabled = useFormDisabled()
    const [, formItem] = useForm()
    const isFull = computed(() => (isNil(props.full) ? !isNil(formItem) : props.full))
    const inputLen = computed(() => strLen(modelValue.value, props.wordLen))
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
        input = strLen(input, props.wordLen) <= props.maxLen ? input : modelValue.value ?? ''
      }
      modelValue.value = input
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
      if (readonly.value || disabled.value) return
      modelValue.value = ''
    }

    const ClearBtn = () => (
      <VBtn
        type={'default'}
        icon={Close}
        size={'small'}
        shape={'circle'}
        disabled={isEmpty(modelValue.value)}
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
          ns.is('readonly', readonly.value),
          ns.is('disabled', disabled.value),
          ns.is('error', isError.value),
          ns.is('full', isFull.value),
          ns.is('empty', isEmpty(modelValue.value)),
        ]}
        onMousedown={onMousedown}
        onMouseup={onMouseup}
        onMouseleave={onMouseleave}
      >
        {isFunction(slots.prefix) ? <span class={ns.e('prefix')}>{slots.prefix()}</span> : ''}
        <input
          ref={inputRef}
          id={formItem?.id}
          type={props.type ?? 'text'}
          value={modelValue.value}
          placeholder={props.placeholder}
          disabled={disabled.value}
          readonly={readonly.value}
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
