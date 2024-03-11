import { NodeInputProps } from './helpers'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'

export function NodeInputDefault<T>(props: NodeInputProps) {
  const { node, attributes, value = '', setValue, disabled } = props

  // Some attributes have dynamic JavaScript - this is for example required for WebAuthn.
  const onClick = () => {
    // This section is only used for WebAuthn. The script is loaded via a <script> node
    // and the functions are available on the global window level. Unfortunately, there
    // is currently no better way than executing eval / function here at this moment.
    if (attributes.onclick) {
      const run = new Function(attributes.onclick)
      run()
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor={node.meta.label?.text} className="text-black opacity-60">
        {node.meta.label?.text}
      </Label>
      <Input
        className="h-[48px] rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
        name={attributes.name}
        type={attributes.type}
        value={value}
        placeholder={node.meta.label?.text}
        disabled={attributes.disabled || disabled}
        onClick={onClick}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </div>
    // <TextInput
    //   title={node.meta.label?.text}
    //   onClick={onClick}
    //   onChange={(e) => {
    //     setValue(e.target.value)
    //   }}
    //   type={attributes.type}
    //   name={attributes.name}
    //   value={value}
    //   disabled={attributes.disabled || disabled}
    //   help={node.messages.length > 0}
    //   state={
    //     node.messages.find(({ type }) => type === 'error') ? 'error' : undefined
    //   }
    //   subtitle={
    //     <>
    //       {node.messages.map(({ text, id }, k) => (
    //         <span key={`${id}-${k}`} data-testid={`ui/message/${id}`}>
    //           {text}
    //         </span>
    //       ))}
    //     </>
    //   }
    // />
  )
}
