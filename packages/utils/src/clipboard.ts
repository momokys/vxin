export const writeClipboard = async (data: string) => {
  if (navigator.clipboard && navigator.permissions) {
    await navigator.clipboard.writeText(data)
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = data
    textarea.readOnly = true
    Object.assign(textarea.style, {
      width: '0',
      height: '0',
      position: 'fixed',
      top: '10px',
      left: '10px',
    })
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}
