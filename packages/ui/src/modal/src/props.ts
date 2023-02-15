import { ExtractPropTypes, PropType } from "vue";

export const modalProps = {
  visible: Boolean,
  shade: {
    type: Boolean,
    default: true,
  },
  width: [Number, String],
  height: [Number, String],
  zIndex: Number,
  title: String,
  fullscreen: Boolean,
  isFunction: Boolean,
  appendToBody: {
    type: Boolean,
    default: true
  },
  destroy: Function as PropType<() => void>
}

export type ModalProps = ExtractPropTypes<typeof modalProps>
